import ProductsGrid from "@/app/components/storefront/ProductsGrid";
import prisma from "@/app/lib/db";
import { unstable_noStore } from "next/cache";
import React from "react";

type Category = "all" | "sunscreen" | "repair" | "sets" | "gifts";

async function getProducts(category: Category) {
  if (category === "all") {
    return await prisma.product.findMany({
      where: {
        status: "published",
      },
    });
  }
  return await prisma.product.findMany({
    where: {
      category: category,
      status: "published",
    },
  });
}

export default async function ProductCategory({
  params,
}: {
  params: { category: Category };
}) {
  unstable_noStore();
  const data = await getProducts(params.category);
  return (
    <>
      <ProductsGrid data={data} />
    </>
  );
}
