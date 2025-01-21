'use client';

import React from 'react';
import { FaXTwitter } from 'react-icons/fa6';
import { ShareButtonProps } from '@/type';

const ShareButton: React.FC<ShareButtonProps> = ({ name, score, rank }) => {
  const text = `百人一首 | ${name}さんのスコアは${score}点！${rank}位にランクインしました`;

  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
  const params = new URLSearchParams({
    name: name.toString(),
    score: score.toString(),
    rank: rank.toString(),
  });
  const url = `${baseUrl}?${params.toString()}`;

  const shareUrl = `https://twitter.com/intent/tweet?${new URLSearchParams({
    url: url,
    text: text,
  }).toString()}`;
  const handleShare = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleShare}
      className="bg-neutral-800 text-white rounded-full p-2 m-0 h-12 w-12"
    >
      <FaXTwitter size={30} />
    </button>
  );
};

export default ShareButton;
