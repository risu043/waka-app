import type { User } from '@/type';

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

export const fetchUsers = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/user`);
    if (!res.ok) {
      throw new Error(`Failed to fetchWakas: ${res.status}`);
    }

    const user: User[] = await res.json();
    return user;
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
    const res = await fetch(`${baseUrl}/api/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, score }),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const user: User = await res.json();
    return user;
  } catch (error) {
    console.error('ランキングの登録に失敗しました:', error);
    throw error;
  }
};
