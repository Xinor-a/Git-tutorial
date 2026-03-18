# safe.directory を設定しよう（WSL環境のハマりポイント）

[< Previous: ターミナルの色を設定しよう](06-color-ui.md) | [Back to Index](../../../README.md) | [Next: 設定を確認しよう >](08-exercise-verify-gitconfig.md)

## What & Why

WSL（Windows Subsystem for Linux）を使っていると、  
Windowsのファイルシステム上（`/mnt/c/...`）にリポジトリを作ったとき、  
Gitが突然エラーを出すことがあります。  
これはGitのセキュリティ設定が原因です。このページではその原因と解決方法を説明します。

## Content

### シナリオ

セットアップが終わったと思ったら、いざリポジトリを作ろうとしたときに見知らぬエラーが出た…  
WSL環境ではよくあるハマりポイントです。

---

### こんなエラーが出たら

`/mnt/c/` 以下のディレクトリで `git` コマンドを実行すると、こんなエラーが出ることがあります。

```
fatal: detected dubious ownership in repository at '/mnt/c/projects/myapp'
To add an exception for this directory, call:

	git config --global --add safe.directory /mnt/c/projects/myapp
```

「**dubious ownership**（怪しいオーナー）」というのは、  
「このディレクトリの所有者が今のユーザーと違う」とGitが判断しているサインです。

---

### なぜこうなるの？

WSLのLinux環境からWindowsのファイルシステム（`/mnt/c/` 以下）を見ると、  
ファイルの「所有者情報」がLinux側のユーザーと一致しないことがあります。  
Git 2.35.2 以降、セキュリティ強化のためにこのチェックが追加されました。

---

### 解決方法

**方法1: 特定のディレクトリだけ許可する**

エラーメッセージにも書いてありますが、対象ディレクトリを個別に許可できます。

```bash
git config --global --add safe.directory /mnt/c/projects/myapp
```

ただし、プロジェクトが増えるたびに毎回設定するのは面倒です。

**方法2: /mnt/c/ 以下すべて許可する（おすすめ）**

WSL環境でWindowsのドライブ上のすべてのディレクトリを許可するには、ワイルドカードを使います。

```bash
git config --global --add safe.directory '*'
```

> **注意**: `'*'` はすべてのディレクトリを許可します。  
> 自分だけが使うパソコンであれば問題ありませんが、  
> 共有環境での使用には向いていません。

---

### 設定を確認する

```bash
git config --global --get-all safe.directory
```

```
*
```

`*` が表示されれば設定完了です。

---

### .gitconfig の確認

```bash
cat ~/.gitconfig
```

```
[user]
	name = 田中 太郎
	email = taro@example.com
[core]
	editor = code --wait
	autocrlf = true
	excludesfile = /home/yourname/.gitignore_global
[pull]
	rebase = false
[init]
	defaultBranch = main
[color]
	ui = auto
[safe]
	directory = *
```

`[safe]` セクションが追加されていれば成功です。

---

### WSLを使っていない人は？

WindowsのGit（Git for Windows）を直接使っている場合や、  
macOS・Linux上で作業している場合は、このエラーは通常出ません。  
このページの設定はスキップしても大丈夫です。

## Summary

- WSL + Windowsファイルシステム（`/mnt/c/`）の組み合わせでGitエラーが出ることがある。
- 原因はGitのセキュリティ機能がファイルの所有者を疑うため。
- `git config --global --add safe.directory '*'` で解決できる。
- WSLを使っていない環境では不要な設定。

## Exercises

### 演習1: safe.directory を設定しよう（WSL環境の人）

1. ワイルドカードで設定する。

   ```bash
   git config --global --add safe.directory '*'
   ```

2. 設定を確認する。

   ```bash
   git config --global --get-all safe.directory
   ```

3. `cat ~/.gitconfig` で `[safe]` セクションが追加されたことを確認しよう。

   ```bash
   cat ~/.gitconfig
   ```

---

### Reset & Retry

設定を削除して最初からやり直すには：

```bash
git config --global --unset-all safe.directory
```

その後、改めて設定する：

```bash
git config --global --add safe.directory '*'
```

[< Previous: ターミナルの色を設定しよう](06-color-ui.md) | [Back to Index](../../../README.md) | [Next: 設定を確認しよう >](08-exercise-verify-gitconfig.md)
