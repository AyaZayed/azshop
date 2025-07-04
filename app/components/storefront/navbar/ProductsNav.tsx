import HoverImage from "@/app/components/storefront/HoverImage";
import { getFeaturedProducts } from "@/utils/db/products";
import Link from "next/link";
import React from "react";

export default async function ProductsNav() {
  const products = await getFeaturedProducts(3);

  return (
    <ul className="hidden md:flex gap-2">
      {products.map((product) => (
        <li
          key={product.id}
          className="flex flex-col items-center justify-start gap-2 font-secondary">
          <Link
            aria-label={product.name}
            href={`/product/${product.id}`}
            className="text-[13px] align-middle text-center leading-4 hover:text-sf_primary flex flex-col gap-3 items-center">
            <div className="w-[140px] h-[180px]">
              <HoverImage
                image={product.images[0]}
                title={product.name}
                category={product.category}
              />
            </div>
            <h4>{product.name}</h4>
          </Link>
        </li>
      ))}
    </ul>
  );
}
