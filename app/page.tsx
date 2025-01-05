import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchWakas } from '@/app/wakas';
import { GameBoard } from '@/components/GameBoard';

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['fetchMarkers'],
    queryFn: fetchWakas,
    staleTime: 5 * 60 * 1000,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <div>
      <HydrationBoundary state={dehydratedState}>
        <div>
          <GameBoard />
        </div>
      </HydrationBoundary>
    </div>
  );
}
