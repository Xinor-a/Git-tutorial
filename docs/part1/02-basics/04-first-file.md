# はじめてのファイル

[< Previous: はじめてのリポジトリ](03-first-repo.md) | [Back to Index](../../../README.md) | [Next: ステージングエリア >](05-staging.md)

## What & Why

リポジトリができた。次はファイルを作って、git がどう反応するか見てみよう。`git status` を使うと「git から見た今の状況」がわかる。ここでは `git status` の出力を丁寧に読み解くことで、git がファイルをどう認識しているかを理解しよう。

## Content

### シナリオ：最初の日記ファイルを作る

`my-diary` プロジェクトで最初のファイルを作ってみよう。今いる場所を確認してから始める。

```bash
pwd
```

```
/home/yourname/my-diary
```

`my-diary` の中にいることを確認できたら OK。もし違う場所にいたら `cd ~/my-diary` で移動しよう。

---

### ファイルを作る — `touch`

日記の README ファイルを作ってみよう。

```bash
touch README.md
```

ファイルが作られたか確認する：

```bash
ls
```

```
README.md
```

`README.md` が表示されれば成功。ファイルは作れた。でも git はこれをどう見ているだろう？

---

### git の目でファイルを見る — `git status`

```bash
git status
```

```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        README.md

nothing added to commit but untracked files present (use "git add" to track)
```

前のページとは違う出力になった。ひとつひとつ読み解いてみよう。

---

### "Untracked files" って何？

`Untracked files` というのは「**git がまだ追跡していないファイル**」のことだ。

フォルダの中にファイルを置いただけでは、git は自動的に記録してくれない。「このファイルを管理してね」と明示的に伝える必要がある。

イメージとしてはこうだ：

> 新しいアルバムを買ってきた。でも棚に置いただけでは、「どのアルバムを持っているか」のリストには載らない。リストに追加しないと管理されない。

`README.md` は今の状態では「git の棚の外に置いてあるだけ」の状態だ。git に追跡してもらうには `git add` が必要だが、それは次のページで学ぶ。

---

### メッセージをよく読もう

`git status` の出力には、次のアクションのヒントも書いてある：

```
(use "git add <file>..." to include in what will be committed)
```

「コミットに含めるには `git add <ファイル名>` を使ってください」と教えてくれている。git はこうしたヒントをたくさん出してくれる。困ったときはまず `git status` を実行してみよう。

---

### もうひとつファイルを追加してみる

追跡されていないファイルが増えるとどうなるか試してみよう。

```bash
touch entry-2024-01-01.md
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

`Untracked files` のリストに両方のファイルが並んだ。どちらも「まだ git に追跡されていない」状態だ。

## Summary

- `touch ファイル名` で空のファイルを作れる。
- ファイルを作っただけでは git は自動で追跡してくれない。
- `git status` で「git から見た今の状態」を確認できる。
- `Untracked files` は「git がまだ追跡していないファイル」のこと。
- `git status` の出力にはヒントが書いてある。困ったらまず `git status`。

## Exercises

### 演習 1: ファイルを作って git status を確認する

`my-diary` フォルダの中にいることを確認してから：

```bash
touch README.md
git status
```

`Untracked files` に `README.md` が表示されることを確認しよう。

### 演習 2: もうひとつファイルを追加する

```bash
touch entry-2024-01-01.md
git status
```

`Untracked files` に 2 つのファイルが並ぶことを確認しよう。

### 演習 3: ファイルの内容を確認する

```bash
cat README.md
```

何も表示されない（空のファイルなので正常）。

### Reset & Retry

作ったファイルを削除してやり直す：

```bash
rm README.md entry-2024-01-01.md
git status
```

`nothing to commit` に戻れば OK。演習 1 からもう一度やってみよう。

[< Previous: はじめてのリポジトリ](03-first-repo.md) | [Back to Index](../../../README.md) | [Next: ステージングエリア >](05-staging.md)
