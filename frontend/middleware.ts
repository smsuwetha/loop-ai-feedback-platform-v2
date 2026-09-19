import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/analytics/:path*",
    "/feedback/:path*",
    "/reports/:path*",
    "/settings/:path*",
    "/profile/:path*",
    "/help/:path*",
  ],
};