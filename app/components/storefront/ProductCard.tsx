"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import ReviewsStars from "./ReviewsStars";
import { currency } from "@/utils/constants";
import { Skeleton } from "@/components/ui/skeleton";
import { addItemToCart } from "@/app/actions";
import { AddToCartButton } from "../SubmitButtons";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoUrl =
    product.category === "sunscreen" ? "/sun-video.webm" : "/night-video1.webm";

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play(); // Play the video
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    videoRef.current?.pause(); // Pause the video
  };

  const addItem = addItemToCart.bind(null, product.id);

  return (
    <div
      key={product.id}
      className="flex flex-col gap-2 items-center bg-transparent font-secondary"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div className="relative w-full h-[500px] mb-4">
        {isHovered && (
          <video
            src={videoUrl}
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isHovered
                ? "opacity-100 md:opacity-100"
                : "opacity-0 md:opacity-100"
            }`}
            style={{ zIndex: 1 }}
          />
        )}
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            layout="fill"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isHovered ? "opacity-0 md:opacity-100" : "opacity-100"
            }`}
            style={{ zIndex: 10 }}
          />
        </Link>
      </div>
      <Link href={`/product/${product.id}`}>
        <h3 className="font-bold uppercase transition-all ease-in-out duration-300 hover:text-sf_primary">
          {isHovered ? "Discover Now" : product.name}
        </h3>
      </Link>
      <p className=" transition-all ease-in-out duration-300 flex items-center gap-2 text-[20px]">
        {!isHovered && (
          <span className="font-primary capitalize font-[500]">
            {product.category}
          </span>
        )}
        {isHovered && (
          <>
            {currency}
            {product.price}
            <span> - </span>
            <form action={addItem} className="inline">
              <AddToCartButton
                label="Add to cart"
                style="text-inherit hover:text-sf_primary text-[20px] font-primary p-0 m-0 bg-transparent hover:bg-transparent"
              />
            </form>
          </>
        )}
      </p>
      <div className="flex gap-2 items-center text-base">
        <ReviewsStars rating={4.7} starSize={16} />
        <span>{10} reviews</span>
      </div>
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
