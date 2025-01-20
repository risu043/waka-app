import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const page = Number(req.nextUrl.searchParams.get('page') || '1');
    const filter = req.nextUrl.searchParams.get('filter') || '';
    const author = req.nextUrl.searchParams.get('author') || '';

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiUrl = `${baseUrl}/wakas/search?page=${page}&filter=${filter}&author=${author}`;

    const res = await fetch(apiUrl, {
      method: 'GET',
      credentials: 'include',
    });
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
