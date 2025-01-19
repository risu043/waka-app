import { Yuji_Syuku } from 'next/font/google';
import './globals.css';
import Provider from '@/components/Provider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

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
