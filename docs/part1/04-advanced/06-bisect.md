# git bisect — バグが入ったコミットを探す

<!-- prev/next navigation -->
[< Previous: git cherry-pick — 特定のコミットだけを取り込む](05-cherry-pick.md) | [Back to Index](../../../README.md) | [Next: git rebase -i — コミット履歴を整理する >](07-rebase-interactive.md)

## What & Why

「先週まで動いていたのに、今日突然バグが出た」――こんなとき、どのコミットが原因か分かりますか？
`git bisect` を使えば、大量のコミット履歴の中からバグが入った1つのコミットを、効率よく見つけられます。
「真ん中を当てる」二分探索という考え方で、50個のコミットがあってもたった6回のチェックで絞り込めます。

## Content

### 二分探索って？

例えば、1〜100の中から相手が考えた数字を当てるゲームを想像してください。
毎回「50」「25」「75」…と **真ん中を選んで「大きい？小さい？」と聞く** 方法が、二分探索です。

最悪でも7回聞けば必ず当てられます（1→100→50→…と半分ずつ絞るから）。

`git bisect` はこれと同じです。
「このコミットでバグが出る？出ない？」と答えながら、真ん中のコミットに絞り込んでいきます。

---

### シナリオ

あなたのアプリ、先週は問題なく動いていたのに、今日確認したらバグがありました。
この1週間でコミットが50個ほど積み重なっています。

```bash
git log --oneline
```

```
a1b2c3d バグがある最新のコミット  ← 今ここ（壊れている）
...（たくさんのコミット）...
f6e5d4c 先週のコミット           ← ここは動いていた（正常）
```

どのコミットがバグを入れたか、一個ずつ確認していたら日が暮れてしまいます。
`git bisect` に任せましょう。

---

### git bisect の使い方

**ステップ1：bisect を開始する**

`git bisect start` で二分探索を開始します。

**ステップ2：今のコミットが「壊れている」と教える**

`git bisect bad` は「このコミットはバグがある」という意味です。
何も指定しなければ今いるコミット（HEAD）が対象になります。

**ステップ3：「正常だった」コミットを教える**

先週のコミットハッシュ（例：`f6e5d4c`）を使って `git bisect good f6e5d4c` と実行します。
`good` は「このコミットでは正常だった」という意味です。

---

### git が真ん中に連れて行ってくれる

`good` と `bad` の範囲が決まると、Gitが自動的に真ん中のコミットに切り替えてくれます。

```
Bisecting: 24 revisions left to test after this (roughly 5 steps)
[c3b2a1f] なにかの変更
```

「あと約5ステップで見つかる」と教えてくれています。

---

### テストして good / bad を答える

切り替わったコミットで、アプリやコードを確認します。

- バグが **ある** → `git bisect bad` を実行
- バグが **ない** → `git bisect good` を実行

これを繰り返すと、だんだん範囲が絞られていきます。数回繰り返すと、Gitがバグを入れたコミットを特定してくれます。

```
e7d6c5b is the first bad commit
commit e7d6c5b
Author: あなた <you@example.com>
Date:   Mon Mar 10 14:23:01 2026 +0900

    ログイン処理を変更
```

「`e7d6c5b` が最初の壊れたコミットだ」と教えてくれました。
あとはそのコミットの差分を見て、原因を調べられます。

---

### 終わったら元に戻す

bisect が終わったら、`git bisect reset` で必ず元の状態に戻りましょう。
これで HEAD が元の場所（`git bisect start` したときのブランチ）に戻ります。

---

### 自動化もできる（おまけ）

テストスクリプトがある場合は `git bisect run <スクリプト>` でバグ探しを自動化できます。
スクリプトが「成功（終了コード0）」なら `good`、「失敗（終了コード以外）」なら `bad` として自動的に判定してくれます。
規模が大きいプロジェクトでは非常に便利です。

## Summary

- `git bisect` は二分探索でバグを入れたコミットを効率よく特定できる。
- `git bisect start` で開始、`git bisect bad` と `git bisect good <hash>` で範囲を示す。
- Gitが自動的に真ん中のコミットに切り替えるので、テストして `good` か `bad` を答える。
- これを繰り返すと、バグが入ったコミットが特定される。
- 終了後は `git bisect reset` で元の状態に戻る。
- `git bisect run <script>` でテストを自動化できる。

## Exercises

### 演習: バグを入れたコミットを見つけよう

**準備**（バグ入りの履歴を作る）

<div class="code-input">

```bash
mkdir bisect-practice
cd bisect-practice
git init
echo "print('hello')" > app.py && git add app.py && git commit -m "commit 1: hello"
echo "print('world')" >> app.py && git add app.py && git commit -m "commit 2: world"
echo "BUG" >> app.py && git add app.py && git commit -m "commit 3: なにかを変更"
echo "print('more')" >> app.py && git add app.py && git commit -m "commit 4: more"
echo "print('done')" >> app.py && git add app.py && git commit -m "commit 5: done"
```

</div>

「`BUG` という文字列が含まれているコミット」= バグが入ったコミット と仮定します。

1. コミット履歴を確認する。

   <div class="code-input">

   ```bash
   git log --oneline
   ```

   </div>

   最も古いコミット（commit 1）のハッシュをメモしておく。

2. bisect を開始する。

   <div class="code-input">

   ```bash
   git bisect start
   ```

   </div>

3. 今のコミット（最新）が壊れていると教える。

   <div class="code-input">

   ```bash
   git bisect bad
   ```

   </div>

4. 最初のコミットは正常だったと教える（ハッシュは自分でメモした値を使う）。

   <div class="code-input">

   ```bash
   git bisect good <commit 1 のハッシュ>
   ```

   </div>

5. Gitが真ん中のコミットに切り替えるので、`app.py` を確認する。

   <div class="code-input">

   ```bash
   cat app.py
   ```

   </div>

   `BUG` という文字が含まれている → `git bisect bad` を実行
   含まれていない → `git bisect good` を実行

   <div class="code-input">

   ```bash
   git bisect bad
   ```

   </div>

6. 繰り返してバグを入れたコミットを特定する。

7. 特定されたら `git status` で状態を確認する。

   <div class="code-input">

   ```bash
   git status
   ```

   </div>

   <div class="code-output">

   ```
   HEAD detached at e7d6c5b
   nothing to commit, working tree clean
   ```

   </div>

8. bisect を終了して元に戻る。

   <div class="code-input">

   ```bash
   git bisect reset
   ```

   </div>

9. `git log --oneline` で HEAD が元に戻ったことを確認する。

   <div class="code-input">

   ```bash
   git log --oneline
   ```

   </div>

   <div class="code-output">

   ```
   xxxxxxx (HEAD -> main) commit 5: done
   xxxxxxx commit 4: more
   xxxxxxx commit 3: なにかを変更
   xxxxxxx commit 2: world
   xxxxxxx commit 1: hello
   ```

   </div>

---

### Reset & Retry

⚠️ うまくいかなかったときだけ実行してください。

<div class="code-input">

```bash
git bisect reset
cd ..
rm -rf bisect-practice
```

</div>

もう一度「準備」の手順から始めよう。

<!-- prev/next navigation -->
[< Previous: git cherry-pick — 特定のコミットだけを取り込む](05-cherry-pick.md) | [Back to Index](../../../README.md) | [Next: git rebase -i — コミット履歴を整理する >](07-rebase-interactive.md)
