import type { Metadata } from "next";
import "./globals.css";
import { shopName, shopDescription } from "@/utils/constants";
import { fontBogart, fontNunito, fontRubik } from "./fonts";
import prisma from "./lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const metadata: Metadata = {
  title: shopName,
  description: shopDescription,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

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
  }
  return (
    <html
      lang="en"
      className={`${fontBogart.variable} ${fontNunito.variable} ${fontRubik.variable}`}>
      <body className="font-primary">{children}</body>
    </html>
  );
}
