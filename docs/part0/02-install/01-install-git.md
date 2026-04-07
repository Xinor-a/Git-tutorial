# 0.2.1 Gitをインストールしよう

[< Previous: このチュートリアルについて](../01-intro/01-about.md) | [Back to Index](../../../README.md) | [Next: ユーザー名とメールアドレスの設定 >](../../part1/01-setup/01-gitconfig-user.md)

## 📖 シナリオ

あなたはプログラミングを勉強中です。  
プログラミングに詳しい友達が「Gitを使うと自分の作ったプログラムを管理できて便利だよ！」と教えてくれて興味を持ちました。  
でも、自分のパソコンにはまだGitが入っていません。  
「どうやって入れるんだろう？」

まずは、Gitをパソコンにインストールするところから始めましょう！

## 🎯 What & Why

このチュートリアルを進めるにあたって、何をするにもまずはGitをパソコンに入れる必要があります。  
Gitはプログラムのソースコードを管理するツールで、世界中のエンジニアが使っています。  
インストールは一度やってしまえば終わり — さっと済ませて、本題に進みましょう！

---

## 🎬 Actions

### 環境を選んでインストールする

まずは、自分の環境に合った手順を選んでください。

あなたのOSはどれですか？

- [Windowsの場合](#windows-の場合)
  - [WSLの場合](#linux--wsl-の場合)
- [macOSの場合](#macos-の場合)
- [Linuxの場合](#linux--wsl-の場合)

※ WSL (Windows Subsystem for Linux) は、Windows上でLinux環境を動かす仕組みです。

---

#### Windows の場合

##### GUIでインストールする方法

**Git for Windows** をインストールするのが一番かんたんです。  
次の手順で、インストールを実施しましょう。

1. [https://gitforwindows.org/](https://gitforwindows.org/) にアクセスする
2. 「Download」ボタンをクリックしてインストーラーをダウンロードする
3. インストーラーを起動し、基本的にそのまま「Next」を押し続けてOK
   - エディタの選択画面では「Use Visual Studio Code as Git's default editor」を選ぶと便利です
4. 完了したら、インストーラを終了する

##### コマンドでインストールする方法

**winget**（Windows パッケージマネージャー）を使って、powershellから次のコマンドでインストールできます。

<code style="background-color: #f8d7da; font-family: monospace; margin: 10px; padding: 10px; width: 100%; line-height: 60px;">
winget install --id Git.Git -e --source winget
</code>

インストールできたら、ターミナルを開いて、[インストールを確認する](#インストールを確認する)へ進みましょう。

---

#### macOS の場合

**Homebrew** を使ってGitをインストールするのがおすすめです。

1. Homebrew が入っていない場合は [公式インストールページ](https://brew.sh/) からインストールできます。
2. Homebrewが入ったら、 ターミナルを開き、次のコマンドを実行してインストールします。

<code style="background-color: #f8d7da; font-family: monospace; margin: 10px; padding: 10px; width: 100%; line-height: 60px;">
brew install git
</code>

> または、Xcode のコマンドラインツールに含まれるGitを使う方法もあります。
> `xcode-select --install` を実行するとダイアログが表示されるので「インストール」をクリックしてください。

インストールできたら、[インストールを確認する](#インストールを確認する)へ進みましょう。

---

#### Linux / WSL の場合

下記コマンドを実行し、Gitをインストールします。

1. ターミナルを開き、apt(Advanced Package Tool)のパッケージリストを更新する

   <code style="background-color: #f8d7da; font-family: monospace; margin: 10px; padding: 10px; width: 100%; line-height: 60px;">
   sudo apt update
   </code>

2. Gitをインストールする

   <code style="background-color: #f8d7da; font-family: monospace; margin: 10px; padding: 10px; width: 100%; line-height: 60px;">
   sudo apt install git
   </code>

3. パスワードを求められたらログインパスワードを入力してください

インストールできたら、[インストールを確認する](#インストールを確認する)へ進みましょう。

---

### インストールを確認する

インストール後は <code style="background-color: #fff; font-family: monospace; margin: 10px; padding: 10px; width: 100%; line-height: 60px;">git --version</code> でバージョンが表示されればOKです（バージョン番号は多少違っても大丈夫）。  
何も表示されなかったり「command not found」などと出た場合は、インストールが完了していません。  
もう一度手順を確認してみましょう。

---

## Summary

- GitはOS（Windows / macOS / Linux）ごとにインストール方法が異なる
- `git --version` でインストールを確認できる
- バージョンが表示されればOK — 次のステップへ進もう！

---

## Reset & Retry

⚠️ うまくいかなかったときだけ実行してください。

インストールに失敗した場合は、一度Gitをアンインストールしてからやり直してください。

- **Windows**: 設定 → アプリ → 「Git」を選択してアンインストール
- **macOS (Homebrew)**: `brew uninstall git`
- **Ubuntu / Debian**: `sudo apt remove git`

その後、上記の手順を最初からやり直しましょう。

[< Previous: このチュートリアルについて](../01-intro/01-about.md) | [Back to Index](../../../README.md) | [Next: ユーザー名とメールアドレスの設定 >](../../part1/01-setup/01-gitconfig-user.md)
