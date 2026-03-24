# git stash — 作業を一時退避する

[< Previous: git rebase — 歴史を整える](06-rebase.md) | [Back to Index](../../../README.md) | [Next: 演習：ブランチ・マージ・スタッシュを使ってみよう >](08-exercise.md)

## What & Why

「作業中なのに別のブランチに移らないといけない！」という場面、きっとある。でもコミットするほどじゃないし、変更を捨てたくもない。そんなときに `git stash` が活躍する。作業中の変更を一時的に「引き出し」に入れてブランチをきれいにし、別の作業が終わったら引き出しから取り出してまた続きができる。

## Content

### シナリオ：急な修正依頼が来た！

あなたは `feature` ブランチで新しい機能を実装中だ。ファイルを途中まで編集しているところで、友達から急メッセージが来た：

> 「ねえ、`main` のバグ直してほしいんだけど、今すぐ！」

困った。`feature` ブランチの変更はまだコミットできる状態じゃない（途中だから）。かといってこのまま `git switch main` で `main` に切り替えようとすると…

```
error: Your local changes to the following files would be overwritten by checkout:
        feature-a.txt
Please commit your changes or stash them before you switch branches.
Aborting
```

ブランチを切り替えられない！コミットするか、変更を退避するかしないといけない。ここで `git stash` の出番だ。

---

### git stash — 変更を一時保存する

`git stash` を実行すると、コミットしていない変更が「スタッシュ（一時保存領域）」に保存される。作業ツリーがきれいな状態に戻るので、そのままブランチを切り替えられる。

変更が消えたわけじゃない。スタッシュの中に入っているだけだ。

---

### main に切り替えて緊急修正をする

スタッシュしてきれいな状態になったら `git switch main` でスムーズに切り替えられる。バグを修正したら `git add` してから `git commit` でコミットしよう。

---

### feature ブランチに戻って作業を再開する

`git switch feature` で `feature` ブランチに戻り、`git stash pop` でスタッシュに保存した変更を取り出す。退避していた変更がきれいに戻ってくる。

`git stash pop` はスタッシュから変更を取り出して、スタッシュのリストからも削除する。

---

### git stash list — スタッシュの一覧を見る

スタッシュは複数個保存できる。どれが入っているか確認するには：

```bash
git stash list
```

```
stash@{0}: WIP on feature: 9e8f7a6 機能Aを追加
stash@{1}: WIP on feature: 7b6c5d4 別の作業の途中
```

`stash@{0}` が一番新しいスタッシュだ。

---

### git stash pop vs git stash apply

| コマンド | 取り出し後のスタッシュ |
|---|---|
| `git stash pop` | リストから削除される |
| `git stash apply` | リストに残る |

「取り出してもスタッシュを残しておきたい」ときは `apply` を使う。普段は `pop` で OK。

---

### git stash drop — スタッシュを削除する

もう必要なくなったスタッシュは `git stash drop stash@{番号}` で削除できる。全部まとめて削除するには `git stash clear` を使う。

スタッシュを溜め込むと管理が大変になるので、用が済んだら削除しておこう。

---

### スタッシュにメモをつける

スタッシュが増えてきたとき、「これ何のやつだっけ？」と迷うことがある。`git stash push -m "メモ"` でメモをつけておくと便利だ。

```bash
git stash list
```

```
stash@{0}: On feature: 検索フォームの途中
```

メモがあるとわかりやすい。

## Summary

- `git stash` で未コミットの変更を一時保存し、作業ツリーをきれいにできる。
- `git stash pop` で最後にスタッシュした変更を取り出す（リストからも削除）。
- `git stash apply` で取り出しつつスタッシュをリストに残す。
- `git stash list` でスタッシュの一覧を確認できる。
- `git stash drop` で特定のスタッシュを削除。`git stash clear` で全削除。
- `git stash push -m "メモ"` でスタッシュにメモをつけられる。
- スタッシュは「一時的な退避場所」。長期間放置せず、使ったら整理しよう。

## Exercises

### 演習 1: スタッシュの基本を体験する

練習用リポジトリを作ろう：

<div class="code-input">

```bash
mkdir ~/stash-practice
cd ~/stash-practice
git init
echo "# スタッシュ練習" > README.md
git add README.md
git commit -m "最初のコミット"
git switch -c feature
```

</div>

`feature` ブランチで途中まで編集する：

<div class="code-input">

```bash
echo "途中の作業" > work-in-progress.txt
```

</div>

<div class="code-input">

```bash
git status
```

</div>

<div class="code-output">

```
On branch feature
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	work-in-progress.txt

nothing added to commit but untracked files present (use "git add" to track)
```

</div>

`work-in-progress.txt` が `Untracked files` に出ることを確認。スタッシュしてみよう：

<div class="code-input">

```bash
git stash -u
```

</div>

> `-u` オプションを使うと、まだ `git add` していない新規ファイルも一緒にスタッシュできる。

<div class="code-input">

```bash
git status
```

</div>

<div class="code-output">

```
On branch feature
nothing to commit, working tree clean
```

</div>

`nothing to commit, working tree clean` になることを確認しよう。

---

### 演習 2: ブランチを切り替えて緊急対応する

<div class="code-input">

```bash
git switch main
echo "緊急修正" >> README.md
git add README.md
git commit -m "緊急修正をコミット"
```

</div>

<div class="code-input">

```bash
git log --oneline
```

</div>

<div class="code-output">

```
a1b2c3d (HEAD -> main) 緊急修正をコミット
f3c4d5e 最初のコミット
```

</div>

---

### 演習 3: feature ブランチに戻って作業を再開する

<div class="code-input">

```bash
git switch feature
git stash pop
```

</div>

<div class="code-input">

```bash
git status
```

</div>

<div class="code-output">

```
On branch feature
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	work-in-progress.txt

nothing added to commit but untracked files present (use "git add" to track)
```

</div>

`work-in-progress.txt` が戻ってきていることを確認しよう。

---

### 演習 4: スタッシュを複数作って管理する

<div class="code-input">

```bash
git stash push -m "作業A"
echo "別の作業" > other-work.txt
git stash push -u -m "作業B"
```

</div>

<div class="code-input">

```bash
git stash list
```

</div>

<div class="code-output">

```
stash@{0}: On feature: 作業B
stash@{1}: On feature: 作業A
```

</div>

2 つのスタッシュが一覧に出ることを確認。古い方を削除してみよう：

<div class="code-input">

```bash
git stash drop stash@{1}
```

</div>

<div class="code-input">

```bash
git stash list
```

</div>

<div class="code-output">

```
stash@{0}: On feature: 作業B
```

</div>

<div class="code-input">

```bash
git stash pop
```

</div>

<div class="code-input">

```bash
git status
```

</div>

---

### Reset & Retry

⚠️ うまくいかなかったときだけ実行してください。

<div class="code-input">

```bash
cd ~
rm -rf stash-practice
```

</div>

その後、演習 1 から始めてみよう。

[< Previous: git rebase — 歴史を整える](06-rebase.md) | [Back to Index](../../../README.md) | [Next: 演習：ブランチ・マージ・スタッシュを使ってみよう >](08-exercise.md)
