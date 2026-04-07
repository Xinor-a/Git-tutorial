# エディタを設定しよう（VSCode編）

[< Previous: ユーザー名とメールアドレスの設定](01-gitconfig-user.md) | [Back to Index](../../../README.md) | [Next: 改行コードの設定 >](03-autocrlf.md)

## What & Why

Gitはコミットメッセージを書くとき、テキストエディタを自動で開きます。  
デフォルトのエディタは `vim` や `nano` というツールで、初心者にはちょっと難しいです。  
ここでは使い慣れたVSCodeをGitのエディタとして設定します。

---

## Actions

### VSCodeのコマンドを使えるようにする

まず、ターミナルから `code` コマンドでVSCodeが開けるか確認します。  
下記のコマンドで、VSCodeのバージョンが表示されればOKです。

```bash
code --version
```

こんな感じで表示されます。

```plaintext
1.89.0
...
```

エラーまたは何も表示されない場合は、VSCodeを開いて `Ctrl+Shift+P`（MacはCmd+Shift+P）を押し、
`Shell Command: Install 'code' command in PATH` を実行してください。

---

### エディタを設定する

次のコマンドで、VSCodeをGitのデフォルトエディタに設定します。

```bash
git config --global core.editor "code --wait"
```

`--wait` というオプションは「VSCodeを閉じるまで待つ」という意味です。  
VSCodeにはこれがないと、Gitがエディタの起動を待たずに処理を続けてしまいます。

---

### 設定を確認する

```bash
git config --global core.editor
```

`code --wait` と表示されることを確認してください。

```plaintext
code --wait
```

表示されない場合は、[Reset & Retry](#reset--retry)を参考に、もう一度設定してみましょう。

ちなみに、`cat ~/.gitconfig` でも確認できます。

```bash
cat ~/.gitconfig
```

```
[user]
  name = あなたのユーザー名
  email = あなたのメールアドレス
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

---

## Summary

- `git config --global core.editor "code --wait"` でVSCodeをエディタに設定する。
- VSCodeには `--wait` オプションが必須。これがないとGitとVSCodeがうまく連携しない。
- `cat ~/.gitconfig` で設定を確認できる。
- vimが開いてしまったら `:q!` → `Enter` で脱出できる。

---

### Reset & Retry

⚠️ うまくいかなかったときだけ実行してください。

設定をやり直すには、同じコマンドをもう一度打てばOKです。

<div class="code-input">

```bash
git config --global core.editor "code --wait"
```

</div>

設定を削除したい場合：

<div class="code-input">

```bash
git config --global --unset core.editor
```

</div>

削除すると、Gitはデフォルトのエディタ（`vim` や `nano`）に戻ります。

[< Previous: ユーザー名とメールアドレスの設定](01-gitconfig-user.md) | [Back to Index](../../../README.md) | [Next: 改行コードの設定 >](03-autocrlf.md)
