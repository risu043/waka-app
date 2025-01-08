'use client';

import { fetchUsers } from '@/app/users';
import { useQuery } from '@tanstack/react-query';

export const Ranking = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ['fetchUsers'],
    queryFn: fetchUsers,
  });

  // ローディング中の表示
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // データが存在しない、または空の配列の場合
  if (!users || users.length === 0) {
    return (
      <div>
        <h1>Ranking</h1>
        <p>現在ランキングデータはありません。</p>
      </div>
    );
  }

  // データがある場合の表示
  return (
    <div>
      <h1>Ranking</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}: {user.score}
          </li>
        ))}
      </ul>
    </div>
  );
};
