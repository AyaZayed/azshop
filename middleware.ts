// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { v4 as uuid } from "uuid";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const guestId = req.cookies.get("guest_id");

  if (!guestId) {
    const newGuestId = uuid();
    res.cookies.set("guest_id", newGuestId, {
      maxAge: 60 * 60 * 24 * 30, // 1 month
      httpOnly: true,
    });
  }

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

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
