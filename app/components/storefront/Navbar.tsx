/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import NavLinks from "./NavLinks";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { shopName } from "@/utils/constants";
import { MenuIcon } from "lucide-react";
import NavUser from "./NavUser";

export default function Navbar() {
  return (
    <header className="font-secondary font-[500] fixed top-0 w-full flex items-center justify-between px-4 md:px-6 lg:px-10 py-4 text-sf_primary uppercase tracking-wider text-[14px] z-40 bg-transparent">
      <div className="logo order-2 md:order-1">
        <Link href="/">
          <img
            src="/logo.svg"
            alt={`${shopName} logo`}
            width={128.134}
            height={58.436}
          />
        </Link>
      </div>
      <nav className="hidden md:flex md:items-center md:gap-5 order-2">
        <NavLinks />
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="shrink-0 md:hidden rounded-none"
            variant="outline"
            size="icon">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[250px] bg-sf_background">
          <VisuallyHidden>
            <SheetHeader>
              <SheetTitle>Navigation Menu</SheetTitle>
              <SheetDescription>Navigate through your menu</SheetDescription>
            </SheetHeader>
          </VisuallyHidden>
          <nav className="pt-4 grid gap-3 text-lg uppercase font-secondary">
            <NavLinks />
          </nav>
        </SheetContent>
      </Sheet>
      <NavUser />
    </header>
  );
}
