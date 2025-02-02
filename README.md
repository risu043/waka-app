<img src="https://github.com/risu043/waka-app/blob/main/public/image/readme1.png" width="600" alt="readme1">

百人一首で遊べるアプリのフロント部分です。
バックエンドのコードはこちら([prisma-express](https://github.com/risu043/prisma-express))

## 使用したもの

[![My Skills](https://skillicons.dev/icons?i=next,ts)](https://skillicons.dev)<br>

- web speech api
- confeti

## 作ろうと思ったきっかけ

フロントとバックエンドで分離した構成を学びたいと思ったのがきっかけです。
百人一首を返す API を作ったので、それを使って遊べるアプリを作りました。

## 工夫したとこと

<img src="https://github.com/risu043/waka-app/blob/main/public/image/readme2.png" width="600" alt="readme1">
<img src="https://github.com/risu043/waka-app/blob/main/public/image/readme13.png" width="600" alt="readme1">

- confeti のライブラリを入れ、正答時とクリア時に視覚的に楽しめるようにした
- web speeach api を入れ、パソコンが読み札を読み上げるようにした
- 非同期処理を工夫し、判定用のモダールを閉じた習慣にタイマーをスタートし speech 関数が発火するようにした
- 判定時に経過時間を元にスコアを算出し、速くクリアするほど高スコアがでるようにした(通常 1000、MAAX5000)
- クリア時に searchParams でユーザー名・スコア・ランクを管理し、それらの値を用いて動的に画像が生成されるようにした
- クリア画面にスコアの値を渡すのに searchParams ではなく tanstack の queryData を用いることで、ランキングのスコアが偽装されるのを防いだ

## env

NEXT_PUBLIC_API_URL=[prisma-express](https://github.com/risu043/prisma-express)で作成した API の url
NEXT_PUBLIC_VERCEL_URL=http://localhost:3000 | デプロイ先の url

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
