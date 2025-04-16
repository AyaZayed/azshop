import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { cookies } from "next/headers";
import mergeGuestCart from "@/app/lib/mergeGuestCart";

export async function POST() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const guestId = cookies().get("guestId")?.value;

  if (user?.id && guestId) {
    await mergeGuestCart(user.id, guestId);
  }

  return NextResponse.json({ merged: true });
}
