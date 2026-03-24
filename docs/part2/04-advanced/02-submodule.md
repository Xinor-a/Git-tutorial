# git submodule — 別のリポジトリを取り込む

[< Previous: git tag — リリースにタグをつける](01-tag.md) | [Back to Index](../../../README.md)

## What & Why

「自分のプロジェクトに別のリポジトリのコードを組み込みたい」という場面があります。
`git submodule` を使うと、あるリポジトリの中に別の git リポジトリを入れ子にして管理できます。
ライブラリや共有設定を「特定バージョンのまま固定して使いたい」ときに便利な仕組みです。

## Content

### サブモジュールとは何か

サブモジュールは「git リポジトリの中に入れ子になった別の git リポジトリ」です。
親リポジトリは、子リポジトリ（サブモジュール）の **特定のコミット** を参照します。
子リポジトリが更新されても、親が明示的に追従しない限り変わりません。

```
my-project/           ← 親リポジトリ
  src/
  libs/
    awesome-lib/      ← ここが別のリポジトリ (サブモジュール)
      ...
  .gitmodules         ← サブモジュールの情報を記録するファイル
```

### サブモジュールを追加する

`git submodule add <URL> <path>` でサブモジュールを追加します。実行すると:

- 指定パスにリポジトリがクローンされる
- `.gitmodules` ファイルが作成（または更新）される
- 親リポジトリのステージに `.gitmodules` とサブモジュールのパスが追加される

追加後に `git status` で確認するとこうなります：

```bash
git status
```

```
Changes to be committed:
  new file:   .gitmodules
  new file:   libs/awesome-lib
```

あとは `git commit` でコミットすれば完了です。

### .gitmodules ファイル

`.gitmodules` はサブモジュールの情報を記録するファイルで、こんな内容になります:

```ini
[submodule "libs/awesome-lib"]
	path = libs/awesome-lib
	url = https://github.com/example/awesome-lib
```

このファイルはリポジトリに含まれるので、チームメンバーも同じサブモジュール設定を使えます。

### サブモジュールを含むリポジトリをクローンする

サブモジュールを含むリポジトリを通常の `git clone` でクローンすると、
サブモジュールのディレクトリは **空のまま** になります。

**推奨: `--recurse-submodules` オプションをつけてクローンする**

```bash
git clone --recurse-submodules https://github.com/yourname/my-project
```

これで親リポジトリと一緒にサブモジュールもクローンされます。

### すでにクローン済みの場合 — サブモジュールを初期化する

`--recurse-submodules` を忘れて普通にクローンしてしまった場合は、`git submodule update --init` で初期化できます。
入れ子になったサブモジュールがある場合は `--recursive` も追加します。

### サブモジュールを最新の状態に更新する

サブモジュールのリモートリポジトリに新しいコミットが追加されたとき、
`git submodule update --remote` で手動追従できます。
更新後は親リポジトリで `git add` して `git commit` が必要です（参照するコミットが変わるので）。

### いつサブモジュールを使うべきか

サブモジュールが向いている場面:

- 自分たちで管理している共有ライブラリを複数プロジェクトで使いまわす
- デザインシステムや共通設定リポジトリを取り込む
- 大規模なモノリポで大きなコンポーネントを分離して管理する

**ただし、注意点があります。**

> ほとんどのプロジェクトでは、サブモジュールより **パッケージマネージャー** を使う方が簡単です。

- JavaScript なら `npm` / `yarn`
- Python なら `pip`
- Rust なら `cargo`

パッケージマネージャーが使えない事情（非公開リポジトリ、バイナリ成果物の管理など）がある場合に、
サブモジュールの出番を検討するのがよいでしょう。
サブモジュールはチーム全員が使い方を理解していないとトラブルになりやすいので、
導入前にチームで合意を取るのをお勧めします。

## Summary

- サブモジュールはリポジトリの中に入れ子にした別のリポジトリ。特定のコミットを固定して参照する。
- `git submodule add <url> <path>` で追加。`.gitmodules` に設定が記録される。
- クローン時は `git clone --recurse-submodules` を使うのが確実。
- 後から初期化するときは `git submodule update --init`。
- 最新版に追従するときは `git submodule update --remote`。
- 多くのケースではパッケージマネージャーで代替できる。複雑さとトレードオフを考えて導入しよう。

## Exercises

### 1. サブモジュールを追加してみる

練習用リポジトリに、GitHubの公開リポジトリをサブモジュールとして追加してみましょう。
（例として `https://github.com/github/gitignore` を使います）

<div class="code-input">

```bash
git submodule add https://github.com/github/gitignore libs/gitignore-templates
```

</div>

<div class="code-input">

```bash
git status
```

</div>

<div class="code-output">

```
Changes to be committed:
  new file:   .gitmodules
  new file:   libs/gitignore-templates
```

</div>

ステージに `.gitmodules` と `libs/gitignore-templates` が追加されていることを確認します。

### 2. .gitmodules の中身を確認する

<div class="code-input">

```bash
cat .gitmodules
```

</div>

URL とパスが記録されていることを確認してください。

### 3. コミットする

<div class="code-input">

```bash
git commit -m "chore: add gitignore-templates as submodule"
```

</div>

<div class="code-input">

```bash
git log --oneline -3
```

</div>

### 4. サブモジュールの状態を確認する

<div class="code-input">

```bash
git submodule status
```

</div>

コミットハッシュとパスが表示されます。

### Reset & Retry

⚠️ うまくいかなかったときだけ実行してください。

サブモジュールを削除して最初からやり直す場合は、以下の手順を踏みます：

<div class="code-input">

```bash
git submodule deinit -f libs/gitignore-templates
```

</div>

<div class="code-input">

```bash
rm -rf .git/modules/libs/gitignore-templates
```

</div>

<div class="code-input">

```bash
git rm -f libs/gitignore-templates
```

</div>

コミットを元に戻す場合：

<div class="code-input">

```bash
git reset HEAD~1
```

</div>

作業ディレクトリをきれいにする：

<div class="code-input">

```bash
rm -rf libs/gitignore-templates
```

</div>

[< Previous: git tag — リリースにタグをつける](01-tag.md) | [Back to Index](../../../README.md)

---

## チュートリアル完走、おめでとう！

ここまで読んできたあなたは、もう立派な git ユーザーです。

Part 1 では git の基本——コミット、ブランチ、マージ——をしっかり身につけました。
Part 2 では GitHub を使ったチーム開発の流れ——プルリクエスト、コードレビュー、フォーク、
ワークフロー、そしてリリース管理——まで経験しました。
このチュートリアルで学んだことは、実際の開発現場でそのまま通用するスキルです。

### 次のステップ

せっかく身につけたスキルを、ぜひ実際のプロジェクトで活かしてみてください。

- **GitHub プロフィールを育てる** — 自分のプロジェクトを公開して、
  草（コントリビューショングラフ）を積み上げていこう。
- **オープンソースに貢献する** — 小さなドキュメント修正でも十分。
  はじめての PR はきっと緊張するけど、それが成長の証です。
- **Conventional Commits を習慣にする** — `feat:`, `fix:`, `docs:` のプレフィックスを
  実プロジェクトで使うと、コミット履歴がぐっと読みやすくなります。

git は使えば使うほど手に馴染む道具です。
迷ったときはこのチュートリアルに戻ってきてください。いつでも待っています。

**Good luck, and happy coding!**
