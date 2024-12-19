"use client";
import React, { useState } from "react";
import ProductCard from "./ProductCard";

type Data = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
}[];

export default function ProductsGrid({ data }: { data: Data }) {
  const [products] = useState(data);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {products.length > 0 &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
}
