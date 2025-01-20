// import { NextRequest, NextResponse } from 'next/server';

// export async function GET() {
//   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
//   const apiUrl = `${baseUrl}/wakas`;
//   const res = await fetch(apiUrl, {
//     method: 'GET',
//     credentials: 'include',
//   });
//   const data = await res.json();
//   return Response.json(data);
// }
export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      throw new Error('API URL is not configured');
    }

    const apiUrl = `${baseUrl}/wakas`;
    const res = await fetch(apiUrl, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`API returned status: ${res.status}`);
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error('Route Handler Error:', error);
    return Response.json(
      { error: 'Internal Server Error', details: error },
      { status: 500 }
    );
  }
}
