# git reset — 歴史を巻き戻す

<!-- prev/next navigation -->
[< Previous: 演習：ブランチ・マージ・スタッシュを使ってみよう](../03-branching/08-exercise.md) | [Back to Index](../../../README.md) | [Next: git revert — 安全にコミットを取り消す >](02-revert.md)

## What & Why

コミットを間違えた、ステージしすぎた、やり直したい——そんなとき `git reset` が使えます。
「歴史を巻き戻す」コマンドで、どこまで戻すか・変更をどう扱うかを3つのモードで細かく指定できます。
ただし使い方を誤ると変更が消えてしまうので、各モードの違いをしっかり理解しておきましょう。

## Content

### シナリオ：コミットを整理したい

あなたはプロジェクトで作業を進めていて、こんなコミット履歴になっています。

```bash
git log --oneline
```

```
e5f6a7b タイポを修正
d4c3b2a ヘッダーのスタイルを変更
c1b0a9f README を更新
8f7e6d5 最初のコミット
```

「あ、最新の2つのコミット、まとめて1つにすればよかった……」と気づきました。
こういうときが `git reset` の出番です。

---

### `git reset` の基本

`git reset` は **HEAD（現在の位置）を指定したコミットまで移動させる** コマンドです。
`HEAD~1` は「1つ前のコミット」、`HEAD~2` は「2つ前のコミット」を指します。

`git reset HEAD~1` を実行すると HEAD が1つ前に戻ります。でも「戻したあと、変更はどうなるの？」というのがポイント。
それを決めるのが **3つのモード** です。

---

### モード1：`--soft` ― 変更をステージに残す

`git reset --soft HEAD~1` を実行すると：

- HEAD を1つ前に戻す
- **変更はステージ（インデックス）にそのまま残る**
- ファイルの内容はまったく変わらない

**いつ使う？**
「コミットメッセージを書き直したい」「直前の2つのコミットを1つにまとめたい」というとき。

コミットは消えますが、変更はステージされたまま残ります。
あとは `git commit -m "新しいメッセージ"` で再コミットできます。

---

### モード2：`--mixed` ― 変更をワーキングツリーに残す（デフォルト）

`git reset --mixed HEAD~1`（または単に `git reset HEAD~1`）を実行すると：

- HEAD を1つ前に戻す
- **ステージはクリアされる（`git add` が取り消される）**
- ファイルの内容はそのまま残る

**いつ使う？**
「うっかり関係ないファイルも `git add` してしまった」というとき。

ファイルは変わっていませんが、ステージングが解除されます。
`git add` で必要なファイルだけ選んで再コミットできます。

---

### モード3：`--hard` ― 変更を完全に消す

`git reset --hard HEAD~1` を実行すると：

- HEAD を1つ前に戻す
- **ステージもワーキングツリーも、そのコミット時点の状態に戻る**
- **変更は消える——復元できない**

> ⚠️ **警告：`--hard` は破壊的です**
> 作業中のファイルへの変更がすべて失われます。
> 「本当にこのコミット以降の作業をすべて捨てていい」という確信がある場合だけ使いましょう。

**いつ使う？**
「実験的な変更をすべて捨てて、きれいな状態からやり直したい」というとき。

---

### 3つのモードの比較

| モード | HEADを移動 | ステージ | ワーキングツリー |
|--------|-----------|---------|----------------|
| `--soft` | はい | そのまま残る | そのまま残る |
| `--mixed`（デフォルト） | はい | クリアされる | そのまま残る |
| `--hard` | はい | クリアされる | **消える** |

---

### reset はローカルコミット限定！

> ⚠️ **重要：すでに push したコミットには `git reset` を使わないこと。**
>
> `git reset` は歴史を書き換えます。チームで共有しているブランチに push 済みのコミットを reset してしまうと、他の人のリポジトリと履歴がズレて大混乱になります。
>
> push 済みのコミットを取り消すには、次のページで学ぶ `git revert` を使いましょう。

## Summary

- `git reset` は HEAD を過去のコミットまで移動させるコマンド。
- `--soft`：変更をステージに残す。コミットの書き直しに使う。
- `--mixed`（デフォルト）：変更はファイルに残すが、ステージはクリア。
- `--hard`：ファイルの変更も消す。完全にやり直したいときだけ使う。
- `git reset HEAD~1` は「1つ前に戻す」ショートハンド。
- **push 済みのコミットには使わない。** 使うのはローカルのみのコミットに限定する。

## Exercises

### 準備

練習用のリポジトリを作ります。

<div class="code-input">

```bash
mkdir reset-practice && cd reset-practice
git init
echo "最初のファイル" > file.txt
git add file.txt
git commit -m "最初のコミット"
```

</div>

<div class="code-input">

```bash
echo "2回目の変更" >> file.txt
git add file.txt
git commit -m "2回目のコミット"
```

</div>

<div class="code-input">

```bash
echo "3回目の変更" >> file.txt
git add file.txt
git commit -m "3回目のコミット"
```

</div>

現在の状態を確認：

<div class="code-input">

```bash
git log --oneline
```

</div>

<div class="code-output">

```
xxxxxxx 3回目のコミット
yyyyyyy 2回目のコミット
zzzzzzz 最初のコミット
```

</div>

---

### 演習1：`--soft` を試す

<div class="code-input">

```bash
git reset --soft HEAD~1
```

</div>

ログとステータスを確認：

<div class="code-input">

```bash
git log --oneline
```

</div>

<div class="code-output">

```
yyyyyyy 2回目のコミット
zzzzzzz 最初のコミット
```

</div>

<div class="code-input">

```bash
git status
```

</div>

<div class="code-output">

```
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   file.txt
```

</div>

「3回目のコミット」が消えて、変更がステージに残っていることを確認してください。
確認できたら、新しいメッセージで再コミットしてみましょう：

<div class="code-input">

```bash
git commit -m "3回目（書き直し）"
```

</div>

<div class="code-input">

```bash
git log --oneline
```

</div>

<div class="code-output">

```
xxxxxxx 3回目（書き直し）
yyyyyyy 2回目のコミット
zzzzzzz 最初のコミット
```

</div>

---

### 演習2：`--mixed` を試す

<div class="code-input">

```bash
git reset HEAD~1
```

</div>

ログとステータスを確認：

<div class="code-input">

```bash
git log --oneline
```

</div>

<div class="code-output">

```
yyyyyyy 2回目のコミット
zzzzzzz 最初のコミット
```

</div>

<div class="code-input">

```bash
git status
```

</div>

<div class="code-output">

```
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
        modified:   file.txt
```

</div>

コミットが1つ減り、変更がステージから外れていることを確認してください。

---

### 演習3：`--hard` を試す

> ⚠️ この操作は変更を消します。練習環境でのみ実行してください。

<div class="code-input">

```bash
git reset --hard HEAD~1
```

</div>

ログとステータスを確認：

<div class="code-input">

```bash
git log --oneline
```

</div>

<div class="code-output">

```
zzzzzzz 最初のコミット
```

</div>

<div class="code-input">

```bash
git status
```

</div>

<div class="code-output">

```
On branch main
nothing to commit, working tree clean
```

</div>

コミットが減り、ファイルも元の状態に戻っていることを確認してください：

<div class="code-input">

```bash
cat file.txt
```

</div>

<div class="code-output">

```
最初のファイル
```

</div>

---

### Reset & Retry

⚠️ うまくいかなかったときだけ実行してください。

<div class="code-input">

```bash
cd ..
rm -rf reset-practice
```

</div>

そして「準備」の手順から再実行してください。

---

<!-- prev/next navigation (repeated at bottom) -->
[< Previous: 演習：ブランチ・マージ・スタッシュを使ってみよう](../03-branching/08-exercise.md) | [Back to Index](../../../README.md) | [Next: git revert — 安全にコミットを取り消す >](02-revert.md)
