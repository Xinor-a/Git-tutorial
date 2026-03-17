# git clone — リポジトリをローカルに持ってくる

[< Previous: フォークしよう](01-fork.md) | [Back to Index](../../../README.md) | [Next: GitHub Actions で仮想コラボレーター >](03-actions-collaborator.md)

## What & Why

前のページでフォークしたリポジトリは、まだ GitHub 上（クラウド）にあるだけです。
実際に作業するには、自分のパソコンにコピーを持ってくる必要があります。
それが `git clone` です。

## Content

### シナリオ

GitHub 上にフォークしたリポジトリができました。
「さあ、コードを編集したい！」でも、ファイルはまだ GitHub の上にあります。
`git clone` を使って、自分のパソコンにリポジトリをコピーしましょう。

---

### クローン用の URL を確認しよう

フォークしたリポジトリのページを開いて、SSH の URL を確認します。

1. リポジトリページの緑色の「Code」ボタンをクリックする
2. 「SSH」タブを選ぶ
3. 表示された URL をコピーする

URL の形式はこのようになっています：

```
git@github.com:あなたのユーザー名/git-tutorial-practice.git
```

---

### git clone を実行しよう

ターミナルを開いて、リポジトリを置きたいディレクトリに移動します。
たとえば、ホームディレクトリの下に `projects` フォルダを作って使うと整理しやすいです。

```bash
mkdir -p ~/projects
cd ~/projects
```

次に、`git clone` でリポジトリをコピーします：

```bash
git clone git@github.com:あなたのユーザー名/git-tutorial-practice.git
```

実行すると、こんな出力が表示されます：

```
Cloning into 'git-tutorial-practice'...
remote: Enumerating objects: 42, done.
remote: Counting objects: 100% (42/42), done.
remote: Compressing objects: 100% (28/28), done.
Receiving objects: 100% (42/42), 15.23 KiB | 2.17 MiB/s, done.
Resolving deltas: 100% (10/10), done.
```

クローンが完了すると、`git-tutorial-practice` というフォルダが作成されます。

---

### リポジトリに入ってみよう

```bash
cd git-tutorial-practice
```

---

### リモートの設定を確認しよう

クローンすると、`origin` というリモートが自動的に設定されます。
確認してみましょう：

```bash
git remote -v
```

出力例：

```
origin  git@github.com:あなたのユーザー名/git-tutorial-practice.git (fetch)
origin  git@github.com:あなたのユーザー名/git-tutorial-practice.git (push)
```

`origin` があなたのフォーク（自分のGitHubのコピー）を指しています。
`(fetch)` は取得用、`(push)` は送信用の URL です。

---

### 履歴を確認しよう

```bash
git log --oneline
```

出力例：

```
a3f8c21 docs: add README
7b2d10e feat: initial commit
```

元のリポジトリのコミット履歴がそのままローカルに複製されています。

---

### `origin` と `upstream` の違い

ここで重要な言葉を整理しておきましょう。

| 名前 | 指す先 | 説明 |
|------|--------|------|
| `origin` | あなたのフォーク | `git clone` で自動設定される。あなたが自由に push できる |
| `upstream` | 元のリポジトリ | 手動で設定する。元のプロジェクトの最新変更を取り込むときに使う |

今の時点では `upstream` はまだ設定していません。
設定方法は後のページで紹介します。

今は「`origin` = 自分のフォーク」と覚えておけば大丈夫です。

---

### 全体の流れを振り返ろう

```
元のリポジトリ (upstream)
github.com/example/git-tutorial-practice
        ↓ フォーク（前のページ）
自分のフォーク (origin)
github.com/あなた/git-tutorial-practice
        ↓ git clone（このページ）
ローカルリポジトリ
~/projects/git-tutorial-practice/
```

ローカルで変更を加えて → `origin`（自分のフォーク）に `git push` → プルリクエストで元のリポジトリに提案、という流れで協力開発が進みます。

## Summary

- `git clone <URL>` で GitHub 上のリポジトリをローカルにコピーできる。
- クローン時は SSH の URL を使う（`git@github.com:ユーザー名/リポジトリ名.git`）。
- `git clone` すると `origin` リモートが自動で設定される。
- `git remote -v` でリモートの設定を確認できる。
- `origin` = 自分のフォーク、`upstream` = 元のリポジトリ（まだ未設定）。
- `git log --oneline` でクローンした履歴を確認できる。

## Exercises

### 演習1: フォークしたリポジトリをクローンしよう

1. フォークしたリポジトリの SSH URL をコピーする
2. ターミナルで作業用ディレクトリに移動する（例: `~/projects`）
3. `git clone` を実行する

   ```bash
   git clone git@github.com:あなたのユーザー名/git-tutorial-practice.git
   ```

4. クローンが完了したら、ディレクトリに入る

   ```bash
   cd git-tutorial-practice
   ```

### 演習2: 状態を確認しよう

クローンしたリポジトリの中で以下のコマンドを実行して、出力を確認しましょう。

```bash
git status
```

```bash
git log --oneline
```

```bash
git remote -v
```

それぞれ何が表示されましたか？`origin` はどのURLを指していますか？

### 演習3: リモートの URL を確認しよう

`git remote -v` の出力を見て、以下を確認してください：

- `origin` の URL に自分のユーザー名が含まれているか
- フォーク前の元のリポジトリ（`example/...`）ではなく、自分のコピーを指しているか

### Reset & Retry

クローンをやり直したい場合、ローカルのフォルダを削除して再実行します：

```bash
# git-tutorial-practice フォルダを削除する（1つ上のディレクトリから実行）
cd ~/projects
rm -rf git-tutorial-practice

# 再度クローンする
git clone git@github.com:あなたのユーザー名/git-tutorial-practice.git
```

---

[< Previous: フォークしよう](01-fork.md) | [Back to Index](../../../README.md) | [Next: GitHub Actions で仮想コラボレーター >](03-actions-collaborator.md)
