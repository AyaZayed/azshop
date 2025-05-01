import EditProductForm from "@/app/components/dashboard/EditProductForm";
import prisma from "@/app/lib/db";
import { unstable_noStore } from "next/cache";
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
  unstable_noStore();
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
