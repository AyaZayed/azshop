"use server";

import prisma from "@/lib/db";
import { productSchema } from "@/lib/zodSchemas";
import isAdmin from "@/utils/auth/isAdmin";
import { parseWithZod } from "@conform-to/zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProductSet(prevState: unknown, formData: FormData) {
  console.log(formData);
  isAdmin();

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  console.log("submission:", submission);

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flatUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  const productIds = formData.getAll("productIds") as string[];
  console.log("productIds:", productIds);

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  const combinedIngredients = products
    .map((product) => product.name + ": \n" + product.ingredients + "\n")
    .join("\n\n");

  const combinedHowTo = products
    .map((product) => product.name + ": \n" + product.how_to)
    .join("\n\n");

  const combinedScent = products
    .map((product) => product.name + ": \n" + product.scent)
    .join("\n\n");

  const combinedSize = products
    .map((product) => product.name + ": \n" + product.size)
    .join("\n\n");

  await prisma.product.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      price: submission.value.price,
      status: submission.value.status,
      isFeatured: submission.value.isFeatured === true ? true : false,
      images: flatUrls,
      category: submission.value.category,
      type: submission.value.type,
      inStock: submission.value.inStock,
      isSet: true,
      productsIds: productIds,
      ingredients: combinedIngredients,
      how_to: combinedHowTo,
      scent: combinedScent,
      size: combinedSize,
    },
  });

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function editProductSet(prevState: unknown, formData: FormData) {
  isAdmin();

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flatUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  const setId = formData.get("setId") as string;

  await prisma.product.update({
    where: {
      id: setId,
    },
    data: {
      name: submission.value.name,
      description: submission.value.description,
      price: submission.value.price,
      status: submission.value.status,
      isFeatured: submission.value.isFeatured === true ? true : false,
      images: flatUrls,
      category: submission.value.category,
      ingredients: submission.value.ingredients,
      how_to: submission.value.how_to,
      scent: submission.value.scent,
      size: submission.value.size,
      type: submission.value.type,
      inStock: submission.value.inStock,
    },
  });

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}
