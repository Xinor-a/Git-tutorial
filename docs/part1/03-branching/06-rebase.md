# git rebase — 歴史を整える

[< Previous: マージコンフリクトを解決する](05-merge-conflict.md) | [Back to Index](../../../README.md) | [Next: git stash — 作業を一時退避する >](07-stash.md)

## What & Why

マージするとき「マージコミット」という記録が残って、履歴がちょっとごちゃごちゃして見えることがある。`git rebase` を使うと、ブランチのコミットをまるで最初から `main` の上に作ったかのように並べ直せる。履歴がスッキリきれいになるので、チームで使うときに喜ばれるテクニックだ。

## Content

### マージとリベースの違い — 道とオオキナキの例え

**マージ**は「2本の道を合流点でつなぐ」イメージだ。

```
main:    A --- B --- C ------- M   (マージコミット)
                      \       /
feature:              D --- E
```

`M` というマージコミットが生まれて、「ここで2つの枝が合流した」という記録が残る。

**リベース**は「木を引っこ抜いて、別の場所に植え替える」イメージだ。

```
（リベース前）
main:    A --- B --- C
                      \
feature:              D --- E

（リベース後）
main:    A --- B --- C
                      \
feature:              D' --- E'
```

`feature` ブランチのコミット `D`、`E` が、最新の `main`（`C`）の上に移植される。コミット自体の内容は同じだけど、位置が変わるので `D'`、`E'` という新しいコミットとして作り直される。

---

### git rebase main を使ってみる

シナリオ：日記アプリの `feature` ブランチで作業している間に、`main` に新しいコミットが追加されてしまった。

`feature` ブランチで作業中の状況を確認しよう：

```bash
git log --oneline --graph --all
```

```
* f3c4d5e (main) READMEに使い方を追記
* a1b2c3d 最初のコミット
| * 9e8f7a6 (HEAD -> feature) 検索機能を追加
| * 7b6c5d4 検索画面のHTMLを作成
|/
```

`feature` ブランチのベース（出発点）は `a1b2c3d` だ。でも `main` はその後 `f3c4d5e` まで進んでいる。

`feature` ブランチにいる状態で `git rebase main` を実行すると、`feature` のコミットが `main` の最新コミットの上に移植される。一直線のきれいな履歴になる。

この後で `main` に `git merge` すると、ベースが同じなので**ファストフォワードマージ**になる。マージコミットが不要な、スッキリした履歴が完成する。

---

### リベース中にコンフリクトが起きたら

リベース中にコンフリクトが発生することもある。解決の手順はマージコンフリクトと同じだ（[マージコンフリクトを解決する](05-merge-conflict.md) を参照）。

コンフリクトを解決してステージングしたら、`git add 修正したファイル名` でステージングし、`git rebase --continue` でリベースを続行する。

複数のコミットをリベースするとき、コンフリクトが何度か出る場合もある。その都度解決して `--continue` を繰り返せば OK だ。

---

### やめたいときは — git rebase --abort

リベース中に「やっぱりやめたい」と思ったら `git rebase --abort` を使えばリベース前の状態にキレイに戻れる。コンフリクト解決が難しくなったときの逃げ道として覚えておこう。

---

### リベースの「黄金ルール」— 共有済みのコミットをリベースしてはいけない

リベースはコミットを「作り直す」操作だ。コミットの内容は同じでも、ハッシュ値（ID）が変わる。

もし**すでにリモートに push 済みのコミット**をリベースすると、チームメンバーが持っているコミット ID と自分のものがズレてしまい、大混乱が起きる。

> **黄金ルール**：リモートに push した（＝チームと共有した）コミットはリベースしない。
> リベースは「まだ自分のローカルだけにある」ブランチでだけ使おう。

一人で作業しているうちはあまり気にしなくて OK。チームで GitHub を使うようになったら必ず意識しよう。

---

### リベース vs マージ — どっちを使う？

| | マージ | リベース |
|---|---|---|
| 履歴の見た目 | 枝が残る（分岐の記録が見える） | 一直線になる |
| 安全性 | push 済みでも OK | ローカルのみのコミットに限る |
| 使いどころ | チームで共有するブランチに取り込むとき | 自分のブランチを main に揃えるとき |

どちらが「正解」かはチームによって異なる。基本はマージを覚えておけば十分。リベースは「きれいな履歴にしたいとき」の追加テクとして使おう。

> インタラクティブリベース（`git rebase -i`）という、コミットを並べ直したり統合したりできる上級テクニックもある。それはまた後のセクションで紹介するね。

## Summary

- `git rebase main` で、現在のブランチのコミットを `main` の最新の上に移植できる。
- リベース後は履歴が一直線になり、その後のマージがファストフォワードになる。
- リベース中にコンフリクトが起きたら、解決後 `git rebase --continue`。中止は `git rebase --abort`。
- **黄金ルール**：リモートに push 済みのコミットはリベースしない。
- きれいな履歴が欲しいとき = リベース、分岐の記録を残したいとき = マージ。

## Exercises

### 演習 1: リベースを体験してみよう

新しいリポジトリを作って準備する：

<div class="code-input">

```bash
mkdir ~/rebase-practice
cd ~/rebase-practice
git init
echo "# リベース練習" > README.md
git add README.md
git commit -m "最初のコミット"
```

</div>

`feature` ブランチを作り、コミットを追加する：

<div class="code-input">

```bash
git switch -c feature
echo "機能Aの実装" > feature-a.txt
git add feature-a.txt
git commit -m "機能Aを追加"
echo "機能Aの改良" >> feature-a.txt
git add feature-a.txt
git commit -m "機能Aを改良"
```

</div>

`main` に戻り、別のコミットを追加する：

<div class="code-input">

```bash
git switch main
echo "ドキュメントを更新" >> README.md
git add README.md
git commit -m "READMEを更新"
```

</div>

現在の状態を確認：

<div class="code-input">

```bash
git log --oneline --graph --all
```

</div>

<div class="code-output">

```
* a1b2c3d (HEAD -> main) READMEを更新
| * 9e8f7a6 (feature) 機能Aを改良
| * 7b6c5d4 機能Aを追加
|/
* f3c4d5e 最初のコミット
```

</div>

---

### 演習 2: リベースを実行して履歴を確認する

<div class="code-input">

```bash
git switch feature
git rebase main
```

</div>

<div class="code-output">

```
Successfully rebased and updated refs/heads/feature.
```

</div>

リベース後の状態を確認：

<div class="code-input">

```bash
git log --oneline --graph --all
```

</div>

<div class="code-output">

```
* 2d3e4f5 (HEAD -> feature) 機能Aを改良
* 1c2d3e4 機能Aを追加
* a1b2c3d (main) READMEを更新
* f3c4d5e 最初のコミット
```

</div>

`feature` のコミットが `main` の上に積み重なっていることを確認しよう。

---

### 演習 3: リベース後にマージしてみよう

<div class="code-input">

```bash
git switch main
git merge feature
```

</div>

<div class="code-output">

```
Updating a1b2c3d..2d3e4f5
Fast-forward
 ...
```

</div>

マージコミットが作られず、ファストフォワードになることを確認しよう。

<div class="code-input">

```bash
git log --oneline --graph --all
```

</div>

<div class="code-input">

```bash
git status
```

</div>

<div class="code-output">

```
On branch main
nothing to commit, working tree clean
```

</div>

---

### Reset & Retry

⚠️ うまくいかなかったときだけ実行してください。

<div class="code-input">

```bash
cd ~
rm -rf rebase-practice
```

</div>

その後、演習 1 から始めてみよう。

[< Previous: マージコンフリクトを解決する](05-merge-conflict.md) | [Back to Index](../../../README.md) | [Next: git stash — 作業を一時退避する >](07-stash.md)
