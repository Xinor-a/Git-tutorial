# ターミナルの色を設定しよう

[< Previous: pull.rebase と init.defaultBranch の設定](05-pull-rebase-defaultbranch.md) | [Back to Index](../../../README.md) | [Next: safe.directory の設定 >](07-safe-directory.md)

## What & Why

Gitの出力はデフォルトでもカラー表示されることが多いですが、
`color.ui auto` を明示的に設定しておくと、
ターミナル上ではカラー、ファイルへのリダイレクト時は自動でカラーなしに切り替わります。

## Content

### シナリオ

`git diff` や `git status` の出力をはじめて見たとき、
「全部同じ色で読みにくい…」と思ったことはありませんか？

`color.ui auto` を設定すると、追加行が緑、削除行が赤など、
パッと見てわかりやすい出力になります。

---

### color.ui auto を設定する

`git config --global color.ui auto` で設定します。

`auto` は「ターミナルに出力するときは色をつける、ファイルに書き出すときは色なし」という設定です。

確認してみましょう。

```bash
git config --global color.ui
```

```
auto
```

---

### 設定するとどう変わる？

設定後に `git diff` を実行すると、こんな感じの色付き出力になります。

```
diff --git a/hello.txt b/hello.txt
index 1234567..abcdefg 100644
--- a/hello.txt
+++ b/hello.txt
@@ -1 +1 @@
-こんにちは
+Hello
```

実際のターミナルでは、`-` で始まる行（削除）が赤、`+` で始まる行（追加）が緑で表示されます。
どこが変わったか一目でわかるようになるので、作業がずっと楽になります。

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
```

`[color]` セクションが追加されていれば成功です。

## Summary

- `color.ui auto` を設定するとターミナルの出力が色付きになる。
- 追加行は緑、削除行は赤で表示されるので変更箇所がわかりやすい。
- `auto` はターミナル向けにだけ色をつける賢い設定。

## Exercises

### 演習1: color.ui を設定しよう

1. `color.ui` を設定する。

<div class="code-input">

```bash
git config --global color.ui auto
```

</div>

2. 設定を確認する。

<div class="code-input">

```bash
git config --global color.ui
```

</div>

<div class="code-output">

```
auto
```

</div>

3. `cat ~/.gitconfig` で `[color]` セクションが追加されたことを確認しよう。

<div class="code-input">

```bash
cat ~/.gitconfig
```

</div>

<div class="code-output">

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
```

</div>

---

### Reset & Retry

⚠️ うまくいかなかったときだけ実行してください。

<div class="code-input">

```bash
git config --global color.ui auto
```

</div>

設定を削除したい場合：

<div class="code-input">

```bash
git config --global --unset color.ui
```

</div>

[< Previous: pull.rebase と init.defaultBranch の設定](05-pull-rebase-defaultbranch.md) | [Back to Index](../../../README.md) | [Next: safe.directory の設定 >](07-safe-directory.md)
