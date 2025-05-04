import prisma from "@/lib/db";

export async function getAllProducts() {
  const products = await prisma.product.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  return products;
}

type Category = "all" | "sunscreen" | "repair" | "sets";

export async function getProductsByCategory(category: Category) {
  if (category === "all") {
    return await prisma.product.findMany({
      where: {
        status: "published",
      },
    });
  }
  return await prisma.product.findMany({
    where: {
      category: category,
      status: "published",
    },
  });
}

export async function getSingleProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });

  return product;
}

export async function getFeaturedProducts(num: number) {
  const featuredProducts = await prisma.product.findMany({
    where: {
      status: "published",
      isFeatured: true,
    },
    take: num,
    select: {
      id: true,
      name: true,
      images: true,
      price: true,
      category: true,
      type: true,
      reviewsCount: true,
      rating: true,
    },
  });

  return featuredProducts;
}

export async function getSuperFeatured() {
  const product = await prisma.product.findFirst({
    where: {
      status: "published",
      isFeatured: true,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
    },
  });

  return product;
}
