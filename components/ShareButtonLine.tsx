'use client';
import { LineShareButton, LineIcon } from 'react-share';
import { ShareButtonProps } from '@/type';

const ShareButtonLine: React.FC<ShareButtonProps> = ({ name, score, rank }) => {
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
      <LineShareButton url={url} title={text}>
        <LineIcon size={30} round={true} />
      </LineShareButton>
    </>
  );
};

export default ShareButtonLine;
