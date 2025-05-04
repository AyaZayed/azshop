export const dynamic = "force-static";

import ProductsGrid from "@/app/components/storefront/ProductsGrid";
import { getFeaturedProducts } from "@/utils/db/products";
import getSettings from "@/utils/db/settings";
import React from "react";

export default async function featuredProducts() {
  const data = await getFeaturedProducts(3);
  const currency = (await getSettings()).currencySymbol;

  return (
    <div className="p-6 pt-0 md:p-16 ">
      <ProductsGrid data={data} currency={currency} />
    </div>
  );
}
