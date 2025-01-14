import type { Metadata } from 'next';
import { Yuji_Syuku } from 'next/font/google';
import './globals.css';
import Provider from '@/components/Provider';
import { Header } from '@/components/Header';

const yujiSyuku = Yuji_Syuku({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-yuji-syuku',
});

export const metadata: Metadata = {
  title: '百人一首',
  description: '百人一首で遊べるアプリです',
  openGraph: {
    title: '百人一首',
    description: '百人一首で遊べるアプリです',
    url: process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/image/og.png`,
        width: 1200,
        height: 630,
        alt: 'OGP Image for 百人一首',
      },
    ],
  },
};

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
          <Header />
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
