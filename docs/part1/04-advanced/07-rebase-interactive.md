# git rebase -i — コミット履歴を整理する

<!-- prev/next navigation -->
[< Previous: git bisect — バグが入ったコミットを探す](./06-bisect.md) | [Back to Index](../../../README.md) | [Next: git worktree — 複数の作業ツリーを管理する >](./08-worktree.md)

## What & Why

コードを書いているとき、「wip」「typo fix」「ちょっと修正」みたいなコミットが増えていくことがある。それ自体は悪くないけど、プッシュ前に整理してひとつの綺麗なコミットにまとめたい——そんなときに `git rebase -i`（インタラクティブリベース）が役に立つ。

基本的なリベースは[P1-023で学んだ](../03-branching/08-rebase.md)。このページではその「インタラクティブモード」を掘り下げる。コミットを**まとめたり**、**メッセージを書き直したり**、**順番を変えたり**できる強力な道具だ。

## Content

### シナリオ 1: 3つの雑なコミットをひとつにまとめたい

feature ブランチで作業していて、こんな履歴になってしまった：

```bash
git log --oneline
```

```
f3c9a12 (HEAD -> feature) typo fix
d8e7b45 もう少し修正
a2f1c89 ログイン機能を追加
e4b3d67 (main) 前のコミット
```

`a2f1c89` から `f3c9a12` の3つをまとめてプッシュしたい。`HEAD~3` は「直近3つのコミット」という意味だ：

```bash
git rebase -i HEAD~3
```

エディタが開いて、こんな内容が表示される：

```
pick a2f1c89 ログイン機能を追加
pick d8e7b45 もう少し修正
pick f3c9a12 typo fix

# Rebase e4b3d67..f3c9a12 onto e4b3d67 (3 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup <commit> = like "squash", but discard this commit's log message
# d, drop <commit> = remove commit
```

上から古い順に並んでいる（`git log` とは逆順）。`#` の行はコメントで、使えるコマンドの一覧だ。

2つ目と3つ目の `pick` を `squash`（または `s`）に変える：

```
pick a2f1c89 ログイン機能を追加
squash d8e7b45 もう少し修正
squash f3c9a12 typo fix
```

保存してエディタを閉じると、次に「まとめたコミットのメッセージ」を入力するエディタが開く：

```
# This is a combination of 3 commits.
# This is the 1st commit message:

ログイン機能を追加

# This is the commit message #2:

もう少し修正

# This is the commit message #3:

typo fix
```

不要な行を消して、最終的なメッセージだけ残す：

```
feat: ログイン機能を追加
```

保存して閉じると完了。確認しよう：

```bash
git log --oneline
```

```
9a3f1b2 (HEAD -> feature) feat: ログイン機能を追加
e4b3d67 (main) 前のコミット
```

3つのコミットが1つのきれいなコミットにまとまった。

---

### シナリオ 2: 古いコミットメッセージを書き直したい

`reword`（または `r`）を使うと、コミットの内容はそのままでメッセージだけ書き直せる。

```bash
git rebase -i HEAD~3
```

```
reword a2f1c89 ログイン機能を追加
pick d8e7b45 もう少し修正
pick f3c9a12 typo fix
```

保存して閉じると、`reword` をつけたコミットのメッセージ編集画面が順番に開く。新しいメッセージを書いて保存すれば OK だ。

---

### ⚠️ 黄金律：プッシュ済みのコミットは rebase しない

インタラクティブリベースは**ローカルのコミット限定**で使う道具だ。

すでに `git push` した（チームのリポジトリに共有された）コミットを rebase すると、他の人の履歴と食い違いが生まれて大混乱になる。これはリベース全般のルールで、[P1-023](../03-branching/08-rebase.md)でも説明した通り。

**プッシュ前に整理する** ——これだけ守れば安全に使える。

---

### drop でコミットを丸ごと消す

コミット自体が不要になったときは `drop`（または `d`）を使う：

```
pick a2f1c89 ログイン機能を追加
drop d8e7b45 デバッグ用ログ（消し忘れ）
pick f3c9a12 typo fix
```

`drop` をつけたコミットの変更ごと削除される。慎重に使おう。

## Summary

- `git rebase -i HEAD~N` で直近N件のコミットをインタラクティブに編集できる。
- `squash` — コミットを前のコミットにまとめる（メッセージも合わせて編集できる）。
- `reword` — コミットの内容はそのままでメッセージだけ書き直す。
- `drop` — コミットを丸ごと削除する。
- コミット一覧は古い順（上が古い）で表示される。
- **プッシュ済みのコミットには絶対使わない。**

## Exercises

### ステップ 1: 練習用リポジトリを準備する

```bash
mkdir rebase-practice
cd rebase-practice
git init
echo "initial" > file.txt
git add file.txt
git commit -m "initial commit"
```

### ステップ 2: 雑なコミットを3つ積む

```bash
echo "feature" >> file.txt
git add file.txt
git commit -m "wip"

echo "more" >> file.txt
git add file.txt
git commit -m "fix"

echo "done" >> file.txt
git add file.txt
git commit -m "typo"
```

確認：

```bash
git log --oneline
```

```
xxxxxxx (HEAD -> main) typo
xxxxxxx fix
xxxxxxx wip
xxxxxxx initial commit
```

### ステップ 3: 3つをひとつにまとめる

```bash
git rebase -i HEAD~3
```

エディタで2行目・3行目の `pick` を `squash` に変えて保存。次のエディタでメッセージを `feat: ファイルに機能を追加` に書き換えて保存。

### ステップ 4: 結果を確認する

```bash
git log --oneline
```

```
xxxxxxx (HEAD -> main) feat: ファイルに機能を追加
xxxxxxx initial commit
```

3つのコミットが1つになっていることを確認しよう。

```bash
git diff HEAD~1
```

変更内容はすべて保持されていることも確認しよう。

### Reset & Retry

```bash
cd ..
rm -rf rebase-practice
```

ステップ1から再挑戦しよう。

<!-- prev/next navigation -->
[< Previous: git bisect — バグが入ったコミットを探す](./06-bisect.md) | [Back to Index](../../../README.md) | [Next: git worktree — 複数の作業ツリーを管理する >](./08-worktree.md)
