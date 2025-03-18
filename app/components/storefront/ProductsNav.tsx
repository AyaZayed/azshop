import prisma from "@/app/lib/db";
import Image from "next/image";
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
          <Image
            src={product.images[0]}
            alt={product.name}
            width={150}
            height={150}
          />
          <Link
            href={`/product/${product.id}`}
            className="text-[13px] align-middle text-center leading-4">
            {product.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
