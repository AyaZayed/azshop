"use server";
import prisma from "@/lib/db";
import { reviewSchema } from "@/lib/zodSchemas";
import { revalidatePath } from "next/cache";

export async function createReview(prevState: unknown, formData: FormData) {
  const raw = {
    author: formData.get("author"),
    headline: formData.get("headline"),
    content: formData.get("content"),
    rating: Number(formData.get("rating")),
    productId: formData.get("productId") || undefined,
    userId: formData.get("userId") || undefined,
    guestId: formData.get("guestId") || undefined,
  };

  const result = reviewSchema.safeParse(raw);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  if (!result.data.productId) {
    return {
      errors: {
        userId: ["Product not found"],
      },
    };
  }

  try {
    const review = await prisma.review.create({
      data: {
        productId: result.data.productId,
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
    revalidatePath(`/products/${result.data.productId}`);

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
