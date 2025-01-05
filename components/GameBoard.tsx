'use client';

import { fetchWakas } from '@/app/wakas';
import { useQuery } from '@tanstack/react-query';

export const GameBoard = () => {
  const {
    data: wakas,
    // isLoading,
    // isError,
    // error,
  } = useQuery({
    queryKey: ['fetchWakas'],
    queryFn: fetchWakas,
  });
  return (
    <div>
      {wakas &&
        wakas.map((waka) => {
          return <div key={waka.id}>{waka.bodyKanji}</div>;
        })}
    </div>
  );
};
