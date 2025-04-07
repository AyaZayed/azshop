// lib/cart-utils.ts
import { cookies } from "next/headers";
import { v4 as uuid } from "uuid";
import { auth } from "./auth";

export async function getCartId() {
  const { userId } = await auth();

  if (userId) return userId;

  const cookieStore = cookies();
  let guestCartId = cookieStore.get("guest_cart_id")?.value;

  if (!guestCartId) {
    guestCartId = uuid();

    cookieStore.set("guest_cart_id", guestCartId, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
      sameSite: "lax",
    });
  }

  return guestCartId;
}
