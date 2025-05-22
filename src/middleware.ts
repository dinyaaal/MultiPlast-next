import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Сначала обрабатываем i18n
  const response = intlMiddleware(request);

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const protectedRoutes = ["/dashboard"];
  const isProtected = protectedRoutes.some((route) => pathname.includes(route));

  // debug тут не пропускает пользователя на дашборд когда тот авторизован уже

  console.log(isProtected, token);
  
  // if (isProtected && !token) {
  //   const locale = request.nextUrl.pathname.split("/")[1];
  //   const loginUrl = new URL(`/${locale}/login`, request.url);
  //   loginUrl.searchParams.set("callbackUrl", request.url);
  //   return NextResponse.redirect(loginUrl);
  // }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
