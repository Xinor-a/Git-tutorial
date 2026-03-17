# SSH鍵を設定しよう

<!-- prev/next navigation -->
[< Previous: GitHubアカウントを作ろう](03-account-setup.md) | [Back to Index](../../../README.md) | [Next: フォークしよう >](../02-collaboration/01-fork.md)

## What & Why

GitHubとローカルリポジトリを同期するとき、GitHubはあなたが「本当に本人か」を確認する必要がある。
その認証方法のひとつが **SSH（エスエスエイチ）鍵**だよ。
一度設定しておけば、毎回パスワードを入力せずにpush/pullできるようになる。

## Content

### 認証方法は2種類ある

GitHubとやりとりするための認証方法は、大きく2つある。

- **HTTPS** — URLが `https://github.com/...` の形式。
  操作のたびにユーザー名とトークンを入力（または保存）する必要がある。
- **SSH** — URLが `git@github.com:...` の形式。
  秘密鍵と公開鍵のペアで認証する。一度設定すればパスワード不要。

どちらでも動くけど、**SSHのほうが日常的に使いやすい**のでここではSSHを設定する。

### SSHの鍵ペアとは

SSHでは**鍵ペア**と呼ばれる2つのファイルを使う。

- **秘密鍵（private key）** — あなただけが持つ鍵。絶対に外に出してはいけない。
- **公開鍵（public key）** — GitHubに登録する鍵。外に出しても問題ない。

> 南京錠（公開鍵）と鍵（秘密鍵）のセットのようなイメージ。
> 南京錠はGitHubに渡して「かけておいて」と頼む。
> 鍵はあなただけが持っていて、南京錠を開けられるのはあなただけ。

### Step 1: SSH鍵を生成する

ターミナルで次のコマンドを実行しよう。
`your@email.com` の部分は、GitHubに登録したメールアドレスに置き換えてね。

```bash
ssh-keygen -t ed25519 -C "your@email.com"
```

実行すると、いくつか質問される：

```text
Enter file in which to save the key (/home/あなた/.ssh/id_ed25519):
```

保存先を聞かれる。そのままEnterを押してデフォルトの場所に保存しよう。

```text
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```

パスフレーズを設定できる（任意）。
設定すると秘密鍵を使うたびにパスフレーズの入力が必要になる（セキュリティが高まる）。
学習用途なら空のままEnterでもOK。

生成が完了すると、こんなメッセージが表示される：

```text
Your identification has been saved in /home/あなた/.ssh/id_ed25519
Your public key has been saved in /home/あなた/.ssh/id_ed25519.pub
The key fingerprint is:
SHA256:xxxxxxxxxxxxxxxxxxxx your@email.com
```

### Step 2: 鍵ファイルを確認する

生成された鍵ファイルを確認してみよう。

```bash
ls ~/.ssh/
```

```text
id_ed25519    id_ed25519.pub
```

- `id_ed25519` — 秘密鍵。**このファイルの中身は絶対に誰にも見せないこと。**
- `id_ed25519.pub` — 公開鍵。GitHubに登録するのはこちら。

### Step 3: 公開鍵の中身をコピーする

次のコマンドで公開鍵の中身を表示する：

```bash
cat ~/.ssh/id_ed25519.pub
```

こんな形式の文字列が表示される：

```text
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIxxxxxxxxxxxxxxxxxxxxxxxx your@email.com
```

この**全体をコピー**しておこう（`ssh-ed25519` から始まってメールアドレスで終わる1行全部）。

### Step 4: GitHubに公開鍵を登録する

1. GitHubにログインして、右上のアイコンをクリック → **Settings** を開く。
2. 左側のメニューから **SSH and GPG keys** を選ぶ。
3. 右上の **New SSH key** ボタンをクリック。
4. 設定画面で次のように入力する：
   - **Title** — わかりやすい名前（例：`My Laptop`、`WSL Ubuntu`）。どのPCの鍵かがわかればOK。
   - **Key type** — `Authentication Key` のまま。
   - **Key** — 先ほどコピーした公開鍵をペースト。
5. **Add SSH key** ボタンをクリック。

GitHubのパスワードを再確認されることがある。入力して進もう。

### Step 5: 接続を確認する

設定が正しいか確認するために、次のコマンドを実行してみよう：

```bash
ssh -T git@github.com
```

初回接続時はこんなメッセージが出ることがある：

```text
The authenticity of host 'github.com (xx.xx.xx.xx)' can't be established.
ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

`yes` と入力してEnterを押そう。

接続が成功すると、こんなメッセージが表示される：

```text
Hi あなたのユーザー名! You've successfully authenticated, but GitHub does not provide shell access.
```

`Hi あなたのユーザー名!` という表示が出ればSSH設定は完了。

### よくあるトラブル

**「Permission denied (publickey)」と出た場合**

公開鍵の登録に問題がある可能性がある。以下を確認しよう：

- `cat ~/.ssh/id_ed25519.pub` の出力が、GitHubに登録した内容と一致しているか。
- GitHubの SSH and GPG keys 画面に鍵が正しく表示されているか。

**ssh-agentを使う場合**

パスフレーズを設定した場合、毎回入力するのが面倒なら `ssh-agent` を使うと楽になる。
詳しくはGitHubの公式ドキュメントを参照しよう。

> ⚠️ **重要**: 秘密鍵（`id_ed25519`）は絶対に他人に渡したり、GitHubにアップロードしたりしないこと。
> 拡張子 `.pub` がついた**公開鍵だけ**をGitHubに登録する。

## Summary

- GitHubとの認証にはHTTPSとSSHの2種類があり、SSHのほうが日常的に使いやすい。
- SSH鍵ペアは秘密鍵（`id_ed25519`）と公開鍵（`id_ed25519.pub`）のセット。
- `ssh-keygen -t ed25519 -C "メールアドレス"` で鍵ペアを生成する。
- `cat ~/.ssh/id_ed25519.pub` で公開鍵を表示し、GitHubのSettings → SSH keysに登録する。
- `ssh -T git@github.com` で接続テストができる。成功すると `Hi ユーザー名!` と表示される。
- 秘密鍵は絶対に外に出さない。登録するのは `.pub` の公開鍵のみ。

## Exercises

**SSH鍵を生成してGitHubに登録しよう**

1. ターミナルを開いて、SSH鍵を生成する：

   ```bash
   ssh-keygen -t ed25519 -C "あなたのメールアドレス"
   ```

2. 生成されたファイルを確認する：

   ```bash
   ls ~/.ssh/
   ```

3. 公開鍵の中身を表示してコピーする：

   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

4. GitHubの **Settings → SSH and GPG keys → New SSH key** に貼り付けて登録する。

5. 接続を確認する：

   ```bash
   ssh -T git@github.com
   ```

   `Hi あなたのユーザー名!` と表示されれば成功。

### Reset & Retry

鍵の生成をやり直したい場合は、既存の鍵ファイルを削除してから再実行しよう：

```bash
rm ~/.ssh/id_ed25519 ~/.ssh/id_ed25519.pub
ssh-keygen -t ed25519 -C "あなたのメールアドレス"
```

GitHubに古い鍵が登録されていたら、**Settings → SSH and GPG keys** から削除してから新しい鍵を登録し直そう。

<!-- prev/next navigation -->
[< Previous: GitHubアカウントを作ろう](03-account-setup.md) | [Back to Index](../../../README.md) | [Next: フォークしよう >](../02-collaboration/01-fork.md)
