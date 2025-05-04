import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { headers } from "next/headers";

export async function getSessionId() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const headerList = headers();
  const cookieHeader = headerList.get("cookie") ?? "";
  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((c) => c.split("="))
  );
  const guestId = cookies["guest_id"] ?? null;
  const userId = user ? user.id : null;

  return {
    sessionId: user?.id ?? guestId!,
    user,
    guestId,
    userId,
  };
}
