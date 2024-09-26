import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  // Obtém o token do cookie
  const token = request.cookies.get('token')?.value;

  // URLs para redirecionamentos
  const signInURL = new URL('/', request.url);
  const dashURL = new URL('/auth/orderservice', request.url);

  // Se não houver token e a URL não for '/', redireciona para '/'
  if (!token) {
    if (request.nextUrl.pathname === '/') {
      return NextResponse.next();
    }

    return NextResponse.redirect(signInURL);
  }

  // Se houver token e a URL for '/' ou '/', redireciona para o dashboard
  if (request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/') {
    return NextResponse.redirect(dashURL);
  }

  // Se houver token e a URL não for '/', permite a navegação
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/auth/orderservice', '/auth/register', '/auth/todolist', '/auth/client', '/auth/userEdit']
};
