'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ShareButton from '@/components/ShareButton';
import { Loader2 } from 'lucide-react';
import { ConfettiFireworks } from '@/utils/confetiFireWorks';

interface GameResultsShareProps {
  name: string;
  score: number;
  rank: number;
}

export default function GameResultsShareContent({
  name,
  score,
  rank,
}: GameResultsShareProps) {
  const [isLoading, setIsLoading] = useState(true);
  const imageUrl = `/api/og?name=${name}&score=${score}&rank=${rank}`;

  const handleConfetti = () => {
    setIsLoading(false);
    ConfettiFireworks();
  };

  return (
    <div className="mt-6">
      {isLoading && (
        <div className="flex justify-center items-center h-60">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Image
          src={imageUrl}
          width={1200}
          height={630}
          alt="クリア画像"
          onLoad={() => handleConfetti()}
        />
        <ShareButton name={name} score={score} rank={rank} />
      </motion.div>
    </div>
  );
}
