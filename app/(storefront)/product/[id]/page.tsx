import ProductCarousel from "@/app/components/storefront/ProductCarousel";
import ReviewsStars from "@/app/components/storefront/ReviewsStars";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
  const cartQuantity = 0;
  return (
    <div className="font-secondary pb-80 md:pb-0">
      <section className="z-1 w-full h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="w-full h-screen relative">
          <ProductCarousel
            category={product.category}
            images={product.images}
          />
        </div>
        <div className="p-6 py-16 md:p-24 md:pt-36 flex flex-col gap-4 items-center text-center">
          <h1 className="text-4xl md:text-6xl uppercase font-bold mb-5">
            {product.name}
          </h1>
          <p className="font-primary">{product.description}</p>
          <h3>£{product.price}</h3>
          <Link href="" className="reviews flex gap-2 text-base items-center">
            <ReviewsStars rating={4.3} />
            <span>{product.reviewsCount} Reviews</span>
          </Link>
          <div className="quantity flex gap-4 items-center">
            <button
              className={`border-[1px] border-sf_sedcondary rounded-full w-6 h-6 text-sm font-bold hover:bg-sf_sedcondary hover:text-sf_background flex items-center justify-center ${
                cartQuantity === 0 && "opacity-50"
              }`}
              disabled={cartQuantity === 0}>
              -
            </button>
            <span className="text-xl font-[500]">
              {cartQuantity === 0 ? 1 : cartQuantity}
            </span>
            <button
              className={`border-[1px] border-sf_sedcondary rounded-full w-6 h-6 text-sm font-bold hover:bg-sf_sedcondary hover:text-sf_background flex items-center justify-center`}>
              +
            </button>
          </div>
          <Button className="px-6 border-[1px] border-sf_sedcondary bg-sf_background text-sf_sedcondary uppercase hover:bg-sf_sedcondary hover:text-sf_background rounded-none">
            Add to Cart
          </Button>
        </div>
      </section>
    </div>
  );
}
