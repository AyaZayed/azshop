import React from "react";
import Navbar from "@/app/components/storefront/Navbar";
import Footer from "@/app/components/storefront/Footer";
import HomeWrapper from "../components/storefront/HomeWrapper";

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
        {sheet}
        <HomeWrapper home={home} />
        {children}
      </div>
      <Footer />
    </main>
  );
}
