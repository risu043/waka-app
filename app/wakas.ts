import type { Waka } from '@/type';

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

export const fetchWakas = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/waka`);
    if (!res.ok) {
      throw new Error(`Failed to fetchWakas: ${res.status}`);
    }

    const wakas: Waka[] = await res.json();
    const readingOrder = [...wakas].sort(() => Math.random() - 0.5);
    return { wakas, readingOrder };
  } catch (error) {
    console.error('Error in fetchWakas:', error);
    throw error;
  }
};
