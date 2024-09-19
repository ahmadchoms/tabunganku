import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const session = req.cookies.get("session");
  const allowedPath = ["/", "/incomes", "/spending", "/history"];

  if (
    !session &&
    !req.nextUrl.pathname.startsWith("/auth/login") &&
    !req.nextUrl.pathname.startsWith("/auth/register")
  ) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (
    process.env.NODE_ENV === "production" &&
    !req.url.startsWith("https://")
  ) {
    return NextResponse.redirect(`https://${req.url}`, 301);
  }

  if (!allowedPath.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/404", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/incomes", "/spending", "/history"],
};
