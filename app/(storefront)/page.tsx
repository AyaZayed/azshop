import React, { Suspense } from "react";
import HeroLoading from "../components/storefront/home/HeroLoading";
import Hero from "../components/storefront/home/Hero";
import FeaturedProducts from "../components/storefront/home/Featured";
import SuperFeaturedLoading from "../components/storefront/home/SuperFeaturedLoading";
import SuperFeatured from "../components/storefront/home/SuperFeatured";
import FeaturedReviewsLoading from "../components/storefront/home/FeaturedReviewsLoading";
import FeaturedReviews from "../components/storefront/home/FeaturedReviews";
import ProtectionLoading from "../components/storefront/home/ProtectionLoading";
import Protection from "../components/storefront/home/Protection";

export default function Storefront() {
   return (
      <>
         <Suspense fallback={<HeroLoading />}>
            <Hero />
         </Suspense>
         <FeaturedProducts />
         <Suspense fallback={<SuperFeaturedLoading />}>
            <SuperFeatured />
         </Suspense>
         <Suspense fallback={<FeaturedReviewsLoading />}>
            <FeaturedReviews />
         </Suspense>
         <Suspense fallback={<ProtectionLoading />}>
            <Protection />
         </Suspense>
      </>
   );
}
