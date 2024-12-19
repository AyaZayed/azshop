import EditProductForm from "@/app/components/EditProductForm";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import React from "react";
export default async function EditProduct({
  params,
}: {
  params: { id: string };
}) {
  const data = await prisma.product.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!data) {
    return notFound();
  }
  return <EditProductForm data={data} />;
}
