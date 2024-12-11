import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { categories } from "@/app/lib/categories";

export default function CategoriesDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="hover:border-[1px] border-sf_primary py-2 px-4 uppercase flex items-center gap-1 focus:outline-none">
          Categories <ChevronDown className="w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="font-serif">
        {categories.map((category) => (
          <DropdownMenuItem key={category.id} className="capitalize ">
            <Link
              href={`/products/${category.name}`}
              className="hover:text-sf_primary">
              {category.title}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
