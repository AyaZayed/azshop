import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Chart from "@/app/dashboard/@transactions/Chart";
import { getTransactions } from "@/utils/db/orders";

export default async function Transactions() {
  const data = await getTransactions();
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
