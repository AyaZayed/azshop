import React from "react";
import Navbar from "@/app/components/storefront/Navbar";
import Footer from "@/app/components/storefront/Footer";

export default async function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-sf_background">
      <Navbar />
      <div className="">{children}</div>
      <Footer />
    </main>
  );
}
