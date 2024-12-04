/* eslint-disable @next/next/no-img-element */
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { CircleUser, MenuIcon, ShoppingBag } from "lucide-react";
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
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <header className="font-serif fixed top-0 w-full flex items-center justify-between px-4 md:px-6 lg:px-10 py-4 text-sf_primary uppercase font-[600] text-[14px] z-10 bg-transparent">
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
          <nav className="pt-4 grid gap-3 text-lg uppercase font-serif">
            <NavLinks />
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex items-center gap-4 order-3">
        {user ? (
          <>
            <Link href="/cart" className="relative">
              <ShoppingBag className="w-6 h-6" />
              <span className="absolute top-[-5px] right-[-5px] bg-sf_primary text-sf_background rounded-full w-4 h-4 p-1 flex items-center justify-center">
                5
              </span>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="focus:outline-none">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full focus:outline-none">
                  <CircleUser />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="font-serif">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <LogoutLink>Log Out</LogoutLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <LoginLink className="border-sf_primary border-[1.5px] p-[.3rem] px-5 hover:bg-sf_background">
            Log In
          </LoginLink>
        )}
      </div>
    </header>
  );
}
