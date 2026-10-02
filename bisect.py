import os
import subprocess
import sys

REPO = r"C:\Users\22310\Desktop\adworks\AntimatterDimensionsEndgameUpdate"
BACKUP_BRANCH = "backup-merge-results"
TEST_BRANCH = "test-bisect"
FILES_LIST = "remaining.txt"

def run(cmd, timeout=600):
    print(f"  $ {' '.join(cmd)}")
    try:
        result = subprocess.run(cmd, cwd=REPO, timeout=timeout)
        return result.returncode == 0
    except subprocess.TimeoutExpired:
        print(f"  [超时] {' '.join(cmd)}")
        return False

def current_branch():
    result = subprocess.run(
        ["git", "rev-parse", "--abbrev-ref", "HEAD"],
        cwd=REPO, capture_output=True, text=True, encoding="utf-8"
    )
    return result.stdout.strip()

def reset_to_baseline():
    print(">>> 重置 test-bisect 到基线...")
    if current_branch() != TEST_BRANCH:
        run(["git", "checkout", TEST_BRANCH])
    run(["git", "reset", "--hard", "HEAD"])
    run(["git", "clean", "-fd",
         "-e", "bisect.py",
         "-e", "all-merged-files.txt",
         "-e", "remaining.txt"])

def checkout_files(files):
    print(f">>> 检出 {len(files)} 个文件到 test-bisect...")
    for i, f in enumerate(files, 1):
        print(f"  [{i}/{len(files)}] {f}")
        run(["git", "checkout", BACKUP_BRANCH, "--", f])

def main():
    list_path = os.path.join(REPO, FILES_LIST)
    if not os.path.exists(list_path):
        print(f"找不到文件列表: {list_path}")
        sys.exit(1)

    with open(list_path, "r", encoding="utf-8") as fp:
        files = [line.strip() for line in fp if line.strip()]

    total = len(files)
    print(f"总候选文件数: {total}")
    if total == 0:
        return

    low, high = 0, total
    round_num = 0

    while high - low > 1:
        round_num += 1
        mid = (low + high) // 2
        candidates = files[low:mid]

        print()
        print("=" * 60)
        print(f"第 {round_num} 轮 — 剩余候选 {high - low} 个")
        print(f"本轮测试前 {len(candidates)} 个（索引 {low} 到 {mid - 1}）")
        print("=" * 60)

        reset_to_baseline()
        checkout_files(candidates)

        print()
        print("现在在另一个终端运行 npm run serve，等编译完成后打开浏览器。")
        print("  n = 白屏/报错/异常")
        print("  y = 正常")
        while True:
            answer = input("结果 (y/n): ").strip().lower()
            if answer in ("y", "n"):
                break
            print("请输入 y 或 n")

        if answer == "n":
            print(f">>> 问题在前 {len(candidates)} 个文件里")
            high = mid
        else:
            print(f">>> 问题在后 {high - mid} 个文件里")
            low = mid

    print()
    print("=" * 60)
    print("定位完成，问题文件很可能是：")
    print(f"  {files[low]}")
    print("=" * 60)
    print()
    print("下一步：")
    print(f"  git switch main")
    print(f"  git checkout ada648a30 -- {files[low]}")
    print(f"  git add {files[low]}")
    print(f"  git commit -m \"回滚 {os.path.basename(files[low])}\"")
    print()
    print("然后更新 remaining.txt 排除这个文件，再跑一次 bisect.py 找下一个。")

if __name__ == "__main__":
    main()