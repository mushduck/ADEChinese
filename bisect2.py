import os
import subprocess

REPO = r"C:\Users\22310\Desktop\adworks\AntimatterDimensionsEndgameUpdate"
BACKUP = "backup-merge-results"
OLD = "ada648a30"
FILES_LIST = "core-js-files.txt"

def checkout(branch, files):
    """一次性批量 checkout 这些文件到指定分支"""
    if not files:
        return
    subprocess.run(
        ["git", "checkout", branch, "--"] + files,
        cwd=REPO, check=True
    )

def ask():
    while True:
        ans = input("  结果 (y=正常 / n=崩溃 / q=退出): ").strip().lower()
        if ans in ("y", "n", "q"):
            return ans
        print("  请输入 y / n / q")

def main():
    with open(FILES_LIST, "r", encoding="utf-8") as f:
        files = [line.strip() for line in f if line.strip()]

    total = len(files)
    print(f"待测试文件: {total}")

    low, high = 0, total
    round_num = 0

    while high - low > 1:
        round_num += 1
        mid = (low + high) // 2
        candidates = files[low:mid]

        print(f"\n--- 第 {round_num} 轮：测试 {len(candidates)} 个文件 ---")
        print(f"  回滚全部 {total} 个到旧版...")
        checkout(OLD, files)
        print(f"  恢复 {len(candidates)} 个到新版...")
        checkout(BACKUP, candidates)

        print(f"  候选（最多显示 5 个）：")
        for f in candidates[:5]:
            print(f"    {f}")
        if len(candidates) > 5:
            print(f"    ... 及其他 {len(candidates) - 5} 个")

        print("  请运行 npm run serve 测试，然后回答：")
        ans = ask()
        if ans == "q":
            print("退出。")
            return
        if ans == "n":
            high = mid
        else:
            low = mid

    problem = files[low]
    print(f"\n定位到问题文件：{problem}")
    print(f"\n下一步：")
    print(f"  git checkout {OLD} -- {problem}")
    print(f"  从 {FILES_LIST} 里删掉这一行，再跑一次 bisect2.py")

if __name__ == "__main__":
    main()