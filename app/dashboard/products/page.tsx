import { deleteProduct } from "@/app/actions/productActions";
import Currency from "@/app/components/Currency";
import SubmitButton from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { unstable_noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Settings",
};

export default async function ProductsPage() {
  unstable_noStore();
  const products = await prisma.product.findMany({
    orderBy: {
      created_at: "desc",
    },
  });
  return (
    <>
      <div className="flex flex-row items-center justify-end">
        <Button asChild>
          <Link href="/dashboard/products/new">
            <PlusCircle className="h-8 w-8" />
            <span>Add Product</span>
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
                <TableHead>Date</TableHead>
                <TableHead className="text-end">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length !== 0 &&
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Image
                        alt={`${product.name} image`}
                        src={product.images[0]}
                        height={64}
                        width={64}
                        className="rounded-md object-cover h-16 w-16"
                      />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.status}</TableCell>
                    <TableCell>
                      <Currency />
                      {product.price}
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      {new Intl.DateTimeFormat("en-UK").format(
                        product.created_at
                      )}
                    </TableCell>
                    <TableCell className="text-end">
                      <Dialog modal={true}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="focus:bg-green-100"
                              asChild>
                              <Link href={`/dashboard/products/${product.id}`}>
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DialogTrigger asChild>
                              <DropdownMenuItem className="focus:bg-red-100">
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  Are you absolutely sure?
                                </DialogTitle>
                                <DialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete this product and remove all
                                  of its data.
                                </DialogDescription>
                                <DialogFooter>
                                  <form action={deleteProduct}>
                                    <input
                                      type="hidden"
                                      name="productId"
                                      value={product.id}
                                    />
                                    <SubmitButton
                                      label="Delete"
                                      variant="destructive"
                                    />
                                  </form>
                                  <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogHeader>
                            </DialogContent>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
