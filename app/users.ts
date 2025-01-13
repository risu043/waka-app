import type { User, UserResponse } from '@/type';

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

export const fetchUsers = async ({
  page,
}: {
  page: number;
}): Promise<UserResponse> => {
  try {
    const res = await fetch(`${baseUrl}/api/user?page=${page}`);
    if (!res.ok) {
      throw new Error(`Failed to fetchUsers: ${res.status}`);
    }

    const data: UserResponse = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error in fetchUsers:', error);
    throw error;
  }
};

export const createUser = async ({
  name,
  score,
}: Omit<User, 'id' | 'rank'>): Promise<User> => {
  try {
    const res = await fetch(`${baseUrl}/api/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, score }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.errors?.[0]?.msg || 'Unknown error occurred');
    }
    const user: User = await res.json();
    return user;
  } catch (error) {
    console.error('ランキングの登録に失敗しました:', error);
    throw error;
  }
};
