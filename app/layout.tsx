import "./globals.css";
import { fontBogart, fontNunito, fontRubik } from "./fonts";
import React from "react";
import { getOrCreateUser } from "@/utils/auth/getOrCreateUser";
import getSettings from "@/utils/db/settings";
import toTitleCase from "@/utils/capitalize";

async function settings() {
  return await getSettings();
}

export async function generateMetadata() {
  const { storeName, storeDescription } = await settings();
  return {
    title: toTitleCase(storeName),
    description: storeDescription,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await getOrCreateUser();
  const { primaryColor, secondaryColor, backgroundColor } = await settings();

  return (
    <html
      lang="en"
      className={`${fontBogart.variable} ${fontNunito.variable} ${fontRubik.variable}`}
      style={
        {
          ["--sf_primary"]: primaryColor,
          ["--sf_sedcondary"]: secondaryColor,
          ["--sf_background"]: backgroundColor,
        } as React.CSSProperties
      }>
      <body className="font-primary">{children}</body>
    </html>
  );
}
