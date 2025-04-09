import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import prisma from "@/app/lib/db";
import { unstable_noStore } from "next/cache";

export default async function Sales() {
  unstable_noStore();
  const recentSales = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      amount: true,
      User: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        {recentSales.length > 0 &&
          recentSales.map((order) => (
            <div key={order.id} className="flex items-center">
              <Avatar>
                <AvatarFallback>
                  {order.User?.firstName?.charAt(0)}
                  {order.User?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {order.User?.firstName} {order.User?.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {order.User?.email}
                </p>
              </div>
              <p className="ml-auto font-medium">
                ${new Intl.NumberFormat("en-US").format(order.amount / 100)}
              </p>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
