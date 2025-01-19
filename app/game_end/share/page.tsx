import GameResultsShare from '@/components/GameResultsShare';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PageProps } from '@/type';

export default async function Page(props: PageProps) {
  const searchParams = props.searchParams;
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
