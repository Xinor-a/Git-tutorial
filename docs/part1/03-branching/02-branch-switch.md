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

まず今どのブランチにいるか確認します。

```bash
git branch
```

実行すると、こんな出力が出るはずです。

```
* main
```

`*` がついているのが「今いるブランチ」です。現在は `main` にいます。

---

### ブランチを作る

新しいブランチを作るには `git branch <名前>` を使います。

```bash
git branch hobby-section
```

これでブランチが作られました。でもまだ `main` にいます。もう一度確認してみましょう。

```bash
git branch
```

```
  hobby-section
* main
```

`hobby-section` が増えましたが、`*` はまだ `main` についています。

---

### ブランチを切り替える

`hobby-section` に移動するには `git switch` を使います。

```bash
git switch hobby-section
```

```
Switched to branch 'hobby-section'
```

もう一度 `git branch` で確認してみましょう。

```bash
git branch
```

```
* hobby-section
  main
```

`*` が `hobby-section` に移りました。これで今のあなたは `hobby-section` ブランチにいます。

`git status` でも確認できます。

```bash
git status
```

```
On branch hobby-section
nothing to commit, working tree clean
```

「On branch hobby-section」と表示されていますね。

---

### ブランチで作業してコミットする

趣味ページを作ってコミットしてみましょう。

```bash
touch hobby.md
git add hobby.md
git commit -m "add hobby page draft"
```

```
[hobby-section xxxxxxx] add hobby page draft
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 hobby.md
```

コミットログを確認します。

```bash
git log --oneline
```

```
xxxxxxx (HEAD -> hobby-section) add hobby page draft
yyyyyyy (main) （以前のコミット）
```

`hobby-section` ブランチだけに新しいコミットがあります。`main` はまだ古いままです。

---

### main に戻ると……

`main` に切り替えてみましょう。

```bash
git switch main
```

```
Switched to branch 'main'
```

`hobby.md` がどうなっているか確認します。

```bash
git status
```

```
On branch main
nothing to commit, working tree clean
```

`hobby.md` は見えません！`ls` で確認しても存在しないはずです。**`hobby-section` ブランチのコミットは `main` には影響していない**のです。これがブランチの力です。

```bash
git log --oneline
```

```
yyyyyyy (HEAD -> main) （以前のコミット）
```

`hobby-section` で作ったコミットは、`main` のログには出てきません。

---

### 作成と切り替えを一度にやる：git switch -c

ブランチを作ってすぐ切り替えることが多いので、2つのコマンドを1つにまとめられます。

```bash
git switch -c new-branch-name
```

`-c` は「create（作成）」の略です。

```bash
git switch -c another-idea
```

```
Switched to new branch 'another-idea'
```

これで `another-idea` ブランチが作られ、すぐそこに移動しました。`git branch` → `git switch` の2ステップを1つで済ませられるので、慣れたらこちらを使うのがおすすめです。

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

1. 現在のブランチを確認する。

   ```bash
   git branch
   ```

2. `experiment` という名前のブランチを作る。

   ```bash
   git branch experiment
   ```

3. `git branch` でブランチが増えたことを確認する。

4. `experiment` ブランチに切り替える。

   ```bash
   git switch experiment
   ```

5. `git status` で現在のブランチを確認する。

   ```bash
   git status
   ```

6. 新しいファイルを作ってコミットする。

   ```bash
   touch test-note.md
   git add test-note.md
   git commit -m "add test note on experiment branch"
   ```

7. コミットログを確認する。

   ```bash
   git log --oneline
   ```

8. `main` に戻る。

   ```bash
   git switch main
   ```

9. `git log --oneline` を再度確認して、`experiment` ブランチのコミットが見えないことを確かめる。

   ```bash
   git log --oneline
   ```

10. `git switch -c` で新しいブランチを一発で作って切り替えてみる。

    ```bash
    git switch -c quick-test
    ```

11. `git branch` で `*` の位置を確認する。

    ```bash
    git branch
    ```

### Reset & Retry

うまくいかなかった場合は、以下で `main` に戻り、練習用ブランチを削除してやり直せます。

```bash
git switch main
git branch -d experiment
git branch -d quick-test
```

`-d` はブランチの削除です。ブランチを削除してもコミット履歴の `main` 側は消えません。安心して試してください。

<!-- prev/next navigation -->
[< Previous: ブランチとは何か](01-branch-concept.md) | [Back to Index](../../../README.md) | [Next: git checkout — git switch との関係 >](03-checkout.md)
