import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Página de login é pública
  if (pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  // Rotas de redirecionamento de QR são públicas: /[project]/[path]
  // São sempre dois segmentos e o primeiro NÃO é "project"
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 2 && segments[0] !== "project") {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get("auth-session");
  if (!authCookie || authCookie.value !== process.env.AUTH_SECRET) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
