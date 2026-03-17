# git checkout — git switch との関係

<!-- prev/next navigation -->
[< Previous: ブランチを作って切り替える](02-branch-switch.md) | [Back to Index](../../../README.md) | [Next: ブランチをマージする >](04-merge.md)

## What & Why

前のページで `git switch` を使ってブランチを切り替えました。このページでは「`git checkout`」という古いコマンドを紹介します。ネットの記事や古いドキュメントによく出てくるので、意味がわかるようになっておきましょう。

## Content

### git checkout って何？

`git switch` が登場する前、ブランチの切り替えはずっと `git checkout` で行われていました。2つは「ブランチを切り替える」という点では同じ動作をします。

```bash
# これと……
git switch hobby-section

# これは同じ意味
git checkout hobby-section
```

どちらを使っても `hobby-section` ブランチに切り替わります。

---

### ブランチの作成と切り替えも同じ

`git switch -c` に相当する操作も `git checkout` でできます。

| git switch | git checkout | やること |
|---|---|---|
| `git switch <branch>` | `git checkout <branch>` | ブランチを切り替える |
| `git switch -c <branch>` | `git checkout -b <branch>` | 作成して切り替える |

`-b` が「branch（ブランチ）の作成」に相当します。

---

### なぜ git switch が生まれたの？

`git checkout` はブランチの切り替えだけでなく、**ファイルの変更を元に戻す**ことにも使えました。

```bash
# ブランチの切り替え
git checkout main

# ファイルの変更を元に戻す（まったく別の操作！）
git checkout -- diary.md
```

同じコマンドなのに動作が全然違う。これが初心者にとって非常にわかりにくかったため、git 2.23（2019年リリース）で役割を分けた新しいコマンドが導入されました。

- **`git switch`** → ブランチの切り替え専用
- **`git restore`** → ファイルの変更を元に戻す専用

`git restore` については[後のページ](../04-advanced/03-restore.md)で詳しく扱います。

---

### どちらを使えばいい？

**新しく学ぶなら `git switch` を使いましょう。**

ただし `git checkout` は今でも現役です。以下の場面で目にします。

- 古い技術ブログや Stack Overflow の回答
- 少し前に書かれた公式ドキュメントや書籍
- 他の人が書いたスクリプトや手順書

「`git checkout main` って書いてあるけど何これ？」とならないよう、`git switch main` と同じ意味だと覚えておくだけで十分です。

---

### 覚えること

```bash
git checkout <branch>    # = git switch <branch>
git checkout -b <branch> # = git switch -c <branch>
```

これだけです。ファイルを元に戻す使い方（`git checkout -- <file>`）は今は覚えなくて大丈夫です。

## Summary

- `git checkout <branch>` は `git switch <branch>` と同じ動作。
- `git checkout -b <branch>` は `git switch -c <branch>` と同じ動作。
- `git checkout` はブランチ以外にもファイル操作もできたため、わかりにくかった。
- git 2.23 以降は `git switch`（ブランチ）と `git restore`（ファイル）に分離された。
- 新しく書くなら `git switch` 推奨。古い資料で `git checkout` を見ても慌てない。

## Exercises

`my-diary` リポジトリで以下を試して、`git checkout` が `git switch` と同じ動作をすることを確認してください。

1. 現在のブランチを確認する。

   ```bash
   git branch
   ```

2. `git checkout` でブランチを切り替えてみる（例：`experiment` ブランチがあれば）。

   ```bash
   git checkout experiment
   ```

3. `git status` で切り替わったことを確認する。

   ```bash
   git status
   ```

4. `main` に戻る。

   ```bash
   git checkout main
   ```

5. `git checkout -b` で新しいブランチを作って切り替える。

   ```bash
   git checkout -b checkout-test
   ```

6. `git branch` で `*` の位置を確認する。

   ```bash
   git branch
   ```

7. `git switch main` で `main` に戻る。（`git switch` でも `git checkout` でもどちらでも OK）

   ```bash
   git switch main
   ```

### Reset & Retry

練習用ブランチを削除してやり直す場合は以下を実行してください。

```bash
git switch main
git branch -d checkout-test
```

<!-- prev/next navigation -->
[< Previous: ブランチを作って切り替える](02-branch-switch.md) | [Back to Index](../../../README.md) | [Next: ブランチをマージする >](04-merge.md)
