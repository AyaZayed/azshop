"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

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

const categories = [
  {
    label: "All",
    href: "/collections/all",
  },
  {
    label: "Sunscreen",
    href: "/collections/sunscreen",
  },
  {
    label: "Repair",
    href: "/collections/repair",
  },
  {
    label: "Sets",
    href: "/collections/sets",
  },
  {
    label: "Gifts",
    href: "/collections/gifts",
  },
];

export default function NavLinks() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => (
        // render the links but if the link is categories show the dropdown menu
        <Link
          key={link.href}
          href={link.href}
          className={`hover:border-[1px] border-sf_primary py-2 px-4 ${
            pathname === link.href && pathname !== "/" && "border-[1px]"
          }`}>
          {link.label}
        </Link>
      ))}

      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger
          className="cursor-pointer"
          asChild
          onMouseOver={() => setOpen(true)}
          onMouseOut={() => setTimeout(() => setOpen(false), 1000)}>
          <span>Categories</span>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent align="end" className="bg-sf_background">
            {categories.map((category) => (
              <DropdownMenuItem key={category.href}>
                <Link href={category.href} className="text:sf_primary">
                  {category.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </>
  );
}
