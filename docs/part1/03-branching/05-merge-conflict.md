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

### ④ `git add` でマーク済みにして `git commit` でマージを完了する

編集が終わったら、`git add <ファイル名>` で「このファイルのコンフリクトは解決しました」と Git に伝えます。
ステージングが完了したら `git commit` でマージを完了させます。エディタが開いたらデフォルトのメッセージ（`Merge branch 'conflict-test'`）のまま保存して閉じれば OK です。

### ちなみに：マージを途中でやめたいときは？

コンフリクトを解決するのが大変そうだったり、やっぱりマージをやめたいときは `git merge --abort` を使えます。
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

   <div class="code-input">

   ```bash
   git switch -c conflict-test
   ```

   </div>

   `README.md` の1行目を編集してから：

   <div class="code-input">

   ```bash
   git add README.md
   git commit -m "docs: update README on conflict-test"
   ```

   </div>

2. `main` に戻って同じ行を別の内容に編集・コミットする。

   <div class="code-input">

   ```bash
   git switch main
   ```

   </div>

   `README.md` の1行目を別の内容に編集してから：

   <div class="code-input">

   ```bash
   git add README.md
   git commit -m "docs: update README on main"
   ```

   </div>

3. マージしてコンフリクトを発生させる。

   <div class="code-input">

   ```bash
   git merge conflict-test
   ```

   </div>

4. `git status` でどのファイルがコンフリクトしているか確認する。

   <div class="code-input">

   ```bash
   git status
   ```

   </div>

   <div class="code-output">

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

   </div>

5. ファイルを開いてマーカーを確認し、残したい内容だけにして保存する。

6. `git add` でマーク済みにして、`git commit` でマージを完了する。

   <div class="code-input">

   ```bash
   git add README.md
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
   All conflicts fixed but you are still merging.
     (use "git commit" to conclude merge)

   Changes to be committed:
   	modified:   README.md
   ```

   </div>

   <div class="code-input">

   ```bash
   git commit
   ```

   </div>

   <div class="code-output">

   ```
   [main f7a8b9c] Merge branch 'conflict-test'
   ```

   </div>

7. `git log --oneline` でマージコミットが作られたことを確認する。

   <div class="code-input">

   ```bash
   git log --oneline
   ```

   </div>

   <div class="code-output">

   ```
   f7a8b9c (HEAD -> main) Merge branch 'conflict-test'
   g0h1i2j docs: update README title on main
   k3l4m5n (conflict-test) docs: update README title on conflict-test
   e4f5g6h diary: add chapter 3
   ...
   ```

   </div>

---

### 練習2：`--abort` でマージをキャンセルする

コンフリクトが発生した直後（`git commit` する前）に `git merge --abort` を実行して、
状態が元に戻ることを確認してみましょう。

<div class="code-input">

```bash
git merge conflict-test
```

</div>

コンフリクトが発生したら、そのままキャンセルする：

<div class="code-input">

```bash
git merge --abort
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

<div class="code-input">

```bash
git log --oneline
```

</div>

---

### Reset & Retry

⚠️ うまくいかなかったときだけ実行してください。

<div class="code-input">

```bash
git merge --abort
git switch main
git branch -D conflict-test
git checkout README.md
```

</div>

> `git merge --abort` はマージ中の場合のみ有効です。
> マージ中でない場合はエラーになりますが、無視して次のコマンドに進んで大丈夫です。

---

[< Previous: ブランチをマージする](04-merge.md) | [Back to Index](../../../README.md) | [Next: git rebase — 歴史を整える >](06-rebase.md)
