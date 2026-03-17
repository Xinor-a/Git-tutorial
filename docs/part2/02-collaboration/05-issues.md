# Issueで作業を管理しよう

<!-- prev/next navigation -->
[< Previous: プルリクエストを作ろう](04-pull-request.md) | [Back to Index](../../../README.md) | [Next: git push — ローカルをリモートへ >](../03-workflow/01-push.md)

## What & Why

GitHub の Issue（イシュー）は、タスク・バグ報告・アイデアを記録しておく「チケット」です。「何を直すか」「何を作るか」を Issue で管理することで、作業が見える化され、PR との連携もスムーズになります。

## Content

### シナリオ：タイポを発見して Issue を立てる

あなたはプロジェクトのドキュメントを読んでいて、タイポ（typo：誤字）を見つけました。「直さなきゃ」と思ったけど、今すぐは時間がない。こういうとき、Issue に記録しておくと便利です。

---

### Issue とは？

Issue はひとことで言うと「やるべきこと・困っていること」のメモスレッドです。

| 使い方 | 例 |
|---|---|
| バグ報告 | 「ログインボタンが押せない」 |
| タスク管理 | 「README を日本語に翻訳する」 |
| アイデア | 「ダークモードを追加したい」 |
| 質問 | 「この関数の仕様を教えてほしい」 |

Issue には番号（`#1`, `#2`, ...）が自動でつきます。この番号を使って、コミットや PR から参照できます。

---

### ステップ1：Issue を作る

1. GitHub のリポジトリページを開く
2. 上部のタブから **Issues** をクリック
3. 右上の **New issue** ボタンを押す
4. フォームを埋める：

   **タイトル**：一言で何の問題かわかるように書く（例：`README にタイポがある — "collaboartion" → "collaboration"`）

   **本文**：詳細を書く。どのファイルの何行目か、再現手順など。

   ```markdown
   ## 問題

   `README.md` の3行目に誤字があります。

   - 誤：collaboartion
   - 正：collaboration

   ## 場所

   `README.md` 3行目
   ```

5. 右サイドバーで **Labels**（ラベル）や **Assignees**（担当者）を設定できます（後述）。
6. **Submit new issue** ボタンを押す。

Issue が作成され、番号が割り当てられます（例：`#3`）。

---

### ステップ2：ラベルを活用する

GitHub にはデフォルトでいくつかのラベルが用意されています。

| ラベル | 意味 |
|---|---|
| `bug` | バグ・不具合 |
| `enhancement` | 機能追加・改善 |
| `good first issue` | 初心者向けのタスク |
| `documentation` | ドキュメントに関する作業 |
| `question` | 質問・調査 |

ラベルをつけると、Issue の一覧で種類ごとにフィルタリングできるので便利です。

---

### ステップ3：コミットから Issue を参照する

コミットメッセージに `#番号` を書くと、GitHub が自動でリンクしてくれます。

```bash
git commit -m "fix: タイポを修正 (#3)"
```

GitHub 上でコミット履歴を見ると、`#3` が Issue へのリンクになります。「この修正はあの Issue を対応したんだな」とひと目でわかります。

---

### ステップ4：PR で Issue を自動クローズする

PR の説明文に `Closes #番号` と書くと、PR がマージされたとき Issue が**自動でクローズ**されます。

```markdown
## 変更内容

README のタイポを修正しました。

Closes #3
```

> `Closes` のほかに `Fixes` や `Resolves` でも同じ動作をします。

PR をマージした瞬間、`#3` の Issue が自動で "closed" になるので、手動でクローズし忘れる心配がありません。

---

### マイルストーンで Issue をまとめる

**マイルストーン**は、複数の Issue をひとつのリリース目標にグループ化する機能です。

例：「v1.0 リリース」というマイルストーンを作り、そこに関連する Issue をまとめておくと、「あと何個直したら v1.0 を出せるか」が一目でわかります。

マイルストーンの作り方：

1. **Issues** タブ → **Milestones** → **New milestone**
2. タイトルと期限を設定して **Create milestone**
3. 各 Issue の右サイドバーからマイルストーンを選択

---

### Issue をクローズする（手動）

作業が完了した Issue は手動でクローズすることもできます。

1. Issue ページを開く
2. 一番下のコメント入力欄の下にある **Close issue** ボタンを押す

または、`Closes #番号` を含む PR がマージされれば自動でクローズされます。

## Summary

- Issue はタスク・バグ・アイデアを記録するチケット。番号（`#N`）が自動でつく。
- コミットメッセージに `#番号` を書くと GitHub が自動リンクしてくれる。
- PR の説明に `Closes #番号` を書くと、PR マージ時に Issue が自動クローズされる。
- ラベル（`bug` / `enhancement` / `good first issue` など）で Issue を分類できる。
- マイルストーンで複数の Issue をリリース目標にまとめられる。

## Exercises

### 練習：タイポを見つけて Issue → PR → 自動クローズを体験しよう

1. 自分のリポジトリのどこかに、わざとタイポを入れたファイルを作る。

   ```bash
   echo "collaboartion is fun" > typo-sample.txt
   git add typo-sample.txt
   git commit -m "chore: add typo sample for issue practice"
   git push origin main
   git log --oneline
   ```

2. GitHub の **Issues** タブから **New issue** を押し、タイポの報告 Issue を作る。ラベルに `bug` を設定する。Issue 番号をメモしておく（例：`#5`）。

3. ローカルでフィーチャーブランチを作り、タイポを修正してコミットする。

   ```bash
   git switch -c fix/typo-sample
   # typo-sample.txt を編集して "collaboration is fun" に直す
   git add typo-sample.txt
   git diff --cached
   git commit -m "fix: タイポを修正 (#5)"
   git log --oneline
   git push origin fix/typo-sample
   ```

4. GitHub で PR を作る。説明文に `Closes #5` を書く。

5. PR をマージする。

6. Issues タブを開いて、`#5` が自動で closed になっていることを確認する。

### Reset & Retry

途中でやり直したい場合は、以下を実行してください。

```bash
# フィーチャーブランチを削除してやり直す（まだ push していない場合）
git switch main
git branch -D fix/typo-sample

# push 済みのブランチをリモートからも削除する場合
git push origin --delete fix/typo-sample

# typo-sample.txt を削除してやり直す場合
git rm typo-sample.txt
git commit -m "chore: remove typo sample"
git push origin main
```

<!-- prev/next navigation -->
[< Previous: プルリクエストを作ろう](04-pull-request.md) | [Back to Index](../../../README.md) | [Next: git push — ローカルをリモートへ >](../03-workflow/01-push.md)
