# コミットメッセージの書き方 — Conventional Commits

<!-- prev/next navigation -->
[< Previous: git worktree — 複数の作業ツリーを管理する](./08-worktree.md) | [Back to Index](../../../README.md) | [Next: git エイリアス — ショートカットを作ろう >](./10-aliases.md)

## What & Why

[P1-015](../02-basics/06-first-commit.md)で「コミットメッセージは未来の自分へのメモ」と学んだ。それは正しい。でも、チームで開発するようになると「ルールがバラバラで読みにくい」という問題が出てくる。

**Conventional Commits** はコミットメッセージのフォーマットを統一する規約だ。世界中のプロジェクトで使われていて、ツールと組み合わせると変更履歴（CHANGELOG）の自動生成やバージョン管理の自動化もできる。

## Content

### フォーマット

```
type(scope): subject
```

- **type** — 変更の種類（必須）
- **scope** — 変更の対象範囲（任意、省略可）
- **subject** — 変更内容の概要（必須）

例：

```
feat: ログインページを追加
fix(auth): 期限切れトークンのエラー処理を修正
docs: READMEにセットアップ手順を追加
refactor(api): ユーザー取得処理を共通化
```

---

### よく使う type 一覧

| type | 使いどころ |
|---|---|
| `feat` | 新機能の追加 |
| `fix` | バグ修正 |
| `docs` | ドキュメントの変更 |
| `refactor` | 動作を変えないコードの整理・改善 |
| `test` | テストの追加・修正 |
| `chore` | ビルド設定、依存関係の更新など |

`feat` と `fix` が最もよく使う。迷ったら、ユーザーに影響する変更は `feat`/`fix`、内部的な整理は `refactor`/`chore` と覚えておこう。

---

### 良いメッセージ・よくないメッセージ

あなたが最初の頃に書いていたこういうメッセージ、見覚えがあるかもしれない：

```
# よくない例
update
修正
fix bug
aaaaa
いろいろ変えた
```

Conventional Commits で書き直すとこうなる：

```
# 良い例
feat: パスワードリセット機能を追加
fix: ログアウト後にセッションが残るバグを修正
docs: API認証のサンプルコードを追加
refactor: 重複していたバリデーション処理を関数に切り出し
chore: Node.jsを18から20にアップデート
```

違いは明確だ——**type を見ればどんな変更かが一瞬でわかる。**

---

### scope（スコープ）について

scope は省略可能だが、大きなプロジェクトでは「どの部分の変更か」を明示するのに役立つ：

```
fix(auth): ログインAPIのタイムアウト処理を修正
feat(profile): アバター画像のアップロード機能を追加
test(cart): カートの合計金額計算のテストを追加
```

小さなプロジェクトや個人作業では省略しても問題ない。

---

### 本文（body）を書く場合

1行で伝えきれないときは、空行を挟んで詳細を書ける：

```
fix(auth): 期限切れトークンのエラー処理を修正

ログイン後24時間でトークンが期限切れになるが、
エラーメッセージが表示されずに無限ローディングになっていた。
401レスポンス時にログインページへリダイレクトするよう修正。
```

日常的なコミットは1行で十分。バグ修正や大きな変更のときに本文を添えると親切だ。

---

### プロジェクトによって違う場合もある

Conventional Commits は最も広く使われている規約だが、プロジェクトによっては独自のルールがある場合もある。参加するプロジェクトの `CONTRIBUTING.md` や既存のコミット履歴を見て、そのプロジェクトのスタイルに合わせよう。

## Summary

- Conventional Commits のフォーマット: `type(scope): subject`
- よく使う type: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`
- scope は任意。省略しても構わない。
- 「何をした」より「何のための変更か」が伝わるメッセージを書こう。
- プロジェクトの規約がある場合はそちらを優先する。

## Exercises

### ステップ 1: 既存メッセージを Conventional Commits 形式に変換する

以下のメッセージを Conventional Commits 形式に書き直してみよう（正解は1つじゃない）：

```
# 変換してみよう
1. "パスワード変更できるようにした"
2. "ロゴの色変えた"
3. "テスト追加"
4. "node_modules更新"
5. "クラッシュするバグ直した"
```

例えば1番はこうなる：

```
feat: パスワード変更機能を追加
```

### ステップ 2: 練習用リポジトリで実際に使う

```bash
mkdir cc-practice
cd cc-practice
git init
echo "# My App" > README.md
git add README.md
git commit -m "docs: READMEを追加"
```

```bash
echo "console.log('hello')" > app.js
git add app.js
git commit -m "feat: アプリのエントリポイントを追加"
```

```bash
git log --oneline
```

```
xxxxxxx (HEAD -> main) feat: アプリのエントリポイントを追加
xxxxxxx docs: READMEを追加
```

type が揃った綺麗な履歴になっているはずだ。

### ステップ 3: git log で履歴を眺める

```bash
git log --oneline
git log
```

type ごとに色分けされたり、ツールによっては自動的に整理される理由がわかるはず。

### Reset & Retry

```bash
cd ..
rm -rf cc-practice
```

ステップ2から再挑戦しよう。

<!-- prev/next navigation -->
[< Previous: git worktree — 複数の作業ツリーを管理する](./08-worktree.md) | [Back to Index](../../../README.md) | [Next: git エイリアス — ショートカットを作ろう >](./10-aliases.md)
