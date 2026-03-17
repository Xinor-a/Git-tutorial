# pull.rebase と init.defaultBranch を設定しよう

[< Previous: グローバル .gitignore を設定しよう](04-excludesfile.md) | [Back to Index](../../../README.md) | [Next: ターミナルの色を設定しよう >](06-color-ui.md)

## What & Why

Gitには、あとあとトラブルになりやすいデフォルト動作がいくつかあります。  
ここでは「`git pull` の動作」と「新しいリポジトリのブランチ名」を明示的に設定して、  
将来の混乱を防いでおきましょう。

## Content

### シナリオ

設定を一通り終えたあと、先輩がこう言いました。

「あと2つだけ設定しておいて。やらないと後でハマるから。」

---

### pull.rebase false — git pull の動作を明確にする

`git pull` は「リモートの変更を取り込む」コマンドですが、  
内部では2通りの動作（マージ or リベース）があります。  
どちらを使うかを明示しておかないと、Gitが警告を出すことがあります。

今は「マージで取り込む（`false`）」と明示しておきましょう。  
マージとリベースの違いは[ブランチのページ](../03-branching/01-branch-concept.md)で詳しく説明します。

```bash
git config --global pull.rebase false
```

設定を確認してみましょう。

```bash
git config --global pull.rebase
```

```
false
```

---

### init.defaultBranch main — 新しいリポジトリのブランチ名

`git init` で新しいリポジトリを作ると、最初のブランチが自動で作られます。  
昔は `master` という名前が使われていましたが、  
今は `main` が主流になっています。

> **豆知識**: `master` から `main` への移行は 2020年ごろから広がりました。
> GitHubも 2020年に新規リポジトリのデフォルトを `main` に変更しています。
> どちらが正しい・間違いというわけではなく、現在は `main` が標準的です。

以下のコマンドで、新しいリポジトリのブランチ名を `main` に統一しておきましょう。

```bash
git config --global init.defaultBranch main
```

確認してみます。

```bash
git config --global init.defaultBranch
```

```
main
```

---

### 設定ファイルの確認

ここまでの設定が `.gitconfig` に追加されているか確認しましょう。

```bash
cat ~/.gitconfig
```

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
```

`[pull]` と `[init]` のセクションが増えていれば成功です。

## Summary

- `pull.rebase false` を設定すると、`git pull` のデフォルト動作（マージ）が明示される。
- `init.defaultBranch main` を設定すると、新しいリポジトリのブランチ名が `main` になる。
- どちらも「設定しなくても動く」が、明示しておくことで将来の混乱を防げる。

## Exercises

### 演習1: 2つの設定を行おう

1. `pull.rebase` を設定する。

   ```bash
   git config --global pull.rebase false
   ```

2. `init.defaultBranch` を設定する。

   ```bash
   git config --global init.defaultBranch main
   ```

3. それぞれ確認する。

   ```bash
   git config --global pull.rebase
   git config --global init.defaultBranch
   ```

4. `cat ~/.gitconfig` で全体を確認し、`[pull]` と `[init]` セクションが追加されていることを確かめよう。

   ```bash
   cat ~/.gitconfig
   ```

---

### Reset & Retry

設定をやり直すには、同じコマンドを再実行するだけです。

```bash
git config --global pull.rebase false
git config --global init.defaultBranch main
```

設定を削除したい場合：

```bash
git config --global --unset pull.rebase
git config --global --unset init.defaultBranch
```

[< Previous: グローバル .gitignore を設定しよう](04-excludesfile.md) | [Back to Index](../../../README.md) | [Next: ターミナルの色を設定しよう >](06-color-ui.md)
