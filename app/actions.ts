"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { bannerSchema, productSchema } from "./lib/zodSchemas";
import prisma from "./lib/db";
import { revalidatePath } from "next/cache";

async function auth() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return redirect("/");
  }
}

export async function createProduct(prevState: unknown, formData: FormData) {
  auth();

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
    },
  });

  redirect("/dashboard/products");
}

export async function editProduct(prevState: unknown, formData: FormData) {
  auth();

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
    },
  });

  redirect("/dashboard/products");
}

export async function deleteProduct(formData: FormData) {
  auth();

  await prisma.product.delete({
    where: {
      id: formData.get("productId") as string,
    },
  });

  revalidatePath("/dashboard/products");
}

export async function createBanner(prevState: unknown, formData: FormData) {
  auth();

  const submission = parseWithZod(formData, {
    schema: bannerSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.banner.create({
    data: {
      title: submission.value.title,
      image: submission.value.image,
    },
  });

  redirect("/dashboard/banners");
}

export async function editBanner(prevState: unknown, formData: FormData) {
  auth();

  const submission = parseWithZod(formData, {
    schema: bannerSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const bannerId = formData.get("bannerId") as string;

  await prisma.banner.update({
    where: {
      id: bannerId,
    },
    data: {
      title: submission.value.title,
      image: submission.value.image,
    },
  });

  redirect("/dashboard/banners");
}

export async function deleteBanner(formData: FormData) {
  auth();

  await prisma.banner.delete({
    where: {
      id: formData.get("bannerId") as string,
    },
  });

  revalidatePath("/dashboard/banners");
}
