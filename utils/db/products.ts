import prisma from "@/lib/db";
import { memoize } from "nextjs-better-unstable-cache";

export const getAllProducts = memoize(
  async () => {
    const products = await prisma.product.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
    return products;
  },
  {
    revalidateTags: ["product"],
    persist: true,
    suppressWarnings: true,
  }
);

type Category = "all" | "sunscreen" | "repair" | "sets";

export const getProductsByCategory = memoize(
  async (category: Category) => {
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
  },
  {
    revalidateTags: (category) => ["product", category],
    persist: true,
    suppressWarnings: true,
  }
);

export const getSingleProduct = memoize(
  async (id: string) => {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    return product;
  },
  {
    revalidateTags: (id) => ["product", id],
    persist: true,
    suppressWarnings: true,
  }
);

export const getFeaturedProducts = memoize(
  async (num: number) => {
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
  },
  {
    revalidateTags: ["product"],
    persist: true,
    suppressWarnings: true,
  }
);

export const getSuperFeatured = memoize(
  async () => {
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
  },
  {
    revalidateTags: ["product"],
    persist: true,
    suppressWarnings: true,
  }
);
