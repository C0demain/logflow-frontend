import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  // Obtém o token do cookie
  const token = request.cookies.get('token')?.value;
  const user = request.cookies.get('user')?.value;

  // URLs para redirecionamentos
  const signInURL = new URL('/', request.url);
  const dashURL = new URL('/auth/orderservice', request.url);
  const driverURL = new URL('/auth/driver', request.url);

  // Se não houver token e a URL não for '/', redireciona para '/'
  if (!token) {
    if (request.nextUrl.pathname !== '/') {
      return NextResponse.redirect(signInURL);
    }
    return NextResponse.next();
  }

  let userParse;
  if (user) {
    try {
      userParse = JSON.parse(user);
    } catch (error) {
      console.error("Error parsing user data from cookie:", error);
      return NextResponse.redirect(signInURL); // Se ocorrer erro de parsing, redireciona para o login
    }
  }

  // Se o usuário for MOTORISTA e a URL não for '/auth/driver', redireciona para '/auth/driver' | Inativo por enquanto
  if (userParse?.role === "Motorista" && request.nextUrl.pathname !== '/auth/orderservice') {
    return NextResponse.redirect(dashURL);
  }

  // Se houver token e a URL for '/', redireciona para o dashboard
  if (token && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(dashURL);
  }

  // Se houver token e a URL não for '/', permite a navegação
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/auth/orderservice',
    '/auth/register',
    '/auth/todolist/[userId]/[orderId]',
    '/auth/client',
    '/auth/userEdit',
    '/auth/driver',
  ],
};
