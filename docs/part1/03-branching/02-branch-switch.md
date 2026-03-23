# ブランチを作って切り替える

<!-- prev/next navigation -->
[< Previous: ブランチとは何か](01-branch-concept.md) | [Back to Index](../../../README.md) | [Next: git checkout — git switch との関係 >](03-checkout.md)

## What & Why

前のページでブランチの概念を学びました。このページでは実際に手を動かして、ブランチの作成・切り替えを体験します。`git branch` と `git switch` の使い方を覚えると、安全に実験しながら開発できるようになります。

## Content

### シナリオ：趣味ページを追加してみたい

`my-diary` には毎日の日記が積み重なっています。今日のあなたはこう思いました。

> 「趣味のことも書いてみようかな。でもうまくいくかわからないし、日記の流れを乱したくない……」

そこでブランチの登場です。`main` はそのままにして、`hobby-section` というブランチで試してみましょう。

---

### 現在のブランチを確認する

まず今どのブランチにいるか `git branch` で確認します。`*` がついているのが「今いるブランチ」です。

```bash
git branch
```

```
* main
```

---

### ブランチを作る・切り替える

`git branch <名前>` で新しいブランチを作れます。ただし、これだけではまだ `main` にいます。切り替えるには `git switch <名前>` を使います。

`git switch -c <名前>` とすると、作成と切り替えを一度に行えます。`-c` は「create（作成）」の略です。慣れたらこちらを使うのがおすすめです。

---

### ブランチで作業してコミットする

`hobby-section` ブランチでコミットを積むと、`git log --oneline` の出力は次のようになります。

```
xxxxxxx (HEAD -> hobby-section) add hobby page draft
yyyyyyy (main) （以前のコミット）
```

`hobby-section` ブランチだけに新しいコミットがあります。`main` はまだ古いままです。

---

### main に戻ると……

`git switch main` で `main` に切り替えると、`hobby-section` で作ったファイルは見えなくなります。`git status` で確認すると：

```
On branch main
nothing to commit, working tree clean
```

`git log --oneline` を見ても、`hobby-section` で作ったコミットは出てきません。**`hobby-section` ブランチのコミットは `main` には影響していない**のです。これがブランチの力です。

---

### ブランチの流れまとめ

```
git branch                   # 一覧と現在地確認
git branch <name>            # ブランチ作成
git switch <name>            # ブランチ切り替え
git switch -c <name>         # 作成 + 切り替え（一発）
```

## Summary

- `git branch` でブランチ一覧を見る。`*` が現在地。
- `git branch <name>` でブランチを作る。作るだけで移動はしない。
- `git switch <name>` でブランチを切り替える。
- `git switch -c <name>` で作成と切り替えを一度に行う。
- あるブランチのコミットは、別ブランチには影響しない。

## Exercises

`my-diary` リポジトリで以下の手順を試してください。

### 演習 1: 現在のブランチを確認する

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

### 演習 2: `experiment` ブランチを作る

<div class="code-input">

```bash
git branch experiment
```

</div>

`git branch` でブランチが増えたことを確認する。

<div class="code-input">

```bash
git branch
```

</div>

<div class="code-output">

```
  experiment
* main
```

</div>

---

### 演習 3: `experiment` ブランチに切り替える

<div class="code-input">

```bash
git switch experiment
```

</div>

<div class="code-output">

```
Switched to branch 'experiment'
```

</div>

`git status` で現在のブランチを確認する。

<div class="code-input">

```bash
git status
```

</div>

<div class="code-output">

```
On branch experiment
nothing to commit, working tree clean
```

</div>

---

### 演習 4: 新しいファイルを作ってコミットする

<div class="code-input">

```bash
touch test-note.md
git add test-note.md
git commit -m "add test note on experiment branch"
```

</div>

コミットログを確認する。

<div class="code-input">

```bash
git log --oneline
```

</div>

<div class="code-output">

```
xxxxxxx (HEAD -> experiment) add test note on experiment branch
yyyyyyy (main) （以前のコミット）
```

</div>

---

### 演習 5: `main` に戻る

<div class="code-input">

```bash
git switch main
```

</div>

<div class="code-output">

```
Switched to branch 'main'
```

</div>

`git log --oneline` を確認して、`experiment` ブランチのコミットが見えないことを確かめる。

<div class="code-input">

```bash
git log --oneline
```

</div>

<div class="code-output">

```
yyyyyyy (HEAD -> main) （以前のコミット）
```

</div>

---

### 演習 6: `git switch -c` で新しいブランチを一発で作って切り替える

<div class="code-input">

```bash
git switch -c quick-test
```

</div>

<div class="code-output">

```
Switched to a new branch 'quick-test'
```

</div>

`git branch` で `*` の位置を確認する。

<div class="code-input">

```bash
git branch
```

</div>

<div class="code-output">

```
  experiment
  main
* quick-test
```

</div>

---

### Reset & Retry

⚠️ うまくいかなかったときだけ実行してください。

<div class="code-input">

```bash
git switch main
git branch -d experiment
git branch -d quick-test
```

</div>

`-d` はブランチの削除です。ブランチを削除してもコミット履歴の `main` 側は消えません。安心して試してください。

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

<!-- prev/next navigation -->
[< Previous: ブランチとは何か](01-branch-concept.md) | [Back to Index](../../../README.md) | [Next: git checkout — git switch との関係 >](03-checkout.md)
