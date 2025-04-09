import HoveredProduct from "@/app/components/storefront/HoveredProduct";
import prisma from "@/app/lib/db";
import { unstable_noStore } from "next/cache";
import Image from "next/image";
import React from "react";

async function getData() {
  const product = await prisma.product.findFirst({
    where: {
      status: "published",
      isFeatured: true,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
    },
  });

  return product;
}

export default async function SuperFeatured() {
  unstable_noStore();
  const product = await getData();
  console.log(product);
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
