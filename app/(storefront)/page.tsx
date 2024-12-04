import BetterSunCare from "../components/storefront/BetterSunCare";
import Hero from "../components/storefront/Hero";
import Sunshine from "../components/storefront/Sunshine";
import prisma from "../lib/db";

export default function Landing() {
  const banners = prisma.banner.findMany();
  return (
    <div className="min-h-screen">
      <Hero banners={banners} />
      <Sunshine />
      <BetterSunCare banners={banners} />
    </div>
  );
}
