# git cherry-pick — 特定のコミットだけを取り込む

<!-- prev/next navigation -->
[< Previous: git reflog — 失ったコミットを取り戻す](04-reflog.md) | [Back to Index](../../../README.md) | [Next: git bisect — バグが入ったコミットを探す >](06-bisect.md)

## What & Why

ブランチ全体はまだマージしたくないけど、あの1つのバグ修正だけ今すぐ `main` に入れたい――そんなときに使えるのが `git cherry-pick` です。
特定のコミットだけをコピーして、今いるブランチに追加できます。

## Content

### シナリオ

あなたは `feature/login` ブランチで新機能を開発中です。
まだ完成していないので `main` にマージはできません。

でも、その作業中に重大なバグを見つけて修正しました。
そのバグ修正コミット **1つだけ** を、今すぐ `main` に反映させたい。

```
feature/login ブランチのコミット履歴:
  abc1234  ログイン画面のUIを作成（まだ途中）
  def5678  パスワードのバリデーションを追加（まだ途中）
  9a8b7c6  重大なバグを修正  ← これだけ main に入れたい！
  3f2e1d0  initial commit
```

---

### git cherry-pick の使い方

`git checkout main` で `main` ブランチに切り替えてから、取り込みたいコミットのハッシュを指定して `git cherry-pick 9a8b7c6` を実行します。

成功すると、こんなメッセージが出ます。

```
[main c4d5e6f] 重大なバグを修正
 1 file changed, 3 insertions(+), 1 deletion(-)
```

---

### cherry-pick 前の main を確認しよう

cherry-pick する前に `git log` で main の状態を確認しておくと、実行後の変化がよくわかります。

```bash
git log --oneline
```

```
3f2e1d0 initial commit
```

cherry-pick を実行すると、バグ修正コミットが main に追加されます。

注目してほしいのは **ハッシュが変わる** 点です。
`feature/login` 側では `9a8b7c6` だったのに、`main` では別のハッシュになります。

これは cherry-pick が「コピー」だからです。
同じ変更内容でも、コミットとして新しく作り直されるのでハッシュが変わります。
元のコミットが消えるわけではなく、`feature/login` ブランチにはまだ `9a8b7c6` が残っています。

---

### どんなときに使う？

cherry-pick が役立つ場面をまとめると：

- **ホットフィックス**：バグ修正だけを `main` にすぐ入れたいとき
- **バックポート**：新しいバージョンで直したバグを、古いバージョンにも適用したいとき
- **廃棄ブランチの救出**：中断したブランチの中に、使えるコミットが1つだけあるとき

---

### 使わないほうがいい場面

ブランチのコミットをぜんぶ取り込みたいなら、素直に `git merge` を使いましょう。
cherry-pick は「1つ（または数個）だけ欲しい」という場面向きです。
多用すると同じ変更が複数ブランチに散らばって、後で管理が大変になることがあります。

## Summary

- `git cherry-pick <hash>` で、指定したコミットだけを今のブランチにコピーできる。
- コミットはコピーなので、ハッシュが変わる（元のコミットは消えない）。
- ホットフィックスやバックポートに便利。
- ブランチ全体を取り込みたい場合は `git merge` を使う。

## Exercises

### 演習: バグ修正だけを main に取り込もう

**準備**

<div class="code-input">

```bash
mkdir cherry-practice && cd cherry-practice
git init
echo "app v1" > app.txt && git add app.txt && git commit -m "initial commit"
```

</div>

<div class="code-input">

```bash
git checkout -b feature/new-ui
echo "new ui" >> app.txt && git add app.txt && git commit -m "新UIを追加（未完成）"
echo "bugfix" >> app.txt && git add app.txt && git commit -m "重大なバグを修正"
echo "more ui" >> app.txt && git add app.txt && git commit -m "UIをさらに追加（未完成）"
```

</div>

1. `feature/new-ui` のコミット履歴を確認する。

   <div class="code-input">

   ```bash
   git log --oneline
   ```

   </div>

   <div class="code-output">

   ```
   xxxxxxx UIをさらに追加（未完成）
   yyyyyyy 重大なバグを修正
   zzzzzzz 新UIを追加（未完成）
   wwwwwww initial commit
   ```

   </div>

   「重大なバグを修正」のハッシュをメモしておく。

2. `main` ブランチに切り替える。

   <div class="code-input">

   ```bash
   git checkout main
   ```

   </div>

   <div class="code-input">

   ```bash
   git log --oneline
   ```

   </div>

   <div class="code-output">

   ```
   wwwwwww initial commit
   ```

   </div>

   `main` にはまだ initial commit しかないことを確認する。

3. バグ修正コミットだけを cherry-pick する（ハッシュは自分でメモした値を使う）。

   <div class="code-input">

   ```bash
   git cherry-pick <バグ修正のハッシュ>
   ```

   </div>

4. `git log` で確認する。

   <div class="code-input">

   ```bash
   git log --oneline
   ```

   </div>

   <div class="code-output">

   ```
   aaaaaaa 重大なバグを修正
   wwwwwww initial commit
   ```

   </div>

   バグ修正コミットが追加されていることを確認しよう。

5. ハッシュが変わっていることを確認する。

   `feature/new-ui` 側のハッシュと `main` 側のハッシュを見比べてみよう。

   <div class="code-input">

   ```bash
   git log --oneline --all
   ```

   </div>

6. `git status` も確認する。

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

---

### Reset & Retry

⚠️ うまくいかなかったときだけ実行してください。

<div class="code-input">

```bash
cd ..
rm -rf cherry-practice
```

</div>

もう一度「準備」の手順から始めよう。

<!-- prev/next navigation -->
[< Previous: git reflog — 失ったコミットを取り戻す](04-reflog.md) | [Back to Index](../../../README.md) | [Next: git bisect — バグが入ったコミットを探す >](06-bisect.md)
