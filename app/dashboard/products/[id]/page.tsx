import EditProductForm from "@/app/dashboard/products/[id]/EditProductForm";
import { getSingleProduct } from "@/utils/db/products";
import { notFound } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Edit Product",
};

export default async function EditProduct({
  params,
}: {
  params: { id: string };
}) {
  const data = await getSingleProduct(params.id);

  if (!data) {
    return notFound();
  }
  return (
    <>
      <EditProductForm data={data} />
    </>
  );
}
