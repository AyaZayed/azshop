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
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import SubmitButton from "@/app/components/SubmitButtons";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { deleteBanner } from "@/app/actions";
import prisma from "@/app/lib/db";
import Image from "next/image";
import { unstable_noStore } from "next/cache";

export default async function BannersPage() {
  unstable_noStore();
  const banners = await prisma.banner.findMany({
    orderBy: {
      created_at: "desc",
    },
  });
  return (
    <>
      <div className="flex items-center justify-end mb-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild className="flex gap-x-2">
                <Link href="/dashboard/banners/new">
                  <PlusCircle className="h-8 w-8" />
                  Add Banner
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
                <TableHead>Location</TableHead>
                <TableHead className="text-end">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banners.length > 0 &&
                banners.map((banner) => (
                  <TableRow key={banner.id}>
                    <TableCell>
                      <Image
                        alt={`${banner.title} image`}
                        src={banner.image}
                        height={64}
                        width={64}
                        className="rounded-md object-cover h-16 w-16"
                      />
                    </TableCell>
                    <TableCell>{banner.title}</TableCell>
                    <TableCell>{banner.location}</TableCell>
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
                              <Link href={`/dashboard/banners/${banner.id}`}>
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
                                  <form action={deleteBanner}>
                                    <input
                                      type="hidden"
                                      name="bannerId"
                                      value={banner.id}
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
