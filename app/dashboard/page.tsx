import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, PartyPopper, ShoppingBag, User2 } from "lucide-react";
import React from "react";
import prisma from "../lib/db";

export default async function DashboardPage() {
  const productsCount = await prisma.product.count({});
  return (
    <>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between font-[500]">
            <CardTitle>Total Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$100,000</p>
            <p className="text-sm text-muted-foreground">
              Based on 100 charges
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between font-bold">
            <CardTitle>Total Sales</CardTitle>
            <ShoppingBag className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">+20,000</p>
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
            <p className="text-2xl font-bold">530</p>
            <p className="text-sm text-muted-foreground">
              Amount of users signed up
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>
              Total transactions for the last month
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <Avatar className="hidden sm:flex h-9 w-9">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">Jane Doe</p>
                <p className="text-sm text-muted-foreground">jane@doe.com</p>
              </div>
              <p className="ml-auto font-medium">+$1290.99</p>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="hidden sm:flex h-9 w-9">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">Jane Doe</p>
                <p className="text-sm text-muted-foreground">jane@doe.com</p>
              </div>
              <p className="ml-auto font-medium">+$1290.99</p>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="hidden sm:flex h-9 w-9">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">Jane Doe</p>
                <p className="text-sm text-muted-foreground">jane@doe.com</p>
              </div>
              <p className="ml-auto font-medium">+$1290.99</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
