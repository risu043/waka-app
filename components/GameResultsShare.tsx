'use client';

import Image from 'next/image';

interface GameResultsShareProps {
  name: string;
  score: number;
}

export default function GameResultsShare({
  name,
  score,
}: GameResultsShareProps) {
  const imageUrl = `/api/og?name=${name}&score=${score}`;
  return (
    <div className="relative min-h-screen">
      <div>
        <h1>クリアの記録</h1>
        <p>Your name: {name}</p>
        <p>Your score: {score}</p>
        <Image src={imageUrl} width={1200} height={630} alt="クリア画像" />
      </div>
    </div>
  );
}
