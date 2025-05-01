import "./globals.css";
import { fontBogart, fontNunito, fontRubik } from "./fonts";
import { getOrCreateUser } from "./lib/getOrCreateUser";
import getSettings from "./lib/getSettings";
import React from "react";

export async function generateMetadata() {
  const storeName = (await getSettings()).storeName;
  const shopDescription = (await getSettings()).storeDescription;
  return {
    title: storeName.toLocaleUpperCase(),
    description: shopDescription,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await getOrCreateUser();
  const primaryColor = (await getSettings()).primaryColor;
  const secondaryColor = (await getSettings()).secondaryColor;
  const backgroundColor = (await getSettings()).backgroundColor;

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
