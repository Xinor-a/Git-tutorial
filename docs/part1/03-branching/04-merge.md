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

マージは「取り込む側のブランチ」に移動してから行います。`main` に移動したあと `git merge feature` を実行します。

---

### Fast-forward とは？

`main` が動いていない間に `feature` だけが進んでいた場合、Git は「ポインタをそのまま前に移動するだけ」でマージできます。これを Fast-forward マージといいます。新しいマージコミットは作られません。

```
Before:          After (Fast-forward):
main             main
  |                  |
  A --- B --- C      A --- B --- C
              |                  |
           feature            feature
```

`main` 側にも独自のコミットがあった場合は、Git は新しい「マージコミット」を作ります（non-fast-forward）。

マージ後の `git log --oneline` はこのようになります。

```
e4f5g6h (HEAD -> main, feature) diary: add chapter 3
d3c2b1a feat: add chapter 2
a1b2c3d first commit
```

`feature` ブランチのコミットが `main` にも見えるようになりました。

---

### マージ済みブランチの削除

用が済んだブランチはきれいに削除しておきましょう。`git branch -d <ブランチ名>` を使います。`-d` は「マージ済みのブランチだけ削除できる」オプションです。まだマージしていないブランチを誤って消さないための安全装置がついています。

---

### ⚠️ ここからは次のページの準備です

マージがうまくいったところで、**わざとトラブルを起こして**みましょう。
次のページで何が起きるかを体験するための実験です。

`conflict-test` ブランチを作り、`README.md` の1行目を編集してコミットします。次に `main` に戻って同じ行を別の内容に編集してコミットし、`conflict-test` をマージしてみます。

すると次のようなエラーが出るはずです。

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

<div class="code-input">

```bash
git switch -c feature
```

</div>

<div class="code-output">

```
Switched to a new branch 'feature'
```

</div>

新しいファイルを作成してコミットする。

<div class="code-input">

```bash
echo "# 新しいページ" > new-page.md
git add new-page.md
git commit -m "docs: add new page"
```

</div>

`git log --oneline` でコミット履歴を確認する。

<div class="code-input">

```bash
git log --oneline
```

</div>

<div class="code-output">

```
xxxxxxx (HEAD -> feature) docs: add new page
yyyyyyy (main) （以前のコミット）
```

</div>

`main` に切り替えてマージする。

<div class="code-input">

```bash
git switch main
git merge feature
```

</div>

<div class="code-output">

```
Updating yyyyyyy..xxxxxxx
Fast-forward
 new-page.md | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 new-page.md
```

</div>

`git log --oneline` と `git status` でマージ結果を確認する。

<div class="code-input">

```bash
git log --oneline
git status
```

</div>

`feature` ブランチを削除する。

<div class="code-input">

```bash
git branch -d feature
git branch
```

</div>

<div class="code-output">

```
Deleted branch feature (was xxxxxxx).
* main
```

</div>

---

### 練習2：コンフリクトを起こす準備をする（次のページへの仕込み）

<div class="code-input">

```bash
git switch -c conflict-test
```

</div>

`README.md` の1行目を編集する（エディタで開いて次の内容に変更する）。

```markdown
# 私の日記アプリ（conflict-test ブランチ版）
```

<div class="code-input">

```bash
git add README.md
git commit -m "docs: update README title on conflict-test"
```

</div>

`main` に戻って、同じ行を別の内容に編集する。

<div class="code-input">

```bash
git switch main
```

</div>

`README.md` の1行目を今度は別の内容に変更する。

```markdown
# 私の日記アプリ（main ブランチ版）
```

<div class="code-input">

```bash
git add README.md
git commit -m "docs: update README title on main"
```

</div>

`conflict-test` をマージしてみる。

<div class="code-input">

```bash
git merge conflict-test
```

</div>

<div class="code-output">

```
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```

</div>

コンフリクトが出た！次のページで解決方法を学ぼう。

---

### Reset & Retry

⚠️ うまくいかなかったときだけ実行してください。

<div class="code-input">

```bash
git switch main
git branch -D feature
git branch -D conflict-test
```

</div>

> `-D` は強制削除です。マージしていないブランチも消えるので注意してください。

<div class="code-input">

```bash
git branch
```

</div>

<div class="code-output">

```
* main
```

</div>

---

[< Previous: git checkout — git switch との関係](03-checkout.md) | [Back to Index](../../../README.md) | [Next: マージコンフリクトを解決する >](05-merge-conflict.md)
