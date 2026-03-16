# はじめてのリポジトリ

[< Previous: Linuxコマンド入門](02-linux-commands.md) | [Back to Index](../../../README.md) | [Next: はじめてのファイル >](04-first-file.md)

## What & Why

Linux コマンドを覚えたところで、いよいよ git を使い始めよう。最初のステップは「リポジトリを作る」こと。`git init` を実行するだけで、フォルダが git の管理下に置かれる。これができれば、変更履歴を記録する準備が整う。

## Content

### シナリオ：日記アプリを作り始める

あなたはプログラミングの練習として、テキストファイルで日記を管理する小さなプロジェクトを始めることにした。名前は `my-diary`。さっそくフォルダを作って git で管理してみよう。

---

### フォルダを作って移動する

まずはプロジェクト用のフォルダを作る。ホームディレクトリにいることを確認してから始めよう。

```bash
cd ~
mkdir my-diary
cd my-diary
```

- `cd ~` でホームディレクトリに戻る
- `mkdir my-diary` で `my-diary` フォルダを作る
- `cd my-diary` でそのフォルダに移動する

今どこにいるか確認しよう：

```bash
pwd
```

```
/home/yourname/my-diary
```

---

### git リポジトリを初期化する — `git init`

フォルダの中に移動できたら、git に「このフォルダを管理してね」と伝える。

```bash
git init
```

こんなメッセージが表示されるはずだ：

```
Initialized empty Git repository in /home/yourname/my-diary/.git/
```

「空の git リポジトリを初期化しました」という意味。これだけで、`my-diary` は立派な git リポジトリになった。

---

### .git フォルダを確認する

`git init` が何をしたか確認してみよう。`ls` だけでは隠しフォルダは見えないので、`-a` オプションをつける：

```bash
ls -a
```

```
.  ..  .git
```

`.git` というフォルダが作られているのが見える。これが **git の頭脳**だ。コミットの履歴、設定、すべての変更記録がこのフォルダの中に保存されている。

> **注意**: `.git` フォルダの中身を直接触る必要はない。git コマンドが全部やってくれる。間違って消してしまうと履歴がすべてなくなってしまうので注意しよう。

---

### git の状態を確認する — `git status`

リポジトリを作ったら、まず `git status` を実行する癖をつけよう。これは「今 git がどんな状態か」を教えてくれるコマンドだ。

```bash
git status
```

```
On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

- `On branch main` — 今 `main` ブランチにいる（ブランチについては後のセクションで学ぶ）
- `No commits yet` — まだ一度もコミット（セーブ）していない
- `nothing to commit` — 記録するものが何もない（ファイルがないから当然）

これが出発点。次のページではファイルを追加してみよう。

## Summary

- `mkdir フォルダ名` でプロジェクト用フォルダを作り、`cd フォルダ名` で移動する。
- `git init` でフォルダを git リポジトリとして初期化する。
- `git init` を実行すると `.git` という隠しフォルダが作られる。これが git の管理データが入る場所。
- `git status` で現在のリポジトリの状態を確認できる。
- `.git` フォルダは直接触らない。

## Exercises

### 演習 1: リポジトリを作る

```bash
cd ~
mkdir my-diary
cd my-diary
git init
```

`Initialized empty Git repository in ...` と表示されれば成功。

### 演習 2: .git フォルダを確認する

```bash
ls -a
```

`.git` が表示されることを確認しよう。`ls`（`-a` なし）では表示されないことも確認してみよう：

```bash
ls
```

何も表示されない（または `.git` が見えない）はずだ。

### 演習 3: git status で状態を確認する

```bash
git status
```

`No commits yet` と `nothing to commit` が表示されることを確認しよう。これがリポジトリ作りたてのまっさらな状態だ。

### Reset & Retry

やり直したいときは、`my-diary` フォルダごと削除して最初からやり直せる：

```bash
cd ~
rm -rf my-diary
```

> `rm -rf` は削除したものを元に戻せない。パスをよく確認してから実行しよう。

削除後、演習 1 からもう一度やってみよう。

[< Previous: Linuxコマンド入門](02-linux-commands.md) | [Back to Index](../../../README.md) | [Next: はじめてのファイル >](04-first-file.md)
