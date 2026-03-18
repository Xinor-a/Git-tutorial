# プルリクエストを作ろう

<!-- prev/next navigation -->
[< Previous: GitHub Actions で仮想コラボレーター](03-actions-collaborator.md) | [Back to Index](../../../README.md) | [Next: Issueで作業を管理しよう >](05-issues.md)

## What & Why

プルリクエスト（Pull Request、略して PR）は、自分の変更を「レビューしてからマージしてほしい」とお願いする仕組みです。直接 `main` に push するのではなく、PR を通すことでコードレビューや議論ができ、チームの品質を守ることができます。

## Content

### シナリオ：メモファイルを追加して PR を作る

あなたはフォークした自分のリポジトリで作業しています。新しいメモファイルを追加して、PR でオリジナルリポジトリに提案してみましょう。

---

### ステップ1：フィーチャーブランチを作る

`main` に直接コミットするのではなく、専用のブランチを作ります。ブランチを使うことで、作業が整理されて PR を出しやすくなります。

```bash
git switch -c feature/add-note
```

> `git switch -c` は「新しいブランチを作ってそこに切り替える」コマンドです。`feature/add-note` がブランチ名で、`feature/` は「新機能用のブランチ」という意味の慣習的なプレフィックスです。

現在のブランチを確認しておきましょう。

```bash
git status
```

```
On branch feature/add-note
nothing to commit, working tree clean
```

---

### ステップ2：ファイルを編集してコミットする

`notes.md` というファイルを作って、一言メモを書いてみます。

```bash
# notes.md を新規作成（エディタで開いて内容を書いてもOK）
echo "# メモ" > notes.md
echo "はじめてのPR用メモです。" >> notes.md
```

変更内容を確認します。

```bash
git status
```

```
On branch feature/add-note
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        notes.md
```

```bash
git diff
```

> 新規ファイルはまだ追跡されていないので `git diff` には何も表示されません。`git diff --cached` はステージ後に使います。

ステージしてコミット。

```bash
git add notes.md
git diff --cached
git commit -m "docs: add notes.md"
```

ログで確認しましょう。

```bash
git log --oneline
```

```
a1b2c3d docs: add notes.md
...
```

---

### ステップ3：ブランチを GitHub に push する

```bash
git push origin feature/add-note
```

```
Enumerating objects: 4, done.
...
remote: Create a pull request for 'feature/add-note' on GitHub by visiting:
remote:      https://github.com/あなたのユーザー名/リポジトリ名/pull/new/feature/add-note
To github.com:あなたのユーザー名/リポジトリ名.git
 * [new branch]      feature/add-note -> feature/add-note
```

GitHub が「PR を作りますか？」とリンクを表示してくれます。

---

### ステップ4：GitHub で PR を作る

1. **GitHub のリポジトリページを開く**  
   黄色いバナーで `"Compare & pull request"` ボタンが表示されます。クリック！

2. **タイトルと説明を書く**
   - タイトル：何をしたか一言で（例：`メモファイルを追加`）
   - 説明：なぜこの変更が必要か、何を変えたかを書く

3. **`Create pull request` ボタンを押す**

これで PR が作成されました！

---

### PR ページの見方

PR を開くと、次のタブが見えます。

| タブ | 内容 |
|---|---|
| **Conversation** | コメントやレビューのやり取り |
| **Commits** | この PR に含まれるコミット一覧 |
| **Files changed** | 変更されたファイルの diff |

`Files changed` タブでは行ごとにコメントを残せます。コードレビューはここで行います。

---

### 他の人の PR をレビューする

チームメンバーや、Actions ボットが出した PR をレビューすることもできます。

1. **PR ページを開く** → `Files changed` タブへ
2. 変更した行にマウスを合わせると **`+` ボタン** が出る → クリックでコメント追加
3. 右上の `Review changes` ボタンから：
   - **Comment**：コメントだけ残す
   - **Approve**：「OK！マージしてOK」という承認
   - **Request changes**：「ここを直してほしい」という差し戻し

---

### ステップ5：PR をマージする

レビューが終わったら、`Conversation` タブの一番下へスクロールします。

`Merge pull request` ボタンをクリック → `Confirm merge`。

マージが完了すると、ブランチは自動で "closed" になります。

---

### ステップ6：ローカルを最新の `main` に同期する

GitHub 上でマージされても、ローカルの `main` はまだ古いままです。

```bash
git switch main
git pull origin main
```

```bash
git log --oneline
```

マージされたコミットが `main` に反映されているのを確認しましょう。

---

### ステップ7：フィーチャーブランチを削除する

マージが終わったブランチはもう不要です。ローカルから削除しておきましょう。

```bash
git branch -d feature/add-note
```

```
Deleted branch feature/add-note (was a1b2c3d).
```

> `-d` は「マージ済みのブランチのみ削除」するオプションです。まだマージしていないブランチを強制削除したい場合は `-D`（大文字）を使いますが、基本的に `-d` で安全に削除しましょう。

## Summary

- プルリクエストは「この変更をマージしてください」というお願い＋議論の場。
- 作業は `main` 直接ではなくフィーチャーブランチで行い、そこから PR を出す。
- `git push origin <ブランチ名>` で GitHub に push すると PR が作れるようになる。
- PR には Conversation / Commits / Files changed の3つのタブがある。
- レビューは `Files changed` で行い、Comment / Approve / Request changes を選ぶ。
- マージ後は `git switch main && git pull` でローカルを同期し、不要ブランチは `git branch -d` で削除。

## Exercises

### 練習：フィーチャーブランチから PR を作ってマージしよう

1. 新しいブランチを作る。

   ```bash
   git switch -c feature/my-first-pr
   git status
   ```

2. `hello.txt` を作成してコミットする。

   ```bash
   echo "はじめての PR！" > hello.txt
   git add hello.txt
   git status
   git diff --cached
   git commit -m "docs: add hello.txt for PR practice"
   git log --oneline
   ```

3. GitHub に push する。

   ```bash
   git push origin feature/my-first-pr
   ```

4. GitHub のリポジトリページを開き、`Compare & pull request` をクリック。タイトルと説明を書いて `Create pull request` を押す。

5. `Files changed` タブを開いて変更内容を確認する。

6. `Merge pull request` → `Confirm merge` でマージする。

7. ローカルを同期して、ブランチを削除する。

   ```bash
   git switch main
   git pull origin main
   git log --oneline
   git branch -d feature/my-first-pr
   ```

### Reset & Retry

途中でやり直したい場合は、以下を実行してください。

```bash
# フィーチャーブランチを削除してやり直す（まだ push していない場合）
git switch main
git branch -D feature/my-first-pr

# push 済みのブランチをリモートからも削除する場合
git push origin --delete feature/my-first-pr
```

<!-- prev/next navigation -->
[< Previous: GitHub Actions で仮想コラボレーター](03-actions-collaborator.md) | [Back to Index](../../../README.md) | [Next: Issueで作業を管理しよう >](05-issues.md)
