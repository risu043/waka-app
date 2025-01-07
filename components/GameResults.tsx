'use client';

interface GameResult {
  score: number;
}
import { createUser } from '@/app/users';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export default function GameResult() {
  const queryClient = useQueryClient();
  const gameResult = queryClient.getQueryData<GameResult>(['gameResult']);

  const [name, setName] = useState<string>('');

  if (!gameResult) {
    return <div>loading...</div>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name) {
      try {
        const user = await createUser({
          name: name,
          score: gameResult.score,
        });
        if (user) {
          await queryClient.invalidateQueries({
            queryKey: ['fetchUsers'],
          });
          alert('ランキングに登録しました！');
        }
      } catch (error) {
        console.error('エラーが発生しました:', error);
        alert('エラーが発生しました。');
      }
    }
  };

  return (
    <div>
      <div>
        <h1>Game End</h1>
        <p>Your score: {gameResult.score}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="お名前"
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">ランキングに登録する</button>
      </form>
    </div>
  );
}
