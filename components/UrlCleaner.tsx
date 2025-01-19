'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function UrlCleaner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (
      searchParams.has('name') ||
      searchParams.has('score') ||
      searchParams.has('rank')
    ) {
      router.replace('/', { scroll: false });
    }
  }, [router, searchParams]);

  return null;
}
