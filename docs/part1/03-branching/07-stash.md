# git stash — 作業を一時退避する

[< Previous: git rebase — 歴史を整える](06-rebase.md) | [Back to Index](../../../README.md) | [Next: 演習：ブランチ・マージ・スタッシュを使ってみよう >](08-exercise.md)

## What & Why

「作業中なのに別のブランチに移らないといけない！」という場面、きっとある。でもコミットするほどじゃないし、変更を捨てたくもない。そんなときに `git stash` が活躍する。作業中の変更を一時的に「引き出し」に入れてブランチをきれいにし、別の作業が終わったら引き出しから取り出してまた続きができる。

## Content

### シナリオ：急な修正依頼が来た！

あなたは `feature` ブランチで新しい機能を実装中だ。ファイルを途中まで編集しているところで、友達から急メッセージが来た：

> 「ねえ、`main` のバグ直してほしいんだけど、今すぐ！」

困った。`feature` ブランチの変更はまだコミットできる状態じゃない（途中だから）。かといってこのまま `main` に切り替えようとすると…

```bash
git switch main
```

```
error: Your local changes to the following files would be overwritten by checkout:
        feature-a.txt
Please commit your changes or stash them before you switch branches.
Aborting
```

ブランチを切り替えられない！ コミットするか、変更を退避するかしないといけない。ここで `git stash` の出番だ。

---

### git stash — 変更を一時保存する

```bash
git stash
```

```
Saved working directory and index state WIP on feature: 9e8f7a6 機能Aを追加
```

コミットしていない変更が「スタッシュ（一時保存領域）」に保存された。作業ツリーがきれいな状態に戻る。

確認してみよう：

```bash
git status
```

```
On branch feature
nothing to commit, working tree clean
```

変更が消えたわけじゃない。スタッシュの中に入っているだけだ。

---

### main に切り替えて緊急修正をする

```bash
git switch main
```

今度はスムーズに切り替えられる。バグを修正してコミットしよう：

```bash
echo "バグ修正の内容" >> README.md
git add README.md
git commit -m "緊急バグ修正：READMEの不具合を解消"
```

```bash
git log --oneline
```

```
b9c8d7e 緊急バグ修正：READMEの不具合を解消
a1b2c3d 最初のコミット
```

修正完了。

---

### feature ブランチに戻って作業を再開する

```bash
git switch feature
```

スタッシュに保存した変更を取り出そう：

```bash
git stash pop
```

```
On branch feature
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
        modified:   feature-a.txt

Dropped refs/stash@{0} (c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8)
```

退避していた変更がきれいに戻ってきた。`git stash pop` はスタッシュから変更を取り出して、スタッシュのリストからも削除する。

作業の続きができる状態に戻ったことを確認しよう：

```bash
git status
git diff
```

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

もう必要なくなったスタッシュは削除できる：

```bash
git stash drop stash@{0}
```

```
Dropped stash@{0} (c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8)
```

全部まとめて削除するには：

```bash
git stash clear
```

スタッシュを溜め込むと管理が大変になるので、用が済んだら削除しておこう。

---

### スタッシュにメモをつける

スタッシュが増えてきたとき、「これ何のやつだっけ？」と迷うことがある。メモをつけておくと便利：

```bash
git stash push -m "検索フォームの途中"
```

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

```bash
mkdir ~/stash-practice
cd ~/stash-practice
git init
echo "# スタッシュ練習" > README.md
git add README.md
git commit -m "最初のコミット"
git switch -c feature
```

`feature` ブランチで途中まで編集する：

```bash
echo "途中の作業" > work-in-progress.txt
git status
```

`work-in-progress.txt` が `Untracked files` に出ることを確認。スタッシュしてみよう：

```bash
git stash -u
```

> `-u` オプションを使うと、まだ `git add` していない新規ファイルも一緒にスタッシュできる。

```bash
git status
```

`nothing to commit, working tree clean` になることを確認しよう。

### 演習 2: ブランチを切り替えて緊急対応する

```bash
git switch main
echo "緊急修正" >> README.md
git add README.md
git commit -m "緊急修正をコミット"
git log --oneline
```

### 演習 3: feature ブランチに戻って作業を再開する

```bash
git switch feature
git stash pop
git status
```

`work-in-progress.txt` が戻ってきていることを確認しよう。

### 演習 4: スタッシュを複数作って管理する

```bash
git stash push -m "作業A"
echo "別の作業" > other-work.txt
git stash push -u -m "作業B"
git stash list
```

2 つのスタッシュが一覧に出ることを確認。古い方を削除してみよう：

```bash
git stash drop stash@{1}
git stash list
```

```bash
git stash pop
git status
```

### Reset & Retry

最初からやり直したいときは：

```bash
cd ~
rm -rf stash-practice
```

その後、演習 1 から始めてみよう。

[< Previous: git rebase — 歴史を整える](06-rebase.md) | [Back to Index](../../../README.md) | [Next: 演習：ブランチ・マージ・スタッシュを使ってみよう >](08-exercise.md)
