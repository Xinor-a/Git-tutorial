# グローバル .gitignore を設定しよう

[< Previous: 改行コードの設定](03-autocrlf.md) | [Back to Index](../../../README.md) | [Next: pull.rebase と init.defaultBranch の設定 >](05-pull-rebase-defaultbranch.md)

## What & Why

`.gitignore` はGitに「このファイルは管理しなくていい」と伝えるためのファイルです。  
プロジェクトごとに `.gitignore` を作ることもありますが、どのプロジェクトでも共通して無視したいファイル（OSやエディタが自動生成するファイルなど）はグローバルの `~/.gitignore` にまとめて書いておくと便利です。

---

### グローバル .gitignore ファイルを作る

グローバルな `.gitignore` ファイルは、ホームディレクトリに作るのが一般的です。  
以下のコマンドで、ホームディレクトリにグローバルな `.gitignore_global` ファイルを作ります。

```bash
touch ~/.gitignore_global
```

次に、`code ~/.gitignore_global` でVSCodeで開いて、以下の内容を貼り付けて保存してください。

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
次のコマンドで、Gitにこのファイルをグローバルな `.gitignore` として使うよう設定します。

```bash
git config --global core.excludesfile ~/.gitignore_global
```

---

### 設定を確認する

設定が正しくできたか、次のコマンドで確認してみましょう。

```bash
git config --global core.excludesfile
```

グローバルな `.gitignore` のパスが表示されますか？  
(パスはOSによって違いますが、ホームディレクトリの中にある `.gitignore_global` というファイルを指していればOKです)

```plaintext
/home/yourname/.gitignore_global
```

（Windowsの場合は `C:/Users/yourname/.gitignore_global` のような表示になります）

うまくいかなかった場合は、[Reset & Retry](#reset--retry)を参考に、もう一度設定してみましょう。

`~/.gitconfig` の中身も確認してみましょう。

```bash
cat ~/.gitconfig
```

```plaintext
[user]
  name = あなたのユーザー名
  email = あなたのメールアドレス
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

---

### Reset & Retry

⚠️ うまくいかなかったときだけ実行してください。

設定をやり直すには：

<div class="code-input">

```bash
git config --global core.excludesfile ~/.gitignore_global
```

</div>

設定を削除したい場合：

<div class="code-input">

```bash
git config --global --unset core.excludesfile
```

</div>

ファイル自体を削除したい場合：

<div class="code-input">

```bash
rm ~/.gitignore_global
```

</div>

[< Previous: 改行コードの設定](03-autocrlf.md) | [Back to Index](../../../README.md) | [Next: pull.rebase と init.defaultBranch の設定 >](05-pull-rebase-defaultbranch.md)
