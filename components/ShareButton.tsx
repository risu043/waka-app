'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { FaXTwitter } from 'react-icons/fa6';

interface ShareButtonProps {
  text?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ text }) => {
  const url = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
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
      className="bg-neutral-800 text-white hover:bg-neutral-700 border-none rounded-full mt-4 p-4 text-xl"
    >
      <FaXTwitter className="h-8 w-8" />
      <span className="mb-2">share</span>
    </Button>
  );
};

export default ShareButton;
