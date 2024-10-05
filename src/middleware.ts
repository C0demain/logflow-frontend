import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {

  const token = request.cookies.get('token')?.value;

  const signInURL = new URL('/login', request.url);
  const dashURL = new URL('/auth/orderservice', request.url);

  const isRoot = request.nextUrl.pathname === '/';
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/auth');

  // Se estiver na página raiz, redireciona para '/login'
  if (isRoot) {
    return NextResponse.redirect(signInURL);
  }

  // Se não houver token e for uma rota protegida, redireciona para '/'
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(signInURL);
  }

  // Se houver token e estiver na página '/', redireciona para o dashboard
  if (token && isRoot) {
    return NextResponse.redirect(dashURL);
  }

  // Caso contrário, permite a navegação
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/auth/:path*'] // Verifica o token para qualquer rota que começe com '/auth'
};
