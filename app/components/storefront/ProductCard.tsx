import { Product } from "@prisma/client";
import React from "react";

export default function ProductCard(product: Product) {
  return <div>{product.name}</div>;
}
