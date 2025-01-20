// import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiUrl = `${baseUrl}/wakas`;
  const res = await fetch(apiUrl, {
    method: 'GET',
    credentials: 'include',
  });
  const data = await res.json();
  return Response.json(data);
}
