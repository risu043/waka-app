import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from '@/app/providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '百人一首',
  description: '百人一首で遊べるアプリです',
  openGraph: {
    title: '百人一首',
    description: '百人一首で遊べるアプリです',
    url: process.env.NEXT_PUBLIC_VERCEL_URL,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/og`,
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
