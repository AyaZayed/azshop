import prisma from "@/lib/db";
import { memoize } from "nextjs-better-unstable-cache";

export const getReviewsByProduct = memoize(
  async (productId: string) => {
    const reviews = await prisma.review.findMany({
      where: {
        productId: productId,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return reviews;
  },
  {
    revalidateTags: (productId) => ["review", productId],
    persist: true,
    suppressWarnings: true,
  }
);

export const getFeaturedReviews = memoize(
  async (num: number) => {
    const reviews = await prisma.review.findMany({
      where: {
        rating: { gt: 4 },
      },
      orderBy: {
        created_at: "desc",
      },
      select: {
        id: true,
        rating: true,
        content: true,
        headline: true,
        author: true,
      },
      take: num,
    });

    return reviews;
  },
  {
    revalidateTags: ["review"],
    persist: true,
    suppressWarnings: true,
  }
);
