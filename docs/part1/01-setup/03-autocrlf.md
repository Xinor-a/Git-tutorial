# 改行コードの設定をしよう

[< Previous: エディタの設定](02-gitconfig-editor.md) | [Back to Index](../../../README.md) | [Next: グローバル .gitignore の設定 >](04-excludesfile.md)

## シナリオ

複数人でGitを使って共同作業をしているという友達の画面に、こんなメッセージが出てくることがあるそうです。

```plaintext
warning: LF will be replaced by CRLF in hello.txt.
The file will have its original line endings in your working directory.
```

「LF？CRLF？」なんのことかわかりませんよね。改行コードの話です。

## What & Why

Windowsで書いたテキストファイルをMacやLinuxで開くと、文字化けしたように見えることがあります。  
原因のひとつが「改行コードの違い」です。  
Gitにはこの違いを自動で吸収してくれる `core.autocrlf` という設定があります。  
これを正しく設定しておくと、チームで開発するときのトラブルを防げます。

---

### 改行コードとは？

テキストファイルの中で「ここで改行する」という情報は、目に見えない特殊な文字で表されています。

| 名前 | 正式名称 | 使うOS |
|---|---|---|
| `LF` | Line Feed | Mac / Linux |
| `CRLF` | Carriage Return + Line Feed | Windows |

同じ「改行」でも、OSによって使う文字が違うんです。  
あなたがWindowsを使っているなら、改行コードは`CRLF`になります。友達がMacを使っているなら、改行コードは`LF`になります。  
さっきのシナリオに出てきた警告は「Gitは`LF`を`CRLF`に変換するよ」という意味でした。

---

## Actions

### core.autocrlf の設定

#### Windowsを使っている場合

下記のコマンドで、Windowsに合った設定をします。

```bash
git config --global core.autocrlf true
```

`true` にすると、こんな動きをします。

- コミット時: `CRLF` → `LF` に変換（リポジトリには`LF`で保存）
- チェックアウト時: `LF` → `CRLF` に変換（手元では`CRLF`で使える）

#### MacやLinuxを使っている場合

下記のコマンドで、MacやLinuxに合った設定をします。

```bash
git config --global core.autocrlf input
```

`input` にすると、コミット時に`CRLF`があれば`LF`に変換しますが、
チェックアウト時は何もしません。

> コミットやチェックアウトの意味は後で説明しますが、今は「Gitが自動で改行コードを変換しながらコードを管理してくれる」ということを覚えておいてください。

---

### 設定を確認する

```bash
git config --global core.autocrlf
```

Windowsなら `true`、MacやLinuxなら `input` と表示されれば成功です。

もし表示されない場合は、[Reset & Retry](#reset--retry)を参考に、もう一度設定してみましょう。

`~/.gitconfig` の中身も確認してみましょう。

```bash
cat ~/.gitconfig
```

```plaintext
[user]
  name = あなたのユーザー名
  email = あなたのメールアドレス
[core]
  editor = code --wait
  autocrlf = true
```

---

### なぜこの設定が大切なの？

チームで開発するとき、WindowsとMacが混在することはよくあります。  
Gitはファイルの差分(変更前と変更後の異なる部分)を記録して、その履歴を基にコードを管理します。  
改行コードをそろえておかないと、ファイルを変更していないのに差分が出てしまったり、コードをレビュー(評価)するのが難しくなったりします。  
`core.autocrlf` はそのトラブルを防ぐための設定です。  
Git上での標準はLinuxやMacの`LF`です。特にWindowsユーザーは、標準に準拠するためにこの設定をしておくと安心です。

## Summary

- 改行コードはOSによって違う: Windowsは`CRLF`、Mac/Linuxは`LF`。
- `core.autocrlf true`（Windows）: コミット時に`CRLF`→`LF`、チェックアウト時に`LF`→`CRLF`へ変換。
- `core.autocrlf input`（Mac/Linux）: コミット時のみ`CRLF`→`LF`へ変換。
- 設定しておくと、チームで作業するときの改行コードのトラブルを防げる。

---

### Reset & Retry

⚠️ うまくいかなかったときだけ実行してください。

設定をやり直すには同じコマンドをもう一度実行すれば上書きできます。

<div class="code-input">

```bash
# Windowsの場合
git config --global core.autocrlf true

# Mac/Linuxの場合
git config --global core.autocrlf input
```

</div>

設定を削除したい場合：

<div class="code-input">

```bash
git config --global --unset core.autocrlf
```

</div>

[< Previous: エディタの設定](02-gitconfig-editor.md) | [Back to Index](../../../README.md) | [Next: グローバル .gitignore の設定 >](04-excludesfile.md)
