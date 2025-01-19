import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchWakas } from '@/app/wakas';
import { GameBoard } from '@/components/GameBoard';
import type { Metadata } from 'next';
import { PageProps } from '@/type';

export default async function Home(props: PageProps) {
  const searchParams = props.searchParams;
  console.log(searchParams);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['fetchMarkers'],
    queryFn: fetchWakas,
    staleTime: 5 * 60 * 1000,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        <GameBoard />
      </HydrationBoundary>
    </>
  );
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const name = searchParams?.name || '';
  const score = Number(searchParams?.score) || 0;
  const rank = Number(searchParams?.rank) || 0;
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

  return {
    title: '百人一首',
    description:
      name && score && rank
        ? `${name}さんのスコアは${score}点！${rank}位にランクインしました`
        : '百人一首で遊べるアプリです',
    openGraph: {
      title: '百人一首',
      description: '百人一首で遊べるアプリです',
      url: baseUrl,
      images: [
        {
          url:
            name && score && rank
              ? `${baseUrl}/api/og?name=${name}&score=${score}&rank=${rank}`
              : `${baseUrl}/image/og.png`,
          width: 1200,
          height: 630,
          alt: 'OGP Image for 百人一首',
        },
      ],
    },
  };
}
