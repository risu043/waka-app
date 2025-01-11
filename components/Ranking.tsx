'use client';

import { fetchUsers } from '@/app/users';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Trophy, Medal, User } from 'lucide-react';

export const Ranking = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ['fetchUsers'],
    queryFn: fetchUsers,
  });

  // Loading state
  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Ranking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Empty state
  if (!users || users.length === 0) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Ranking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500">
            <User className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-lg font-semibold">
              No ranking data available
            </p>
            <p className="mt-1">Check back later for updates!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Ranking display
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          <span className="relative inline-block">
            Ranking
            <Trophy className="absolute -top-3 -right-8 h-8 w-8 text-yellow-500 transform rotate-12" />
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {users.map((user, index) => (
            <li
              key={user.id}
              className="flex items-center space-x-4 p-3 rounded-lg transition-colors hover:bg-gray-100"
            >
              <div className="relative">
                <span
                  className={`w-12 h-12 flex items-center justify-center text-lg font-bold rounded-full ${
                    index === 0
                      ? 'bg-yellow-400 text-yellow-800'
                      : index === 1
                      ? 'bg-gray-300 text-gray-800'
                      : index === 2
                      ? 'bg-orange-400 text-orange-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {index + 1}
                </span>
                {index < 3 && (
                  <Medal
                    className={`absolute -top-1 -right-1 h-6 w-6 ${
                      index === 0
                        ? 'text-yellow-500'
                        : index === 1
                        ? 'text-gray-400'
                        : 'text-orange-500'
                    }`}
                  />
                )}
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-500">Score: {user.score}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
