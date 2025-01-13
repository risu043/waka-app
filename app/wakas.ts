import type { Waka, SearchResponse } from '@/type';

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

export const searchWakas = async ({
  page,
  filter,
  author,
}: {
  page: number;
  filter: string;
  author: string;
}) => {
  try {
    const res = await fetch(
      `${baseUrl}/api/waka/search?page=${page}&filter=${filter}&author=${author}`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetchWakas: ${res.status}`);
    }

    const data: SearchResponse = await res.json();
    return data;
  } catch (error) {
    console.error('Error in fetchWakas:', error);
    throw error;
  }
};
