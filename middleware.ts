// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function middleware(req: NextRequest) {
  const { isAuthenticated } = getKindeServerSession();
  const authed = await isAuthenticated();

  const url = req.nextUrl.clone();
  const path = req.nextUrl.pathname;

  if (path.startsWith("/dashboard")) {
    if (!authed) {
      url.pathname = "/api/auth/login"; // redirect to login
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
