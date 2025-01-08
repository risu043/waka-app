'use client';

interface GameResult {
  score: number;
}
import { createUser } from '@/app/users';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['fetchUsers'],
      });
      // queryClient.setQueryData(['gameResult'], { score: gameResult?.score });
      // queryClient.setQueryData(['userName'], { name });
      alert('ランキングに登録しました！');
      router.push(`game_end/share?name=${name}&score=${gameResult?.score}`);
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
    return <div>loading...</div>;
  }

  return (
    <div className="relative min-h-screen">
      <div>
        <h1>Game End</h1>
        <p>Your score: {gameResult.score}</p>
      </div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="お名前"
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" disabled={createUserMutation.isPending}>
          {createUserMutation.isPending
            ? 'Sending...'
            : 'ランキングに登録する 🎉'}
        </button>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </form>
    </div>
  );
}
