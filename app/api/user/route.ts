import { NextRequest } from 'next/server';
import type { User } from '@/type';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const apiUrl = `${baseUrl}/users`;

export async function POST(req: NextRequest) {
  const data: Omit<User, 'id'> = await req.json();
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  // if (!res.ok) {
  //   throw new Error(`HTTP error! status: ${res.status}`);
  // }
  // const user = await res.json();
  // return Response.json(user, { status: 201 });
  // レスポンスのJSONを取得
  const responseData = await res.json();

  // エラーの場合、元のエラーレスポンスを維持
  if (!res.ok) {
    return Response.json(responseData, { status: res.status });
  }

  return Response.json(responseData, { status: 201 });
}

export async function GET() {
  const res = await fetch(apiUrl);
  const data = await res.json();
  return Response.json(data);
}
