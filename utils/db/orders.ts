import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { auth } from "../auth/auth";
import { redirect } from "next/navigation";
import { loginLink } from "@/lib/constants";
import { memoize } from "nextjs-better-unstable-cache";

export const selectOrders = memoize(
  async () => {
    const data = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        status: true,
        total: true,
        createdAt: true,
        id: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
    return data;
  },
  {
    revalidateTags: ["order"],
    suppressWarnings: true,
    persist: true,
  }
);

export const getTransactions = memoize(
  async () => {
    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 30)),
        },
      },
      select: {
        total: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const transactions = orders.map((order) => ({
      date: new Intl.DateTimeFormat("en-UK").format(order.createdAt),
      revenue: order.total / 100,
    }));

    return transactions;
  },
  {
    revalidateTags: ["order"],
    suppressWarnings: true,
    persist: true,
  }
);

export const getStats = memoize(
  async () => {
    const [ordersCount, productsCount, customersCount, revenue] =
      await Promise.all([
        prisma.order.count(),
        prisma.product.count(),
        prisma.user.count(),
        prisma.order.aggregate({
          _sum: {
            total: true,
          },
        }),
      ]);

    return {
      ordersCount,
      productsCount,
      customersCount,
      revenue: revenue._sum.total || 0,
    };
  },
  {
    revalidateTags: ["order", "product", "user"],
    suppressWarnings: true,
    persist: true,
  }
);

export const getRecentSales = memoize(
  async () => {
    const recentSales = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        total: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return recentSales;
  },
  {
    revalidateTags: ["order"],
    suppressWarnings: true,
    persist: true,
  }
);

export async function userHasOrders() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const hasOrders = await prisma.order.findFirst({
    where: { userId: user?.id },
  });

  return hasOrders;
}

export async function getOrders() {
  const { userId } = await auth();
  if (!userId) return redirect(loginLink);

  const orders = await prisma.order.findMany({
    where: { userId: userId },
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: true } } },
  });

  const orderQuantity = orders.reduce(
    (acc, order, idx) => acc + order.items[idx].quantity,
    0
  );

  return { orders, orderQuantity };
}

export const getOrderDetails = memoize(
  async (id: string) => {
    const order = await prisma.order.findUnique({
      where: { id: id },
      include: { items: { include: { product: true } } },
    });
    return order;
  },
  {
    persist: true,
    revalidateTags: (id) => ["order", id],
    suppressWarnings: true,
  }
);
