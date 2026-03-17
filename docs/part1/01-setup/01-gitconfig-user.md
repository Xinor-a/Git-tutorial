# ユーザー名とメールアドレスを設定しよう

[Back to Index](../../../README.md) | [Next: エディタの設定 >](02-gitconfig-editor.md)

## What & Why

Gitでコミット（変更の記録）を作るとき、「誰が作ったか」を一緒に記録します。  
そのために、最初に自分の名前とメールアドレスをGitに教えておく必要があります。  
この設定を済ませないと、コミットができません。

## Content

### シナリオ

あなたはGitをインストールしたばかり。  
友達に「最初に名前とメールアドレスを登録しておかないとだめだよ」と言われました。  
さっそくターミナルを開いてやってみましょう。

---

### ユーザー名を設定する

ターミナルで以下のコマンドを打ってください。  
`"田中 太郎"` の部分は、あなたの名前に変えてください。

```bash
git config --global user.name "田中 太郎"
```

`--global` というオプションは「このパソコン全体に設定する」という意味です。  
一度やっておけば、どのプロジェクトでも同じ名前が使われます。

---

### メールアドレスを設定する

次に、メールアドレスを設定します。

```bash
git config --global user.email "taro@example.com"
```

GitHubを使う場合は、GitHubに登録したメールアドレスと同じにしておくと便利です。

---

### 設定を確認する

ちゃんと設定できたか確認してみましょう。

```bash
git config --global user.name
```

```
田中 太郎
```

```bash
git config --global user.email
```

```
taro@example.com
```

名前とメールアドレスが表示されれば成功です！

---

### 設定ファイルの中身を見てみよう

Gitの設定はファイルに保存されています。  
こんなコマンドで中身を確認できます。

```bash
cat ~/.gitconfig
```

```
[user]
	name = 田中 太郎
	email = taro@example.com
```

`~` はホームディレクトリ（自分の部屋みたいな場所）を表します。  
`.gitconfig` というファイルに、さっき設定した内容が書かれているのがわかります。

## Summary

- `git config --global user.name "名前"` で名前を設定する。
- `git config --global user.email "メールアドレス"` でメールアドレスを設定する。
- `--global` をつけると、パソコン全体で使われる設定になる。
- 設定は `~/.gitconfig` というファイルに保存される。
- `cat ~/.gitconfig` で現在の設定を確認できる。

## Exercises

### 演習1: 自分の情報を設定してみよう

1. ターミナルを開く。
2. 自分の名前を設定する。

   ```bash
   git config --global user.name "あなたの名前"
   ```

3. 自分のメールアドレスを設定する。

   ```bash
   git config --global user.email "あなた@example.com"
   ```

4. 設定を確認する。

   ```bash
   git config --global user.name
   git config --global user.email
   ```

5. ファイルの中身を見る。

   ```bash
   cat ~/.gitconfig
   ```

   `[user]` セクションに名前とメールアドレスが表示されることを確認しよう。

---

### Reset & Retry

設定を間違えた場合は、同じコマンドをもう一度打てば上書きできます。

```bash
git config --global user.name "正しい名前"
git config --global user.email "正しい@example.com"
```

設定を削除したい場合はこちら：

```bash
git config --global --unset user.name
git config --global --unset user.email
```

[Back to Index](../../../README.md) | [Next: エディタの設定 >](02-gitconfig-editor.md)
