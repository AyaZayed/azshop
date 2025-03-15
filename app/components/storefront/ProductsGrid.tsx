"use client";
import React, { useEffect, useState } from "react";
import ProductCard, { LoadingProductCard } from "./ProductCard";

type Data = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
}[];

export default function ProductsGrid({ data }: { data: Data }) {
  const [products, setProducts] = useState<Data>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setProducts(data);
    setLoading(false);
  }, [data]);

  return (
    <>
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          <LoadingProductCard />
          <LoadingProductCard />
          <LoadingProductCard />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </>
  );
}
