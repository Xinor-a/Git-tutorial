# git エイリアス — ショートカットを作ろう

<!-- prev/next navigation -->
[< Previous: コミットメッセージの書き方 — Conventional Commits](./09-commit-conventions.md) | [Back to Index](../../../README.md) |

## What & Why

`git status` を1日に何十回も打っていると、さすがに面倒になってくる。git にはエイリアス（alias）機能があって、長いコマンドに短い名前をつけられる。

エイリアスは `~/.gitconfig` に保存される——[セットアップセクション](../01-setup/01-gitconfig-user.md)で触れたあのファイルだ。設定は一度だけ。あとはずっと使い続けられる。

## Content

### エイリアスを設定する

`git config --global alias.<名前> <コマンド>` で設定する：

```bash
git config --global alias.st status
```

これで `git st` と打つだけで `git status` が実行できるようになる：

```bash
git st
```

```
On branch main
nothing to commit, working tree clean
```

---

### おすすめのエイリアスセット

まとめて設定してしまおう：

```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.unstage 'reset HEAD --'
git config --global alias.lg 'log --oneline --graph --all --decorate'
```

それぞれの意味：

| エイリアス | 元のコマンド | 用途 |
|---|---|---|
| `st` | `status` | 状態確認。一番打つコマンド |
| `co` | `checkout` | ブランチ切り替え |
| `br` | `branch` | ブランチ一覧 |
| `unstage` | `reset HEAD --` | ステージから取り消す |
| `lg` | `log --oneline --graph --all --decorate` | ブランチグラフ付きログ |

`lg` は特に便利だ。`--graph` オプション（[P1-025](../03-branching/08-exercise.md)で紹介）を毎回打たなくて済む：

```bash
git lg
```

```
* f3c9a12 (HEAD -> main) feat: エイリアスの設定を追加
* d8e7b45 fix: バグを修正
| * a2f1c89 (feature) feat: 新機能を追加
|/
* e4b3d67 initial commit
```

---

### 設定を確認する

エイリアスは `~/.gitconfig` に保存される。確認してみよう（gitconfig の読み方は[P1-009](../01-setup/08-exercise-verify-gitconfig.md)参照）：

```bash
cat ~/.gitconfig
```

```
[user]
	name = Your Name
	email = your.email@example.com

[alias]
	st = status
	co = checkout
	br = branch
	unstage = reset HEAD --
	lg = log --oneline --graph --all --decorate
```

`[alias]` セクションに設定したエイリアスが並んでいる。

---

### シェルコマンドをエイリアスにする

`!` を先頭につけると、git コマンドではなくシェルコマンドとして実行できる：

```bash
git config --global alias.root 'rev-parse --show-toplevel'
```

```bash
git root
```

```
/home/user/myproject
```

これはリポジトリのルートディレクトリを表示するワンライナーだ。git 本体に関係ないコマンドでも組み合わせられる。

---

### エイリアスを削除したいとき

設定を消すには `--unset` を使う：

```bash
git config --global --unset alias.st
```

または `~/.gitconfig` をエディタで直接編集して該当行を削除しても OK。

## Summary

- `git config --global alias.<名前> <コマンド>` でエイリアスを設定できる。
- エイリアスは `~/.gitconfig` の `[alias]` セクションに保存される。
- `st`・`co`・`br`・`lg` は特によく使われる定番エイリアス。
- `lg`（`log --oneline --graph --all --decorate`）はブランチの全体像を一瞬で把握できる。
- `!` を先頭につけるとシェルコマンドもエイリアスにできる。

## Exercises

### ステップ 1: 定番エイリアスをまとめて設定する

```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.unstage 'reset HEAD --'
git config --global alias.lg 'log --oneline --graph --all --decorate'
```

### ステップ 2: 動作確認する

適当なリポジトリで試してみよう：

```bash
git st
git br
git lg
```

それぞれ `git status`、`git branch`、`git log --oneline --graph --all --decorate` と同じ結果が表示されることを確認しよう。

### ステップ 3: gitconfig を確認する

```bash
cat ~/.gitconfig
```

`[alias]` セクションに設定が反映されていることを確認しよう。

### ステップ 4: unstage を試す

```bash
mkdir alias-practice
cd alias-practice
git init
echo "test" > file.txt
git add file.txt
git st
```

```
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   file.txt
```

```bash
git unstage file.txt
git st
```

ステージから取り消せていることを確認しよう。

### Reset & Retry

エイリアスを削除したい場合：

```bash
git config --global --unset alias.st
git config --global --unset alias.co
git config --global --unset alias.br
git config --global --unset alias.unstage
git config --global --unset alias.lg
```

その後ステップ1から再挑戦しよう。

---

## 🎉 Part 1 完走おめでとう！

ここまで来たあなたは、git の基本から応用まで一通りマスターした。

`git init` からはじまって、コミット、ブランチ、マージ、リベース、タグ、stash、reset、revert、reflog、cherry-pick、bisect、rebase -i、worktree、そしてエイリアスまで——プロの開発者が日常で使うツールセットが揃った。

**Part 2 では GitHub とリモートリポジトリを扱う。** ローカルで学んだことをチームで活かす方法——push、pull、プルリクエスト、フォーク、コードレビュー——を一緒に学んでいこう。

<!-- prev/next navigation -->
[< Previous: コミットメッセージの書き方 — Conventional Commits](./09-commit-conventions.md) | [Back to Index](../../../README.md) |
