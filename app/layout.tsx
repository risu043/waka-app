import { Yuji_Syuku } from 'next/font/google';
import './globals.css';
import Provider from '@/components/Provider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import type { Metadata } from 'next';

const yujiSyuku = Yuji_Syuku({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-yuji-syuku',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${yujiSyuku.variable} antialiased ichimatsu font-yuji-syuku`}
      >
        <Provider attribute="class" defaultTheme="system" enableSystem>
          <div id="page">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}

type GenerateMetadataProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  searchParams,
}: GenerateMetadataProps): Promise<Metadata> {
  const name = searchParams.name as string | undefined;
  const score = Number(searchParams.score as string | undefined) || 0;
  const rank = Number(searchParams.rank as string | undefined) || 0;
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

  return {
    title: '百人一首',
    description:
      name && score && rank
        ? `${name}さんのスコアは${score}点！${rank}位にランクインしました`
        : '百人一首で遊べるアプリです',
    openGraph: {
      title: '百人一首',
      description: '百人一首で遊べるアプリです',
      url: baseUrl,
      images: [
        {
          url:
            name && score && rank
              ? `${baseUrl}/api/og?name=${name}&score=${score}&rank=${rank}`
              : `${baseUrl}/image/og.png`,
          width: 1200,
          height: 630,
          alt: 'OGP Image for 百人一首',
        },
      ],
    },
  };
}
