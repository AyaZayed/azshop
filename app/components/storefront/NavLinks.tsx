import CategoriesDropdown from "./CategoriesDropdown";
import { headers } from "next/headers";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

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
  {
    label: "Dashboard",
    href: "/dashboard",
  },
];

export default function NavLinks() {
  const headersList = headers();
  const pathname = headersList.get("x-next-url");

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex flex-col md:flex-row gap-4 items-start">
        {links.map((link) =>
          link.href !== "/products/all" ? (
            <NavigationMenuItem key={link.href}>
              <NavigationMenuLink
                href={link.href}
                className={`px-4 py-1 font-secondary tracking-wider uppercase font-bold text-[14px] flex md:p-2 md:px-4 hover:border-[1px] hover:bg-sf_background border-sf_primary align-middle ${
                  pathname === link.href ? "border-[1px]" : ""
                }`}>
                {link.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ) : (
            <CategoriesDropdown key={link.href} />
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
