import "./globals.css";
import { fontBogart, fontNunito, fontRubik } from "./fonts";
import { getOrCreateUser } from "./lib/getOrCreateUser";
import getSettings from "./lib/getSettings";

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

  return (
    <html
      lang="en"
      className={`${fontBogart.variable} ${fontNunito.variable} ${fontRubik.variable}`}>
      <body className="font-primary">{children}</body>
    </html>
  );
}
