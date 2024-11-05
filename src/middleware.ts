import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  // Obtém o token do cookie
  const token = request.cookies.get('token')?.value;
  const user = request.cookies.get('user')?.value;

  // URLs para redirecionamentos
  const signInURL = new URL('/login', request.url);
  const dashURL = new URL('/serviceOrder', request.url);
  const driverURL = new URL('/driver', request.url);

  // Se não houver token e a URL for '/', redireciona para '/login
  if (!token && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(signInURL);
  }

  // Se não houver token e a URL não for '/login', redireciona para '/login'
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

  // Se o usuário for MOTORISTA e a URL não for '/driver', redireciona para '/driver' | Inativo por enquanto
  if (userParse?.role === "Motorista" && request.nextUrl.pathname !== '/serviceOrder') {
    return NextResponse.redirect(dashURL);
  }

  // Se houver token e a URL for '/login' ou '/', redireciona para o dashboard
  if (token && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(dashURL);
  }
  if (token && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(dashURL);
  }

  // Se houver token e a URL não for '/login', permite a navegação
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/serviceOrder',
    '/register',
    '/toDoList/:path*',
    '/client',
    '/user',
    '/driver', 
  ],
};