# マージコンフリクトを解決する

[< Previous: ブランチをマージする](04-merge.md) | [Back to Index](../../../README.md) | [Next: git rebase — 歴史を整える >](06-rebase.md)

## What & Why

前のページの最後で、こんなメッセージが出ました。

```
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```

これは**マージコンフリクト（merge conflict）**です。
同じファイルの同じ行を2つのブランチで別々に変更したとき、Git は「どちらを正解にすればいいかわからない」と手を止めます。
人間が判断して、正しい内容を選んであげる必要があります。

## Content

### なぜコンフリクトが起きたのか

前のページでは次のことをしました。

- `conflict-test` ブランチ：`README.md` の1行目を「conflict-test ブランチ版」に変更
- `main` ブランチ：`README.md` の1行目を「main ブランチ版」に変更

どちらも**同じ行**を書き換えたので、Git は自動でどちらを採用すればいいか判断できませんでした。

### ① まず状況を確認する

```bash
git status
```

```
On branch main
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)
	both modified:   README.md

no changes added to commit (use "git add" and/or "git commit -a")
```

「**Unmerged paths**」に `README.md` が表示されています。
このファイルを開いて、コンフリクトを解決する必要があります。

### ② コンフリクトマーカーを読む

`README.md` を開くと、次のような内容になっています。

```markdown
<<<<<<< HEAD
# 私の日記アプリ（main ブランチ版）
=======
# 私の日記アプリ（conflict-test ブランチ版）
>>>>>>> conflict-test
```

3種類のマーカーが登場します。

| マーカー | 意味 |
| --- | --- |
| `<<<<<<< HEAD` | ここから下が「今いるブランチ（main）」の内容 |
| `=======` | 区切り線 |
| `>>>>>>> conflict-test` | ここまでが「マージしようとしたブランチ」の内容 |

この**マーカーごとファイルに書き込まれている状態**が、コンフリクトが起きているファイルの姿です。
Git はあなたに「この2つのどちらを使う？それとも両方いる？」と問いかけています。

### ③ ファイルを編集して解決する

コンフリクトの解決はシンプルです。
**残したい内容だけにして、マーカーをすべて削除する**だけです。

今回は `main` ブランチの内容を採用するとしましょう。

```markdown
# 私の日記アプリ（main ブランチ版）
```

マーカー行（`<<<<<<<`、`=======`、`>>>>>>>`）はすべて消してください。
マーカーが1文字でも残っていると、Git はコンフリクトが解決されていないと判断します。

> 💡 **VSCode を使っている場合**
>
> VSCode はコンフリクトマーカーを検出すると、ファイル上部に
> 「Accept Current Change / Accept Incoming Change / Accept Both Changes」
> のボタンを表示します。ボタンをクリックするだけで選べるので便利です。
> ただし、「手動で編集する方法」も必ず覚えておいてください。どんな環境でも使えるからです。

### ④ `git add` でマーク済みにする

編集が終わったら、「このファイルのコンフリクトは解決しました」と Git に伝えます。

```bash
git add README.md
```

`git status` で確認すると、ステータスが変わっています。

```bash
git status
```

```
On branch main
All conflicts fixed but you are still merging.
  (use "git commit" to conclude merge)

Changes to be committed:
	modified:   README.md
```

「All conflicts fixed」と表示されたらOKです。

### ⑤ `git commit` でマージを完了させる

```bash
git commit
```

メッセージを入力するエディタが開きます。デフォルトでは次のようなメッセージが入っています。

```
Merge branch 'conflict-test'
```

そのまま保存して閉じれば完了です（変えてもかまいません）。

```
[main f7a8b9c] Merge branch 'conflict-test'
```

マージコミットが作られました。

### ⑥ 結果を確認する

```bash
git log --oneline
```

```
f7a8b9c (HEAD -> main) Merge branch 'conflict-test'
g0h1i2j docs: update README title on main
k3l4m5n (conflict-test) docs: update README title on conflict-test
e4f5g6h diary: add chapter 3
...
```

マージコミットが `main` の先頭にあります。
`conflict-test` ブランチのコミットも履歴に残っているのがわかります。

```bash
git status
```

```
On branch main
nothing to commit, working tree clean
```

クリーンな状態に戻りました。お疲れ様です！

---

### ちなみに：マージを途中でやめたいときは？

コンフリクトを解決するのが大変そうだったり、やっぱりマージをやめたいときは `--abort` を使えます。

```bash
git merge --abort
```

これでマージ前の状態に戻れます。落ち着いて仕切り直しましょう。

## Summary

- コンフリクトは「同じファイルの同じ行を2つのブランチで変えたとき」に起きる。
- Git はコンフリクトしたファイルにマーカー（`<<<<<<<`、`=======`、`>>>>>>>`）を書き込む。
- 解決方法：ファイルを編集して残したい内容だけにし、マーカーを全削除する。
- `git add <file>` で「解決済み」とマークし、`git commit` でマージを完了する。
- `git merge --abort` でマージを途中キャンセルできる。

## Exercises

### 練習1：マージコンフリクトを自分で起こして解決する

前のページの手順（conflict-test シナリオ）をもう一度最初からやってみましょう。
今度はコンフリクトが出ても慌てずに解決してください。

1. `conflict-test` ブランチを作成して `README.md` を編集・コミットする。

   ```bash
   git switch -c conflict-test
   # README.md の1行目を編集する
   git add README.md
   git commit -m "docs: update README on conflict-test"
   ```

2. `main` に戻って同じ行を別の内容に編集・コミットする。

   ```bash
   git switch main
   # README.md の1行目を別の内容に編集する
   git add README.md
   git commit -m "docs: update README on main"
   ```

3. マージしてコンフリクトを発生させる。

   ```bash
   git merge conflict-test
   ```

4. `git status` でどのファイルがコンフリクトしているか確認する。

   ```bash
   git status
   ```

5. ファイルを開いてマーカーを確認し、残したい内容だけにして保存する。

6. `git add` でマーク済みにして、`git commit` でマージを完了する。

   ```bash
   git add README.md
   git status
   git commit
   ```

7. `git log --oneline` でマージコミットが作られたことを確認する。

   ```bash
   git log --oneline
   ```

### 練習2：`--abort` でマージをキャンセルする

コンフリクトが発生した直後（`git commit` する前）に `git merge --abort` を実行して、
状態が元に戻ることを確認してみましょう。

```bash
git merge conflict-test
# コンフリクト発生
git merge --abort
git status
git log --oneline
```

### Reset & Retry

```
git merge --abort
git switch main
git branch -D conflict-test
git checkout README.md
```

> `git merge --abort` はマージ中の場合のみ有効です。
> マージ中でない場合はエラーになりますが、無視して次のコマンドに進んで大丈夫です。

---

[< Previous: ブランチをマージする](04-merge.md) | [Back to Index](../../../README.md) | [Next: git rebase — 歴史を整える >](06-rebase.md)
