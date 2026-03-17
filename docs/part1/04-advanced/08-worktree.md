# git worktree — 複数の作業ツリーを管理する

<!-- prev/next navigation -->
[< Previous: git rebase -i — コミット履歴を整理する](./07-rebase-interactive.md) | [Back to Index](../../../README.md) | [Next: コミットメッセージの書き方 — Conventional Commits >](./09-commit-conventions.md)

## What & Why

feature ブランチで作業の真っ最中に「ちょっと main でホットフィックスお願い！」と頼まれることがある。`git stash` を使えばコンテキストを退避できるけど、長時間並行して作業したいなら `git worktree` の方がスマートだ。

`git worktree` は、**1つのリポジトリを複数のディレクトリで同時にチェックアウトできる**機能だ。ブランチを切り替えることなく、別のブランチを別のフォルダで開ける。

## Content

### シナリオ: feature ブランチの作業中にホットフィックスを頼まれた

現在 `feature/login` ブランチで作業中だとする：

```bash
git status
```

```
On branch feature/login
Changes not staged for commit:
  modified:   src/auth.js
```

ここで `main` のバグ修正を頼まれた。stash もできるが、ここでは worktree を使ってみよう。

---

### 新しい作業ツリーを追加する

```bash
git worktree add ../hotfix main
```

- `../hotfix` — 新しいディレクトリのパス（リポジトリの外でも OK）
- `main` — チェックアウトするブランチ名

これで `../hotfix` ディレクトリが `main` ブランチの状態で作られる。**元のディレクトリはそのまま**だ。

```bash
git worktree list
```

```
/home/user/myproject        abc1234 [feature/login]
/home/user/hotfix           def5678 [main]
```

2つの作業ツリーが並んでいるのがわかる。

---

### 新しいディレクトリで作業する

ターミナルをもう1つ開いて `hotfix` ディレクトリに移動：

```bash
cd ../hotfix
git status
```

```
On branch main
nothing to commit, working tree clean
```

ここで修正してコミットする：

```bash
echo "fix" >> README.md
git add README.md
git commit -m "fix: READMEの誤字を修正"
```

元のディレクトリに戻れば `feature/login` の作業がそのまま残っている。

---

### 作業ツリーを削除する

ホットフィックスが終わったら後片付けをしよう：

```bash
git worktree remove ../hotfix
```

ディレクトリごと削除される。リポジトリ本体は無傷だ。

---

### worktree vs stash — どちらを使う？

| 状況 | おすすめ |
|---|---|
| ちょっと確認したい、すぐ戻る | `git stash`（[P1-024](../03-branching/07-stash.md)参照） |
| 並行して長時間作業したい | `git worktree` |
| 2つのブランチを同時にエディタで開きたい | `git worktree` |
| 別ブランチのファイルを参照したいだけ | `git worktree` |

stash はシンプルで素早い。worktree は「2つのブランチを同時に生きた状態で持ちたい」ときに輝く。

---

### 注意点

- 同じブランチを2つの worktree で同時にチェックアウトすることはできない。
- worktree のディレクトリを `rm -rf` で消した場合は `git worktree prune` で Git 側の記録を掃除しよう。

```bash
git worktree prune
```

## Summary

- `git worktree add <パス> <ブランチ>` で別ディレクトリに別ブランチをチェックアウトできる。
- `git worktree list` で現在の全作業ツリーを確認できる。
- `git worktree remove <パス>` で作業ツリーを削除する。
- stash はすばやいコンテキスト切り替えに、worktree は長時間の並行作業に向いている。

## Exercises

### ステップ 1: 練習用リポジトリを準備する

```bash
mkdir wt-practice
cd wt-practice
git init
echo "main content" > main.txt
git add main.txt
git commit -m "initial commit"

git checkout -b feature
echo "feature content" > feature.txt
git add feature.txt
git commit -m "feat: featureファイルを追加"
```

### ステップ 2: 別の worktree を追加する

```bash
git worktree add ../wt-main main
```

### ステップ 3: 一覧を確認する

```bash
git worktree list
```

2つのエントリが表示されることを確認しよう。

### ステップ 4: 別ディレクトリで作業する

```bash
cd ../wt-main
git status
ls
```

`main.txt` だけがあり `feature.txt` がないことを確認しよう。

```bash
echo "hotfix" >> main.txt
git add main.txt
git commit -m "fix: main.txtを修正"
git log --oneline
```

### ステップ 5: 元のディレクトリに戻る

```bash
cd ../wt-practice
git log --oneline
```

`feature` ブランチの状態がそのまま残っていることを確認しよう。

### ステップ 6: 後片付け

```bash
git worktree remove ../wt-main
git worktree list
```

### Reset & Retry

```bash
cd ..
rm -rf wt-practice wt-main
```

ステップ1から再挑戦しよう。

<!-- prev/next navigation -->
[< Previous: git rebase -i — コミット履歴を整理する](./07-rebase-interactive.md) | [Back to Index](../../../README.md) | [Next: コミットメッセージの書き方 — Conventional Commits >](./09-commit-conventions.md)
