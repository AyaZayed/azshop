import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import React from "react";
import EditBannerForm from "@/app/components/EditBannerForm";
import { unstable_noStore } from "next/cache";

export default async function EditBanner({
  params,
}: {
  params: { id: string };
}) {
  unstable_noStore();
  const data = await prisma.banner.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!data) {
    return notFound();
  }
  return <EditBannerForm data={data} />;
}
