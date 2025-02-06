"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import ReviewsStars from "./ReviewsStars";
import { currency } from "@/utils/constants";

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

  return (
    <Link
      href={`/product/${product.id}`}
      key={product.id}
      className="flex flex-col gap-2 items-center bg-transparent font-secondary"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div className="relative w-full h-[400px] mb-4">
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
        <Image
          src={product.images[0]}
          alt={product.name}
          layout="fill"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovered ? "opacity-0 md:opacity-100" : "opacity-100"
          }`}
          style={{ zIndex: 10 }}
        />
      </div>
      <h3 className="font-bold uppercase transition-all ease-in-out duration-300 hover:text-sf_primary">
        {isHovered ? "Discover Now" : product.name}
      </h3>
      <p className=" transition-all ease-in-out duration-300">
        {!isHovered && (
          <span className="font-primary capitalize font-[500]">
            {product.type}
          </span>
        )}
        {isHovered && (
          <>
            {currency}
            {product.price}
            <span> - </span>
            <span className="hover:text-sf_primary font-primary">
              Add to Cart
            </span>
          </>
        )}
      </p>
      <div className="flex gap-2 items-center text-base">
        <ReviewsStars rating={4.7} starSize={16} />
        <span>{10} reviews</span>
      </div>
    </Link>
  );
}
