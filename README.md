<img src="https://github.com/risu043/waka-app/blob/main/public/image/readme1.png" width="600" alt="readme1">

百人一首で遊べるアプリです。<br>
このリポジトリはフロントエンド部分です。<br>
バックエンドのリポジトリはこちら([prisma-express](https://github.com/risu043/prisma-express))

## 使用したもの

[![My Skills](https://skillicons.dev/icons?i=next,ts,express,prisma,postgres,docker,gcp)](https://skillicons.dev)<br>

- Web Speech API

## 目標

- フロントエンドとバックエンドで分離させたアプリを開発する
- フロントエンドは vercel、バックエンドは google cloud platform にデプロイする

## 作ろうと思ったきっかけ

- 百人一首は画像を含めてパブリックドメインとして共有されているので、著作権による支障がなく個人開発に適していると考えた。
- こどもの頃に百人一首を暗記しようとして挫折した経験から、遊びながら暗記できるアプリを作ろうと思った。

## アプリの遊び方

- 100 首の中からランダムに 10 首が選ばれ、ブラウザに表示される。
- スタートボタンをクリックすると、読み札の読み上げが始まる。
- 札をクリックするとモダールがひらき正誤判定がおこなわれる。
- モダールを閉じると次の読み札が読み上げられる。
- 10 首回答し終わったらクリア画面に遷移する。
- ランキングへ登録すると、さらに画像生成画面に遷移して終了となる。

## 工夫したとこと

<img src="https://github.com/risu043/waka-app/blob/main/public/image/readme2.png" width="600" alt="readme2">
<img src="https://github.com/risu043/waka-app/blob/main/public/image/readme3.png" width="600" alt="readme3">

### フロントエンド

- 紙吹雪を飛ばすライブラリを入れ、正答時とランキング登録時に視覚的に楽しめるようにした。
- Web Speech API を入れ、パソコンが読み札を読み上げるようにした。
- 非同期処理を工夫し、判定用のモダールを閉じた習慣にタイマーをスタートし Web Speech API が発火するようにした。
- 判定時にタイマーを元にスコアを算出し、速くクリアするほど高スコアがでるようにした(通常 1000、MAX5000)
- ランキング登録時に searchParams でユーザー名・スコア・ランクを管理し、それらの値を用いて動的に画像が生成されるようにした。
- 動的に生成した画像を OGP 画像として SNS にシェアするボタンを実装した。
- クリア画面にスコアの値を渡すのに searchParams ではなく tanstack の queryData を用いることで、ランキングのスコアが偽装されるのを防いだ。
- 検索ページのページネーションを動的にし、最小限のボタンが配置されるようにした。

### バックエンド

- バックエンドでデータを成形してからレスポンスすることで、フロントエンドのコードを簡潔に記述できた。
- 検索機能用のエンドポイントで filter、auther クエリを受け付けるようにし、全文検索と作者検索が使えるようにした。
- ランキング登録時にユーザーの現在のランクを表示できるよう、モデル内でデータを操作しレスポンスとして返した。
- helmet を使ってセキュリティの対策をした。

### クラウド

- cloud run ジョブと prisma を用いて cloudSQL にマイグレーションを行った。
- vercel と gcp の間で通信させることができた。
- コストを考慮し、gcp から render に引っ越した。

## 改善したいところ

- 認証機能を省いたため、ユーザーが一度登録したスコアを削除できない。

## ER 図

<img src="https://github.com/risu043/waka-app/blob/main/public/image/readme4.png" width="600" alt="readme4">

## 画面遷移図

<img src="https://github.com/risu043/waka-app/blob/main/public/image/readm5.png" width="600" alt="readme5">

## env

NEXT_PUBLIC_API_URL=[prisma-express](https://github.com/risu043/prisma-express)で作成した API の url<br>
NEXT_PUBLIC_VERCEL_URL=http://localhost:3000 | デプロイ先の url<br>

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
