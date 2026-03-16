# ステージングエリア

[< Previous: はじめてのファイル](04-first-file.md) | [Back to Index](../../../README.md) | [Next: はじめてのコミット >](06-first-commit.md)

## What & Why

`git add` でファイルをコミット前に「選ぶ」ことができる。これを**ステージング**と呼ぶ。「なぜ add してから commit するの？」という疑問を持った人も多いと思う。このページではその理由と、ステージングの仕組みをしっかり理解しよう。

## Content

### シナリオ：日記ファイルを記録する準備をする

前のページで `README.md` と `entry-2024-01-01.md` を作った。今の状態を確認しよう：

```bash
git status
```

```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        README.md
        entry-2024-01-01.md

nothing added to commit but untracked files present (use "git add" to track)
```

2 つのファイルが `Untracked files` に入っている。これをコミット（記録）したい。でもその前に「ステージング」という考え方を理解しよう。

---

### なぜ add が必要なのか — ステージングの概念

git のコミットは「今この瞬間のスナップショット（写真）」だと考えてほしい。

写真を撮るとき、**「誰を写真に入れるか」を先に決める**よね。全員を入れることもできるし、一部の人だけを入れることもできる。

git の `add` はまさにこれだ。

```
作業中のファイルたち         ステージングエリア        コミット（記録）
（まだ未整理の状態）     →  （写真に入れる人を選ぶ）  →  （シャッターを押す）
  README.md                  README.md ✓
  entry-2024-01-01.md        entry-2024-01-01.md ✓
  途中のメモ.txt              （選ばなかった）
```

**ステージングエリア**は「次のコミットに含めるファイルを一時的に置く場所」だ。`git add` でファイルをステージングエリアに移し、`git commit` でステージングエリアの内容を記録する。

この仕組みのおかげで、「たくさん変更したうちの一部だけを今回のコミットに含める」という細かいコントロールができる。

---

### ファイルをステージングする — `git add`

`README.md` をステージングしてみよう：

```bash
git add README.md
```

何も表示されなければ成功（エラーがなければ OK）。続けて `git status` で確認する：

```bash
git status
```

```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   README.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        entry-2024-01-01.md
```

出力が変わった。`README.md` が `Changes to be committed`（コミットされる予定の変更）に移動している。`entry-2024-01-01.md` はまだ `Untracked files` のままだ。

---

### 残りのファイルもステージングする

もうひとつのファイルも追加しよう：

```bash
git add entry-2024-01-01.md
git status
```

```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   README.md
        new file:   entry-2024-01-01.md
```

両方が `Changes to be committed` に入った。これでコミットの準備が整った。

> **すべてのファイルをまとめて追加したいとき**は `git add .`（ドット）が使える。カレントディレクトリ以下のすべての変更をステージングする。ただし、意図しないファイルまで追加することがあるので注意しよう。

---

### コミット前に変更内容を確認する — `git diff`

ファイルの中身を変えた場合、`git add` する前に「何を変えたか」を確認できる。試してみよう。

`README.md` に少し内容を書き加えてみる（エディタで開いて編集してもよいし、以下のコマンドでも OK）：

```bash
echo "# My Diary" > README.md
```

この状態で `git diff` を実行する：

```bash
git diff
```

```diff
diff --git a/README.md b/README.md
index e69de29..8f2de6b 100644
--- a/README.md
+++ b/README.md
@@ -0,0 +1 @@
+# My Diary
```

`+` が付いている行が「追加された内容」だ。`git add` する前にこのコマンドで変更内容を確認する習慣をつけると、うっかりミスを防げる。

> **注意**: `git diff` は**ステージング前**の変更を表示する。`git add` した後の変更を確認したいときは `git diff --cached` を使う。

確認したら、改めてステージングしよう：

```bash
git add README.md
git status
```

```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   README.md
        new file:   entry-2024-01-01.md
```

両方がステージングエリアに入った。次のページでいよいよコミットする。

## Summary

- **ステージングエリア**は「次のコミットに含めるファイルを選ぶ場所」。
- `git add ファイル名` でファイルをステージングエリアに追加する。
- `git add .` でカレントディレクトリ以下のすべての変更をまとめて追加できる。
- ステージング後、`git status` で `Changes to be committed` に移動していることを確認できる。
- `git diff` で `git add` する前の変更内容を確認できる。
- add してから commit する 2 ステップの仕組みは「どの変更をコミットに含めるか選べる」ことを実現するためにある。

## Exercises

### 演習 1: README.md をステージングして確認する

```bash
git add README.md
git status
```

`README.md` が `Changes to be committed` に移動していることを確認しよう。

### 演習 2: git diff で変更を確認する

`entry-2024-01-01.md` に内容を書いてから `git diff` を確認してみよう：

```bash
echo "今日から日記を始めました。" > entry-2024-01-01.md
git diff
```

変更内容が `+` 付きで表示されることを確認しよう。

### 演習 3: 残りのファイルもステージングする

```bash
git add entry-2024-01-01.md
git status
```

`Untracked files` が空になり、すべてが `Changes to be committed` に入ることを確認しよう。

### Reset & Retry

ステージングをやり直したいときは `git rm --cached` でステージングを取り消せる：

```bash
git rm --cached README.md
git rm --cached entry-2024-01-01.md
git status
```

`Untracked files` に戻れば OK。演習 1 からもう一度やってみよう。

[< Previous: はじめてのファイル](04-first-file.md) | [Back to Index](../../../README.md) | [Next: はじめてのコミット >](06-first-commit.md)
