import ProductCarousel from "@/app/components/storefront/ProductCarousel";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import React from "react";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!product) return notFound();
  return (
    <div className="font-secondary">
      <section className="z-1 w-full h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="w-full h-screen relative">
          <ProductCarousel
            category={product.category}
            images={product.images}
          />
        </div>
      </section>
    </div>
  );
}
