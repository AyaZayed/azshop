/* eslint-disable @typescript-eslint/no-explicit-any */
import Currency from "@/app/components/Currency";
import SubmitButton from "@/app/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogTitle,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { TableRow, TableCell } from "@/components/ui/table";
import { Product } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  deleteAction: any;
  isSet: boolean;
  data: any;
}

export default function ProductTableRow({ data, deleteAction, isSet }: Props) {
  return (
    <TableRow key={data.id}>
      <TableCell>
        <Image
          alt={`${data.name} image`}
          src={data.images[0]}
          height={64}
          width={64}
          className="rounded-md object-cover h-16 w-16"
        />
      </TableCell>
      <TableCell>{data.name}</TableCell>
      <TableCell>{data.status}</TableCell>
      <TableCell>
        <Currency />
        {data.price}
      </TableCell>
      <TableCell>{isSet ? `Set` : data.category}</TableCell>
      <TableCell>{data.isFeatured ? "Yes" : "No"}</TableCell>
      <TableCell>
        {new Date(data.created_at).toLocaleDateString("en-GB")}
      </TableCell>
      <TableCell className="text-end">
        <Dialog modal={true}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" aria-label="Actions">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="focus:bg-green-100" asChild>
                <Link
                  href={`/dashboard/${isSet ? "sets" : "products"}/${data.id}`}>
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
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    this data and remove all of its data.
                  </DialogDescription>
                  <DialogFooter>
                    <form action={deleteAction}>
                      <input type="hidden" name="productId" value={data.id} />
                      <SubmitButton label="Delete" variant="destructive" />
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
  );
}
