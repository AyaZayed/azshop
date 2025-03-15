import prisma from "@/app/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import React from "react";

async function getData() {
  const data = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      status: true,
      amount: true,
      createdAt: true,
      id: true,
      User: {
        select: {
          email: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return data;
}

export default async function OrdersPage() {
  const orders = await getData();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recent orders</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-end">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length > 0 &&
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="truncate">{order.id}</TableCell>
                  <TableCell>
                    <p>
                      {order.User?.firstName} {order.User?.lastName}
                    </p>
                    <p className="text-sm font-normal text-muted-foreground">
                      {order.User?.email}
                    </p>
                  </TableCell>
                  <TableCell className="capitalize">{order.status}</TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }).format(order.createdAt)}
                  </TableCell>
                  <TableCell className="text-end">
                    ${new Intl.NumberFormat("en-US").format(order.amount / 100)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
