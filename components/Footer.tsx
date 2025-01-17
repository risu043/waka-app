import Link from 'next/link';
import { Shippori_Mincho } from 'next/font/google';

const shipporiMincho = Shippori_Mincho({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export const Footer = () => {
  return (
    <footer className={`${shipporiMincho.className} p-4 mt-16`}>
      <ul className="flex justify-center space-x-4">
        <li>
          <Link href="/info/terms">利用規約</Link>
        </li>
        <li>
          <Link href="/info/policy">プライバシーポリシー</Link>
        </li>
      </ul>
      <p className="text-center">&copy; 2024 りす</p>
    </footer>
  );
};
