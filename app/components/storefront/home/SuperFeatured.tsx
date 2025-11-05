import { getSuperFeatured } from "@/utils/db/products";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
const HoveredProduct = dynamic(
  () => import("@/app/components/storefront/HoveredProduct"),
  { ssr: false }
);

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
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <HoveredProduct product={product} />
          </div>
        </section>
      )}
    </>
  );
}
