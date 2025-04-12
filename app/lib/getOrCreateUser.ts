// lib/getOrCreateUser.ts
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { cookies } from "next/headers";
import prisma from "./db";

export async function getOrCreateUser() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const guestId = cookies().get("guest_id")?.value;

  if (user) {
    const existing = await prisma.user.findUnique({ where: { id: user.id } });

    if (!existing) {
      await prisma.user.create({
        data: {
          id: user.id,
          email: user.email ?? "",
          firstName: user.given_name ?? "",
          lastName: user.family_name ?? "",
          profileImage:
            user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
        },
      });
    }
  } else if (guestId) {
    const existing = await prisma.user.findUnique({ where: { id: guestId } });

    if (!existing) {
      await prisma.user.create({
        data: {
          id: guestId,
          email: "",
          firstName: "",
          lastName: "",
          profileImage: `https://avatar.vercel.sh/${guestId}`,
        },
      });
    }
  } else {
    return null;
  }
}
