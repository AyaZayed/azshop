import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getRecentSales } from "@/utils/db/orders";

export default async function Sales() {
  const recentSales = await getRecentSales();

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
                  {order.user?.firstName?.charAt(0)}
                  {order.user?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {order.user?.firstName} {order.user?.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {order.user?.email}
                </p>
              </div>
              <p className="ml-auto font-medium">
                ${new Intl.NumberFormat("en-US").format(order.total / 100)}
              </p>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
