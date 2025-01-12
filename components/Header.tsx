'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <header>
      <div className="mx-auto w-fit flex flex-col items-center mb-16">
        <Link href="/">
          <h1 className="text-4xl writing-vertical base-color p-8 shadow-xl">
            <span className="mb-1">百</span>人一首
          </h1>
        </Link>
        <nav>
          <ul className="flex space-x-4 p-4 text-xl">
            <li>
              <Link href="/about">about</Link>
            </li>
            <li>
              <Link href="/ranking">raking</Link>
            </li>
            <li>
              <Link href="/search">search</Link>
            </li>
            <li>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="ml-4"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
