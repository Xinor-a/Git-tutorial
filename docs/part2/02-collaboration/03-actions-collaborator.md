# 仮想コラボレーターを動かそう — GitHub Actions

[< Previous: git clone — リポジトリをローカルに持ってくる](02-clone.md) | [Back to Index](../../../README.md) | [Next: プルリクエストを作ろう >](04-pull-request.md)

## What & Why

一人で練習していても、「誰かがブランチを作ってプッシュしてくれる」という状況は再現しにくい。  
このページでは GitHub Actions を使って、**仮想のコラボレーター（協力者）**がリポジトリにコミットを追加する  
仕組みを動かしてみよう。次のページ以降で `git fetch` やプルリクエストの練習に使う予定だ。

## Content

### シナリオ：チームメンバーが変更をプッシュした

チームで開発していると、自分が作業していない間に他のメンバーがブランチを作ってコードを追加することがある。  
そのとき自分のローカルには最新の情報がない。`git fetch` や `git pull` で取り込む必要がある。

この練習をするには「誰かが実際にプッシュしてくれる環境」が必要だ。  
それを自動でやってくれるのが、このリポジトリに用意した **Collaborator Simulator**（コラボレーターシミュレーター）だ。

---

### GitHub Actions とは

**GitHub Actions** は、GitHub 上でプログラムを自動実行できる仕組みだ。  
「コードをプッシュしたら自動でテストを走らせる」「毎朝決まった処理を実行する」といったことができる。

今回は「手動でボタンを押すと、仮想コラボレーターがコミットを作ってプッシュしてくれる」という  
ワークフローを使う。

---

### Collaborator Simulator の中身

このリポジトリには `.github/workflows/collaborator.yml` というファイルが含まれている。  
ワークフローがやることはシンプルだ：

1. リポジトリをチェックアウト（取得）する
2. Git の設定をする（コミットの作者を `github-actions[bot]` にする）
3. `collaborator/update-YYYYMMDD` という名前の新しいブランチを作る
4. `collaborator-logs/collaborator-log.md` にタイムスタンプ付きのエントリを追加する
5. コミットして、そのブランチを GitHub にプッシュする

つまり「チームメンバーが今日の日付のブランチを作ってプッシュした」状況を再現してくれる。

---

### ワークフローを手動で実行する

GitHub 上でリポジトリを開いて、以下の手順で実行しよう。

**手順：**

1. フォークした自分のリポジトリを GitHub でブラウザで開く
2. 上部のタブから **Actions** をクリック
3. 左側のリストから **Collaborator Simulator** を選択
4. 右側に表示される **Run workflow** ボタンをクリック
5. 確認ダイアログが出たら、もう一度 **Run workflow** をクリック

少し待つと、ワークフローが実行され、チェックマークが付く。

> **Actions タブが見当たらない場合**  
> フォーク直後はアクションが無効になっていることがある。  
> Actions タブを開いて「I understand my workflows, go ahead and enable them」をクリックして有効化しよう。

---

### 実行後に何が起きるか

ワークフローが完了すると、GitHub 上に新しいブランチが作成されている。  
ブランチ名は `collaborator/update-20240115` のような形式だ（実行した日付が入る）。

このブランチはまだあなたのローカルには届いていない。  
次のページでは `git fetch` を使ってこのブランチをローカルに取り込む練習をする。

まずは GitHub の **Code** タブ → ブランチ一覧でブランチが増えていることを確認しよう。

---

### ローカルで確認してみる

現時点では、ローカルにはまだそのブランチの情報がない：

```bash
git branch -a
```

```
* main
  remotes/origin/main
```

`collaborator/update-...` がまだ表示されていないことを確認しよう。  
これが `git fetch` を学ぶ出発点になる。

## Summary

- GitHub Actions はリポジトリ上で処理を自動実行できる仕組みだ。
- **Collaborator Simulator** を手動で実行すると、仮想コラボレーターが新しいブランチを作ってプッシュしてくれる。
- 実行後、GitHub 上には `collaborator/update-YYYYMMDD` ブランチが作成される。
- ローカルにはまだ届いていないため、`git fetch` で取り込む練習ができる。

## Exercises

### 演習 1: ワークフローを実行する

GitHub 上でフォークしたリポジトリを開き、Actions タブから **Collaborator Simulator** を実行しよう。

### 演習 2: ブランチが作成されたことを確認する

GitHub の **Code** タブからブランチ一覧を開き、`collaborator/update-...` ブランチが増えていることを確認しよう。

### 演習 3: ローカルとリモートのブランチを比較する

ローカルのターミナルで以下を実行し、まだローカルに届いていないことを確認しよう：

<div class="code-input">

```bash
git branch -a
```

</div>

<div class="code-input">

```bash
git status
```

</div>

<div class="code-input">

```bash
git log --oneline
```

</div>

リモートの `collaborator/update-...` がローカルにはまだ見えないことを確認できれば OK だ。

### Reset & Retry

ワークフローを複数回実行しすぎた場合、不要なブランチを削除できる。  
GitHub の Code タブ → ブランチ一覧から、`collaborator/update-...` ブランチの右側にあるゴミ箱アイコンで削除できる。

削除後、もう一度 Actions タブからワークフローを実行すれば最初からやり直せる。

次のページからはこのブランチを使って、プルリクエストの作り方を練習しよう。

[< Previous: git clone — リポジトリをローカルに持ってくる](02-clone.md) | [Back to Index](../../../README.md) | [Next: プルリクエストを作ろう >](04-pull-request.md)
