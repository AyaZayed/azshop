import React from "react";
import Footer from "@/app/components/storefront/Footer";
import HomeWrapper from "../components/storefront/HomeWrapper";
import Link from "next/link";
import Navbar from "../components/storefront/navbar/Navbar";

export default function StorefrontLayout({
  children,
  sheet,
  home,
}: {
  children: React.ReactNode;
  sheet: React.ReactNode;
  home: React.ReactNode;
}) {
  return (
    <main className="bg-sf_background">
      <Navbar />
      <div className="min-h-screen">
        <HomeWrapper home={home} />
        {sheet}
        {children}
      </div>
      <Footer />
      <Link href="/cart" prefetch className="invisible">
        open cart
      </Link>
    </main>
  );
}
