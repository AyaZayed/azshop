import { revalidatePath, unstable_noStore } from "next/cache";
import React from "react";

export default function ProductsHeader({ category }: { category: string }) {
  unstable_noStore();
  revalidatePath(`/products/${category}`);

  return (
    <>
      {category === "all" && (
        <>
          <h1>Suncare with skincare benefits</h1>
          <p>
            Meet the next generation of invisible mineral sun protection and
            natural after sun care. Keep skin beautifully protected and hydrated
            all year round, with nourishing natural antioxidants and a
            silky-smooth formula that slips seamlessly into your daily wear.
          </p>
        </>
      )}
      {category === "sunscreen" && (
        <>
          <h1>Protect and Hydrate</h1>
          <p>
            Protect your skin every day with our lightweight and non-greasy
            sunscreen, designed to shield you from harmful UVA and UVB rays.
            Infused with nourishing ingredients, it hydrates while providing
            broad-spectrum protection, keeping your skin healthy and glowing.
            Whether you&apos;re outdoors or indoors.
          </p>
        </>
      )}
      {category === "repair" && (
        <>
          <h1>Restore and Rejuvenate</h1>
          <p>
            Targeted treatments to repair and revitalize, infusing your skin
            with nourishing Mediterranean ingredients for a visible
            transformation. Enjoy softer, smoother, and more radiant skin.
          </p>
        </>
      )}
      {category === "sets" && (
        <>
          <h1>Skin Care Ritual Sets</h1>
          <p>
            Curated combinations to streamline your skincare routine, offering
            complete solutions for protection, repair, and hydration. Whether
            you&apos;re on the go or indulging in self-care, these sets are your
            ultimate skin companions.
          </p>
        </>
      )}
      {category === "gifts" && (
        <>
          <h1>Give the Gift of Glowing Skin</h1>
          <p>
            Delight and pamper with our selection of skin-loving gifts and
            bundles, perfect for any occasion and guaranteed to please.
          </p>
        </>
      )}
    </>
  );
}
