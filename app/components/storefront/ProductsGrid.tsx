"use client";
import React, { useEffect, useState } from "react";
import ProductCard, { LoadingProductCard } from "./ProductCard";
import { Product } from "@prisma/client";

export default function ProductsGrid({
   data,
   currency,
}: {
   data: Product[];
   currency: string;
}) {
   const [products, setProducts] = useState<Product[]>([]);
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
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
            {products &&
               products.length > 0 &&
               products.map((product) => (
                  <ProductCard
                     key={product.id}
                     product={product}
                     currency={currency}
                  />
               ))}
         </div>
      </>
   );
}
