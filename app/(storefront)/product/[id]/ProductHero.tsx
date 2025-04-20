export const dynamic = "force-static";
import { addItemToCart } from "@/app/actions";
import ReviewsStars from "@/app/components/storefront/ReviewsStars";
import {
  AddToCartButton,
  QuantityButtons,
} from "@/app/components/SubmitButtons";
import { getSessionId } from "@/app/lib/getSessionId";
import { Cart } from "@/app/lib/interfaces";
import { redis } from "@/app/lib/redis";
import { currency } from "@/utils/constants";
import { Product } from "@prisma/client";
import Link from "next/link";
import React from "react";
import ProductCarousel from "./ProductCarousel";

export default async function ProductHero({ product }: { product: Product }) {
  const addItem = addItemToCart.bind(null, product.id);
  const { sessionId } = await getSessionId();

  const cart: Cart | null = await redis.get(`cart-${sessionId}`);

  const quantity = cart?.items.find((item) => item.id === product.id)?.quantity;

  return (
    <section className="z-1 w-full h-full grid grid-cols-1 md:grid-cols-2">
      <div className="w-full h-full relative">
        <ProductCarousel category={product.category} images={product.images} />
      </div>
      <div className="p-6 py-16 md:p-24 md:pt-36 flex flex-col gap-4 items-center text-center">
        <h1 className="text-4xl md:text-6xl uppercase font-bold mb-5">
          {product.name}
        </h1>
        <p className="font-primary">{product.description}</p>
        <h3>
          {currency}
          {product.price}
        </h3>
        {product.reviewsCount > 0 && (
          <Link
            href="#reviews"
            className="reviews flex gap-2 text-base items-center">
            <ReviewsStars
              rating={product.rating}
              reviewsCount={product.reviewsCount}
            />
            <span>
              {product.reviewsCount === 1
                ? "1 review"
                : product.reviewsCount + " reviews"}
            </span>
          </Link>
        )}
        <QuantityButtons itemId={product.id} quantity={quantity || 0} />
        <form action={addItem}>
          <AddToCartButton
            label="Add to Cart"
            href="/cart"
            style="px-6 border-[1px] border-sf_sedcondary bg-sf_background text-sf_sedcondary uppercase hover:bg-sf_sedcondary hover:text-sf_background rounded-none"
          />
        </form>
      </div>
    </section>
  );
}
