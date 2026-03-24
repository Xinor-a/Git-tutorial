# git tag — リリースにタグをつける

[< Previous: git fetch — フェッチとプルの違い](../03-workflow/03-fetch.md) | [Back to Index](../../../README.md) | [Next: git submodule — 別のリポジトリを取り込む >](02-submodule.md)

## What & Why

コードが「リリースできる状態」になったとき、そのコミットに名前をつけて残しておきたいと思いませんか？
`git tag` を使うと、特定のコミットに `v1.0.0` のような名前をつけて、あとから簡単に参照できるようになります。
リリース管理の基本として、チーム開発では欠かせないコマンドです。

## Content

### タグとは何か

タグは「特定のコミットへの名前付きポインター」です。
ブランチと似ていますが、ブランチは新しいコミットのたびに先端が移動するのに対して、
タグは作った時点のコミットを永遠に指し続けます。

```
main: A --- B --- C --- D  ← HEAD が動き続ける
                  ↑
               v1.0.0      ← タグはここで止まる
```

### ライトウェイトタグ vs アノテーションタグ

タグには2種類あります。

**ライトウェイトタグ** — `git tag v1.0.0` でコミットへの単純なポインターを作ります。

**アノテーションタグ** — `git tag -a v1.0.0 -m "Release 1.0.0"` で作成者・日時・メッセージ付きの本格的なタグを作ります。

リリース用途では **アノテーションタグを推奨** します。
誰がいつリリースしたか、という情報が残るのでチームでの管理に向いています。

### タグの一覧を見る

`git tag` でタグの一覧を確認できます：

```bash
git tag
```

```
v0.9.0
v1.0.0
v1.1.0
```

### タグの詳細を確認する

`git show v1.0.0` でタグの詳細を表示できます。アノテーションタグの場合、タグ作成者・日時・メッセージ、そしてそのコミットの内容が表示されます：

```bash
git show v1.0.0
```

```
tag v1.0.0
Tagger: Yuki Tanaka <yuki@example.com>
Date:   Mon Mar 17 10:00:00 2026 +0900

Release 1.0.0

commit abc1234...
Author: Yuki Tanaka <yuki@example.com>
...
```

### タグをリモートにプッシュする

**重要：タグは `git push` しても自動では送られません。**
別途 `git push origin v1.0.0` で特定のタグを送るか、`git push origin --tags` ですべてのタグをまとめて送る必要があります。

### ローカルのタグを削除する

`git tag -d v1.0.0` でローカルのタグを削除できます。リモートのタグを削除したい場合は `git push origin --delete v1.0.0` を使います。

### セマンティックバージョニング

タグには `v1.0.0` という形式がよく使われます。これは **セマンティックバージョニング (Semantic Versioning)** と呼ばれるルールです。

```
v  1   .  0   .  0
   ↑      ↑      ↑
 major  minor  patch
```

- **patch** — バグ修正など、後方互換性のある小さな変更
- **minor** — 新機能追加など、後方互換性のある変更
- **major** — 後方互換性のない大きな変更

例: `v1.2.3` → バグ修正 → `v1.2.4` / 新機能追加 → `v1.3.0` / 大きな刷新 → `v2.0.0`

### GitHub でのタグ

GitHub にタグをプッシュすると、リポジトリの **Releases** ページに表示されます。
GitHub の画面から Release notes を追記したり、バイナリファイルを添付したりすることもできます。
オープンソースプロジェクトではリリースごとに丁寧な Release notes を書くのが一般的です。

## Summary

- タグは特定のコミットへの名前付きポインター。ブランチと違って移動しない。
- `git tag -a v1.0.0 -m "..."` でアノテーションタグを作る（リリース用途に推奨）。
- `git tag` で一覧、`git show v1.0.0` で詳細確認。
- タグは自動でプッシュされない。`git push origin v1.0.0` か `git push origin --tags` が必要。
- バージョン番号は `v メジャー.マイナー.パッチ` の形式が一般的（セマンティックバージョニング）。
- GitHub では Releases ページとして表示される。

## Exercises

### 準備

練習用にタグをつけてみましょう。手元のリポジトリで作業します。

### 1. 現在のコミットを確認する

<div class="code-input">

```bash
git log --oneline -5
```

</div>

### 2. アノテーションタグを作る

<div class="code-input">

```bash
git tag -a v1.0.0 -m "はじめてのリリース"
```

</div>

### 3. タグの一覧と詳細を確認する

<div class="code-input">

```bash
git tag
```

</div>

<div class="code-input">

```bash
git show v1.0.0
```

</div>

<div class="code-output">

```
tag v1.0.0
Tagger: （あなたの名前）
Date:   ...

はじめてのリリース

commit ...
```

</div>

タグ作成者・日時・メッセージが表示されることを確認してください。

### 4. ライトウェイトタグも試してみる

<div class="code-input">

```bash
git tag v0.9.0-beta
```

</div>

<div class="code-input">

```bash
git tag
```

</div>

<div class="code-output">

```
v0.9.0-beta
v1.0.0
```

</div>

2つのタグが表示されれば成功です。

### 5. タグを削除する

<div class="code-input">

```bash
git tag -d v0.9.0-beta
```

</div>

<div class="code-input">

```bash
git tag
```

</div>

`v0.9.0-beta` が消えたことを確認してください。

### 6. リモートにプッシュする（GitHub に接続している場合）

<div class="code-input">

```bash
git push origin v1.0.0
```

</div>

GitHub のリポジトリページ → **Releases** または **Tags** タブで確認してみましょう。

### Reset & Retry

⚠️ うまくいかなかったときだけ実行してください。

<div class="code-input">

```bash
git tag -d v1.0.0
```

</div>

`v0.9.0-beta` が残っていれば：

<div class="code-input">

```bash
git tag -d v0.9.0-beta
```

</div>

リモートにプッシュしてしまったタグを削除する場合：

<div class="code-input">

```bash
git push origin --delete v1.0.0
```

</div>

[< Previous: git fetch — フェッチとプルの違い](../03-workflow/03-fetch.md) | [Back to Index](../../../README.md) | [Next: git submodule — 別のリポジトリを取り込む >](02-submodule.md)
