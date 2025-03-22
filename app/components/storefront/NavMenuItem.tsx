"use client";
import React from "react";
import { usePathname } from "next/navigation";
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export default function NavMenuItem(link: { label: string; href: string }) {
  const pathname = usePathname();
  return (
    <NavigationMenuItem key={link.href}>
      <NavigationMenuLink
        href={link.href}
        className={`px-4 py-1 font-secondary tracking-wider uppercase font-bold text-[14px] flex md:p-2 md:px-4 hover:border-[1px] hover:bg-sf_background border-sf_primary align-middle ${
          pathname === link.href ? "border-[1px]" : ""
        }`}>
        {link.label}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
