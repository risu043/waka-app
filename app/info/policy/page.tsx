import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shippori_Mincho } from 'next/font/google';

const shipporiMincho = Shippori_Mincho({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export default function TermsOfService() {
  return (
    <div
      className={`${shipporiMincho.className} container mx-auto max-w-4xl  py-8`}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">
        プライバシーポリシー
      </h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>はじめに</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            本プライバシーポリシーは、百人一首アプリがユーザーに提供するサービスにおける、個人情報およびその他の情報の取り扱いについて説明するものです。当アプリを利用することにより、ユーザーは本プライバシーポリシーの内容を理解し、同意したものとみなします。
          </p>
        </CardContent>
      </Card>

      {[
        {
          title: '第1条（収集する情報）',
          content: [
            '当アプリでは以下の情報を収集することがあります。',
            '1. ユーザーの名前とスコア',
          ],
        },
        {
          title: '第2条（個人情報を収集・利用する目的）',
          content: [
            '当アプリが個人情報を収集・利用する目的は，以下のとおりです。',
            '1. 当アプリの提供および運営のため',
            '2. 当アプリの改善および新機能の開発のため',
          ],
        },
        {
          title: '第3条（プライバシーポリシーの変更）',
          content: ['本ポリシーは、必要に応じて変更される場合があります。'],
        },
        {
          title: 'お問い合わせ',
          content: [
            'プライバシーポリシーに関する質問やご意見は、以下のアカウントまでお問い合わせください。',
            <a
              key="x"
              href="https://x.com/risu043"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              @risu043
            </a>,
          ],
        },
      ].map((section, index) => (
        <Card key={index} className="mb-6">
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {section.content.map((paragraph, pIndex) => (
              <p key={pIndex} className="mb-2">
                {paragraph}
              </p>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
