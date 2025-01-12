'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function EnhancedSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearchInput = useDebouncedCallback((term: string): void => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      console.log(term);
      params.set('filter', term);
    } else {
      params.delete('filter');
    }
    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleSearchAuthor = useDebouncedCallback((term: string): void => {
    const params = new URLSearchParams(searchParams);
    if (term !== 'all') {
      params.set('author', term);
    } else {
      params.delete('author');
    }
    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mx-auto p-4 mb-4">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-300"
          placeholder="全文検索..."
          onChange={(e) => handleSearchInput(e.target.value)}
          defaultValue={searchParams.get('filter') ?? ''}
          aria-label="全文検索入力"
        />
      </div>
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

        <Input
          className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-300"
          placeholder="作者検索..."
          onChange={(e) => handleSearchAuthor(e.target.value)}
          defaultValue={searchParams.get('author') ?? ''}
          aria-label="作者検索入力"
        />
      </div>
    </div>
  );
}
