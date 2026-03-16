# エディタを設定しよう（VSCode編）

[< Previous: ユーザー名とメールアドレスの設定](01-gitconfig-user.md) | [Back to Index](../../../README.md) | [Next: 改行コードの設定 >](03-autocrlf.md)

## What & Why

Gitはコミットメッセージを書くとき、テキストエディタを自動で開きます。
デフォルトのエディタは `vim` というツールで、初心者にはちょっと難しいです。
ここでは使い慣れたVSCodeをGitのエディタとして設定します。

## Content

### シナリオ

前のページで名前とメールアドレスを設定しました。
次は「コミットメッセージを書くとき、どのエディタを使うか」を設定します。
設定しておかないと、Gitが `vim` を開いてしまい、「終了できない！」と焦ることになります。

---

### VSCodeのコマンドを使えるようにする

まず、ターミナルから `code` コマンドでVSCodeが開けるか確認します。

```bash
code --version
```

こんな感じで表示されれば大丈夫です。

```
1.89.0
...
```

何も表示されない場合は、VSCodeを開いて `Ctrl+Shift+P`（MacはCmd+Shift+P）を押し、
`Shell Command: Install 'code' command in PATH` を実行してください。

---

### エディタを設定する

VSCodeをGitのデフォルトエディタに設定します。

```bash
git config --global core.editor "code --wait"
```

`--wait` というオプションは「VSCodeを閉じるまで待つ」という意味です。
これがないと、Gitがエディタの起動を待たずに処理を続けてしまいます。

---

### 設定を確認する

```bash
git config --global core.editor
```

```
code --wait
```

`cat ~/.gitconfig` でも確認できます。

```bash
cat ~/.gitconfig
```

```
[user]
	name = 田中 太郎
	email = taro@example.com
[core]
	editor = code --wait
```

`[core]` セクションに `editor = code --wait` が追加されています。

---

### vimが開いてしまったときの脱出方法

もし設定前にGitがvimを開いてしまったら、以下の手順で脱出できます。

1. `Esc` キーを押す
2. `:q!` と入力する（コロン・q・エクスクラメーション）
3. `Enter` を押す

これでvimを終了できます。覚えておくと安心です。

## Summary

- `git config --global core.editor "code --wait"` でVSCodeをエディタに設定する。
- `--wait` オプションは必須。これがないとGitとVSCodeがうまく連携しない。
- `cat ~/.gitconfig` で設定を確認できる。
- vimが開いてしまったら `:q!` → `Enter` で脱出できる。

## Exercises

### 演習1: エディタを設定してみよう

1. VSCodeの `code` コマンドが使えるか確認する。

   ```bash
   code --version
   ```

2. エディタを設定する。

   ```bash
   git config --global core.editor "code --wait"
   ```

3. 設定を確認する。

   ```bash
   git config --global core.editor
   ```

   `code --wait` と表示されることを確認しよう。

4. `cat ~/.gitconfig` で全体の設定を見てみよう。

   ```bash
   cat ~/.gitconfig
   ```

---

### Reset & Retry

設定をやり直すには、同じコマンドをもう一度打てばOKです。

```bash
git config --global core.editor "code --wait"
```

設定を削除したい場合：

```bash
git config --global --unset core.editor
```

削除すると、Gitはデフォルトのエディタ（`vim` や `nano`）に戻ります。

[< Previous: ユーザー名とメールアドレスの設定](01-gitconfig-user.md) | [Back to Index](../../../README.md) | [Next: 改行コードの設定 >](03-autocrlf.md)
