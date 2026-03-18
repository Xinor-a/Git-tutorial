# 設定を確認しよう

[< Previous: safe.directory の設定](07-safe-directory.md) | [Back to Index](../../../README.md) | [Next: Gitって何？ >](../02-basics/01-what-is-git.md)

## What & Why

ここまでのページで、Gitを使うための基本設定をすべて行いました。  
このページでは `cat ~/.gitconfig` と `git config --list` を使って、  
設定が正しく揃っているかを確認します。

## Content

### シナリオ

「よし、全部設定した！」と思っても、どこかで入力ミスがあったり、  
コマンドを飛ばしてしまったりすることはよくあります。  
最後にまとめて確認しておきましょう。

---

### cat ~/.gitconfig で設定ファイルを見る

```bash
cat ~/.gitconfig
```

こんな内容が表示されるはずです（名前やパスは自分のものになります）。

```
[user]
	name = 田中 太郎
	email = taro@example.com
[core]
	editor = code --wait
	autocrlf = true
	excludesfile = /home/yourname/.gitignore_global
[pull]
	rebase = false
[init]
	defaultBranch = main
[color]
	ui = auto
[safe]
	directory = *
```

> **WSLを使っていない人へ**: `[safe]` セクションがなくても問題ありません。  
> また `autocrlf` の値は環境によって `true`（Windows）、`input`（Mac/Linux）と  
> 異なる場合があります。

---

### git config --list で一覧表示する

もう1つの確認方法が `git config --list` です。

```bash
git config --list
```

```
user.name=田中 太郎
user.email=taro@example.com
core.editor=code --wait
core.autocrlf=true
core.excludesfile=/home/yourname/.gitignore_global
pull.rebase=false
init.defaultbranch=main
color.ui=auto
safe.directory=*
```

`cat ~/.gitconfig` はファイルをそのまま表示しますが、  
`git config --list` はキーと値をフラットな一覧で表示します。  
どちらも確認方法として使えます。

---

### 確認チェックリスト

以下の項目がすべて揃っているか確認しましょう。

- [ ] `user.name` — 自分の名前が設定されている
- [ ] `user.email` — 自分のメールアドレスが設定されている
- [ ] `core.editor` — `code --wait`（VSCode）が設定されている
- [ ] `core.autocrlf` — Windowsなら `true`、Mac/Linuxなら `input`
- [ ] `core.excludesfile` — グローバル `.gitignore` のパスが設定されている
- [ ] `pull.rebase` — `false` になっている
- [ ] `init.defaultbranch` — `main` になっている
- [ ] `color.ui` — `auto` になっている
- [ ] `safe.directory` — WSL環境なら `*` が設定されている（それ以外はスキップ）

---

### 個別の設定を確認したいときは

特定の設定だけ確認したいときは、キーを指定して確認できます。

```bash
git config --global user.name
git config --global core.editor
```

## Summary

- `cat ~/.gitconfig` でGitの設定ファイルをまるごと確認できる。
- `git config --list` でキーと値をフラットな一覧で確認できる。
- チェックリストを使って、抜けている設定がないか確認しよう。
- 設定が揃ったら、いよいよGitの使い方を学んでいく準備完了！

## Exercises

### 演習1: 全設定を確認しよう

1. 設定ファイルの内容を表示する。

   ```bash
   cat ~/.gitconfig
   ```

2. 一覧形式でも確認する。

   ```bash
   git config --list
   ```

3. 上のチェックリストを参考に、すべての項目が揃っているか確認する。

4. 不足している項目があれば、対応するページに戻って設定しよう。

   | 設定 | 参照ページ |  
   |---|---|  
   | `user.name` / `user.email` | [ユーザー名とメールアドレスを設定しよう](01-gitconfig-user.md) |  
   | `core.editor` | [エディタを設定しよう](02-gitconfig-editor.md) |  
   | `core.autocrlf` | [改行コードの設定](03-autocrlf.md) |  
   | `core.excludesfile` | [グローバル .gitignore を設定しよう](04-excludesfile.md) |  
   | `pull.rebase` / `init.defaultBranch` | [pull.rebase と init.defaultBranch の設定](05-pull-rebase-defaultbranch.md) |  
   | `color.ui` | [ターミナルの色を設定しよう](06-color-ui.md) |  
   | `safe.directory` | [safe.directory の設定](07-safe-directory.md) |

---

### Reset & Retry

特定の設定を削除してやり直す場合は、対応するページの「Reset & Retry」を参照してください。

すべての設定をリセットしたい場合（注意: 元に戻せません）：

```bash
rm ~/.gitconfig
```

削除後は各ページの手順に従って、最初から設定し直してください。

[< Previous: safe.directory の設定](07-safe-directory.md) | [Back to Index](../../../README.md) | [Next: Gitって何？ >](../02-basics/01-what-is-git.md)
