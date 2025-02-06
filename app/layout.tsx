import type { Metadata } from "next";
import "./globals.css";
import { shopName, shopDescription } from "@/utils/constants";
import { fontBogart, fontNunito, fontRubik } from "./fonts";

export const metadata: Metadata = {
  title: shopName,
  description: shopDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontBogart.variable} ${fontNunito.variable} ${fontRubik.variable}`}>
      <body className="font-primary">{children}</body>
    </html>
  );
}
