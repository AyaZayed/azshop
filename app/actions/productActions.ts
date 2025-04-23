"use server";

import { parseWithZod } from "@conform-to/zod";
import isAdmin from "../lib/isAdmin";
import { productSchema } from "../lib/zodSchemas";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createProduct(prevState: unknown, formData: FormData) {
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

  await prisma.product.create({
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

  redirect("/dashboard/products");
}

export async function editProduct(prevState: unknown, formData: FormData) {
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

  const productId = formData.get("productId") as string;

  await prisma.product.update({
    where: {
      id: productId,
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

  redirect("/dashboard/products");
}

export async function deleteProduct(formData: FormData) {
  isAdmin();

  const productId = formData.get("productId") as string;

  if (!productId || typeof productId !== "string") {
    throw new Error("Product ID is missing");
  }

  await prisma.product.delete({
    where: {
      id: productId,
    },
  });

  revalidatePath("/dashboard/products");
}
