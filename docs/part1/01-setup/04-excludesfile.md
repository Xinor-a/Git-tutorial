# グローバル .gitignore を設定しよう

[< Previous: 改行コードの設定](03-autocrlf.md) | [Back to Index](../../../README.md) | [Next: pull.rebase と init.defaultBranch の設定 >](05-pull-rebase-defaultbranch.md)

## What & Why

`.gitignore` はGitに「このファイルは管理しなくていい」と伝えるためのファイルです。
プロジェクトごとに `.gitignore` を作ることもありますが、
どのプロジェクトでも共通して無視したいファイル（OSやエディタが自動生成するファイルなど）は
グローバルの `.gitignore` にまとめて書いておくと便利です。

## Content

### シナリオ

Gitで管理したくないファイルはプロジェクトごとに `.gitignore` で指定できますが、
MacなどのOSが自動生成する `.DS_Store` というファイルや、
Windowsが作る `Thumbs.db` は、どのプロジェクトでも毎回 `.gitignore` に書く必要があります。

グローバル `.gitignore` を使えば、一度設定するだけで全プロジェクトに適用されます。

---

### グローバル .gitignore ファイルを作る

まず、ホームディレクトリにグローバル `.gitignore` ファイルを作ります。

```bash
touch ~/.gitignore_global
```

次に、VSCodeで開いて内容を書きましょう。

```bash
code ~/.gitignore_global
```

以下の内容を貼り付けて保存してください。

```gitignore
# macOS
.DS_Store
.AppleDouble
.LSOverride

# Windows
Thumbs.db
ehthumbs.db
Desktop.ini

# VSCode
.vscode/
*.code-workspace

# JetBrains IDE (IntelliJ, PyCharm など)
.idea/

# ログファイル
*.log

# 依存関係（node_modules など）は各プロジェクトの .gitignore で管理する
```

---

### Gitにグローバル .gitignore を教える

ファイルを作っただけでは使われません。
Gitにこのファイルを使うよう設定します。

```bash
git config --global core.excludesfile ~/.gitignore_global
```

---

### 設定を確認する

```bash
git config --global core.excludesfile
```

```
/home/yourname/.gitignore_global
```

（Windowsの場合は `C:/Users/yourname/.gitignore_global` のような表示になります）

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
```

---

### プロジェクトの .gitignore との違い

| | グローバル `.gitignore` | プロジェクトの `.gitignore` |
|---|---|---|
| 場所 | ホームディレクトリ | プロジェクトのルートディレクトリ |
| 対象 | 全プロジェクト共通 | そのプロジェクトだけ |
| リポジトリに含まれる | 含まれない（個人設定） | 含まれる（チームで共有） |
| 書くもの | OSやエディタが作るファイル | プロジェクト固有のビルド成果物など |

`.gitignore` の詳しい書き方は[.gitignoreのページ](../02-basics/07-gitignore.md)で説明します。

## Summary

- グローバル `.gitignore` は全プロジェクト共通で無視するファイルを書く場所。
- `touch ~/.gitignore_global` でファイルを作り、`core.excludesfile` で登録する。
- OSが作る `.DS_Store` や `Thumbs.db` などを書いておくと便利。
- プロジェクトの `.gitignore` との役割分担を意識しよう。

## Exercises

### 演習1: グローバル .gitignore を設定しよう

1. グローバル `.gitignore` ファイルを作る。

   ```bash
   touch ~/.gitignore_global
   ```

2. VSCodeで開く。

   ```bash
   code ~/.gitignore_global
   ```

3. 自分のOSに合わせた内容を書いて保存する（上の例を参考に）。

4. Gitに登録する。

   ```bash
   git config --global core.excludesfile ~/.gitignore_global
   ```

5. 設定を確認する。

   ```bash
   git config --global core.excludesfile
   ```

6. `cat ~/.gitconfig` で全体を確認しよう。

   ```bash
   cat ~/.gitconfig
   ```

   `[core]` セクションに `excludesfile` が追加されていることを確認しよう。

---

### Reset & Retry

設定をやり直すには：

```bash
git config --global core.excludesfile ~/.gitignore_global
```

設定を削除したい場合：

```bash
git config --global --unset core.excludesfile
```

ファイル自体を削除したい場合：

```bash
rm ~/.gitignore_global
```

[< Previous: 改行コードの設定](03-autocrlf.md) | [Back to Index](../../../README.md) | [Next: pull.rebase と init.defaultBranch の設定 >](05-pull-rebase-defaultbranch.md)
