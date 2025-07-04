import React, { Suspense } from "react";
import HeroLoading from "./@home/HeroLoading";
import Hero from "./@home/Hero";
import FeaturedProducts from "./@home/Featured";
import SuperFeaturedLoading from "./@home/SuperFeaturedLoading";
import SuperFeatured from "./@home/SuperFeatured";
import FeaturedReviewsLoading from "./@home/FeaturedReviewsLoading";
import FeaturedReviews from "./@home/FeaturedReviews";
import ProtectionLoading from "./@home/ProtectionLoading";
import Protection from "./@home/Protection";

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
