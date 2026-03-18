# git pull — リモートの変更をローカルへ

<!-- prev/next navigation -->
[< Previous: git push — ローカルをリモートへ](01-push.md) | [Back to Index](../../../README.md) | [Next: git fetch — フェッチとプルの違い >](03-fetch.md)

## What & Why

`git pull` は、リモートリポジトリの最新コミットをローカルへ取り込むコマンドです。  
チームメンバーがプッシュした変更を受け取ったり、別のコンピュータで作業した内容を同期したりするときに使います。  
「プッシュは送る、プルは受け取る」と覚えておきましょう。

## Content

### シナリオ：チームメンバーの変更を受け取ろう

あなたのチームメンバー・ハルが `main` ブランチに新しいコミットをプッシュしました。  
あなたのローカルはまだ古い状態です。`git pull` で最新版を取り込みましょう。

---

### ① git pull の基本

```bash
git pull
```

上流ブランチ（`-u` で設定済み）があれば、これだけで最新コミットを取り込めます。  
明示的にリモートとブランチを指定するなら：

```bash
git pull origin main
```

実行するとこんな出力が出ます（変更がある場合）：

```text
remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Compressing objects: 100% (3/3), done.
Unpacking objects: 100% (3/3), done.
From https://github.com/yourname/your-repo
   a1b2c3d..e4f5g6h  main -> origin/main
Updating a1b2c3d..e4f5g6h
Fast-forward
 README.md | 2 ++
 1 file changed, 2 insertions(+)
```

---

### ② git pull の中身：fetch + merge

`git pull` は実は2つの操作をまとめて行っています：

```text
git pull  =  git fetch  +  git merge
```

1. **`git fetch`** — リモートの最新コミットをダウンロードする（ローカルのブランチはまだ動かない）
2. **`git merge`** — ダウンロードした内容を現在のブランチへ統合する

`fetch` と `merge` を分けて行いたい場合は[次のページ](03-fetch.md)で説明します。

---

### ③ rebase モードのプル

`git pull` はデフォルトでマージを行いますが、`pull.rebase = true` に設定している場合は  
`git merge` の代わりに `git rebase` が実行されます。  
この設定は [Part1 の gitconfig ページ](../../part1/01-setup/05-pull-rebase-defaultbranch.md) で紹介しています。

rebase モードでプルすると、マージコミットが作られず履歴がきれいに一本線になります。

---

### ④ Fast-forward とマージコミット

プルの結果は、ローカルとリモートの状態によって変わります。

**Fast-forward（早送り）：**  
ローカルにリモートへの上乗せがない場合、コミットを単純に「つなぎ足す」だけで済みます。  
マージコミットは作られません。

```text
Before:  A - B          (local main)
              \
               C - D    (remote main)

After:   A - B - C - D  (local main, fast-forward)
```

**マージコミット：**  
ローカルにも独自のコミットがある場合、マージコミットが作られます。

```text
Before:  A - B - E      (local main, 自分のコミットEがある)
              \
               C - D    (remote main)

After:   A - B - E - M  (Mはマージコミット)
               \ /
                C - D
```

---

### ⑤ プルでコンフリクトが起きるとき

ローカルとリモートで**同じファイルの同じ行**を別々に編集していた場合、  
プル時にコンフリクト（競合）が発生することがあります。

```text
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```

このコンフリクトの解消方法は、[マージコンフリクトのページ](../../part1/03-branching/05-merge-conflict.md)で詳しく説明しています。  
プルのコンフリクトも解消手順はまったく同じです。

## Summary

- `git pull` でリモートの最新コミットをローカルへ取り込める。
- `git pull` の内部は `git fetch` + `git merge`（または `git rebase`）の組み合わせ。
- `pull.rebase = true` 設定時はマージコミットが作られず、履歴が一本線になる。
- ローカルに独自のコミットがあるとマージコミットが作られる（Fast-forwardにならない）。
- 同じファイルを両方で変更していた場合はコンフリクトが起きる。解消方法は通常のマージと同じ。

## Exercises

**準備：** GitHubにリポジトリがあり、ローカルにクローンしてある状態から始めます。

1. GitHubのWebインターフェイスで直接ファイルを編集し、コミットしてみましょう  
   （リモートにローカルより新しいコミットを作る練習です）。

2. ローカルで `git status` と `git log --oneline` を確認して、まだ変更が来ていないことを確認しましょう。

   ```bash
   git status
   git log --oneline
   ```

3. `git pull` を実行して変更を取り込みましょう。

   ```bash
   git pull
   ```

4. もう一度 `git log --oneline` を確認して、GitHubで作ったコミットが追加されていることを確認しましょう。

   ```bash
   git log --oneline
   ```

5. ローカルでも同じファイルを別の行に変更してコミットし、  
   再度 `git pull` を実行してマージコミットが作られることを観察してみましょう。

   ```bash
   # ファイルを編集してコミット
   git add .
   git commit -m "docs: local change for pull exercise"
   git pull
   git log --oneline --graph
   ```

### Reset & Retry

```bash
# プルで取り込んだ変更を元に戻してやり直す（直近のマージコミットを消す）
git reset --hard HEAD~1
# ※ コンフリクト解消中の場合
git merge --abort
```

<!-- prev/next navigation -->
[< Previous: git push — ローカルをリモートへ](01-push.md) | [Back to Index](../../../README.md) | [Next: git fetch — フェッチとプルの違い >](03-fetch.md)
