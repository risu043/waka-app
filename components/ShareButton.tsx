// 'use client';

// import React from 'react';
// import { Button } from '@/components/ui/button';
// import { FaXTwitter } from 'react-icons/fa6';
// import { ShareButtonProps } from '@/type';

// const ShareButton: React.FC<ShareButtonProps> = ({ name, score, rank }) => {
//   const text = `百人一首 | ${name}さんのスコアは${score}点！${rank}位にランクインしました`;

//   const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
//   const params = new URLSearchParams({
//     name: name.toString(),
//     score: score.toString(),
//     rank: rank.toString(),
//   });
//   const url = `${baseUrl}?${params.toString()}`;

//   const shareUrl = `https://twitter.com/intent/tweet?${new URLSearchParams({
//     url: url,
//     text: text,
//   }).toString()}`;
//   const handleShare = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();
//     window.open(shareUrl, '_blank', 'noopener,noreferrer');
//   };

//   return (
//     <Button
//       onClick={handleShare}
//       variant="outline"
//       size="lg"
//       className="bg-neutral-800 text-white hover:bg-neutral-800 hover:text-white border-none rounded-full p-0 m-0 h-12 w-12"
//     >
//       <FaXTwitter />
//     </Button>
//   );
// };

// export default ShareButton;
'use client';
import { TwitterShareButton } from 'react-share';
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
  return (
    <>
      <TwitterShareButton url={url} title={text}>
        <FaXTwitter className="bg-neutral-800 text-white rounded-full p-2 h-12 w-12" />
      </TwitterShareButton>
    </>
  );
};

export default ShareButton;
