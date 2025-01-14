import type { Metadata } from 'next';
import GameResultsShare from '@/components/GameResultsShare';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export async function generateMetadata(props: {
  searchParams?: Promise<{
    name?: string;
    score?: string;
    rank?: string;
  }>;
}): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const name = searchParams?.name || '';
  const score = Number(searchParams?.score) || 0;
  const rank = Number(searchParams?.rank) || 0;
  return {
    title: '百人一首',
    description: '百人一首で遊べるアプリです',
    openGraph: {
      title: '百人一首',
      description: '百人一首で遊べるアプリです',
      url: process.env.NEXT_PUBLIC_VERCEL_URL,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/og?name=${name}&score=${score}&rank=${rank}`,
          width: 1200,
          height: 630,
          alt: 'OGP Image for 百人一首',
        },
      ],
    },
  };
}

export default async function Page(props: {
  searchParams?: Promise<{
    name?: string;
    score?: string;
    rank?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const name = searchParams?.name || '';
  const score = Number(searchParams?.score) || 0;
  const rank = Number(searchParams?.rank) || 0;
  return (
    <div className="container mx-auto max-w-5xl p-4">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Registered!</CardTitle>
          <CardDescription>Thank for registering ranking !</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mx-auto w-fit">
            <p>Your name: {name}</p>
            <p>Your score: {score}</p>
            <p>Your rank: {rank}</p>
          </div>
          <GameResultsShare name={name} score={score} rank={rank} />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
