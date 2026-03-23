# Gitチュートリアル

Gitをはじめて使う中学生・高校生向けのストーリー型チュートリアルです。
コマンドの暗記ではなく、「なぜそうするのか」を理解しながら進めましょう。

> **はじめての方へ**
> まずは **[Part 0: 準備編](#part-0-準備編)** からスタートしましょう。
> Git のインストールが終わったら、Part 1 へ進んでください。

---

## Part 0: 準備編

| ページ | 内容 |
|---|---|
| [01. Gitをインストールしよう](docs/part0/01-install/01-install-git.md) | Windows / macOS / Linux へのインストール手順 |

---

## Part 1: ローカル編

### 第1章: 環境設定

| ページ | 内容 |
|---|---|
| [01. ユーザー名とメールアドレスの設定](docs/part1/01-setup/01-gitconfig-user.md) | `user.name` / `user.email` |
| [02. エディタの設定](docs/part1/01-setup/02-gitconfig-editor.md) | `core.editor` — VSCodeをデフォルトに |
| [03. 改行コードの設定](docs/part1/01-setup/03-autocrlf.md) | `core.autocrlf` — WindowsとMacの違い |
| [04. グローバル .gitignore の設定](docs/part1/01-setup/04-excludesfile.md) | `core.excludesfile` |
| [05. pull.rebase と init.defaultBranch](docs/part1/01-setup/05-pull-rebase-defaultbranch.md) | デフォルトブランチを `main` に |
| [06. color.ui の設定](docs/part1/01-setup/06-color-ui.md) | ターミナル出力を色付きに |
| [07. safe.directory の設定](docs/part1/01-setup/07-safe-directory.md) | WSL + Windows でのよくあるハマりポイント |
| [08. 演習: gitconfig の確認](docs/part1/01-setup/08-exercise-verify-gitconfig.md) | `cat ~/.gitconfig` で設定を確認する |

### 第2章: Gitの基本

| ページ | 内容 |
|---|---|
| [01. Gitってなに？](docs/part1/02-basics/01-what-is-git.md) | バージョン管理の概念をやさしく解説 |
| [02. Linuxコマンド入門](docs/part1/02-basics/02-linux-commands.md) | `mkdir`, `cd`, `touch`, `ls`, `cat` |
| [03. はじめてのリポジトリ](docs/part1/02-basics/03-first-repo.md) | `git init` でリポジトリを作る |
| [04. はじめてのファイル](docs/part1/02-basics/04-first-file.md) | `touch` → `git status` |
| [05. ステージングエリア](docs/part1/02-basics/05-staging.md) | `git add` → `git status` → `git diff` |
| [06. はじめてのコミット](docs/part1/02-basics/06-first-commit.md) | `git commit` → `git log` |
| [07. .gitignore](docs/part1/02-basics/07-gitignore.md) | 管理しないファイルを指定する |
| [08. 演習: 小さなプロジェクトを作ってコミット](docs/part1/02-basics/08-exercise.md) | ここまでの総まとめ |

### 第3章: ブランチ

| ページ | 内容 |
|---|---|
| [01. ブランチとは？](docs/part1/03-branching/01-branch-concept.md) | ブランチの概念と必要性 |
| [02. ブランチの作成と切り替え](docs/part1/03-branching/02-branch-switch.md) | `git branch` / `git switch` |
| [03. git checkout](docs/part1/03-branching/03-checkout.md) | `git switch` との違いと使い分け |
| [04. マージ](docs/part1/03-branching/04-merge.md) | `git merge` — シナリオで学ぶ |
| [05. マージコンフリクト](docs/part1/03-branching/05-merge-conflict.md) | わざと起こして、解決する |
| [06. リベース](docs/part1/03-branching/06-rebase.md) | `git rebase` — mergeとの使い分け |
| [07. スタッシュ](docs/part1/03-branching/07-stash.md) | `git stash` — 作業途中でブランチを切り替えたい |
| [08. 演習: ブランチ・マージ・コンフリクト解消](docs/part1/03-branching/08-exercise.md) | まとめ演習 |

### 第4章: 上級編

| ページ | 内容 |
|---|---|
| [01. git reset](docs/part1/04-advanced/01-reset.md) | soft / mixed / hard |
| [02. git revert](docs/part1/04-advanced/02-revert.md) | 公開済みコミットを安全に取り消す |
| [03. git restore](docs/part1/04-advanced/03-restore.md) | 作業ツリーの変更を捨てる |
| [04. git reflog](docs/part1/04-advanced/04-reflog.md) | 消えたコミットを取り戻す |
| [05. git cherry-pick](docs/part1/04-advanced/05-cherry-pick.md) | 特定のコミットだけ取り込む |
| [06. git bisect](docs/part1/04-advanced/06-bisect.md) | バグを混入させたコミットを探す |
| [07. git rebase -i](docs/part1/04-advanced/07-rebase-interactive.md) | コミット履歴を整える |
| [08. git worktree](docs/part1/04-advanced/08-worktree.md) | 複数の作業ツリーを管理する |
| [09. コミットメッセージの作法](docs/part1/04-advanced/09-commit-conventions.md) | Conventional Commits |
| [10. エイリアス](docs/part1/04-advanced/10-aliases.md) | よく使うコマンドをショートカットに |

---

## Part 2: リモート編

### 第1章: GitHubの基本

| ページ | 内容 |
|---|---|
| [01. GitHubってなに？](docs/part2/01-github-basics/01-what-is-github.md) | リモートリポジトリの概念 |
| [02. ローカルとリモート](docs/part2/01-github-basics/02-remote-vs-local.md) | 「リモート」とは何か |
| [03. GitHubアカウントの作成](docs/part2/01-github-basics/03-account-setup.md) | アカウント登録手順 |
| [04. SSH鍵の設定](docs/part2/01-github-basics/04-ssh-setup.md) | 鍵の生成とGitHubへの登録 |

### 第2章: コラボレーション

| ページ | 内容 |
|---|---|
| [01. フォーク](docs/part2/02-collaboration/01-fork.md) | リモート演習の出発点 |
| [02. git clone](docs/part2/02-collaboration/02-clone.md) | フォークしたリポジトリをローカルに |
| [03. GitHub Actions で仮想コラボレーター](docs/part2/02-collaboration/03-actions-collaborator.md) | Actions でコミットを自動生成 |
| [04. プルリクエスト](docs/part2/02-collaboration/04-pull-request.md) | PRの作成とレビュー |
| [05. Issues](docs/part2/02-collaboration/05-issues.md) | Issue で作業を管理する |

### 第3章: ワークフロー

| ページ | 内容 |
|---|---|
| [01. git push](docs/part2/03-workflow/01-push.md) | ローカルの変更をリモートへ |
| [02. git pull](docs/part2/03-workflow/02-pull.md) | リモートの変更をローカルへ |
| [03. git fetch](docs/part2/03-workflow/03-fetch.md) | フェッチとプルの違い |

### 第4章: 上級編

| ページ | 内容 |
|---|---|
| [01. git tag](docs/part2/04-advanced/01-tag.md) | リリースにタグをつける |
| [02. git submodule](docs/part2/04-advanced/02-submodule.md) | 別リポジトリを取り込む |

---

> **Note**: リンク先ページがまだ存在しない場合は、今後追加されます。
