import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import CategoriesDropdown from "./CategoriesDropdown";
import NavMenuItem from "./NavMenuItem";

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
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex flex-col md:flex-row gap-4 items-start">
        {links.map((link) =>
          link.href !== "/products/all" ? (
            <NavMenuItem key={link.href} {...link} />
          ) : (
            <CategoriesDropdown key={link.href} />
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
