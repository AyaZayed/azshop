import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, PackageOpen, ShoppingBag, User2 } from "lucide-react";
import { getStats } from "@/utils/db/orders";

export default async function Stats() {
  const { ordersCount, productsCount, customersCount, revenue } =
    await getStats();

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between font-[500]">
          <CardTitle>Total Revenue</CardTitle>
          <DollarSign className="w-5 h-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">${revenue / 100}</p>
          <p className="text-sm text-muted-foreground">Based on 100 charges</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between font-bold">
          <CardTitle>Total Sales</CardTitle>
          <ShoppingBag className="w-5 h-5 text-blue-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">+{ordersCount || 0}</p>
          <p className="text-sm text-muted-foreground">Total Transactions</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between font-bold">
          <CardTitle>Total Products</CardTitle>
          <PackageOpen className="w-5 h-5 text-indigo-500" />
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
          <User2 className="w-5 h-5 text-orange-500" />
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
