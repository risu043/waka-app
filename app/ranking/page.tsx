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
    <div>
      <HydrationBoundary state={dehydratedState}>
        <div>
          <Ranking />
        </div>
      </HydrationBoundary>
    </div>
  );
}
