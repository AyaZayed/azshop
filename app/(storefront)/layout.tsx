import React from "react";
import Footer from "@/app/components/storefront/Footer";
import HomeWrapper from "../components/storefront/HomeWrapper";
import Link from "next/link";
import Navbar from "../components/storefront/navbar/Navbar";

export default function StorefrontLayout({
  children,
  sheet,
}: {
  children: React.ReactNode;
  sheet: React.ReactNode;
  home: React.ReactNode;
}) {
  return (
    <main className="bg-sf_background">
      <Navbar />
      <div className="min-h-screen">
        {sheet}
        {children}
      </div>
      <Footer />
      <Link href="/cart" prefetch className="invisible inline">
        open cart
      </Link>
    </main>
  );
}
