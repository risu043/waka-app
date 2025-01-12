'use client';

import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import RippleButton from '@/components/ui/ripple-button';

type PaginationProps = {
  hitCount: number;
};

export default function Pagination({ hitCount }: PaginationProps) {
  const { replace } = useRouter();
  const pageVolume = 10;

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
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index}>
            {currentPage === index + 1 ? (
              <RippleButton className="cursor-auto w-8 h-8 rounded-full text-white accent-color pagination">
                {index + 1}
              </RippleButton>
            ) : (
              <RippleButton
                rippleColor="#ADD8E6"
                onClick={() => handleButtonPageClick(index)}
                className="w-8 h-8 rounded-full pagination"
              >
                {index + 1}
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
