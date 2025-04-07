"use client";
import Image from "next/image";
import { useState } from "react";
import { PrimaryButton } from "../SubmitButtons";

interface Product {
  id: string;
  name: string;
  images: string[];
  description: string;
}

export default function HoveredProduct({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="p-4 md:p-8 w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-center">
        <div className="relative h-full w-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={`object-contain md:transform ${
              isHovered ? "md:-translate-x-1/4" : "md:translate-x-0"
            } transition-transform duration-500 ease-in-out`}
          />
        </div>
        {/* Always rendered overlay */}
        <div
          className={`md:absolute md:top-0 md:right-0 w-full md:w-1/2 h-full bg-sf_background transition-all duration-500 ease-in-out flex flex-col items-center justify-center text-center text-sf_primary gap-4 md:gap-6 p-6 md:p-10 opacity-100 ${
            isHovered ? "md:opacity-100" : "md:opacity-0"
          }`}>
          <h1 className="uppercase font-secondary leading-[1.1] font-[500]">
            {product.name}
          </h1>
          <p>{product.description}</p>
          <PrimaryButton
            label="Shop Now"
            href={`/product/${product.id}`}
            style="bg-white"
          />
        </div>
      </div>
    </div>
  );
}
