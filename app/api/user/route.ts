import { type NextRequest, NextResponse } from 'next/server';
import type { User } from '@/type';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  const data: Omit<User, 'id'> = await req.json();
  const apiUrl = `${baseUrl}/users`;
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const responseData = await res.json();

  if (!res.ok) {
    return Response.json(responseData, { status: res.status });
  }

  return Response.json(responseData, { status: 201 });
}

export async function GET(req: NextRequest) {
  try {
    const page = Number(req.nextUrl.searchParams.get('page') || '1');

    const apiUrl = `${baseUrl}/users?page=${page}`;

    const res = await fetch(apiUrl);
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Request error', error);
    return NextResponse.json(
      { error: 'Error fetching markers' },
      { status: 500 }
    );
  }
}
