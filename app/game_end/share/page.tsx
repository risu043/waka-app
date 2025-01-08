import GameResultsShare from '@/components/GameResultsShare';

export default async function Page(props: {
  searchParams?: Promise<{
    name?: string;
    score?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const name = searchParams?.name || '';
  const score = Number(searchParams?.score) || 0;
  return (
    <div>
      クリアおめでとうございます！！
      <GameResultsShare name={name} score={score} />
    </div>
  );
}
