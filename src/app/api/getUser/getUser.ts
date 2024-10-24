import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function getUser() {
  const cookieStore = cookies();
  const user = cookieStore.get('user')?.value;

  return NextResponse.json({ user });
}
