'use client';

import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchWakas } from '@/app/wakas';
import { getShimonoku1, getShimonoku2 } from '@/utils';

export const GameBoard = () => {
  const { data: wakas } = useQuery({
    queryKey: ['fetchWakas'],
    queryFn: fetchWakas,
  });

  const queryClient = useQueryClient();

  const [readingOrder, setReadingOrder] = useState<typeof wakas>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<'ok' | 'no' | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameEnd, setIsGameEnd] = useState(false);

  useEffect(() => {
    if (wakas) {
      const shuffled = [...wakas].sort(() => Math.random() - 0.5);
      setReadingOrder(shuffled);
    }
  }, [wakas]);

  const handleStart = async () => {
    if (isGameStarted) {
      await queryClient.invalidateQueries({
        queryKey: ['fetchWakas'],
      });
    }
    setIsGameStarted(true);
    setCurrentIndex(0);
    setResult(null);
    setIsGameEnd(false);
  };

  const handleNext = () => {
    if (readingOrder && currentIndex < readingOrder.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsGameEnd(true);
    }
  };

  const jadge = (id: string) => {
    if (readingOrder && id === readingOrder[currentIndex].id) {
      setResult('ok');
      handleNext();
    } else {
      setResult('no');
      handleNext();
    }
  };
  return (
    <div className="container mx-auto">
      <button
        onClick={handleStart}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {isGameStarted ? 'Restart' : 'Start'}
      </button>

      {isGameStarted && wakas && (
        <>
          <div>
            {readingOrder ? readingOrder[currentIndex]?.bodyKana : 'Loading...'}
          </div>
          <div>{result}</div>
          {isGameEnd && <div>Game End</div>}
          <div className="mt-2 text-sm text-gray-600">
            {readingOrder
              ? `${currentIndex + 1}つめ / ${readingOrder.length}問中`
              : ''}
          </div>
          <ul className="grid grid-cols-5 gap-8">
            {wakas &&
              wakas.map((waka) => {
                const shimonoku1 = getShimonoku1(waka.bodyKanji);
                const shimonoku2 = getShimonoku2(waka.bodyKanji);
                return (
                  <li
                    key={waka.id}
                    onClick={() => jadge(waka.id)}
                    className="writing-vertical p-8 border cursor-pointer"
                  >
                    <p>{shimonoku1}</p>
                    <p>{shimonoku2}</p>
                  </li>
                );
              })}
          </ul>
        </>
      )}
    </div>
  );
};
