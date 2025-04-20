import HoverImage from "@/app/components/storefront/HoverImage";
import prisma from "@/app/lib/db";
import Link from "next/link";
import React from "react";

async function getData() {
  const featuredProducts = await prisma.product.findMany({
    where: {
      status: "published",
      isFeatured: true,
    },
    take: 4,
    select: {
      id: true,
      name: true,
      images: true,
      category: true,
    },
  });

  return featuredProducts;
}

export default async function ProductsNav() {
  const products = await getData();

  return (
    <ul className="hidden md:flex gap-2">
      {products.map((product) => (
        <li
          key={product.id}
          className="flex flex-col items-center justify-start gap-2 font-secondary">
          <Link
            href={`/product/${product.id}`}
            className="text-[13px] align-middle text-center leading-4 hover:text-sf_primary flex flex-col gap-3 items-center w-[140px]">
            <HoverImage
              image={product.images[0]}
              title={product.name}
              category={product.category}
              href={`/product/${product.id}`}
              height={200}
            />
            <h4>{product.name}</h4>
          </Link>
        </li>
      ))}
    </ul>
  );
}
