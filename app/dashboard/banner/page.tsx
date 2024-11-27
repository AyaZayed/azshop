import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
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
import { PlusCircle, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import SubmitButton from "@/app/components/SubmitButtons";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export default function BannerPage() {
  return (
    <>
      <div className="flex items-center justify-end mb-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild className="flex gap-x-2">
                <Link href="/dashboard/banner/new">
                  <PlusCircle className="h-8 w-8" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add a banner</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Banners</CardTitle>
          <CardDescription>Manage your banners</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="text-end">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <User className="h-8 w-8" />
                </TableCell>
                <TableCell>Rejuvenation</TableCell>
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
                          <Link href={``}>Edit</Link>
                        </DropdownMenuItem>
                        <DialogTrigger asChild>
                          <DropdownMenuItem className="focus:bg-red-100">
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. This will
                              permanently delete this product and remove all of
                              its data.
                            </DialogDescription>
                            {/* <DialogFooter>
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
                            </DialogFooter> */}
                          </DialogHeader>
                        </DialogContent>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Dialog>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
