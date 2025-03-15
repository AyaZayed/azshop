import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, PartyPopper, ShoppingBag, User2 } from "lucide-react";
import prisma from "@/app/lib/db";

export default async function Stats() {
  const [ordersCount, productsCount, customersCount, revenue] =
    await Promise.all([
      prisma.order.count(),
      prisma.product.count(),
      prisma.user.count(),
      prisma.order.aggregate({
        _sum: {
          amount: true,
        },
      }),
    ]);

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between font-[500]">
          <CardTitle>Total Revenue</CardTitle>
          <DollarSign className="w-4 h-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            ${(revenue._sum.amount || 0) / 100}
          </p>
          <p className="text-sm text-muted-foreground">Based on 100 charges</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between font-bold">
          <CardTitle>Total Sales</CardTitle>
          <ShoppingBag className="w-4 h-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">+{ordersCount || 0}</p>
          <p className="text-sm text-muted-foreground">Total Transactions</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between font-bold">
          <CardTitle>Total Products</CardTitle>
          <PartyPopper className="w-4 h-4 text-indigo-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{productsCount || 0}</p>
          <p className="text-sm text-muted-foreground">
            Current amount of products
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between font-bold">
          <CardTitle>Total Customers</CardTitle>
          <User2 className="w-4 h-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{customersCount || 0}</p>
          <p className="text-sm text-muted-foreground">
            Amount of users signed up
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
