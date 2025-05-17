import React from "react";
import SetsForm from "./SetsForm";
import getSettings from "@/utils/db/settings";
import { getProductsForSets } from "@/utils/db/products";
import { createProductSet } from "@/app/actions/setActions";

export const metadata = {
  title: "Sets",
};

export default async function Sets() {
  const products = await getProductsForSets();
  const { currencySymbol } = await getSettings();
  return (
    <>
      <SetsForm
        products={products}
        currency={currencySymbol}
        formAction={createProductSet}
      />
    </>
  );
}
