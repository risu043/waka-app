'use client';

import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchWakas } from '@/app/wakas';
import { getShimonoku1, getShimonoku2 } from '@/utils';
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
import FlipText from '@/components/ui/flip-text';
import { Timer } from '@/utils/timer';
import { WakaDetails } from './WakaDetails';
import { useTheme } from 'next-themes';
import confetti from 'canvas-confetti';
import { Loader2 } from 'lucide-react';
import { MagicCard } from '@/components/ui/magic-card';
import RippleButton from '@/components/ui/ripple-button';

export const GameBoard = () => {
  const {
    data: { wakas, readingOrder } = { wakas: [], readingOrder: [] },
    isLoading,
  } = useQuery({
    queryKey: ['fetchWakas'],
    queryFn: fetchWakas,
  });

  const queryClient = useQueryClient();
  const router = useRouter();
  const { theme } = useTheme();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<'正解！' | 'ざんねん' | null>(null);
  const [score, setScore] = useState(0);
  const [correctWakas, setCorrectWakas] = useState<Set<number>>(new Set());
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [timer] = useState(new Timer());
  const [elapsedTime, setElapsedTime] = useState('00:00:00');
  const [isAnimating, setIsAnimating] = useState(false);

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
    speak();
  };

  const calculateTimeBonus = (seconds: number): number => {
    // 1秒以内: 500点
    // 3秒以内: 400点
    // 5秒以内: 300点
    // 7秒以内: 200点
    // それ以上: 100点
    if (seconds <= 1) return 500;
    if (seconds <= 3) return 400;
    if (seconds <= 5) return 300;
    if (seconds <= 7) return 200;
    return 100;
  };

  const handleNext = () => {
    if (readingOrder && currentIndex < readingOrder.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      timer.reset();
    } else {
      setIsGameEnd(true);
      timer.stop();
    }
  };

  const jadge = (id: number) => {
    speechSynthesis.cancel();

    timer.stop();
    const timeInSeconds = parseInt(timer.getElapsedTime().split(':')[2]);

    setIsAnimating(false);

    if (readingOrder && id === readingOrder[currentIndex].id) {
      confetti();
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

  const handleGameEnd = () => {
    queryClient.setQueryData(['gameResult'], { score });
    router.push('/game_end');
  };

  let utterance: SpeechSynthesisUtterance | null = null;

  // ブラウザ環境でのみインスタンスを初期化
  if (typeof window !== 'undefined') {
    utterance = new SpeechSynthesisUtterance();
  }

  const speak = () => {
    if (readingOrder && readingOrder[currentIndex]) {
      setTimeout(() => {
        timer.start();
        setIsAnimating(true);
        if (utterance) {
          utterance.text = readingOrder[currentIndex].bodyKana;
          utterance.lang = 'ja-JP';
          utterance.pitch = 1;
          utterance.rate = 0.4;
          utterance.volume = 1;
          speechSynthesis.speak(utterance);
        } else {
          console.error(
            'SpeechSynthesisUtterance is not supported in this environment.'
          );
        }
      }, 0);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <RippleButton
        rippleColor="#FFFFFF"
        onClick={handleStart}
        className="button accent-button mx-auto mb-8 text-xl"
      >
        {isGameStarted ? 'Restart' : 'Start'}
      </RippleButton>

      <div className="md:flex md:justify-between md:items-center">
        <div className="flex flex-wrap space-x-4 mb-4">
          {wakas &&
            wakas.map((_waka, index) => {
              return (
                <RippleButton
                  key={index}
                  className={`cursor-auto w-12 h-10 rounded-r-3xl rounded-l-none mb-4 ${
                    index === currentIndex && isGameStarted ? 'pagination' : ''
                  } ${isIndexCorrect(index) ? 'accent-color text-white' : ''} ${
                    !isGameStarted ? ' opacity-50' : ''
                  }`}
                >
                  {index + 1}
                </RippleButton>
              );
            })}
        </div>
        <div
          className={`flex justify-end items-center space-x-4 mb-4 ${
            !isGameStarted ? ' opacity-50' : ''
          }`}
        >
          <div className="text-xl">スコア: {score} 点</div>
          <div className="text-xl">経過時間: {elapsedTime}</div>
        </div>
      </div>
      <div className="h-24 md:h-16 mb-4">
        {isAnimating && (
          <FlipText
            className="text-xl md:text-2xl"
            word={
              readingOrder ? readingOrder[currentIndex]?.bodyKana : 'Loading...'
            }
            key={`${isAnimating}`}
          />
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
        {wakas &&
          wakas.map((waka) => {
            const shimonoku1 = getShimonoku1(waka.bodyKanji);
            const shimonoku2 = getShimonoku2(waka.bodyKanji);
            const isCorrect = correctWakas.has(waka.id);
            return (
              <Drawer
                key={waka.id}
                onOpenChange={(open) => {
                  if (!open && isGameEnd) {
                    handleGameEnd();
                  } else if (!open && !isGameEnd) {
                    speak();
                  }
                }}
              >
                <DrawerTrigger
                  disabled={isCorrect || isGameEnd || !isGameStarted}
                  onClick={() => jadge(waka.id)}
                >
                  <MagicCard
                    className={`grid place-content-center whitespace-nowrap text-2xl md:text-4xl shadow-2xl ${
                      isCorrect || !isGameStarted
                        ? ' opacity-50'
                        : 'cursor-pointer'
                    }`}
                    gradientColor={theme === 'dark' ? '#262626' : '#D9D9D955'}
                  >
                    <div className="writing-vertical p-8">
                      <p>{shimonoku1}</p>
                      <p>{shimonoku2}</p>
                    </div>
                  </MagicCard>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle className="text-3xl text-center m-8">
                      {result}
                    </DrawerTitle>
                    <DrawerDescription className="text-center mb-4">
                      選んだ歌
                    </DrawerDescription>
                  </DrawerHeader>
                  <WakaDetails waka={waka} />
                  <DrawerFooter>
                    <DrawerClose
                      onClick={() => {
                        if (isGameEnd) {
                          handleGameEnd();
                        } else {
                          speak();
                        }
                      }}
                      className="button accent-button w-fit mx-auto my-4"
                    >
                      次の歌へ
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            );
          })}
      </div>
    </div>
  );
};
