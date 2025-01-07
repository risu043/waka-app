import type { User } from '@/type';

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

export const fetchUsers = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/user`);
    if (!res.ok) {
      throw new Error(`Failed to fetchWakas: ${res.status}`);
    }

    const data: User[] = await res.json();
    return data;
  } catch (error) {
    console.error('Error in fetchWakas:', error);
    throw error;
  }
};

export const createUser = async ({
  name,
  score,
}: Omit<User, 'id'>): Promise<User> => {
  try {
    const res = await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, score }),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const newUser: User = await res.json();
    return newUser;
  } catch (error) {
    console.error('ランキングの登録に失敗しました:', error);
    throw error;
  }
};
