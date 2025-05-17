import ProductsGrid from "@/app/components/storefront/ProductsGrid";
import { getProductsByCategory } from "@/utils/db/products";
import getSettings from "@/utils/db/settings";
import React, { Suspense } from "react";

type Category = "all" | "sunscreen" | "repair" | "sets";

export default async function ProductCategory({
  params,
}: {
  params: { category: Category };
}) {
  const data = await getProductsByCategory(params.category);
  const { currencySymbol } = await getSettings();
  return (
    <Suspense fallback={<h1 className="text-center">Loading Products ...</h1>}>
      <ProductsGrid data={data} currency={currencySymbol} />
    </Suspense>
  );
}
