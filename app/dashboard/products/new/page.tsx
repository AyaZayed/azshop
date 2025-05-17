import ProductFormWrapper from "@/app/dashboard/products/new/ProductFormWrapper";
import getSettings from "@/utils/db/settings";
import React from "react";

export const metadata = {
  title: "New Product",
};

export default async function NewProductPage() {
  const { currencySymbol } = await getSettings();
  return (
    <section>
      <ProductFormWrapper currency={currencySymbol} />
    </section>
  );
}
