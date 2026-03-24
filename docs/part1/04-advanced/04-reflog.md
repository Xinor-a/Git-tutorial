# git reflog — 失ったコミットを取り戻す

<!-- prev/next navigation -->
[< Previous: git restore — ファイルの変更を元に戻す](03-restore.md) | [Back to Index](../../../README.md) | [Next: git cherry-pick — 特定のコミットだけを取り込む >](05-cherry-pick.md)

## What & Why

`git reset --hard` をやりすぎてコミットが消えた！　と焦ったことはありませんか？
実はGitは、あなたが思うよりずっと記憶力がいいんです。
`git reflog` を使えば、「消えた」と思っていたコミットを約90日間は取り戻せます。

## Content

### シナリオ

あなたはフィーチャーブランチで作業中。
気づいたら `git reset --hard HEAD~2` を実行してしまい、2つ分のコミットが消えてしまいました。

```
あ……やっちゃった。コミット消えた……
```

でも大丈夫。Gitにはこっそり「全履歴メモ帳」があります。それが **reflog（リフログ）** です。

---

### reflog ってなに？

Git は `HEAD` が移動するたびに、その記録をローカルに保存しています。
`git reset`、`git checkout`、`git commit` など、なにかするたびにメモされるイメージです。

この記録を見るコマンドが `git reflog` です。

```bash
git reflog
```

実行すると、こんな出力が出ます。

```
a3f9c21 HEAD@{0}: reset: moving to HEAD~2
d7e1b04 HEAD@{1}: commit: スタイルを修正
8c2a931 HEAD@{2}: commit: ログイン機能を追加
3b0f714 HEAD@{3}: commit: initial commit
```

左から順に：

- `a3f9c21` — そのときのコミットハッシュ
- `HEAD@{0}` — 「今から0回前の状態」（`{0}` が最新）
- 右側 — どんな操作だったかのメモ

つまり `HEAD@{2}` は「2回前の HEAD の状態」= まだコミットが消える前の位置です。

---

### reflog を使って元に戻す

「消えた」コミットのハッシュが分かったので、そこまで戻りましょう。

**方法1：その場で戻す（ブランチごと）**

`git reset --hard HEAD@{2}` を実行すると、`HEAD@{2}` の状態——つまり `git reset --hard` をする前の状態——に戻れます。

**方法2：別ブランチに「救出」する**

今いるブランチを変えたくない場合は、新しいブランチとして取り出せます。

`git checkout HEAD@{2} -b recovery-branch` を実行すると、`recovery-branch` という新しいブランチが作られ、そこに「消えた」コミットが入った状態になります。
落ち着いてから中身を確認して、必要なら元のブランチにマージできます。

---

### reflog の有効期限

reflog の記録はずっと残るわけではありません。
デフォルトでは **約90日** で自動的に消えます（`git reflog expire` というコマンドで管理されています）。

90日あれば、たいていのミスは取り戻せます。
でも「絶対消したくない大事な変更」は、ちゃんとブランチやタグに残しておくのが安心です。

---

### まとめ：Gitはあなたの味方

`git reset --hard` でコミットを消してしまっても、reflog があればたいていの場合は助かります。
「やらかした！」と気づいたら、まず `git reflog` を打ってみましょう。

## Summary

- `git reflog` は HEAD の移動履歴をすべて記録している。
- `HEAD@{n}` で「n回前の HEAD の状態」を参照できる。
- `git reset --hard HEAD@{n}` でその時点まで戻れる。
- `git checkout HEAD@{n} -b <branch-name>` で別ブランチとして救出もできる。
- reflog の記録はデフォルトで約90日間保持される。

## Exercises

### 演習: 消えたコミットを取り戻そう

**準備**

<div class="code-input">

```bash
mkdir reflog-practice && cd reflog-practice
git init
echo "first" > memo.txt && git add memo.txt && git commit -m "first commit"
echo "second" >> memo.txt && git add memo.txt && git commit -m "second commit"
echo "third" >> memo.txt && git add memo.txt && git commit -m "third commit"
```

</div>

1. 現在のコミット履歴を確認する。

   <div class="code-input">

   ```bash
   git log --oneline
   ```

   </div>

   <div class="code-output">

   ```
   xxxxxxx third commit
   xxxxxxx second commit
   xxxxxxx first commit
   ```

   </div>

2. わざと2つ前に戻す（ミスを再現）。

   <div class="code-input">

   ```bash
   git reset --hard HEAD~2
   ```

   </div>

3. `git log` で確認する。

   <div class="code-input">

   ```bash
   git log --oneline
   ```

   </div>

   <div class="code-output">

   ```
   xxxxxxx first commit
   ```

   </div>

   `second commit` と `third commit` が消えているはず。

4. `git reflog` で記録を確認する。

   <div class="code-input">

   ```bash
   git reflog
   ```

   </div>

   <div class="code-output">

   ```
   xxxxxxx HEAD@{0}: reset: moving to HEAD~2
   xxxxxxx HEAD@{1}: commit: third commit
   xxxxxxx HEAD@{2}: commit: second commit
   xxxxxxx HEAD@{3}: commit: first commit
   ```

   </div>

   `HEAD@{1}` や `HEAD@{2}` に消えたコミットが見えるはず。

5. コミットを取り戻す。

   <div class="code-input">

   ```bash
   git reset --hard HEAD@{1}
   ```

   </div>

6. `git log` で確認する。

   <div class="code-input">

   ```bash
   git log --oneline
   ```

   </div>

   <div class="code-output">

   ```
   xxxxxxx third commit
   xxxxxxx second commit
   xxxxxxx first commit
   ```

   </div>

   コミットが戻っていれば成功！

7. `git status` も確認しておこう。

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
rm -rf reflog-practice
```

</div>

もう一度「準備」の手順から始めよう。

<!-- prev/next navigation -->
[< Previous: git restore — ファイルの変更を元に戻す](03-restore.md) | [Back to Index](../../../README.md) | [Next: git cherry-pick — 特定のコミットだけを取り込む >](05-cherry-pick.md)
