"use client";
import React, { useState } from "react";

type Data = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
}[];

export default function ProductsGrid({ data }: { data: Data }) {
  const [products, setProducts] = useState(data);
  return (
    <>
      {products.length > 0 &&
        products.map((product) => (
          <div key={product.id} className="font-secondary font-extralight">
            {product.name}
          </div>
        ))}
    </>
  );
}
