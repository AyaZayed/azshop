import BetterSunCare from "../components/storefront/BetterSunCare";
import Hero from "../components/storefront/Hero";
import Sunshine from "../components/storefront/Sunshine";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Sunshine />
      <BetterSunCare />
    </div>
  );
}
