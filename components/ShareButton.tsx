'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { FaXTwitter } from 'react-icons/fa6';

interface ShareButtonProps {
  name: string;
  score: number;
  rank: number;
}

const ShareButton: React.FC<ShareButtonProps> = ({ name, score, rank }) => {
  const text = `百人一首 | ${name}さんのスコアは${score}点！${rank}位にランクインしました`;

  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
  const url = `${baseUrl}?name=${encodeURIComponent(
    name
  )}&score=${score}&rank=${rank}`;
  const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    url
  )}${text ? `&text=${encodeURIComponent(text)}` : ''}`;

  const handleShare = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Button
      onClick={handleShare}
      variant="outline"
      size="lg"
      className="bg-neutral-800 text-white hover:bg-neutral-700 hover:text-white border-none rounded-full mt-4 p-4 text-xl"
    >
      <FaXTwitter className="h-8 w-8" />
      <span className="mb-2">share</span>
    </Button>
  );
};

export default ShareButton;
