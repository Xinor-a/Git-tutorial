# Gitをインストールしよう

[< Previous: このチュートリアルについて](../01-intro/01-about.md) | [Back to Index](../../../README.md) | [Next: ユーザー名とメールアドレスの設定 >](../../part1/01-setup/01-gitconfig-user.md)

## What & Why

このチュートリアルを進めるには、まずGitをパソコンに入れる必要があります。
Gitはプログラムのソースコードを管理するツールで、世界中のエンジニアが使っています。
インストールは一度やってしまえば終わり — さっと済ませて、本題に進みましょう！

## Content

### シナリオ

あなたはGitを使ってみようと思い立ちました。
でも、まだパソコンにGitが入っていません。
「どうやって入れるんだろう？」——環境ごとに手順を確認していきましょう。

---

### 自分のOSを確認する

まず、自分がどのOSを使っているか確認してください。

| OS | 確認方法 |
|---|---|
| Windows | スタートメニュー → 設定 → システム → バージョン情報 |
| macOS | Apple メニュー → このMacについて |
| Linux / WSL | ターミナルで `uname -a` を実行 |

※ WSLは、Windows Subsystem for Linux の略で、Windows上でLinux環境を動かす仕組みです。
WSLを使っている場合は、Linuxの手順でGitをインストールしてください。

---

### Windows の場合

**Git for Windows** をインストールするのが一番かんたんです。

1. [https://gitforwindows.org/](https://gitforwindows.org/) にアクセスする
2. 「Download」ボタンをクリックしてインストーラーをダウンロードする
3. インストーラーを起動し、基本的にそのまま「Next」を押し続けてOK
   - エディタの選択画面では「Use Visual Studio Code as Git's default editor」を選ぶと便利です
4. インストールが完了したら、**Git Bash** または **コマンドプロンプト** を開く

または、**winget**（Windows パッケージマネージャー）を使って `winget install --id Git.Git -e --source winget` を実行してもインストールできます。

> **WSLを使っている場合**
> Windows Subsystem for Linux (WSL) 環境では、後述の「Ubuntu / Debian」の手順を使ってください。

---

### macOS の場合

**Homebrew** を使うのがおすすめです。
Homebrew が入っていない場合は [https://brew.sh/](https://brew.sh/) からインストールできます。

Homebrewが入ったら、`brew install git` を実行してインストールします。

または、Xcode のコマンドラインツールに含まれるGitを使う方法もあります。
`xcode-select --install` を実行するとダイアログが表示されるので「インストール」をクリックしてください。

---

### Ubuntu / Debian（Linux・WSL）の場合

`sudo apt update` を実行してパッケージ情報を更新してから、`sudo apt install git` でインストールします。
パスワードを求められたらログインパスワードを入力してください。

---

### インストールを確認する

どのOSでも、インストール後は `git --version` でバージョンを確認できます。

```bash
git --version
```

```
git version 2.43.0
```

このような出力が表示されればOKです（バージョン番号は多少違っても大丈夫）。

何も表示されなかったり「command not found」と出た場合は、インストールが完了していません。
もう一度手順を確認してみましょう。

## Summary

- GitはOS（Windows / macOS / Linux）ごとにインストール方法が異なる
- `git --version` でインストールを確認できる
- バージョンが表示されればOK — 次のステップへ進もう！

## Exercises

### 手順

1. 自分のOSに合った方法でGitをインストールする
2. ターミナル（Git Bash / Terminal / コンソール）を開く
3. 以下のコマンドを実行して、バージョンが表示されることを確認する

<div class="code-input">

```bash
git --version
```

</div>

<div class="code-output">

```
git version 2.43.0
```

</div>

4. 以下のコマンドも試してみよう。ヘルプ画面が表示されればGitは正常に動いています。

<div class="code-input">

```bash
git --help
```

</div>

### Reset & Retry

⚠️ うまくいかなかったときだけ実行してください。

インストールに失敗した場合は、一度Gitをアンインストールしてからやり直してください。

- **Windows**: 設定 → アプリ → 「Git」を選択してアンインストール
- **macOS (Homebrew)**: `brew uninstall git`
- **Ubuntu / Debian**: `sudo apt remove git`

その後、上記の手順を最初からやり直しましょう。

[< Previous: このチュートリアルについて](../01-intro/01-about.md) | [Back to Index](../../../README.md) | [Next: ユーザー名とメールアドレスの設定 >](../../part1/01-setup/01-gitconfig-user.md)
