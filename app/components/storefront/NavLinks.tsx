"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CategoriesDropdown from "./CategoriesDropdown";

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
          className={`hover:border-[1px] hover:bg-sf_background border-sf_primary py-2 px-4 ${
            pathname === link.href && pathname !== "/" && "border-[1px]"
          }`}>
          {link.label}
        </Link>
      ))}
      <CategoriesDropdown />
    </>
  );
}
