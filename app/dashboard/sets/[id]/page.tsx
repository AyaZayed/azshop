import { notFound } from "next/navigation";
import React from "react";
import SetsForm from "../SetsForm";
import getSettings from "@/utils/db/settings";
import { editProductSet } from "@/app/actions/setActions";
import {
  getProductsForSets,
  getSingleProduct,
  getSingleSetProducts,
} from "@/utils/db/products";

export default async function EditSets({ params }: { params: { id: string } }) {
  const data = await getSingleProduct(params.id);
  const setProducts = await getSingleSetProducts(params.id);
  const products = await getProductsForSets();
  const { currencySymbol } = await getSettings();
  if (!data) {
    return notFound();
  }

  return (
    <>
      <SetsForm
        products={products}
        data={data}
        currency={currencySymbol}
        formAction={editProductSet}
        setProducts={setProducts}
      />
    </>
  );
}
