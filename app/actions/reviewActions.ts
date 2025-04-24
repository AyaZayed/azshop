"use server";

import { revalidatePath } from "next/cache";
import { reviewSchema } from "../lib/zodSchemas";
import prisma from "../lib/db";

export async function createReview(prevState: unknown, formData: FormData) {
  const raw = {
    author: formData.get("author"),
    headline: formData.get("headline"),
    content: formData.get("content"),
    rating: Number(formData.get("rating")),
    productId: formData.get("productId"),
    userId: formData.get("userId") || undefined,
    guestId: formData.get("guestId") || undefined,
  };

  const result = reviewSchema.safeParse(raw);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const review = await prisma.review.create({
      data: {
        ...result.data,
      },
    });

    const product = await prisma.product.update({
      where: { id: result.data.productId },
      data: {
        reviewsCount: { increment: 1 },
        ratingSum: { increment: result.data.rating },
      },
      select: {
        ratingSum: true,
        reviewsCount: true,
      },
    });

    await prisma.product.update({
      where: {
        id: result.data.productId,
      },
      data: {
        rating: product.ratingSum / product.reviewsCount,
      },
    });

    revalidatePath(`/product/${result.data.productId}`);

    return {
      success: true,
      review,
    };
  } catch (error) {
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}
