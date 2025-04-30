"use client";
import Link from "next/link";
import React from "react";
import ReviewsStars from "./ReviewsStars";
import { Skeleton } from "@/components/ui/skeleton";
import { addItemToCart } from "@/app/actions/cartActions";
import { AddToCartButton } from "../SubmitButtons";
import HoverImage from "./HoverImage";
import Currency from "../Currency";

type Product = {
  id: string;
  name: string;
  price: number;
  images: string[];
  type: string;
  category: string;
  reviewsCount: number;
  rating: number | null;
};

export default function ProductCard({
  product,
  currency,
}: {
  product: Product;
  currency: string;
}) {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const addItem = addItemToCart.bind(null, product.id);

  return (
    <div
      className="flex flex-col gap-1 items-center bg-transparent font-secondary"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <Link href={`/product/${product.id}`} className="w-full h-[450px]">
        <HoverImage
          image={product.images[0]}
          category={product.category}
          title={product.name}
        />
      </Link>
      <Link href={`/product/${product.id}`}>
        <h3 className="mt-6 font-bold uppercase transition-all ease-in-out duration-300 hover:text-sf_primary">
          <span className={`block ${!isHovered && "md:hidden"}`}>
            {product.name}
          </span>
          <span className={`hidden md:block ${isHovered && "md:hidden"}`}>
            discover now
          </span>
        </h3>
      </Link>
      <p className=" transition-all ease-in-out duration-300 flex items-center gap-2 text-[20px]">
        <span
          className={`font-primary capitalize font-[500] hidden md:block ${
            isHovered && "md:hidden"
          }`}>
          {product.type}
        </span>

        <span className={`block ${!isHovered && "md:hidden"}`}>
          {currency}
          {product.price}
          <span> - </span>
          <form action={addItem} className="inline">
            <AddToCartButton
              label="Add to cart"
              style="text-inherit hover:text-sf_primary text-[20px] font-primary p-0 m-0 bg-transparent hover:bg-transparent"
            />
          </form>
        </span>
      </p>
      {product.reviewsCount > 0 && (
        <Link
          href={`/product/${product.id}#reviews`}
          className="flex gap-2 items-center text-base">
          <ReviewsStars
            rating={product.rating}
            starSize={16}
            starColor="secondary"
          />
          <span>
            {product.reviewsCount === 1
              ? "1 review"
              : product.reviewsCount + " reviews"}
          </span>
        </Link>
      )}
    </div>
  );
}

export function LoadingProductCard() {
  return (
    <div className="flex flex-col">
      <Skeleton className="w-full h-[400px] mb-4 bg-stone-200" />
      <div className="flex flex-col mt-2 gap-y-4 items-center">
        <Skeleton className="h-6 w-full bg-stone-200" />
        <Skeleton className="w-1/2 h-6 bg-stone-200" />
        <Skeleton className="w-2/3 h-6 bg-stone-200" />
      </div>
    </div>
  );
}
