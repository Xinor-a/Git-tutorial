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

`git switch -c feature/add-note` で新しいブランチを作って切り替えます。`feature/add-note` がブランチ名で、`feature/` は「新機能用のブランチ」という意味の慣習的なプレフィックスです。

現在のブランチを `git status` で確認しておきましょう：

```bash
git status
```

```
On branch feature/add-note
nothing to commit, working tree clean
```

---

### ステップ2：ファイルを編集してコミットする

`notes.md` というファイルを作って一言メモを書いたら、`git add notes.md` でステージし、`git commit` でコミットします。

`git log --oneline` でコミットが記録されたことを確認できます：

```bash
git log --oneline
```

```
a1b2c3d docs: add notes.md
...
```

---

### ステップ3：ブランチを GitHub に push する

`git push origin feature/add-note` でブランチを GitHub に送ります。GitHub が「PR を作りますか？」とリンクを表示してくれます。

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

GitHub 上でマージされても、ローカルの `main` はまだ古いままです。`git switch main` でブランチを切り替えてから `git pull origin main` で同期します。

`git log --oneline` でマージされたコミットが `main` に反映されているか確認しましょう：

```bash
git log --oneline
```

---

### ステップ7：フィーチャーブランチを削除する

マージが終わったブランチはもう不要です。`git branch -d feature/add-note` でローカルから削除しておきましょう。`-d` は「マージ済みのブランチのみ削除」するオプションです。

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

   <div class="code-input">

   ```bash
   git switch -c feature/my-first-pr
   ```

   </div>

   <div class="code-input">

   ```bash
   git status
   ```

   </div>

   <div class="code-output">

   ```
   On branch feature/my-first-pr
   nothing to commit, working tree clean
   ```

   </div>

2. `hello.txt` を作成してコミットする。

   <div class="code-input">

   ```bash
   echo "はじめての PR！" > hello.txt
   ```

   </div>

   <div class="code-input">

   ```bash
   git add hello.txt
   ```

   </div>

   <div class="code-input">

   ```bash
   git status
   ```

   </div>

   <div class="code-output">

   ```
   On branch feature/my-first-pr
   Changes to be committed:
     (use "git rm --cached <file>..." to unstage)
           new file:   hello.txt
   ```

   </div>

   <div class="code-input">

   ```bash
   git diff --cached
   ```

   </div>

   <div class="code-input">

   ```bash
   git commit -m "docs: add hello.txt for PR practice"
   ```

   </div>

   <div class="code-input">

   ```bash
   git log --oneline
   ```

   </div>

3. GitHub に push する。

   <div class="code-input">

   ```bash
   git push origin feature/my-first-pr
   ```

   </div>

4. GitHub のリポジトリページを開き、`Compare & pull request` をクリック。タイトルと説明を書いて `Create pull request` を押す。

5. `Files changed` タブを開いて変更内容を確認する。

6. `Merge pull request` → `Confirm merge` でマージする。

7. ローカルを同期して、ブランチを削除する。

   <div class="code-input">

   ```bash
   git switch main
   ```

   </div>

   <div class="code-input">

   ```bash
   git pull origin main
   ```

   </div>

   <div class="code-input">

   ```bash
   git log --oneline
   ```

   </div>

   <div class="code-input">

   ```bash
   git branch -d feature/my-first-pr
   ```

   </div>

### Reset & Retry

⚠️ うまくいかなかったときだけ実行してください。

<div class="code-input">

```bash
git switch main
git branch -D feature/my-first-pr
```

</div>

push 済みのブランチをリモートからも削除する場合：

<div class="code-input">

```bash
git push origin --delete feature/my-first-pr
```

</div>

<!-- prev/next navigation -->
[< Previous: GitHub Actions で仮想コラボレーター](03-actions-collaborator.md) | [Back to Index](../../../README.md) | [Next: Issueで作業を管理しよう >](05-issues.md)
