import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import React from "react";
import Encouragements from "@/app/components/storefront/Encouragements";
import { unstable_noStore } from "next/cache";
import ProductHero from "./ProductHero";
import ProductAccordions from "./ProductAccordions";
import toTitleCase from "@/app/lib/capitalize";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    select: { name: true },
  });

  if (!product) return { title: "Product Not Found" };

  return {
    title: toTitleCase(product.name),
  };
}

export default async function ProductPageLayout({
  params,
  reviews,
}: {
  params: { id: string };
  reviews: React.ReactNode;
}) {
  unstable_noStore();
  const product = await prisma.product.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!product) return notFound();

  return (
    <div className="font-secondary pb-80 md:pb-0">
      <ProductHero product={product} />
      <ProductAccordions product={product} />
      {reviews}
      <Encouragements />
    </div>
  );
}
