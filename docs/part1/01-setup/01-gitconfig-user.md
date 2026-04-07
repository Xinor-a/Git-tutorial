# ユーザー名とメールアドレスを設定しよう

[< Previous: Gitをインストールしよう](../../part0/02-install/01-install-git.md) | [Back to Index](../../../README.md) | [Next: エディタの設定 >](02-gitconfig-editor.md)

## シナリオ

あなたはGitをインストールしたばかり。  
友達に「最初に名前とメールアドレスを登録しておかないとだめだよ」と言われました。  
さっそくターミナルを開いてやってみましょう。

## What & Why

Gitでコミット（変更の記録）を作るとき、「誰が作ったか」を一緒に記録します。  
そのために、最初に自分の名前とメールアドレスをGitに教えておく必要があります。  
この設定を済ませないと、コミットができません。

---

## Actions

### ユーザー名とメールアドレスを設定する

まずは、あなたのユーザー名を設定しましょう。  
`name` の部分を、設定したいユーザ名に置き換えて、ターミナルに以下のコマンドを実行してください。

```bash
git config --global user.name "name"
```

`--global` というオプションは「このパソコン全体に設定する」という意味です。  
つまり、一度やっておけば、このパソコン上ではいつでも同じユーザー名が適用されます。

同様に、次のコマンドであなたのメールアドレスも設定してみましょう。  
`name@example.com` の部分を、設定したいメールアドレスに置き換えてください。  
すでにGitHubを使っている場合は、GitHubに登録したメールアドレスと同じにしておくと便利です。  
分からなければ、適当なメールアドレスを設定しても大丈夫です。

```bash
git config --global user.email "name@example.com"
```

---

### 設定を確認する

設定後は `git config --global user.name` と `git config --global user.email` で確認できます。

```bash
git config --global user.name
```

あなたのユーザー名が表示されましたか？

次に、メールアドレスも確認してみましょう。

```bash
git config --global user.email
```

メールアドレスも表示されましたか？

うまく表示されていない場合は、[Reset & Retry](#reset--retry) を参考に、もう一度設定してみてください。

---

### 設定ファイルの中身を見てみよう

Gitの設定はファイルに保存されています。  
`cat ~/.gitconfig` で中身を確認できます。

```bash
cat ~/.gitconfig
```

```plaintext
[user]
  name = あなたのユーザー名
  email = あなたのメールアドレス
```

`~` はホームディレクトリ（自分の部屋みたいな場所）を表します。

- Windowsの場合は `C:\Users\あなたのユーザー名\` を指します。
- MacやLinuxの場合は `/home/あなたのユーザー名/` または `/Users/あなたのユーザー名/` を指します。

`~/.gitconfig` というのは、ホームディレクトリの中にある `.gitconfig` というファイルのことで、ここにさっき設定した内容が書かれているのがわかります。

---

## Summary

- `git config --global user.name "name"` で名前を設定する。
- `git config --global user.email "email@example.com"` でメールアドレスを設定する。
- `--global` オプションは、この設定をパソコン全体で使うことを意味する。
- パソコン全体の設定は `~/.gitconfig` というファイルに保存される。
  - `cat ~/.gitconfig` で現在の設定を確認できる。

---

### Reset & Retry

⚠️ うまくいかなかったときだけ実行してください。

設定を間違えた場合は、同じコマンドをもう一度打てば上書きできます。

<div class="code-input">

```bash
git config --global user.name "正しい名前"
git config --global user.email "正しい@example.com"
```

</div>

設定を削除したい場合はこちら：

<div class="code-input">

```bash
git config --global --unset user.name
git config --global --unset user.email
```

</div>

[< Previous: Gitをインストールしよう](../../part0/01-install/01-install-git.md) | [Back to Index](../../../README.md) | [Next: エディタの設定 >](02-gitconfig-editor.md)
