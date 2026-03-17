# 演習：ブランチ・マージ・スタッシュを使ってみよう

[< Previous: git stash — 作業を一時退避する](07-stash.md) | [Back to Index](../../../README.md) | [Next: git reset — 歴史を巻き戻す >](../04-advanced/01-reset.md)

## What & Why

今まで学んだブランチ操作を全部使ってみよう。ブランチの作成、コミット、マージ（コンフリクトあり）、スタッシュ、そして `git log --oneline --graph` で歴史を視覚的に確認する。バラバラに練習したコマンドが「ひとつながりの作業フロー」として繋がる体験をしよう。

## Content

### シナリオ：個人ブログの新機能開発

あなたは個人ブログのソースファイルを git で管理している。今日は「タグ機能」を新しいブランチで開発しながら、途中で `main` への緊急修正も対応するという、リアルな一日を体験する。

この演習は以下のフェーズに分かれている：

1. **フェーズ 1** — ブランチを作り、コミットを積む
2. **フェーズ 2** — `main` にも変更を加え、ファストフォワードにならない状況を作る
3. **フェーズ 3** — マージしてコンフリクトを解消する
4. **フェーズ 4** — スタッシュで緊急対応する
5. **フェーズ 5** — `git log --oneline --graph --all` で全体像を確認する

すべて連続した演習なので、順番どおりに進めよう。

## Exercises

### フェーズ 1: ブランチを作って機能開発する

リポジトリを準備しよう：

```bash
mkdir ~/blog-practice
cd ~/blog-practice
git init
```

最初のファイルを作ってコミットする：

```bash
echo "# 私のブログ" > index.md
echo "投稿一覧はこちら" >> index.md
git add index.md
git commit -m "ブログ：最初のコミット"
```

`tags` ブランチを作って切り替える：

```bash
git switch -c tags
```

タグ機能のファイルを作りながらコミットを 2 つ積もう：

```bash
echo "# タグ一覧" > tags.md
echo "タグ機能の実装" >> tags.md
git add tags.md
git commit -m "タグ：タグ一覧ページを追加"
```

```bash
echo "タグのスタイルを調整" >> tags.md
git add tags.md
git commit -m "タグ：スタイルを調整"
```

ここまでの状態を確認しよう：

```bash
git log --oneline --graph --all
```

```
* b2c3d4e (HEAD -> tags) タグ：スタイルを調整
* a1b2c3d タグ：タグ一覧ページを追加
* 9z8y7x6 ブログ：最初のコミット (main)
```

---

### フェーズ 2: main にも変更を加える

`main` に戻り、`tags` ブランチとは別のコミットを作る。これで「ファストフォワードにならない」状況が作れる：

```bash
git switch main
```

`index.md` に変更を加えてコミットしよう：

```bash
echo "プロフィールページ追加" >> index.md
git add index.md
git commit -m "トップ：プロフィールリンクを追加"
```

状態を確認：

```bash
git log --oneline --graph --all
```

```
* f3c4d5e (HEAD -> main) トップ：プロフィールリンクを追加
| * b2c3d4e (tags) タグ：スタイルを調整
| * a1b2c3d タグ：タグ一覧ページを追加
|/
* 9z8y7x6 ブログ：最初のコミット
```

2 つのブランチが分岐していることがわかる。

---

### フェーズ 3: マージしてコンフリクトを解消する

`tags` ブランチを `main` にマージしよう：

```bash
git merge tags
```

`index.md` を両ブランチで変更していないので、今回はコンフリクトなしで成功するはずだ：

```
Merge made by the 'ort' strategy.
 tags.md | 2 ++
 1 file changed, 2 insertions(+)
 create mode 100644 tags.md
```

> もしコンフリクトが起きた場合は [マージコンフリクトを解決する](05-merge-conflict.md) を参考に解消しよう。

マージ後の状態を確認：

```bash
git log --oneline --graph --all
```

```
*   c4d5e6f (HEAD -> main) Merge branch 'tags'
|\
| * b2c3d4e (tags) タグ：スタイルを調整
| * a1b2c3d タグ：タグ一覧ページを追加
* | f3c4d5e トップ：プロフィールリンクを追加
|/
* 9z8y7x6 ブログ：最初のコミット
```

枝が合流しているグラフが表示された。マージコミットが作られたことも確認できる。

```bash
git status
```

---

### フェーズ 4: スタッシュで緊急対応する

新しいブランチで作業中に、緊急修正が入るシナリオを体験しよう。

`profile` ブランチを作り、作業を始める：

```bash
git switch -c profile
echo "# プロフィール" > profile.md
echo "自己紹介の途中..." >> profile.md
```

まだコミットしていない（途中の状態）。ここで緊急メッセージが来たとしよう：「`main` の `index.md` に誤字がある！直してほしい！」

現在の変更を確認：

```bash
git status
```

スタッシュに退避する：

```bash
git stash push -u -m "プロフィールページの途中"
```

```bash
git status
```

`nothing to commit, working tree clean` になることを確認。`main` に切り替えて修正する：

```bash
git switch main
echo "（誤字を修正）" >> index.md
git add index.md
git commit -m "トップ：誤字を修正"
```

`profile` ブランチに戻り、スタッシュを復元する：

```bash
git switch profile
git stash pop
git status
```

`profile.md` が戻ってきたことを確認。作業を再開してコミットしよう：

```bash
git add profile.md
git commit -m "プロフィール：自己紹介ページを追加"
```

---

### フェーズ 5: git log --oneline --graph --all で全体像を見る

いよいよ仕上げ。すべての操作の結果を一気に確認しよう：

```bash
git log --oneline --graph --all
```

こんなグラフが見えるはずだ：

```
* 8e9f0a1 (HEAD -> profile) プロフィール：自己紹介ページを追加
* 7d8e9f0 (main) トップ：誤字を修正
*   c4d5e6f Merge branch 'tags'
|\
| * b2c3d4e (tags) タグ：スタイルを調整
| * a1b2c3d タグ：タグ一覧ページを追加
* | f3c4d5e トップ：プロフィールリンクを追加
|/
* 9z8y7x6 ブログ：最初のコミット
```

`*` がコミット、`|` と `/` が枝の流れ、`\` が合流を表している。自分がやってきた作業がグラフで見えると、ブランチ操作の全体像が一目でわかる。

ブランチの一覧も確認しよう：

```bash
git branch
```

```bash
git log --oneline
```

---

### チャレンジ問題（余裕があれば）

`profile` ブランチを `main` にマージする前に、`git rebase main` でリベースしてから取り込んでみよう。

```bash
git switch profile
git rebase main
git switch main
git merge profile
git log --oneline --graph --all
```

リベース後にマージするとグラフがどう変わるか確認しよう。マージコミットは作られる？

### Reset & Retry

最初からやり直したいときは：

```bash
cd ~
rm -rf blog-practice
```

その後、フェーズ 1 から始めてみよう。

[< Previous: git stash — 作業を一時退避する](07-stash.md) | [Back to Index](../../../README.md) | [Next: git reset — 歴史を巻き戻す >](../04-advanced/01-reset.md)
