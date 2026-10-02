import os
import subprocess
import sys

REPO = r"C:\Users\22310\Desktop\adworks\AntimatterDimensionsEndgameUpdate"
BACKUP = "backup-merge-results"
OLD = "ada648a30"
DEFAULT_TARGET = "src/core/*.js"
MAX_PREVIEW = 5

def run(cmd, timeout=600):
    try:
        subprocess.run(cmd, cwd=REPO, timeout=timeout, check=True,
                       stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
        return True
    except subprocess.CalledProcessError as e:
        print(f"  [错误] {' '.join(cmd)}")
        err = e.stderr.decode("utf-8", errors="replace").strip()
        if err:
            print(f"  {err}")
        return False
    except subprocess.TimeoutExpired:
        print(f"  [超时] {' '.join(cmd)}")
        return False

def get_files(target):
    result = subprocess.run(
        ["git", "diff", "--name-only", OLD, BACKUP, "--", target],
        cwd=REPO, capture_output=True, text=True, encoding="utf-8"
    )
    return [f.strip() for f in result.stdout.strip().split("\n") if f.strip()]

def restore(path):
    return run(["git", "checkout", BACKUP, "--", path])

def rollback(path):
    return run(["git", "checkout", OLD, "--", path])

def ask(prompt):
    while True:
        ans = input(prompt).strip().lower()
        if ans in ("y", "n", "q"):
            return ans
        print("  请输入 y / n / q")

def bisect(files):
    """假设 files 当前全部为旧版。二分找出哪个恢复到新版会崩。"""
    low, high = 0, len(files)
    round_num = 0
    while high - low > 1:
        round_num += 1
        mid = (low + high) // 2
        candidates = files[low:mid]

        for f in files:
            rollback(f)
        for f in candidates:
            restore(f)

        print()
        print(f"--- 第 {round_num} 轮: 测试前 {len(candidates)} 个 ---")
        for f in candidates[:MAX_PREVIEW]:
            print(f"    {f}")
        if len(candidates) > MAX_PREVIEW:
            print(f"    ... 及其他 {len(candidates) - MAX_PREVIEW} 个")

        ans = ask("结果 (y=正常 / n=崩溃 / q=中止): ")
        if ans == "q":
            return None
        if ans == "n":
            high = mid
        else:
            low = mid
    return files[low]

def main():
    target = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_TARGET
    files = get_files(target)

    if not files:
        print(f"[{target}] 没有需要恢复的文件。")
        return

    print(f"目标: {target}")
    print(f"待恢复文件数: {len(files)}")

    remaining = files.copy()
    problem_files = []

    while True:
        for f in remaining:
            restore(f)

        print()
        print("=" * 60)
        print(f"已恢复 {len(remaining)} 个文件（已排除 {len(problem_files)} 个问题文件）")
        print("=" * 60)
        ans = ask("测试结果 (y=正常 / n=崩溃 / q=中止): ")

        if ans == "q":
            print(">>> 中止。当前状态未做清理。")
            return
        if ans == "y":
            print()
            print(">>> 全部保留，可以提交了。")
            break

        if len(remaining) == 1:
            problem = remaining[0]
            print(f">>> 只剩一个文件: {problem}")
        else:
            for f in remaining:
                rollback(f)
            problem = bisect(remaining)
            if problem is None:
                print(">>> 二分中止。")
                return

        rollback(problem)
        problem_files.append(problem)
        remaining.remove(problem)
        print(f">>> 问题文件: {problem}")

    if problem_files:
        print()
        print(f"已回滚的问题文件（共 {len(problem_files)} 个）:")
        for p in problem_files:
            print(f"  {p}")

    print()
    print("手动提交:")
    print(f"  git add \"{target}\"")
    msg = f"恢复 {target}，回滚 {len(problem_files)} 个文件" if problem_files else f"恢复 {target}"
    print(f"  git commit -m \"{msg}\"")

if __name__ == "__main__":
    main()