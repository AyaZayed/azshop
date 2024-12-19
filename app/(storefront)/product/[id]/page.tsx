import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import React from "react";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!product) return notFound();
  return <div>{product.name}</div>;
}
