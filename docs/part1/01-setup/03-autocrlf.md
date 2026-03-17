# 改行コードの設定をしよう

[< Previous: エディタの設定](02-gitconfig-editor.md) | [Back to Index](../../../README.md) | [Next: グローバル .gitignore の設定 >](04-excludesfile.md)

## What & Why

Windowsで書いたテキストファイルをMacやLinuxで開くと、文字化けしたように見えることがあります。  
原因のひとつが「改行コードの違い」です。  
Gitにはこの違いを自動で吸収してくれる `core.autocrlf` という設定があります。  
これを正しく設定しておくと、チームで開発するときのトラブルを防げます。

## Content

### シナリオ

友達とGitHubで共同作業をしていたら、こんなメッセージが出てきました。

```
warning: LF will be replaced by CRLF in hello.txt.
The file will have its original line endings in your working directory.
```

「LF？CRLF？」なんのことかわかりませんよね。改行コードの話です。

---

### 改行コードとは？

テキストファイルの中で「ここで改行する」という情報は、目に見えない特殊な文字で表されています。

| 名前 | 正式名称 | 使うOS |
|---|---|---|
| LF | Line Feed | Mac / Linux |
| CRLF | Carriage Return + Line Feed | Windows |

同じ「改行」でも、OSによって使う文字が違うんです。

---

### core.autocrlf の設定

**Windowsを使っている場合:**

```bash
git config --global core.autocrlf true
```

`true` にすると、こんな動きをします。

- コミット時: CRLF → LF に変換（リポジトリにはLFで保存）
- チェックアウト時: LF → CRLF に変換（手元ではCRLFで使える）

**MacやLinuxを使っている場合:**

```bash
git config --global core.autocrlf input
```

`input` にすると、コミット時にCRLFがあればLFに変換しますが、  
チェックアウト時は何もしません。

---

### 設定を確認する

```bash
git config --global core.autocrlf
```

Windowsなら `true`、MacやLinuxなら `input` と表示されれば成功です。

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
```

---

### なぜこの設定が大切なの？

チームで開発するとき、WindowsとMacが混在することはよくあります。  
改行コードをそろえておかないと、ファイルを変更していないのに差分が出てしまったり、  
コードレビューが読みにくくなったりします。  
`core.autocrlf` はそのトラブルを防ぐための設定です。

## Summary

- 改行コードはOSによって違う: WindowsはCRLF、Mac/LinuxはLF。
- `core.autocrlf true`（Windows）: コミット時にCRLF→LF、チェックアウト時にLF→CRLFへ変換。
- `core.autocrlf input`（Mac/Linux）: コミット時のみCRLF→LFへ変換。
- 設定しておくと、チームで作業するときの改行コードのトラブルを防げる。

## Exercises

### 演習1: 自分のOSに合った設定をしよう

1. 自分のOSを確認する（Windows / Mac / Linux）。

2. OSに合ったコマンドを実行する。

   **Windowsの場合:**

   ```bash
   git config --global core.autocrlf true
   ```

   **Mac / Linuxの場合:**

   ```bash
   git config --global core.autocrlf input
   ```

3. 設定を確認する。

   ```bash
   git config --global core.autocrlf
   ```

4. `cat ~/.gitconfig` で全体の設定を確認しよう。

   ```bash
   cat ~/.gitconfig
   ```

---

### Reset & Retry

設定をやり直すには同じコマンドをもう一度実行すれば上書きできます。

```bash
# Windowsの場合
git config --global core.autocrlf true

# Mac/Linuxの場合
git config --global core.autocrlf input
```

設定を削除したい場合：

```bash
git config --global --unset core.autocrlf
```

[< Previous: エディタの設定](02-gitconfig-editor.md) | [Back to Index](../../../README.md) | [Next: グローバル .gitignore の設定 >](04-excludesfile.md)
