import { notFound } from "next/navigation";
import React from "react";
import { getSingleProduct } from "@/utils/db/products";
import toTitleCase from "@/utils/capitalize";
import dynamic from "next/dynamic";
const ProductHero = dynamic(() => import("./ProductHero"), { ssr: false });
const ProductAccordions = dynamic(() => import("./ProductAccordions"), {
  ssr: false,
});
const Encouragements = dynamic(
  () => import("@/app/components/storefront/Encouragements"),
  {
    ssr: false,
  }
);

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getSingleProduct(params.id);
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
  const product = await getSingleProduct(params.id);
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
