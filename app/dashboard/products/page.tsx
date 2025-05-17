import { deleteProduct } from "@/app/actions/productActions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
} from "@/components/ui/table";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import ProductTableRow from "./ProductTableRow";
import { getAllProducts } from "@/utils/db/products";

export const metadata = {
  title: "Products",
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <>
      <div className="flex flex-row items-center justify-end gap-4">
        <Button asChild>
          <Link href="/dashboard/products/new">
            <PlusCircle className="h-8 w-8" />
            <span>Add Product</span>
          </Link>
        </Button>
        <Button
          asChild
          variant="secondary"
          className="border-2 bg-zinc-200/30 hover:bg-zinc-200">
          <Link href="/dashboard/sets">
            <PlusCircle className="h-8 w-8" />
            <span>Add Set</span>
          </Link>
        </Button>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>Manage your products</CardDescription>
        </CardHeader>
        <CardContent>
          <Table className="capitalize">
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-end">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length !== 0 &&
                products.map((product) => (
                  <ProductTableRow
                    key={product.id}
                    data={product}
                    isSet={product.isSet}
                    deleteAction={deleteProduct}
                  />
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
