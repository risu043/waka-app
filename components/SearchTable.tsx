'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { searchWakas } from '@/app/wakas';
import { SearchResponse } from '@/type';
import { WakaDetails } from '@/components/WakaDetails';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import RippleButton from '@/components/ui/ripple-button';
import Pagination from '@/components/Pagination';
import { WakaSkeleton } from '@/components/WakaSkeleton';

export default function SearchTable({
  filter,
  author,
  page,
}: {
  filter: string;
  author: string;
  page: number;
}) {
  const { data, isLoading, isError, error } = useQuery<SearchResponse, Error>({
    queryKey: ['searchWakas', { page, filter, author }],
    queryFn: () => searchWakas({ page, filter, author }),
  });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-6">
          {[...Array(10)].map((_, index) => (
            <WakaSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500">
        Error: {error instanceof Error ? error.message : 'An error occurred'}
      </div>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <div className="text-center text-muted-foreground">No markers found</div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-6">
        {data.data.map((waka) => (
          <div key={waka.id}>
            <Dialog>
              <DialogTrigger>
                <Image
                  src={waka.imageURL}
                  width={100}
                  height={200}
                  alt={waka.nameKanji}
                  priority
                  className="w-48 h-auto"
                />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <WakaDetails waka={waka} />
                <DialogClose asChild>
                  <RippleButton className="button accent-button w-fit mx-auto mt-4">
                    Close
                  </RippleButton>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
      <Pagination hitCount={data.hitCount} pageVolume={10} />
    </div>
  );
}
