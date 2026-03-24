# git restore — ファイルの変更を元に戻す

<!-- prev/next navigation -->
[< Previous: git revert — 安全にコミットを取り消す](02-revert.md) | [Back to Index](../../../README.md) | [Next: git reflog — 失ったコミットを取り戻す >](04-reflog.md)

## What & Why

「このファイル、編集しすぎてぐちゃぐちゃになった。最後のコミット時点に戻したい」——そんなとき `git restore` が使えます。
コミット単位で巻き戻す reset/revert と違い、`git restore` は **ファイル単位で変更を元に戻す** コマンドです。
ステージングの取り消しにも使えて、「間違えて `git add` してしまった」ときにも活躍します。

## Content

### シナリオ：間違ったファイルを編集してしまった

あなたは `main.py` と `config.py` の2つのファイルを編集しています。

```bash
git status
```

```
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   config.py
        modified:   main.py
```

「あ、`config.py` は間違えて編集してしまった。`main.py` の変更は残したいけど、`config.py` は元に戻したい……」

---

### `git restore <ファイル>` ― 特定ファイルの変更を捨てる

`git restore config.py` を実行すると、`config.py` の変更だけを捨てられます。

> ⚠️ **警告：この操作は元に戻せません**
> `git restore` で捨てた変更は、コミットされていないため reflog にも残りません。
> 本当に捨てていいか確認してから実行してください。

`main.py` はそのまま残り、`config.py` だけが最後のコミット時点に戻ります。

---

### `git restore .` ― すべての変更を捨てる

ワーキングツリー（コミットされていないファイルへの変更）をすべて元に戻したい場合は `git restore .` を使います。

> ⚠️ **警告：ステージされていないすべての変更が消えます。**
> 実行前に `git status` で何が変更されているかを必ず確認しましょう。

---

### `git restore --staged <ファイル>` ― ステージングを取り消す

`git add` してステージに上げたファイルを、ステージから外したい（でもファイルの変更は残したい）場合は `git restore --staged <ファイル>` を使います。

実行後にファイルの変更内容はそのまま残り、ステージングだけが取り消されます。

---

### 古いコマンドとの関係

`git restore` は Git 2.23（2019年）で追加されたコマンドです。
それ以前は別のコマンドで同じことをしていました：

| やりたいこと | 旧コマンド | 新コマンド |
|------------|-----------|----------|
| ファイルの変更を捨てる | `git checkout -- <ファイル>` | `git restore <ファイル>` |
| ステージングを取り消す | `git reset HEAD <ファイル>` | `git restore --staged <ファイル>` |

古いチュートリアルやStack Overflowで旧コマンドが出てきても、やっていることは同じです。
現在は `git restore` が推奨されています。

---

### restore と reset/revert の使い分け

| やりたいこと | 使うコマンド |
|------------|-----------|
| ファイルの変更を捨てたい（コミット前） | `git restore <ファイル>` |
| `git add` を取り消したい | `git restore --staged <ファイル>` |
| コミットを取り消したい（ローカルのみ） | `git reset` |
| コミットを取り消したい（push 済み） | `git revert` |

---

### ⚠️ restore vs reset --hard の回復可能性

`git restore` で捨てた変更と `git reset --hard` で捨てた変更、どちらも消えますが微妙に違います：

- `git reset --hard` で消えたコミット → **reflog で復元できる可能性がある**（次のページで学びます）
- `git restore` で捨てた変更 → **コミットされていないので reflog にも残らない。復元不可**

つまり `git restore` の方がより最終的な破壊的操作です。使うときは慎重に。

## Summary

- `git restore <ファイル>` でファイルを最後のコミット時点に戻せる——**元に戻せない**ので要注意。
- `git restore .` でワーキングツリーの変更をすべて捨てられる。
- `git restore --staged <ファイル>` で `git add` を取り消せる（ファイルの変更は残る）。
- 旧コマンド `git checkout -- <ファイル>` と `git reset HEAD <ファイル>` の現代的な代替。
- コミット前の変更は reflog にも残らないため、`git restore` は慎重に使う。

## Exercises

### 準備

練習用のリポジトリを作ります。

<div class="code-input">

```bash
mkdir restore-practice && cd restore-practice
git init
echo "最初の内容" > main.txt
echo "設定の内容" > config.txt
git add main.txt config.txt
git commit -m "最初のコミット"
```

</div>

---

### 演習1：ファイルの変更を捨てる

<div class="code-input">

```bash
echo "間違えた変更" >> config.txt
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
  (use "git restore <file>..." to discard changes in working directory)
        modified:   config.txt
```

</div>

変更が表示されることを確認してから：

<div class="code-input">

```bash
git restore config.txt
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

変更が消えていることを確認してください。

<div class="code-input">

```bash
cat config.txt
```

</div>

<div class="code-output">

```
設定の内容
```

</div>

元の内容に戻っていることを確認しましょう。

---

### 演習2：ステージングを取り消す

<div class="code-input">

```bash
echo "main の変更" >> main.txt
echo "config の変更" >> config.txt
git add main.txt config.txt
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
        modified:   config.txt
        modified:   main.txt
```

</div>

両方がステージされていることを確認してから、`config.txt` だけステージから外します：

<div class="code-input">

```bash
git restore --staged config.txt
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
        modified:   main.txt

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   config.txt
```

</div>

`main.txt` はステージされたまま、`config.txt` はステージから外れていることを確認してください。
`config.txt` のファイル内容は変わっていないことも確認しましょう：

<div class="code-input">

```bash
cat config.txt
```

</div>

<div class="code-output">

```
設定の内容
config の変更
```

</div>

---

### 演習3：すべての変更を捨てる

<div class="code-input">

```bash
echo "変更A" >> main.txt
echo "変更B" >> config.txt
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
        modified:   main.txt

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   config.txt
        modified:   main.txt
```

</div>

2つのファイルが変更されていることを確認してから：

<div class="code-input">

```bash
git restore .
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
        modified:   main.txt
```

</div>

> 💡 `git restore .` はワーキングツリーの変更だけを捨てます。ステージ済みの変更（`git add` 済み）は残ります。
> すべてを元に戻したい場合は `git restore --staged .` でステージも解除してから `git restore .` を実行しましょう。

<div class="code-input">

```bash
git log --oneline
```

</div>

<div class="code-output">

```
xxxxxxx 最初のコミット
```

</div>

---

### Reset & Retry

⚠️ うまくいかなかったときだけ実行してください。

<div class="code-input">

```bash
cd ..
rm -rf restore-practice
```

</div>

「準備」の手順から再実行してください。

---

<!-- prev/next navigation (repeated at bottom) -->
[< Previous: git revert — 安全にコミットを取り消す](02-revert.md) | [Back to Index](../../../README.md) | [Next: git reflog — 失ったコミットを取り戻す >](04-reflog.md)
