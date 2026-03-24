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

### SSH鍵の生成から登録までの流れ

設定の流れは大きく5ステップだ。

1. `ssh-keygen -t ed25519 -C "メールアドレス"` で鍵ペアを生成する。
   コマンドを実行すると保存先とパスフレーズを聞かれる。
   保存先はデフォルト（そのままEnter）、パスフレーズは学習用途なら空のままEnterでOK。
   完了すると `~/.ssh/id_ed25519`（秘密鍵）と `~/.ssh/id_ed25519.pub`（公開鍵）が作られる。

2. `ls ~/.ssh/` で鍵ファイルが作成されたことを確認する。
   `id_ed25519` と `id_ed25519.pub` の2ファイルが見えればOK。
   - `id_ed25519` — 秘密鍵。**このファイルの中身は絶対に誰にも見せないこと。**
   - `id_ed25519.pub` — 公開鍵。GitHubに登録するのはこちら。

3. `cat ~/.ssh/id_ed25519.pub` で公開鍵の中身を表示してコピーする。
   `ssh-ed25519 AAAA...` から始まる1行全体をコピーする。

4. GitHubの **Settings → SSH and GPG keys → New SSH key** を開き、コピーした公開鍵を登録する。
   - **Title** — わかりやすい名前（例：`My Laptop`、`WSL Ubuntu`）。
   - **Key** — 先ほどコピーした公開鍵をペースト。
   - **Add SSH key** をクリック。

5. `ssh -T git@github.com` で接続確認する。
   `Hi あなたのユーザー名! You've successfully authenticated...` と表示されれば完了。
   初回接続時はフィンガープリントの確認が出ることがある。`yes` と答えて進もう。

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

   <div class="code-input">

   ```bash
   ssh-keygen -t ed25519 -C "あなたのメールアドレス"
   ```

   </div>

2. 生成されたファイルを確認する：

   <div class="code-input">

   ```bash
   ls ~/.ssh/
   ```

   </div>

   <div class="code-output">

   ```text
   id_ed25519    id_ed25519.pub
   ```

   </div>

3. 公開鍵の中身を表示してコピーする：

   <div class="code-input">

   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

   </div>

   <div class="code-output">

   ```text
   ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIxxxxxxxxxxxxxxxxxxxxxxxx あなたのメールアドレス
   ```

   </div>

4. GitHubの **Settings → SSH and GPG keys → New SSH key** に貼り付けて登録する。

5. 接続を確認する：

   <div class="code-input">

   ```bash
   ssh -T git@github.com
   ```

   </div>

   <div class="code-output">

   ```text
   Hi あなたのユーザー名! You've successfully authenticated, but GitHub does not provide shell access.
   ```

   </div>

   `Hi あなたのユーザー名!` と表示されれば成功。

### Reset & Retry

⚠️ うまくいかなかったときだけ実行してください。

鍵の生成をやり直したい場合は、既存の鍵ファイルを削除してから再実行しよう：

<div class="code-input">

```bash
rm ~/.ssh/id_ed25519 ~/.ssh/id_ed25519.pub
```

</div>

<div class="code-input">

```bash
ssh-keygen -t ed25519 -C "あなたのメールアドレス"
```

</div>

GitHubに古い鍵が登録されていたら、**Settings → SSH and GPG keys** から削除してから新しい鍵を登録し直そう。

<!-- prev/next navigation -->
[< Previous: GitHubアカウントを作ろう](03-account-setup.md) | [Back to Index](../../../README.md) | [Next: フォークしよう >](../02-collaboration/01-fork.md)
