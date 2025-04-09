import ProductsGrid from "@/app/components/storefront/ProductsGrid";
import prisma from "@/app/lib/db";
import { unstable_noStore } from "next/cache";
import React from "react";

async function getData() {
  const featuredProducts = await prisma.product.findMany({
    where: {
      status: "published",
      isFeatured: true,
    },
    take: 4,
    select: {
      id: true,
      name: true,
      images: true,
      price: true,
      category: true,
      type: true,
    },
  });

  return featuredProducts;
}

export default async function featuredProducts() {
  unstable_noStore();
  const data = await getData();
  return (
    <div className="p-6 pt-0 md:p-16 ">
      <ProductsGrid data={data} />
    </div>
  );
}
