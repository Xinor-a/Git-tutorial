# ステージングエリア

[< Previous: はじめてのファイル](04-first-file.md) | [Back to Index](../../../README.md) | [Next: はじめてのコミット >](06-first-commit.md)

## What & Why

`git add` でファイルをコミット前に「選ぶ」ことができる。これを**ステージング**と呼ぶ。「なぜ add してから commit するの？」という疑問を持った人も多いと思う。このページではその理由と、ステージングの仕組みをしっかり理解しよう。

## Content

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

### 今の状態を確認する

前のページで `README.md` と `entry-2024-01-01.md` を作った。`git status` で今の状態を見てみよう：

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

`Untracked files` というのは「git がまだ追跡していないファイル」のことだ。この状態ではコミットしても何も記録されない。`git add` でステージングエリアに追加してはじめて、コミットの対象になる。

---

### `git add` と `git diff`

`git add ファイル名` でファイルをステージングエリアに追加する。`git add .` を使うとカレントディレクトリ以下のすべての変更をまとめて追加できるが、意図しないファイルまで含まれることがあるので注意しよう。

ファイルを編集した後、`git add` する前に `git diff` で変更内容を確認できる。`+` が付いた行が追加された内容、`-` が削除された内容だ。`git add` する前にこのコマンドで変更を確認する習慣をつけると、うっかりミスを防げる。

> 💡 `git diff` は**ステージング前**の変更を表示する。`git add` した後の変更を確認したいときは `git diff --cached` を使う。

## Summary

- **ステージングエリア**は「次のコミットに含めるファイルを選ぶ場所」。
- `git add ファイル名` でファイルをステージングエリアに追加する。
- `git add .` でカレントディレクトリ以下のすべての変更をまとめて追加できる。
- `git status` でステージングの状態を確認できる（`Changes to be committed` に移動していれば OK）。
- `git diff` で `git add` する前の変更内容を確認できる。
- add してから commit する 2 ステップの仕組みは「どの変更をコミットに含めるか選べる」ことを実現するためにある。

## Exercises

### 演習 1: 現在の状態を確認する

まず今の状態を見てみよう：

<div class="code-input">

```bash
git status
```

</div>

<div class="code-output">

```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        README.md
        entry-2024-01-01.md

nothing added to commit but untracked files present (use "git add" to track)
```

</div>

2 つのファイルが `Untracked files` に入っている。これをステージングしていこう。

---

### 演習 2: README.md をステージングする

<div class="code-input">

```bash
git add README.md
```

</div>

何も表示されなければ成功。`git status` で状態が変わったことを確認しよう：

<div class="code-input">

```bash
git status
```

</div>

<div class="code-output">

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

</div>

`README.md` が `Changes to be committed` に移動した。`entry-2024-01-01.md` はまだ `Untracked files` のままだ。

---

### 演習 3: ファイルを編集して git diff を確認する

`entry-2024-01-01.md` に内容を書いてみよう：

<div class="code-input">

```bash
echo "今日から日記を始めました。" > entry-2024-01-01.md
```

</div>

`git add` する前に `git diff` で変更内容を確認しよう：

<div class="code-input">

```bash
git diff
```

</div>

<div class="code-output">

```diff
diff --git a/entry-2024-01-01.md b/entry-2024-01-01.md
--- a/entry-2024-01-01.md
+++ b/entry-2024-01-01.md
@@ -0,0 +1 @@
+今日から日記を始めました。
```

</div>

`+` が付いた行が追加された内容だ。確認できたら次へ。

---

### 演習 4: 残りのファイルもステージングする

<div class="code-input">

```bash
git add entry-2024-01-01.md
```

</div>

<div class="code-input">

```bash
git status
```

</div>

<div class="code-output">

```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   README.md
        new file:   entry-2024-01-01.md
```

</div>

両方が `Changes to be committed` に入った ✅ これでコミットの準備が整った。

---

### Reset & Retry

⚠️ うまくいかなかったときだけ実行してください。

<div class="code-input">

```bash
git rm --cached README.md
git rm --cached entry-2024-01-01.md
```

</div>

<div class="code-input">

```bash
git status
```

</div>

`Untracked files` に戻れば OK。演習 1 からもう一度やってみよう。

[< Previous: はじめてのファイル](04-first-file.md) | [Back to Index](../../../README.md) | [Next: はじめてのコミット >](06-first-commit.md)
