import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id || !user.email) {
    throw new Error("Not authorized");
  }
  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        firstName: user.given_name ?? "",
        lastName: user.family_name ?? "",
        profileImage:
          user.picture ??
          `https://avatar.vercel.sh/random?name=${user.given_name}?${user.family_name}`,
        email: user.email,
      },
    });
  }

  return NextResponse.redirect("http://localhost:3000/");
};
