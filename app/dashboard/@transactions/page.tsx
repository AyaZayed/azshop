import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
const Chart = dynamic(() => import("./Chart"), {
  ssr: false,
  loading: () => <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />,
});
import { getTransactions } from "@/utils/db/orders";
import dynamic from "next/dynamic";
import { LoaderCircle } from "lucide-react";

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
