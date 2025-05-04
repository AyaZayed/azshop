export const dynamic = "force-static";
import HoveredProduct from "@/app/components/storefront/HoveredProduct";
import { getSuperFeatured } from "@/utils/db/products";
import Image from "next/image";
import React from "react";

export default async function SuperFeatured() {
  const product = await getSuperFeatured();
  return (
    <>
      {product && (
        <section className="p-6 md:p-16">
          <div className="relative w-full h-screen">
            <Image
              src={"/person-in-water.webp"}
              alt="person in water"
              fill
              className="object-cover z-0"
            />
            <HoveredProduct product={product} />
          </div>
        </section>
      )}
    </>
  );
}
