import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import prisma from "@/app/lib/db";
import Chart from "@/app/components/Chart";

async function getData() {
  const orders = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    },
    select: {
      amount: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const transactions = orders.map((order) => ({
    date: new Intl.DateTimeFormat("en-UK").format(order.createdAt),
    revenue: order.amount / 100,
  }));

  return transactions;
}

export default async function Transactions() {
  const data = await getData();
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
        <CardDescription>Total transactions for the last month</CardDescription>
      </CardHeader>
      <CardContent>
        <Chart data={data} />
      </CardContent>
    </Card>
  );
}
