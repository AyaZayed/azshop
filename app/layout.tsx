import type { Metadata } from "next";
import "./globals.css";
import { shopName, shopDescription } from "@/utils/constants";
import { fontBogart, fontNunito, fontRubik } from "./fonts";
import { getOrCreateUser } from "./lib/getOrCreateUser";
import { randomUUID } from "crypto";

export const metadata: Metadata = {
  title: shopName,
  description: shopDescription,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await getOrCreateUser();

  return (
    <html
      lang="en"
      className={`${fontBogart.variable} ${fontNunito.variable} ${fontRubik.variable}`}>
      <body className="font-primary">{children}</body>
    </html>
  );
}
