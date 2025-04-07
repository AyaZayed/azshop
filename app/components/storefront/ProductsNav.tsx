import prisma from "@/app/lib/db";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import HoverImage from "./HoverImage";

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
    <ul className="hidden md:flex justify-between gap-2">
      {products.map((product) => (
        <li
          key={product.id}
          className="min-w-40 flex flex-col items-center justify-center gap-2 font-secondary">
          <Link
            href={`/product/${product.id}`}
            className="text-[13px] align-middle text-center leading-4 hover:text-sf_primary flex flex-col gap-3 items-center">
            <HoverImage
              image={product.images[0]}
              title={product.name}
              category={product.category}
              height={200}
              href={`/product/${product.id}`}
            />
            <h4>{product.name}</h4>
          </Link>
        </li>
      ))}
    </ul>
  );
}
