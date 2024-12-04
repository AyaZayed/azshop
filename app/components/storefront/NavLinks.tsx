"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/utils/constants";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Shop",
    href: "/products/all",
  },
  {
    label: "About",
    href: "/about",
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`hover:border-[1px] border-sf_primary py-2 px-4 ${
            pathname === link.href && pathname !== "/" && "border-[1px]"
          }`}>
          {link.label}
        </Link>
      ))}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="hover:border-[1px] border-sf_primary py-2 px-4 uppercase flex items-center gap-1 focus:outline-none">
            Categories <ChevronDown className="w-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="font-serif">
          {categories.map((category) => (
            <DropdownMenuItem key={category.href} className="capitalize ">
              <Link href={category.href} className="hover:text-sf_primary">
                {category.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
