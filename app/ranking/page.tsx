import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Ranking } from '@/components/Ranking';
import { fetchUsers } from '@/app/users';

export default async function RankingPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['fetchUsers'],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <div className="container mx-auto p-4">
      <HydrationBoundary state={dehydratedState}>
        <Ranking />
      </HydrationBoundary>
    </div>
  );
}
