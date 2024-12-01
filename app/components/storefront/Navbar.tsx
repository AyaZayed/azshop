/* eslint-disable @next/next/no-img-element */
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { MenuIcon, ShoppingBag } from "lucide-react";
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

export default function Navbar() {
  return (
    <header className="sticky top-0 flex items-center justify-between px-4 md:px-6 lg:px-10 py-4 text-sf_primary uppercase font-[600] text-[14px]">
      <div className="logo order-2 md:order-1">
        <Link href="/">
          <img
            src="/logo.svg"
            alt="le rub logo"
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
        <SheetContent side="left" className="w-[250px]">
          <VisuallyHidden>
            <SheetHeader>
              <SheetTitle>Navigation Menu</SheetTitle>
              <SheetDescription>Navigate through your menu</SheetDescription>
            </SheetHeader>
          </VisuallyHidden>
          <nav className="grid gap-6">
            <NavLinks />
          </nav>
        </SheetContent>
      </Sheet>
      <div className="cart flex items-center gap-4 order-3">
        <LoginLink className="border-sf_primary border-[1.5px] p-1 px-3">
          Log In
        </LoginLink>
        <Link href="/cart">
          <ShoppingBag className="w-5 h-5" />
        </Link>
      </div>
    </header>
  );
}
