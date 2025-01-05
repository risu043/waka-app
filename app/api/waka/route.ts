// import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const apiUrl = `${baseUrl}/wakas`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  return Response.json(data);
}
