import {
  getKindeServerSession,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import Link from "next/link";
import { CircleUser, ShoppingBag } from "lucide-react";
import { Cart } from "@/app/lib/interfaces";
import { redis } from "@/app/lib/redis";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default async function NavUser() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const cart: Cart | null = await redis.get(`cart-${user?.id}`);

  const total = cart?.items.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <div className="flex items-center gap-4 order-3">
      {user ? (
        <>
          <Link href="/cart" className="relative">
            <ShoppingBag className="w-6 h-6" />
            <span
              className="absolute top-[-5px] right-[-5px] bg-sf_primary text-sf_background rounded-full 
              w-4 h-4 p-2 flex items-center justify-center text-xs">
              {total || 0}
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
            <DropdownMenuContent align="end" className="font-secondary">
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
  );
}
