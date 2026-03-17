# git revert — 安全にコミットを取り消す

<!-- prev/next navigation -->
[< Previous: git reset — 歴史を巻き戻す](01-reset.md) | [Back to Index](../../../README.md) | [Next: git restore — ファイルの変更を元に戻す >](03-restore.md)

## What & Why

前のページでは `git reset` を学びました。でも reset は「歴史を書き換える」ので、すでに push したコミットには使えません。  
`git revert` は **新しいコミットを追加することで**、過去のコミットを安全に取り消すコマンドです。  
歴史はそのまま保たれるので、チームで共有しているブランチでも安心して使えます。

## Content

### シナリオ：push 済みのバグを取り消したい

あなたはメインブランチで作業していて、昨日こんなコミットを push しました。

```bash
git log --oneline
```

```
f8e7d6c バグのあるコードを追加してしまった
a5b4c3d ヘッダーを修正
9d8e7f6 README を更新
```

`f8e7d6c` のコミットがバグの原因だと判明。でも、このコミットはすでに push 済みで、チームメンバーが pull しているかもしれません。  
ここで `git reset` を使って歴史を書き換えてしまうと、チームに大混乱が起きます。

そこで `git revert` の出番です。

---

### `git revert <ハッシュ>` ― 指定したコミットを取り消す

```bash
git revert f8e7d6c
```

このコマンドを実行すると、エディタが開いてコミットメッセージを求められます。  
デフォルトで以下のようなメッセージが入力されています：

```
Revert "バグのあるコードを追加してしまった"

This reverts commit f8e7d6c.
```

そのまま保存して閉じると、revert コミットが作成されます。

---

### 実行後の履歴を確認する

```bash
git log --oneline
```

```
2c1b0a9 Revert "バグのあるコードを追加してしまった"
f8e7d6c バグのあるコードを追加してしまった
a5b4c3d ヘッダーを修正
9d8e7f6 README を更新
```

**ポイント：** `f8e7d6c` のコミットは消えていません。  
代わりに、その変更を打ち消す新しいコミット `2c1b0a9` が追加されています。

歴史が保たれているので、チームメンバーは普通に `git pull` するだけで最新状態になります。  
「なぜ取り消したのか」も履歴に残るので、後から見返したときにも状況がわかります。

---

### `git revert HEAD` ― 直前のコミットを取り消す

最新のコミットを取り消したいだけなら、ハッシュを調べなくても `HEAD` で指定できます。

```bash
git revert HEAD
```

これは `git revert <最新のコミットのハッシュ>` と同じ意味です。

---

### reset と revert、どちらを使う？

| 状況 | 使うコマンド |
|------|------------|
| ローカルのみのコミット（まだ push していない） | `git reset` |
| すでに push したコミット | `git revert` |
| チームで共有しているブランチ | `git revert` |
| 個人の作業ブランチ（push 前） | `git reset` でも可 |

シンプルに言うと：**「push したら revert」** と覚えておきましょう。

---

### revert はコミット単位で動く

`git revert` は指定した1つのコミットの変更を打ち消します。  
そのコミット以降の変更には手を加えません。

たとえば `a5b4c3d` を revert しても、それより新しい `f8e7d6c` は影響を受けません。  
それぞれのコミットが独立して取り消せるのが revert の強みです。

> 💡 **注意：** 古いコミットを revert すると、その後の変更と内容が衝突（コンフリクト）することがあります。
> そのときは通常のコンフリクト解消と同じように対応してください
> （コンフリクト解消は [マージの章](../03-branching/05-conflict.md) を参照）。

## Summary

- `git revert <ハッシュ>` は、指定コミットの変更を打ち消す**新しいコミット**を作る。
- 歴史は書き換えず、取り消しの記録として残る——チームでも安全に使える。
- `git revert HEAD` で直前のコミットをすぐ取り消せる。
- **push 済みのコミットには revert、ローカルのみなら reset** が基本の使い分け。

## Exercises

### 準備

練習用のリポジトリを作ります。

```bash
mkdir revert-practice && cd revert-practice
git init
echo "最初の内容" > app.txt
git add app.txt
git commit -m "最初のコミット"

echo "良い変更" >> app.txt
git add app.txt
git commit -m "良い変更を追加"

echo "バグのある変更" >> app.txt
git add app.txt
git commit -m "バグのある変更を追加"

echo "その後の変更" >> app.txt
git add app.txt
git commit -m "その後の変更"
```

現在の状態を確認：

```bash
git log --oneline
```

```
xxxxxxx その後の変更
yyyyyyy バグのある変更を追加
zzzzzzz 良い変更を追加
wwwwwww 最初のコミット
```

---

### 演習1：直前のコミットを revert する

```bash
git revert HEAD
```

エディタが開いたらデフォルトのメッセージのまま保存して閉じてください。

ログを確認：

```bash
git log --oneline
```

「Revert "その後の変更"」というコミットが追加されていることを確認してください。  
元のコミットは消えていないことも確認しましょう。

---

### 演習2：特定のコミットを revert する

「バグのある変更を追加」のコミットハッシュをコピーして：

```bash
git log --oneline
```

```bash
git revert <バグのコミットのハッシュ>
```

コンフリクトが起きた場合は、ファイルを編集してコンフリクトを解消し、`git add` してから `git revert --continue` を実行してください。

ログを確認：

```bash
git log --oneline
git status
```

---

### Reset & Retry

練習をやり直したい場合：

```bash
cd ..
rm -rf revert-practice
```

「準備」の手順から再実行してください。

---

<!-- prev/next navigation (repeated at bottom) -->
[< Previous: git reset — 歴史を巻き戻す](01-reset.md) | [Back to Index](../../../README.md) | [Next: git restore — ファイルの変更を元に戻す >](03-restore.md)
