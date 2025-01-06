'use client';

import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchWakas } from '@/app/wakas';
import {
  getKaminoku1,
  getKaminoku2,
  getKaminoku3,
  getShimonoku1,
  getShimonoku2,
} from '@/utils';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Timer } from '@/utils/timer';

export const GameBoard = () => {
  const { data: wakas } = useQuery({
    queryKey: ['fetchWakas'],
    queryFn: fetchWakas,
  });

  const queryClient = useQueryClient();

  const [readingOrder, setReadingOrder] = useState<typeof wakas>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<'正解！' | 'ざんねん' | null>(null);
  const [score, setScore] = useState(0);
  const [correctWakas, setCorrectWakas] = useState<Set<string>>(new Set());
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [timer] = useState(new Timer());
  const [elapsedTime, setElapsedTime] = useState('00:00:00');

  useEffect(() => {
    if (wakas) {
      const shuffled = [...wakas].sort(() => Math.random() - 0.5);
      setReadingOrder(shuffled);
    }
  }, [wakas]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isGameStarted && !isGameEnd) {
      intervalId = setInterval(() => {
        setElapsedTime(timer.getElapsedTime());
      }, 100);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isGameStarted, isGameEnd, timer]);

  const handleStart = async () => {
    if (isGameStarted) {
      await queryClient.invalidateQueries({
        queryKey: ['fetchWakas'],
      });
    }
    setIsGameStarted(true);
    setCurrentIndex(0);
    setCorrectWakas(new Set());
    setResult(null);
    setIsGameEnd(false);
    setScore(0);
    timer.reset();
    timer.start();
  };

  const calculateTimeBonus = (seconds: number): number => {
    // 3秒以内: 500点
    // 5秒以内: 400点
    // 7秒以内: 300点
    // 9秒以内: 200点
    // それ以上: 100点
    if (seconds <= 3) return 500;
    if (seconds <= 5) return 400;
    if (seconds <= 7) return 300;
    if (seconds <= 9) return 200;
    return 100;
  };

  const handleNext = () => {
    if (readingOrder && currentIndex < readingOrder.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      timer.reset();
      timer.start();
    } else {
      setIsGameEnd(true);
      timer.stop();
    }
  };

  const jadge = (id: string) => {
    timer.stop();
    const timeInSeconds = parseInt(timer.getElapsedTime().split(':')[2]);

    if (readingOrder && id === readingOrder[currentIndex].id) {
      const timeBonus = calculateTimeBonus(timeInSeconds);
      setResult('正解！');
      setScore((prev) => prev + timeBonus);
      setCorrectWakas((prev) => new Set([...prev, id]));
      handleNext();
    } else {
      setResult('ざんねん');
      handleNext();
    }
  };

  const isIndexCorrect = (index: number) => {
    if (!readingOrder || !readingOrder[index]) return false;
    return correctWakas.has(readingOrder[index].id);
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
          <div className="flex flex-wrap space-x-4 my-4">
            {wakas &&
              wakas.map((_waka, index) => {
                return (
                  <div
                    key={index}
                    className={`w-8 h-8 border grid place-items-center rounded-full ${
                      index === currentIndex ? 'border-blue-500' : ''
                    } ${isIndexCorrect(index) ? 'bg-blue-500 text-white' : ''}`}
                  >
                    {index + 1}
                  </div>
                );
              })}
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="text-xl">スコア: {score} 点</div>
            <div className="text-xl">経過時間: {elapsedTime}</div>
          </div>
          <div>
            {readingOrder ? readingOrder[currentIndex]?.bodyKana : 'Loading...'}
          </div>
          {isGameEnd && <div>Game End</div>}
          <ul className="grid grid-cols-5 gap-8">
            {wakas &&
              wakas.map((waka) => {
                const kaminoku1 = getKaminoku1(waka.bodyKanji);
                const kaminoku2 = getKaminoku2(waka.bodyKanji);
                const kaminoku3 = getKaminoku3(waka.bodyKanji);
                const shimonoku1 = getShimonoku1(waka.bodyKanji);
                const shimonoku2 = getShimonoku2(waka.bodyKanji);
                const isCorrect = correctWakas.has(waka.id);
                return (
                  <Drawer key={waka.id}>
                    <DrawerTrigger disabled={isCorrect || isGameEnd}>
                      <li
                        onClick={() => jadge(waka.id)}
                        className={`writing-vertical p-8 border ${
                          isCorrect ? 'bg-gray-300' : 'cursor-pointer'
                        }`}
                      >
                        <p>{shimonoku1}</p>
                        <p>{shimonoku2}</p>
                      </li>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle className="text-3xl text-center m-8">
                          {result}
                        </DrawerTitle>
                        <DrawerDescription className="text-center mb-4">
                          詠まれた歌
                        </DrawerDescription>
                        <div className="writing-vertical mx-auto h-40">
                          <p>{kaminoku1}</p>
                          <p>{kaminoku2}</p>
                          <p>{kaminoku3}</p>
                          <p>{shimonoku1}</p>
                          <p>{shimonoku2}</p>
                          <p className="text-right mr-4">
                            作者 {waka.nameKanji}
                          </p>
                        </div>
                      </DrawerHeader>
                      <DrawerFooter>
                        <DrawerClose>次の歌へ</DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                );
              })}
          </ul>
        </>
      )}
    </div>
  );
};
