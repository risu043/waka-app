import { NextRequest } from 'next/server';
import type { User } from '@/type';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const apiUrl = `${baseUrl}/users`;

export async function POST(req: NextRequest) {
  const data: Omit<User, 'id'> = await req.json();
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data }),
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
}

export async function GET() {
  const res = await fetch(apiUrl);
  const data = await res.json();
  return Response.json(data);
}
