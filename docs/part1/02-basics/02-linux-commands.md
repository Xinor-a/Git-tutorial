# Linuxコマンド入門

[< Previous: gitって何だろう？](01-what-is-git.md) | [Back to Index](../../../README.md) | [Next: はじめてのリポジトリ >](03-first-repo.md)

## What & Why

git はターミナル（黒い画面）で使うことが多い。そのためには、ファイルやフォルダを操作する基本的な Linux コマンドを知っておく必要がある。次のページでは実際にフォルダを作って git を使い始めるので、ここでしっかり予習しよう。

## Content

### ターミナルとは

ターミナルは、文字を打ち込んでコンピュータを操作する画面だ。マウスで操作するウィンドウと違い、コマンドを入力することで動く。

最初は慣れないかもしれないけど、すぐに慣れる。そしてコマンドを使いこなせると、コンピュータを扱う速度がぐっと上がる。

---

### 今いる場所を確認する — `pwd`

ターミナルを開いたとき、自分が「どのフォルダにいるか」をまず確認しよう。

```bash
pwd
```

実行すると、こんなふうに表示される：

```
/home/yourname
```

これは「今、`/home/yourname` というフォルダの中にいる」という意味だ。`pwd` は "Print Working Directory"（現在のフォルダを表示）の略。

---

### フォルダの中身を見る — `ls`

今いるフォルダの中に何があるか確認するコマンド。

```bash
ls
```

出力例：

```
Desktop  Documents  Downloads  Music  Pictures
```

`-l` をつけると、詳細情報（サイズや日付）も表示される：

```bash
ls -l
```

---

### フォルダを作る — `mkdir`

新しいフォルダを作るときに使う。`mkdir` は "Make Directory"（フォルダを作る）の略。

```bash
mkdir my-project
```

これで `my-project` というフォルダが作られる。確認してみよう：

```bash
ls
```

`my-project` が増えていれば成功だ。

---

### フォルダを移動する — `cd`

別のフォルダに移動するコマンド。`cd` は "Change Directory"（フォルダを移動）の略。

```bash
cd my-project
```

移動したら、今どこにいるか確認しよう：

```bash
pwd
```

```
/home/yourname/my-project
```

1つ上のフォルダに戻るときは `..` を使う：

```bash
cd ..
```

---

### ファイルを作る — `touch`

空のファイルを作るコマンド。

```bash
touch hello.txt
```

確認：

```bash
ls
```

`hello.txt` が増えていれば成功。

---

### ファイルの中身を見る — `cat`

テキストファイルの内容をターミナルに表示する。

```bash
cat hello.txt
```

`hello.txt` が空なので何も表示されないが、エラーにはならない。中身があるファイルで試してみよう：

```bash
cat ~/.gitconfig
```

setup セクションで設定した gitconfig の内容が表示されるはずだ。

---

### コマンドのまとめ

| コマンド | 意味 | 使い方 |
|---------|------|--------|
| `pwd` | 今いるフォルダを表示 | `pwd` |
| `ls` | フォルダの中身を表示 | `ls` / `ls -l` |
| `mkdir` | フォルダを作る | `mkdir フォルダ名` |
| `cd` | フォルダを移動する | `cd フォルダ名` / `cd ..` |
| `touch` | ファイルを作る | `touch ファイル名` |
| `cat` | ファイルの中身を表示 | `cat ファイル名` |

---

### 次のページで使うコマンド

次のページでは `mkdir` と `cd` を使って新しいプロジェクトフォルダを作り、そこに git を設定する（`git init`）。ここで学んだコマンドがすぐ活躍する。

## Summary

- `pwd` で今いるフォルダを確認できる。
- `ls` でフォルダの中身を確認できる。
- `mkdir フォルダ名` で新しいフォルダを作れる。
- `cd フォルダ名` でフォルダを移動できる。`cd ..` で1つ上に戻る。
- `touch ファイル名` で空のファイルを作れる。
- `cat ファイル名` でファイルの中身を表示できる。

## Exercises

### 演習 1: 今いる場所を確認する

```bash
pwd
```

ホームディレクトリ（例：`/home/yourname`）が表示されることを確認しよう。

### 演習 2: フォルダを作って移動する

```bash
mkdir linux-practice
cd linux-practice
pwd
```

`pwd` で `linux-practice` の中にいることを確認しよう。

### 演習 3: ファイルを作って確認する

```bash
touch memo.txt
ls
```

`memo.txt` が表示されれば成功。

### 演習 4: 1つ上に戻って、フォルダが作られたか確認する

```bash
cd ..
ls
```

`linux-practice` フォルダが表示されることを確認しよう。

### 演習 5: gitconfig の中身を見てみる

```bash
cat ~/.gitconfig
```

setup セクションで設定した内容（`name`、`email`、`editor` など）が表示されることを確認しよう。

### Reset & Retry

演習で作ったフォルダとファイルをすべて削除してやり直したいときは：

```bash
cd ~
rm -rf linux-practice
```

> `rm -rf` は削除したファイルを元に戻せないので、対象のパスをよく確認してから実行しよう。

削除後、演習 1 からもう一度やってみよう。

[< Previous: gitって何だろう？](01-what-is-git.md) | [Back to Index](../../../README.md) | [Next: はじめてのリポジトリ >](03-first-repo.md)
