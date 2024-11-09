import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const user = request.cookies.get('user')?.value;

  const signInURL = new URL('/login', request.url);
  const serviceOrderURL = new URL('/auth/service-order', request.url);
  const driverURL = new URL('/auth/driver', request.url);

  // Se não houver token, redireciona para '/login' para qualquer URL protegida
  if (!token) {
    if (request.nextUrl.pathname !== '/login') {
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

  // Se o usuário for MOTORISTA e a URL não for '/auth/driver', redireciona para '/auth/driver'
  if (userParse?.role === "Motorista" && request.nextUrl.pathname !== '/auth/driver') {
    return NextResponse.redirect(driverURL);
  }

  // Se houver token e a URL for '/login' ou '/', redireciona para a tela de ordem de serviço
  if (token && request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/') {
    return NextResponse.redirect(serviceOrderURL);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/auth/service-order',
    '/auth/register',
    '/auth/to-do-list/[userId]/[orderId]',
    '/auth/client',
    '/auth/userEdit',
    '/auth/driver', 
  ],
};
