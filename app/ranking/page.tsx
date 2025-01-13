import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Suspense } from 'react';
import { Ranking } from '@/components/Ranking';
import { fetchUsers } from '@/app/users';

export default async function RankingPage(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['fetchUsers'],
    queryFn: () => fetchUsers({ page: currentPage }),
    staleTime: 5 * 60 * 1000,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="container mx-auto p-4">
      <HydrationBoundary state={dehydratedState}>
        <Suspense key={currentPage} fallback={<div>loading...</div>}>
          <Ranking page={currentPage} />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
