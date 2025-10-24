import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  if (pathname.startsWith("/dash")) {
    const token = await getToken({ req });

    if (!token) {
      const loginUrl = new URL("/auth/signin", origin);
      loginUrl.searchParams.set(
        "callbackUrl",
        req.nextUrl.pathname + req.nextUrl.search,
      );
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dash", "/dash/:path*"],
};
