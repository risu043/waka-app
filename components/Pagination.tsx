'use client';

import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import RippleButton from '@/components/ui/ripple-button';

type PaginationProps = {
  hitCount: number;
  pageVolume: number;
};

export default function Pagination({ hitCount, pageVolume }: PaginationProps) {
  const { replace } = useRouter();

  const totalPages = Math.ceil(hitCount / pageVolume);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const isLast = hitCount <= currentPage * pageVolume;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePrevPageClick = (): void => {
    replace(createPageURL(currentPage - 1));
  };

  const handleNextPageClick = (): void => {
    replace(createPageURL(currentPage + 1));
  };

  const handleButtonPageClick = (index: number) => {
    replace(createPageURL(index + 1));
  };

  const getVisiblePages = () => {
    const delta = 1; // 現在のページの前後に表示するページ数
    const edges = 1; // 最初と最後に必ず表示するページ数
    const left = currentPage - delta;
    const right = currentPage + delta;

    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i <= edges || // 先頭のページ
        i > totalPages - edges || // 最後のページ
        (i >= left && i <= right) // 現在のページの前後
      ) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <div className="flex space-x-4 mx-auto w-fit">
      <button
        onClick={handlePrevPageClick}
        disabled={currentPage === 1}
        className={
          currentPage === 1 ? 'text-gray-300' : 'hover:text-gray-400 transition'
        }
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <ul className="flex flex-wrap space-x-4">
        {getVisiblePages().map((pageNum, index) => (
          <li key={index} className="mb-4">
            {pageNum === '...' ? (
              <span className="w-10 h-10 flex items-center justify-center">
                {pageNum}
              </span>
            ) : currentPage === pageNum ? (
              <RippleButton className="cursor-auto w-10 h-10 rounded-full text-white accent-color pagination">
                {pageNum}
              </RippleButton>
            ) : (
              <RippleButton
                rippleColor="#dddddd"
                onClick={() => handleButtonPageClick(Number(pageNum) - 1)}
                className="w-10 h-10 rounded-full pagination"
              >
                {pageNum}
              </RippleButton>
            )}
          </li>
        ))}
      </ul>
      <button
        onClick={handleNextPageClick}
        disabled={isLast}
        className={isLast ? 'text-gray-300' : 'hover:text-gray-400 transition'}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
