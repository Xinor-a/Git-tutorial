# git push — ローカルをリモートへ

<!-- prev/next navigation -->
[< Previous: Issueで作業を管理しよう](../02-collaboration/05-issues.md) | [Back to Index](../../../README.md) | [Next: git pull — リモートの変更をローカルへ >](02-pull.md)

## What & Why

`git push` は、ローカルで積み上げたコミットをリモートリポジトリ（GitHub）へ送るコマンドです。  
プッシュをしないと、あなたのコンピュータにしか変更が存在しません。  
チームで作業するときも、一人で作業するときも、「完成したらプッシュ」が基本の流れです。

## Content

### シナリオ：新機能ブランチをGitHubへ送ろう

あなたはローカルで `feature/top-page` というブランチを作り、いくつかコミットしました。  
これをGitHubへ送って、チームに見せましょう。

---

### ① mainブランチをプッシュする

まず基本から。`main` ブランチの変更をリモートへ送るには：

```bash
git push origin main
```

- `origin` — リモートリポジトリの名前（クローンすると自動でこの名前になります）
- `main` — プッシュするブランチ名

実行するとこんな出力が出ます：

```text
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Writing objects: 100% (3/3), 312 bytes | 312.00 KiB/s, done.
Total 3 (delta 1), reused 0 (delta 0), pack-reused 0
To https://github.com/yourname/your-repo.git
   a1b2c3d..e4f5g6h  main -> main
```

最後の行が「どのコミットからどのコミットへ、どのブランチを送ったか」を示しています。

---

### ② フィーチャーブランチをプッシュする

`feature/top-page` ブランチをプッシュするには：

```bash
git push origin feature/top-page
```

ブランチ名をそのまま指定するだけです。リモートに同じ名前のブランチが作られます。

---

### ③ `-u` オプションで上流ブランチを設定する

毎回 `git push origin feature/top-page` と打つのは長いですね。  
`-u`（`--set-upstream` の略）オプションを使うと、次回から `git push` だけで済むようになります。

```bash
git push -u origin feature/top-page
```

実行後、このブランチでは：

```bash
git push   # これだけでOK！
```

と打つだけでプッシュできます。`-u` は最初の一回だけ使えば十分です。

---

### ④ プッシュが拒否されるケース

リモートに自分より新しいコミットがある場合、プッシュは拒否されます：

```text
! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'https://github.com/yourname/your-repo.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
```

これは「リモートに自分が持っていない変更があるよ」というメッセージです。  
解決策は、まず `git pull` でリモートの変更を取り込んでから、再度プッシュすることです。  
`git pull` については[次のページ](02-pull.md)で詳しく説明します。

---

### ⑤ リモートブランチを削除する

マージ済みのフィーチャーブランチはリモートからも消しておくとすっきりします：

```bash
git push origin --delete feature/old-branch
```

---

### ⚠️ `--force` は共有ブランチで絶対に使わない

`git push --force`（または `-f`）というオプションがあります。  
これはリモートの履歴を強制的に上書きするもので、**チームで共有しているブランチで使うと他の人のコミットが消える**危険があります。

```bash
# ⚠️ 共有ブランチでは絶対に使わないこと！
git push --force origin main
```

`--force` を使ってよいのは「自分だけが使っているブランチで、どうしても履歴を書き直したい」という限られた場面だけです。  
迷ったら使わない、それが鉄則です。

## Summary

- `git push origin <ブランチ名>` でローカルのコミットをリモートへ送れる。
- 初回は `git push -u origin <ブランチ名>` で上流を設定すると、以降は `git push` だけで済む。
- リモートに新しいコミットがある場合は、先に `git pull` してからプッシュする。
- `git push origin --delete <ブランチ名>` でリモートのブランチを削除できる。
- `git push --force` は共有ブランチでは絶対に使わない。

## Exercises

**準備：** GitHubに自分のリポジトリがあり、ローカルにクローンしてある状態から始めます。

1. ローカルで新しいブランチを作り、空のファイルを追加してコミットしてみましょう。

   ```bash
   git checkout -b feature/exercise-push
   touch hello.txt
   git add hello.txt
   git commit -m "docs: add hello.txt for push exercise"
   git status
   git log --oneline
   ```

2. `-u` オプションでブランチをプッシュしましょう。

   ```bash
   git push -u origin feature/exercise-push
   ```

   GitHubのリポジトリページを開いて、ブランチが追加されていることを確認してください。

3. もう一度ファイルを変更してコミットし、今度は `git push` だけでプッシュできることを確認しましょう。

   ```bash
   echo "hello" >> hello.txt
   git add hello.txt
   git commit -m "docs: update hello.txt"
   git push
   ```

4. `git log --oneline` でコミット履歴を確認し、リモートと同期されていることを見てみましょう。

   ```bash
   git log --oneline origin/feature/exercise-push
   ```

5. 練習が終わったら、リモートブランチを削除しましょう。

   ```bash
   git push origin --delete feature/exercise-push
   ```

### Reset & Retry

```bash
# ローカルブランチを削除してやり直す
git checkout main
git branch -D feature/exercise-push
# リモートブランチが残っている場合はこちらも
git push origin --delete feature/exercise-push
```

<!-- prev/next navigation -->
[< Previous: Issueで作業を管理しよう](../02-collaboration/05-issues.md) | [Back to Index](../../../README.md) | [Next: git pull — リモートの変更をローカルへ >](02-pull.md)
