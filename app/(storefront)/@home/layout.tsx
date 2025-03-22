import BetterSunCare from "@/app/components/storefront/BetterSunCare";
import React from "react";

export default function HomeLayout({
  featured,
  hero,
  protection,
}: {
  featured: React.ReactNode;
  hero: React.ReactNode;
  protection: React.ReactNode;
}) {
  return (
    <>
      {hero}
      <BetterSunCare />
      {featured}
      {protection}
    </>
  );
}
