import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { auth } from "../auth/auth";
import { redirect } from "next/navigation";
import { loginLink } from "@/lib/constants";

export async function selectOrders() {
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
}

export async function getTransactions() {
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
}

export async function getStats() {
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
}

export async function getRecentSales() {
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
}

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

export async function getOrderDetails(id: string) {
  const order = await prisma.order.findUnique({
    where: { id: id },
    include: { items: { include: { product: true } } },
  });

  return order;
}
