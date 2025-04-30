"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Orders",
    href: "/dashboard/orders",
  },
  {
    label: "Products",
    href: "/dashboard/products",
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
  },
  {
    label: "Storefront",
    href: "/",
  },
];

export default function DashboardNav() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`${
            pathname === link.href
              ? "text-primary font-bold"
              : "text-muted-foreground hover:text-black"
          }`}>
          {link.label}
        </Link>
      ))}
    </>
  );
}
