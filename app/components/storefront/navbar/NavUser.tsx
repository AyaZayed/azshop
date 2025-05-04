import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import Link from "next/link";
import { CircleUser, ShoppingBag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { getCartTotal } from "@/utils/cart";
import { userHasOrders } from "@/utils/db/orders";
import { getSessionId } from "@/utils/auth/getSessionId";

export default async function NavUser() {
  const total = getCartTotal();
  const { user } = await getSessionId();
  const hasOrders = await userHasOrders();

  return (
    <div className="flex items-center gap-4 order-3">
      <Link href="/cart" className="relative" aria-label="Cart">
        <ShoppingBag className="w-6 h-6" />
        <span
          className="absolute top-[-5px] right-[-5px] bg-sf_primary text-sf_background rounded-full 
              w-4 h-4 p-2 flex items-center justify-center text-xs">
          {total || 0}
        </span>
      </Link>
      {user ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="focus:outline-none">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full focus:outline-none"
                aria-label="User">
                <CircleUser />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="font-secondary">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {hasOrders && (
                <DropdownMenuItem asChild>
                  <Link href="/orders">Orders</Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <LogoutLink postLogoutRedirectURL="/">Log Out</LogoutLink>
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
