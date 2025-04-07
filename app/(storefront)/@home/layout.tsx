import BetterSunCare from "@/app/components/storefront/BetterSunCare";
import React from "react";

export default function HomeLayout({
  featured,
  hero,
  protection,
  superFeatured,
}: {
  featured: React.ReactNode;
  hero: React.ReactNode;
  protection: React.ReactNode;
  superFeatured: React.ReactNode;
}) {
  return (
    <>
      {hero}
      {featured}
      {superFeatured}
      <BetterSunCare />
      {protection}
    </>
  );
}
