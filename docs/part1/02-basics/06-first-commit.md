# はじめてのコミット

[< Previous: ステージングエリア](05-staging.md) | [Back to Index](../../../README.md) | [Next: .gitignore >](07-gitignore.md)

## What & Why

ステージングエリアにファイルが揃ったら、いよいよコミット（記録）する番だ。`git commit` でスナップショットが保存され、`git log` でその履歴を確認できる。git を使う上で最も基本的な、でも最も大切な操作を体験しよう。

## Content

### シナリオ：最初の記録を残す

前のページで `README.md` と `entry-2024-01-01.md` をステージングした。今の状態を確認しよう：

```bash
git status
```

```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   README.md
        new file:   entry-2024-01-01.md
```

準備 OK。コミットしよう。

---

### コミットする — `git commit`

コミットには必ず「**コミットメッセージ**」が必要だ。「この記録で何をしたか」を短い文章で残す。

一番シンプルな方法は `-m` オプションを使うことだ：

```bash
git commit -m "最初のコミット：READMEと日記ファイルを追加"
```

実行するとこんな表示が出る：

```
[main (root-commit) a1b2c3d] 最初のコミット：READMEと日記ファイルを追加
 2 files changed, 2 insertions(+)
 create mode 100644 README.md
 create mode 100644 entry-2024-01-01.md
```

- `[main (root-commit) a1b2c3d]` — `main` ブランチに最初のコミットが作られた。`a1b2c3d` はコミットを識別するハッシュ値（IDのようなもの）
- `2 files changed, 2 insertions(+)` — 2 つのファイルに変更（今回は追加）があった
- `create mode 100644 README.md` — `README.md` が新しく追加された

コミットが完了したら、`git status` で確認しよう：

```bash
git status
```

```
On branch main
nothing to commit, working tree clean
```

`nothing to commit, working tree clean` — 「コミットするものは何もない。作業ツリーはきれいな状態だ」という意味。ステージングエリアが空になり、すべての変更が記録されたことを示している。

---

### エディタを使ったコミット

`-m` オプションを省略すると、エディタが開いてコミットメッセージを入力できる：

```bash
git commit
```

setup セクションで設定したエディタ（例：VS Code）が開くはずだ。エディタには最初からこんな内容が書かれている：

```

# Please enter the commit message for your changes. Lines starting
# with '#' are comments, and will be ignored by git.
# ...
```

`#` で始まる行はコメント（無視される）。その上に自分のメッセージを書いて保存してエディタを閉じると、コミットが完了する。

VS Code の場合は保存（Ctrl+S）してウィンドウを閉じると OK だ。

> 長いコミットメッセージを書きたいときはエディタ方式が便利。1 行目が「タイトル」、1 行空けて 3 行目以降が「詳細」という書き方が一般的だ。日常的なコミットは `-m` で十分。

---

### 良いコミットメッセージとは

コミットメッセージは「未来の自分や仲間へのメモ」だ。3 ヶ月後に見返したとき、何をしたコミットかわかるように書こう。

良い例：

```
READMEにプロジェクトの説明を追加
ログイン機能のバグを修正（パスワード大文字小文字を区別するよう変更）
```

良くない例：

```
修正
aaa
update
```

「何を」「なぜ」したかが伝わるメッセージが理想的だ。

---

### コミット履歴を見る — `git log`

`git log` でこれまでのコミット履歴を確認できる：

```bash
git log
```

```
commit a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t (HEAD -> main)
Author: Your Name <your.email@example.com>
Date:   Mon Jan 1 12:00:00 2024 +0900

    最初のコミット：READMEと日記ファイルを追加
```

各コミットには以下の情報が記録されている：

- `commit a1b2c3d...` — コミットのハッシュ値（一意のID）
- `Author` — コミットした人の名前とメール（setup セクションで設定したもの）
- `Date` — コミットした日時
- コミットメッセージ

コミットが増えてきたとき、`git log --oneline` を使うと一行ずつシンプルに表示できる：

```bash
git log --oneline
```

```
a1b2c3d 最初のコミット：READMEと日記ファイルを追加
```

これで git の基本的な流れ — ファイルを作る → ステージング → コミット — が完成した。

---

### 基本サイクルのおさらい

git を使うときの基本の流れはこうだ：

```
1. ファイルを作る・変更する
       ↓
2. git status で状態確認
       ↓
3. git diff で変更内容確認（必要なら）
       ↓
4. git add でステージング
       ↓
5. git commit で記録
       ↓
6. git log で確認
```

このサイクルを繰り返すことで、プロジェクトの変更履歴が積み重なっていく。

## Summary

- `git commit -m "メッセージ"` でステージングエリアの内容をコミットする。
- `-m` を省略するとエディタが開く。エディタでメッセージを書いて保存・閉じるとコミット完了。
- コミットメッセージは「未来の自分や仲間への説明」。何をしたかがわかるように書こう。
- コミット後、`git status` で `nothing to commit, working tree clean` になることを確認しよう。
- `git log` でコミット履歴を確認できる。`git log --oneline` でシンプルな一覧を表示できる。
- git の基本サイクルは「変更 → add → commit」の繰り返し。

## Exercises

### 演習 1: 最初のコミットをする

前のページで `README.md` と `entry-2024-01-01.md` をステージングした状態から：

```bash
git commit -m "最初のコミット：READMEと日記ファイルを追加"
```

成功メッセージが表示されることを確認しよう。

### 演習 2: コミット後の状態を確認する

```bash
git status
```

`nothing to commit, working tree clean` が表示されることを確認しよう。

### 演習 3: 新しいファイルを追加してコミットする

```bash
echo "今日も良い一日だった。" > entry-2024-01-02.md
git status
git add entry-2024-01-02.md
git status
git commit -m "1月2日の日記を追加"
```

各コマンドの後で状態がどう変わるか確認しながら進もう。

### 演習 4: git log でコミット履歴を確認する

```bash
git log
git log --oneline
```

2 つのコミットが記録されていることを確認しよう。

### Reset & Retry

最初からやり直したいときは、`my-diary` フォルダごと削除して作り直す：

```bash
cd ~
rm -rf my-diary
mkdir my-diary
cd my-diary
git init
```

その後、[はじめてのファイル](04-first-file.md) のページを参考にファイルを作り、もう一度このページの演習に挑戦しよう。

[< Previous: ステージングエリア](05-staging.md) | [Back to Index](../../../README.md) | [Next: .gitignore >](07-gitignore.md)
