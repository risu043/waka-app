'use client';

import Image from 'next/image';
import ShareButton from './ShareButton';

interface GameResultsShareProps {
  name: string;
  score: number;
}

export default function GameResultsShare({
  name,
  score,
}: GameResultsShareProps) {
  const imageUrl = `/api/og?name=${name}&score=${score}`;
  const text = `百人一首 | ${name}さんのスコアは${score}点です！`;
  return (
    <div className="relative min-h-screen">
      <div>
        <h1>クリアの記録</h1>
        <p>Your name: {name}</p>
        <p>Your score: {score}</p>
        <Image src={imageUrl} width={1200} height={630} alt="クリア画像" />
        <ShareButton text={text} />
      </div>
    </div>
  );
}
