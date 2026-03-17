<!-- mistake-page -->

# ブランチをマージする

[< Previous: git checkout — git switch との関係](03-checkout.md) | [Back to Index](../../../README.md) | [Next: マージコンフリクトを解決する >](05-merge-conflict.md)

## What & Why

ブランチで作業が完成したら、その変更を `main` に取り込む必要があります。
この操作を **マージ（merge）** といいます。
マージを使うことで、複数の作業ラインをひとつにまとめられます。

## Content

### シナリオ：日記アプリに新しい章を追加した

あなたは `feature` ブランチで「第3章」の日記ファイルを作成し、コミットしました。
レビューも終わり、いよいよ `main` に取り込む時がきました。

#### ① まず `main` に移動する

マージは「取り込む側のブランチ」に移動してから行います。

```bash
git switch main
```

```
Switched to branch 'main'
```

`main` にいることを確認したら、マージを実行します。

#### ② `git merge feature` を実行する

```bash
git merge feature
```

```
Updating a1b2c3d..e4f5g6h
Fast-forward
 diary/chapter3.md | 10 ++++++++++
 1 file changed, 10 insertions(+)
 create mode 100644 diary/chapter3.md
```

「**Fast-forward**」と表示されました。

**Fast-forward とは？**

`main` が動いていない間に `feature` だけが進んでいた場合、Git は「ポインタをそのまま前に移動するだけ」でマージできます。これを Fast-forward マージといいます。新しいマージコミットは作られません。

```
Before:          After (Fast-forward):
main             main
  |                  |
  A --- B --- C      A --- B --- C
              |                  |
           feature            feature
```

`main` 側にも独自のコミットがあった場合は、Git は新しい「マージコミット」を作ります（non-fast-forward）。このページでは Fast-forward のケースだけ見ておきましょう。

#### ③ マージ後のログを確認する

```bash
git log --oneline
```

```
e4f5g6h (HEAD -> main, feature) diary: add chapter 3
d3c2b1a feat: add chapter 2
a1b2c3d first commit
```

`feature` ブランチのコミットが `main` にも見えるようになりました。

#### ④ マージ済みブランチを削除する

用が済んだブランチはきれいに削除しておきましょう。

```bash
git branch -d feature
```

```
Deleted branch feature (was e4f5g6h).
```

`-d` は「マージ済みのブランチだけ削除できる」オプションです。まだマージしていないブランチを誤って消さないための安全装置がついています。

```bash
git branch
```

```
* main
```

すっきりしました。

---

### ⚠️ ここからは次のページの準備です

マージがうまくいったところで、**わざとトラブルを起こして**みましょう。
次のページで何が起きるかを体験するための実験です。

#### ① `conflict-test` ブランチを作る

```bash
git switch -c conflict-test
```

```
Switched to a new branch 'conflict-test'
```

#### ② `README.md` の1行目を編集してコミット（`conflict-test` 側）

`README.md` の1行目を次のように変えてください（元の内容は何でも OK）。

```markdown
# 私の日記アプリ（conflict-test ブランチ版）
```

```bash
git add README.md
git commit -m "docs: update README title on conflict-test"
```

#### ③ `main` に戻って、同じ行を別の内容に編集してコミット

```bash
git switch main
```

`README.md` の1行目を、今度は別の内容に変えてください。

```markdown
# 私の日記アプリ（main ブランチ版）
```

```bash
git add README.md
git commit -m "docs: update README title on main"
```

#### ④ `conflict-test` をマージしてみる

```bash
git merge conflict-test
```

```
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```

あれ、エラーが出た？次のページで何が起きたか見てみよう。

## Summary

- `git merge <branch>` で、指定したブランチを現在のブランチに取り込む。
- マージは「取り込む側」のブランチに移動してから実行する。
- `main` が動いていなければ Fast-forward マージになり、新しいコミットは作られない。
- マージ済みのブランチは `git branch -d` で削除できる。
- 両方のブランチで同じ行を変更していると、マージコンフリクトが発生する。

## Exercises

### 練習1：Fast-forward マージを体験する

1. 新しいリポジトリ（または手元のリポジトリ）で `feature` ブランチを作成する。

   ```bash
   git switch -c feature
   ```

2. 新しいファイルを作成してコミットする。

   ```bash
   echo "# 新しいページ" > new-page.md
   git add new-page.md
   git commit -m "docs: add new page"
   ```

3. `git log --oneline` でコミット履歴を確認する。

   ```bash
   git log --oneline
   ```

4. `main` に切り替えてマージする。

   ```bash
   git switch main
   git merge feature
   ```

5. `git log --oneline` と `git status` でマージ結果を確認する。

   ```bash
   git log --oneline
   git status
   ```

6. `feature` ブランチを削除する。

   ```bash
   git branch -d feature
   git branch
   ```

### Reset & Retry

```
git switch main
git branch -D feature
git branch -D conflict-test
```

> `-D` は強制削除です。マージしていないブランチも消えるので注意してください。

---

[< Previous: git checkout — git switch との関係](03-checkout.md) | [Back to Index](../../../README.md) | [Next: マージコンフリクトを解決する >](05-merge-conflict.md)
