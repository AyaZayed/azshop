import BetterSunCare from "../components/storefront/BetterSunCare";
import Encouragements from "../components/storefront/Encouragements";
import Hero from "../components/storefront/Hero";
import Protection from "../components/storefront/Protection";
import Sunshine from "../components/storefront/Sunshine";
import prisma from "../lib/db";

export default async function Landing() {
  const banners = await prisma.banner.findMany({
    where: {
      location: "landing",
    },
    select: {
      id: true,
      title: true,
      image: true,
    },
  });

  return (
    <div className="min-h-screen">
      <Hero banners={banners} />
      <Sunshine />
      <BetterSunCare banners={banners} />
      <Encouragements />
      <Protection />
    </div>
  );
}
