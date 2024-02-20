# `Icon` `Changer` `@Discord`

Discord 鯖のアイコンを変える Bot

## What’s this?

（現時点では）日替わりで Discord サーバーのアイコンを変える Bot です。いずれは設定を変えたりできるようにしたいなー

- スラッシュコマンド対応
- 最低限の権限での動作
  - 「サーバーを管理」権限のみで動く
  - メッセージの読み書きは一才しません
- カスタマイズ性抜群（にする予定）

## Install

### 必要なもの

- Node.js
- pnpm
  - https://pnpm.io/ja/installation
- npm パッケージ: `typescript`
  - `tsc` コマンドを使用できるようにするため

#### `tsc` コマンドを使用できるようにする

```bash
npm install -g typescript
# pnpm install -g typescript
```

### 1: 依存パッケージをインストール

```bash
pnpm install
# pnpm i
```

### 2: `.env`ファイルを設定

`.env.example`をコピーして`.env`ファイルを作成し、適宜入力してください

必要に応じて [Discord Developers Portal](https://discord.com/developers/applications) から Bot を作成し、トークンを取得してください。分からなかったら調べてみてねー

### 3: Bot を起動

```bash
pnpm start
```

`tsc` が見つからないといわれた時には、インストールがされているか確認してください！

### 4: サーバーに Bot を追加

適宜 Bot をサーバーに追加してください。

#### 現時点で必要な権限

- サーバーを管理

権限だけ与えれば動きます。
