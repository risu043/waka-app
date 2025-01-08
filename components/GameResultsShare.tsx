'use client';

interface GameResultsShareProps {
  name: string;
  score: number;
}

export default function GameResultsShare({
  name,
  score,
}: GameResultsShareProps) {
  return (
    <div className="relative min-h-screen">
      <div>
        <h1>クリアの記録</h1>
        <p>Your name: {name}</p>
        <p>Your score: {score}</p>
      </div>
    </div>
  );
}
