import prisma from "@/lib/db";

export async function getReviewsByProduct(productId: string) {
  const reviews = await prisma.review.findMany({
    where: {
      productId: productId,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return reviews;
}

export async function getFeaturedReviews(num: number) {
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
}
