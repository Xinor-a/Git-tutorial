# .gitignore — 追跡したくないファイルを無視する

[< Previous: はじめてのコミット](06-first-commit.md) | [Back to Index](../../../README.md) | [Next: 演習：小さなプロジェクトを作ってみよう >](08-exercise.md)

## What & Why

ファイルを作ってたら、`git status` に「追跡したくないファイル」が混ざってることがある。パスワードが書いてあるファイルや、OS が自動で作ったゴミファイルなど、git に管理させたくないものだ。`.gitignore` というファイルを使えば、そういうファイルを「無視リスト」に登録して、`git status` の邪魔なノイズを消せる。

## Content

### シナリオ：秘密ファイルが丸見えになってしまった

`my-diary` リポジトリで作業していたら、うっかり `secret.txt` というファイルを作ってしまったとしよう。メモのつもりで書いた個人的なパスワードとか、見られたくないメモが入っている。

```bash
cd ~/my-diary
echo "パスワード: hunter2" > secret.txt
git status
```

```
On branch main
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        secret.txt

nothing added to commit but untracked files present (use "git add" to include in what will be committed)
```

`secret.txt` が「追跡されていないファイル」として表示されている。うっかり `git add .` とかしたら一発でコミットされてしまう。危ない。

---

### .gitignore を作る

`.gitignore` はリポジトリのルートに置くテキストファイルだ。1 行に 1 パターンを書くことで、それに一致するファイルを git が無視してくれる。

作ってみよう：

```bash
touch .gitignore
```

エディタで `.gitignore` を開いて、以下のように書いてみよう：

```
secret.txt
```

保存したら確認する：

```bash
git status
```

```
On branch main
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .gitignore

nothing added to commit but untracked files present (use "git add" to include in what will be committed)
```

`secret.txt` が消えた！ git が無視してくれるようになったからだ。代わりに `.gitignore` 自体が「新しいファイル」として出てきている。

---

### よく使うパターン

`.gitignore` には1行1パターンで書く。パターンにはワイルドカード（`*`）が使える。

```
# 特定のファイル
secret.txt
.env

# 拡張子でまとめて無視
*.log
*.tmp

# OS が自動で作るファイル（Mac）
.DS_Store

# OS が自動で作るファイル（Windows）
Thumbs.db

# Node.js プロジェクトの依存フォルダ（巨大になりがち）
node_modules/

# ビルド成果物
dist/
build/
```

`#` で始まる行はコメントとして無視される。

> `.env` というファイルはウェブアプリでよく使われる、API キーやパスワードを入れる設定ファイルだ。絶対に git に含めてはいけないファイルの代表格。

---

### .gitignore 自体はコミットする

「無視するファイルだから .gitignore 自体も無視していいんじゃ？」と思うかもしれないけど、それは逆だ。

`.gitignore` はコミットして、チームメンバーと共有するべきファイルだ。なぜなら：

- チームの全員が同じファイルを無視するようになる
- 「なんでこのファイルが無視されてるの？」という謎がなくなる
- 新しくクローンした人も、はじめから正しい設定で作業できる

コミットしよう：

```bash
git add .gitignore
git status
git commit -m ".gitignoreを追加：secret.txtとOS一時ファイルを除外"
```

```bash
git log --oneline
```

```
b4c5d6e .gitignoreを追加：secret.txtとOS一時ファイルを除外
a1b2c3d 最初のコミット：READMEと日記ファイルを追加
```

---

### グローバル .gitignore について

`.gitignore` は各リポジトリごとに作るものだけど、「どのプロジェクトでも絶対に無視したい」ファイル（`.DS_Store` や `Thumbs.db` など）はグローバル設定に書いておくと楽だ。

setup セクションの [excludesfile の設定](../01-setup/04-excludesfile.md) で設定方法を説明しているので、まだやっていなければそちらも参考にしよう。

## Summary

- `.gitignore` は「git に無視させたいファイルのリスト」を書くファイル。
- リポジトリのルートに置いて、1 行に 1 パターンを書く。`*` でワイルドカードが使える。
- 無視したいものの代表例：`secret.txt`、`.env`（パスワード類）、`.DS_Store` / `Thumbs.db`（OS の一時ファイル）、`*.log`、`node_modules/`。
- `.gitignore` 自体はコミットしてチームと共有しよう。
- `git status` で、無視されたファイルが表示されなくなったことを確認できる。
- 全プロジェクト共通の無視ルールはグローバル excludesfile に書くと便利。

## Exercises

### 演習 1: .gitignore を作って secret.txt を無視する

`my-diary` リポジトリで作業する：

```bash
cd ~/my-diary
echo "パスワード: hunter2" > secret.txt
git status
```

`secret.txt` が `Untracked files` に出ることを確認したら、`.gitignore` を作って `secret.txt` を書く：

```bash
echo "secret.txt" > .gitignore
git status
```

`secret.txt` が消えて、`.gitignore` だけが残ることを確認しよう。

### 演習 2: ワイルドカードパターンを試す

ログファイルをまとめて無視してみよう：

```bash
echo "エラーが発生しました" > app.log
echo "デバッグ情報" > debug.log
git status
```

今はまだ `app.log` と `debug.log` が `Untracked files` に出る。`.gitignore` に `*.log` を追加しよう：

```bash
echo "*.log" >> .gitignore
git status
```

`*.log` パターンで両方消えることを確認しよう。

### 演習 3: .gitignore をコミットする

```bash
git diff
git add .gitignore
git status
git commit -m ".gitignoreを追加：secret.txtとログファイルを除外"
git log --oneline
```

`.gitignore` がコミット履歴に記録されていることを確認しよう。

### 演習 4: すでにコミット済みのファイルはどうなる？

試してみよう（少し注意が必要な演習だ）：

```bash
echo "これはメモ" > memo.txt
git add memo.txt
git commit -m "memo.txtを追加（一時的）"
echo "memo.txt" >> .gitignore
git status
```

実は、**すでにコミット済みのファイルは .gitignore に書いても無視されない。** `memo.txt` はまだ `git status` に出てくるはずだ。

一度 git に追跡されたファイルを無視したい場合は：

```bash
git rm --cached memo.txt
git status
git commit -m "memo.txtをキャッシュから削除"
```

`git rm --cached` は「git の追跡からは外す（でもファイル自体は消さない）」コマンドだ。これで以後は無視されるようになる。

### Reset & Retry

最初からやり直したいときは：

```bash
cd ~
rm -rf my-diary
mkdir my-diary
cd my-diary
git init
echo "# My Diary" > README.md
echo "今日も良い一日だった。" > entry-2024-01-01.md
git add README.md entry-2024-01-01.md
git commit -m "最初のコミット：READMEと日記ファイルを追加"
```

その後、このページの演習 1 から挑戦してみよう。

[< Previous: はじめてのコミット](06-first-commit.md) | [Back to Index](../../../README.md) | [Next: 演習：小さなプロジェクトを作ってみよう >](08-exercise.md)
