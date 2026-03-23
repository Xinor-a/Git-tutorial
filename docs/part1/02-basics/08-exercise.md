# まとめ練習 — 小さなプロジェクトを一から作ってみよう

<!-- prev/next navigation -->
[< Previous: .gitignore — 追跡したくないファイルを無視する](./07-gitignore.md) | [Back to Index](../../../README.md) | [Next: ブランチとは何か >](../03-branching/01-branch-concept.md)

## What & Why

ここまでで、Basicsセクションの道具が全部揃った。`git init`、`git status`、`git add`、`git diff`、`git commit`、`git log`、`.gitignore` — ひとつひとつは練習してきたけど、実際のプロジェクトではこれらを組み合わせて使う。

このページでは、新しいプロジェクトをゼロから立ち上げて、一連の流れを自分の手で通してみる。「習うより慣れろ」の時間だ。

## Content

### 今日のシナリオ

**レシピノートをGit管理しよう。**

「好きな料理のレシピをテキストファイルでまとめておきたい」と思ったあなた。メモアプリより、Gitで管理したほうが履歴も残るし、後で変更したときに何を変えたか見直せる。よし、試してみよう。

### 使う流れのおさらい

コマンドの詳しい説明は各ページを参照してほしい。ここでは流れだけ確認する。

```
新しいディレクトリを作る
  └─ git init でリポジトリにする
       └─ ファイルを作る
            └─ git status で状態を確認
                 └─ git add でステージに上げる
                      └─ git diff --cached で確認
                           └─ git commit -m "..." でコミット
                                └─ git log で履歴を確認
```

各コマンドの詳細はこちら:

- [git init → リポジトリを作る](./03-first-repo.md)（`git init` は `03-first-repo.md` のページで紹介している）
- [git status](./04-first-file.md)
- [git add](./05-staging.md)
- [git diff](./05-staging.md)
- [git commit](./06-first-commit.md)
- [git log](./07-gitignore.md)（`git log` は `.gitignore` ページまでに登場している）
- [.gitignore](./07-gitignore.md)

さあ、やってみよう。

## Summary

- Basicsセクションで学んだコマンドは、すべてこの一連の流れで使う。
- `git status` → `git add` → `git diff --cached` → `git commit` のリズムを体に覚えさせよう。
- `.gitignore` は最初のコミット前に用意しておくのがベスト。
- `git log --oneline` でいつでも「今どこにいるか」を確認できる。

## Exercises

### ステップ 1: プロジェクトディレクトリを作って初期化する

<div class="code-input">

```bash
mkdir recipe-notes
cd recipe-notes
git init
```

</div>

確認:

<div class="code-input">

```bash
git status
```

</div>

<div class="code-output">

```
On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

</div>

---

### ステップ 2: ファイルを作る

レシピを2〜3個テキストファイルに書いてみよう。

<div class="code-input">

```bash
touch oyakodon.txt
touch miso-soup.txt
```

</div>

`oyakodon.txt` に内容を書く（エディタで開くか、以下のように入力する）:

<div class="code-input">

```bash
cat > oyakodon.txt << 'EOF'
# 親子丼

材料（2人分）:
- 鶏もも肉 200g
- 玉ねぎ 1/2個
- 卵 3個
- だし汁 150ml
- 醤油 大さじ2
- みりん 大さじ2
- 砂糖 小さじ1

手順:
1. 鶏肉と玉ねぎを煮る
2. 溶き卵を回し入れて半熟にする
3. ご飯の上に乗せる
EOF
```

</div>

<div class="code-input">

```bash
cat > miso-soup.txt << 'EOF'
# 味噌汁

材料（2人分）:
- だし汁 400ml
- 味噌 大さじ2
- 豆腐 100g
- わかめ 適量

手順:
1. だし汁を温める
2. 豆腐とわかめを入れる
3. 味噌を溶かす（沸騰させない）
EOF
```

</div>

---

### ステップ 3: 状態を確認する

<div class="code-input">

```bash
git status
```

</div>

<div class="code-output">

```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	miso-soup.txt
	oyakodon.txt

nothing added to commit but untracked files present (use "git add" to track)
```

</div>

2つのファイルが「Untracked」になっている。

---

### ステップ 4: ステージに追加する

<div class="code-input">

```bash
git add oyakodon.txt miso-soup.txt
git status
```

</div>

<div class="code-output">

```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   miso-soup.txt
	new file:   oyakodon.txt
```

</div>

---

### ステップ 5: ステージの内容を確認する

<div class="code-input">

```bash
git diff --cached
```

</div>

追加した内容が `+` で表示されるのを確認しよう。

---

### ステップ 6: 最初のコミットをする

<div class="code-input">

```bash
git commit -m "docs: 親子丼と味噌汁のレシピを追加"
```

</div>

<div class="code-output">

```
[main (root-commit) xxxxxxx] docs: 親子丼と味噌汁のレシピを追加
 2 files changed, 30 insertions(+)
 create mode 100644 miso-soup.txt
 create mode 100644 oyakodon.txt
```

</div>

---

### ステップ 7: ログを確認する

<div class="code-input">

```bash
git log
git log --oneline
```

</div>

<div class="code-output">

```
xxxxxxx (HEAD -> main) docs: 親子丼と味噌汁のレシピを追加
```

</div>

---

### ステップ 8: .gitignore を追加する

メモ書きや一時ファイルはGit管理したくない。`.gitignore` を作ろう。

<div class="code-input">

```bash
cat > .gitignore << 'EOF'
# 一時メモ
*.tmp
memo-*.txt

# エディタの設定ファイル
.vscode/
EOF
```

</div>

<div class="code-input">

```bash
git status
```

</div>

`.gitignore` が `Untracked files` に表示される。

<div class="code-input">

```bash
git add .gitignore
git commit -m "chore: .gitignoreを追加"
```

</div>

---

### ステップ 9: もう一つレシピを追加してコミットする

<div class="code-input">

```bash
cat > chahan.txt << 'EOF'
# チャーハン

材料（2人分）:
- ご飯 300g
- 卵 2個
- 長ねぎ 1/4本
- 醤油 大さじ1
- 塩・こしょう 適量
- ごま油 少々

手順:
1. 卵を炒める
2. ご飯を加えてほぐしながら炒める
3. 長ねぎを加えて醤油で味付け
EOF
```

</div>

<div class="code-input">

```bash
git status
git add chahan.txt
git status
git diff --cached
git commit -m "docs: チャーハンのレシピを追加"
```

</div>

---

### ステップ 10: 最終ログを確認する

<div class="code-input">

```bash
git log --oneline
```

</div>

<div class="code-output">

```
xxxxxxx (HEAD -> main) docs: チャーハンのレシピを追加
xxxxxxx chore: .gitignoreを追加
xxxxxxx docs: 親子丼と味噌汁のレシピを追加
```

</div>

3つのコミットが積み重なっている。おめでとう、Basicsセクション完走！

---

### Reset & Retry

⚠️ うまくいかなかったときだけ実行してください。

最初からやり直したい場合は、`recipe-notes` ディレクトリごと削除して再挑戦しよう。

<div class="code-input">

```bash
cd ..
rm -rf recipe-notes
```

</div>

その後、ステップ1から始めれば OK。

<!-- prev/next navigation -->
[< Previous: .gitignore — 追跡したくないファイルを無視する](./07-gitignore.md) | [Back to Index](../../../README.md) | [Next: ブランチとは何か >](../03-branching/01-branch-concept.md)
