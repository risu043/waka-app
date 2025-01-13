'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Loader2, Trophy, Send } from 'lucide-react';
import { User } from '@/type';
import { createUser } from '@/app/users';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

interface GameResult {
  score: number;
}

export default function GameResult() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const gameResult = queryClient.getQueryData<GameResult>(['gameResult']);
  const [name, setName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const createUserMutation = useMutation({
    mutationFn: () =>
      createUser({
        name: name,
        score: gameResult?.score ?? 0,
      }),
    onSuccess: (data: User) => {
      queryClient.invalidateQueries({
        queryKey: ['fetchUsers'],
      });
      router.push(
        `game_end/share?name=${name}&score=${gameResult?.score}&rank=${data.rank}`
      );
    },
    onError: (error) => {
      console.error('エラーが発生しました:', error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('エラーが発生しました。');
      }
    },
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserMutation.mutate();
  };

  if (!gameResult) {
    return (
      <div className="flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-96">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Game Clear!</CardTitle>
            <CardDescription>Thank you for playing the game!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <Trophy className="w-16 h-16 mx-auto text-yellow-400" />
              <p className="text-2xl font-bold mt-2">
                Your Score: {gameResult?.score}
              </p>
            </div>
            <form onSubmit={handleFormSubmit} className="space-y-8">
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="お名前"
                  onChange={(e) => setName(e.target.value)}
                  className="flex-grow"
                />
              </div>
              <Button
                type="submit"
                disabled={createUserMutation.isPending}
                className="button accent-button hover:accent-color w-full"
              >
                {createUserMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    送信中...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    ランキングに登録する
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            {errorMessage && (
              <p className="text-red-500 text-sm text-center w-full">
                {errorMessage}
              </p>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
