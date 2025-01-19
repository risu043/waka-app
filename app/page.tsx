import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchWakas } from '@/app/wakas';
import { GameBoard } from '@/components/GameBoard';
import type { Metadata } from 'next';

export default async function Home() {
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

export const metadata: Metadata = {
  title: '百人一首',
  description: '百人一首で遊べるアプリです',
  openGraph: {
    title: '百人一首',
    description: '百人一首で遊べるアプリです',
    url: process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/image/og.png`,
        width: 1200,
        height: 630,
        alt: 'OGP Image for 百人一首',
      },
    ],
  },
};
