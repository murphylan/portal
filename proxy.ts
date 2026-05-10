import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { hasLocale } from "next-intl";
import { getPathnameWithoutLocale, routing } from "@/i18n/routing";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  const requestedLocale = hasLocale(routing.locales, firstSegment)
    ? firstSegment
    : routing.defaultLocale;
  const pathnameWithoutLocale = getPathnameWithoutLocale(pathname);

  if (
    firstSegment === routing.defaultLocale &&
    pathnameWithoutLocale !== pathname
  ) {
    return NextResponse.redirect(
      new URL(pathnameWithoutLocale + search, request.url),
    );
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-portal-locale", requestedLocale);

  if (pathnameWithoutLocale !== pathname) {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = pathnameWithoutLocale;
    return NextResponse.rewrite(rewriteUrl, {
      request: { headers: requestHeaders },
    });
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
