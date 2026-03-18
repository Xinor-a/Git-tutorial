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

状況を確認しよう：

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

`feature` ブランチにいる状態で：

```bash
git rebase main
```

```
Successfully rebased and updated refs/heads/feature.
```

もう一度ログを見てみよう：

```bash
git log --oneline --graph --all
```

```
* 2d3e4f5 (HEAD -> feature) 検索機能を追加
* 1c2d3e4 検索画面のHTMLを作成
* f3c4d5e (main) READMEに使い方を追記
* a1b2c3d 最初のコミット
```

`feature` のコミットが `main` の最新コミットの上に移植された。一直線のきれいな履歴になった。

この後で `main` にマージすると、ベースが同じなので**ファストフォワードマージ**になる。マージコミットが不要な、スッキリした履歴が完成する。

```bash
git switch main
git merge feature
```

```
Updating f3c4d5e..2d3e4f5
Fast-forward
 ...
```

---

### リベース中にコンフリクトが起きたら

リベース中にコンフリクトが発生することもある。解決の手順はマージコンフリクトと同じだ（[マージコンフリクトを解決する](05-merge-conflict.md) を参照）。

コンフリクトを解決してステージングしたら：

```bash
git add 修正したファイル名
git rebase --continue
```

複数のコミットをリベースするとき、コンフリクトが何度か出る場合もある。その都度解決して `--continue` を繰り返せば OK だ。

---

### やめたいときは — git rebase --abort

リベース中に「やっぱりやめたい」と思ったら：

```bash
git rebase --abort
```

これでリベース前の状態にキレイに戻れる。コンフリクト解決が難しくなったときの逃げ道として覚えておこう。

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

新しいリポジトリで試してみよう：

```bash
mkdir ~/rebase-practice
cd ~/rebase-practice
git init
echo "# リベース練習" > README.md
git add README.md
git commit -m "最初のコミット"
```

`feature` ブランチを作り、コミットを追加する：

```bash
git switch -c feature
echo "機能Aの実装" > feature-a.txt
git add feature-a.txt
git commit -m "機能Aを追加"
echo "機能Aの改良" >> feature-a.txt
git add feature-a.txt
git commit -m "機能Aを改良"
```

`main` に戻り、別のコミットを追加する：

```bash
git switch main
echo "ドキュメントを更新" >> README.md
git add README.md
git commit -m "READMEを更新"
```

現在の状態を確認：

```bash
git log --oneline --graph --all
```

### 演習 2: リベースを実行して履歴を確認する

```bash
git switch feature
git rebase main
```

リベース後の状態を確認：

```bash
git log --oneline --graph --all
```

`feature` のコミットが `main` の上に積み重なっていることを確認しよう。

### 演習 3: リベース後にマージしてみよう

```bash
git switch main
git merge feature
git log --oneline --graph --all
```

マージコミットが作られず、ファストフォワードになることを確認しよう。

```bash
git status
```

### Reset & Retry

最初からやり直したいときは：

```bash
cd ~
rm -rf rebase-practice
```

その後、演習 1 から始めてみよう。

[< Previous: マージコンフリクトを解決する](05-merge-conflict.md) | [Back to Index](../../../README.md) | [Next: git stash — 作業を一時退避する >](07-stash.md)
