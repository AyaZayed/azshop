import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getSessionId } from "./getSessionId";
import prisma from "@/lib/db";

export async function getOrCreateUser() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const { guestId } = await getSessionId();

  if (!user) return { user: null, guestId };

  let dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email ?? "",
        firstName: user.given_name ?? "",
        lastName: user.family_name ?? "",
      },
    });
  }

  // ✅ Merge guest data (cart, reviews, etc.) into user
  // if (guestId) {
  //   await mergeGuestCart(guestId, dbUser.id);
  //   await prisma.review.updateMany({
  //     where: { guestId },
  //     data: {
  //       guestId: null,
  //       userId: dbUser.id,
  //     },
  //   });
  //   await prisma.order.updateMany({
  //     where: { guestId },
  //     data: {
  //       guestId: null,
  //       userId: dbUser.id,
  //     },
  //   });
  // }

  return { user: dbUser };
}
