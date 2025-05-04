// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { v4 as uuid } from "uuid";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  if (!req.cookies.get("guest_id")) {
    res.cookies.set("guest_id", uuid(), {
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
    });
  }

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    const { isAuthenticated } = getKindeServerSession();
    if (!(await isAuthenticated())) {
      return NextResponse.redirect(new URL("/api/auth/login", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
