// src/app/api/getToken/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const id = cookieStore.get('id')?.value;

  return NextResponse.json({ id });
}
