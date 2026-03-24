# git fetch — フェッチとプルの違い

<!-- prev/next navigation -->
[< Previous: git pull — リモートの変更をローカルへ](02-pull.md) | [Back to Index](../../../README.md) | [Next: git tag — リリースにタグをつける >](../04-advanced/01-tag.md)

## What & Why

`git fetch` は、リモートの最新情報をダウンロードしつつ、**ローカルのブランチには一切手を加えない**コマンドです。
「どんな変更が来ているか確認してから取り込む」という慎重な作業スタイルに向いています。
`git pull` との違いを理解すると、リモートとの同期をより安全にコントロールできるようになります。

## Content

### シナリオ：取り込む前に内容を確認したい

チームメンバーのリナが `main` ブランチに大きな変更をプッシュしたと教えてくれました。
内容を確認してから取り込みたい——そんなときに `git fetch` が活躍します。

---

### ① git fetch でダウンロードだけする

`git fetch origin` を実行すると、リモートの最新コミットがダウンロードされます。
しかしあなたのローカルの `main` ブランチは**まったく動きません**。

フェッチ後はこんな出力が出ます：

```text
remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
Unpacking objects: 100% (3/3), done.
From https://github.com/yourname/your-repo
   a1b2c3d..e4f5g6h  main -> origin/main
```

最後の行に注目してください。`origin/main` は更新されましたが、`main` はそのままです。

---

### ② リモート追跡ブランチとは

`git fetch` のあと、リモートの情報は **リモート追跡ブランチ**（`origin/main` など）に保存されます。
これは「リモートの最新状態のスナップショット」で、あなたのローカルブランチとは別物です。

```text
origin/main  ← リモートの最新（フェッチで更新される）
main         ← あなたのローカルブランチ（まだ古いまま）
```

---

### ③ フェッチした内容を確認する

`origin/main` に何が届いているか、ログで確認しましょう：

```bash
git log origin/main --oneline
```

```text
e4f5g6h (origin/main) feat: add dark mode toggle
d3e4f5g feat: update header design
a1b2c3d (HEAD -> main) docs: fix typo in README
```

ローカルの `main`（`HEAD`）より `origin/main` が2コミット先にあることがわかります。

---

### ④ ローカルとリモートの差分を確認する

`git diff main origin/main` でローカルとリモートの違いを確認することもできます。
「取り込むとどのファイルがどう変わるか」を事前に把握できます。

---

### ⑤ 確認後に取り込む

内容を確認して問題なければ、`git merge origin/main` か `git rebase origin/main` で取り込みます。どちらでも結果としてローカルの `main` が `origin/main` と同じ状態になります。

---

### git pull との使い分け

| | `git fetch` + 確認 + `merge`/`rebase` | `git pull` |
|---|---|---|
| 流れ | ダウンロード → 内容確認 → 手動で統合 | ダウンロード + 統合を一括 |
| 向いている場面 | 大きな変更が来ているとき、慎重に確認したいとき | 日常的な同期、内容に問題ないと分かっているとき |
| ローカルへの影響 | `fetch` だけなら一切なし | 即座に統合される |

どちらが正解ということはありません。状況に合わせて使い分けましょう。

## Summary

- `git fetch origin` でリモートの最新コミットをダウンロードするが、ローカルのブランチは変わらない。
- ダウンロードした情報は `origin/main` などのリモート追跡ブランチに保存される。
- `git log origin/main --oneline` で何が届いているか確認できる。
- `git diff main origin/main` でローカルとリモートの差分を確認できる。
- 確認後に `git merge origin/main` または `git rebase origin/main` で取り込む。
- 「確認してから取り込む」のが `fetch`、「すぐ取り込む」のが `pull`。

## Exercises

**準備：** GitHubにリポジトリがあり、ローカルにクローンしてある状態から始めます。

1. GitHubのWebインターフェイスで直接ファイルを編集し、コミットしてみましょう（リモートに変更を作る）。

2. ローカルで `git fetch origin` を実行しましょう。

   <div class="code-input">

   ```bash
   git fetch origin
   ```

   </div>

3. `git log` でローカルと `origin/main` の状態を比べましょう。

   <div class="code-input">

   ```bash
   git log --oneline --graph main origin/main
   ```

   </div>

4. `git diff` でどんな変更が来ているか確認しましょう。

   <div class="code-input">

   ```bash
   git diff main origin/main
   ```

   </div>

5. 内容を確認できたら、`git merge origin/main` でローカルに取り込みましょう。

   <div class="code-input">

   ```bash
   git merge origin/main
   ```

   </div>

   <div class="code-input">

   ```bash
   git log --oneline
   ```

   </div>

   <div class="code-input">

   ```bash
   git status
   ```

   </div>

### Reset & Retry

⚠️ うまくいかなかったときだけ実行してください。

マージを取り消してやり直す（マージコミットが作られた場合）：

<div class="code-input">

```bash
git reset --hard HEAD~1
```

</div>

フェッチはローカルブランチを変えないので、fetch のやり直しは不要です。

<!-- prev/next navigation -->
[< Previous: git pull — リモートの変更をローカルへ](02-pull.md) | [Back to Index](../../../README.md) | [Next: git tag — リリースにタグをつける >](../04-advanced/01-tag.md)
