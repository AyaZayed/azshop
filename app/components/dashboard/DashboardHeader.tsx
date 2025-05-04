import DashboardNav from "./DashboardNav";
import { CircleUser, MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 h-16 flex items-center justify-between gap-4 border-b bg-background">
      <nav className="hidden font-medium md:flex md:items-center md:gap-5">
        <DashboardNav />
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="shrink-0 md:hidden"
            variant="outline"
            size="icon"
            aria-label="Navigation Menu">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[250px]">
          <VisuallyHidden>
            <SheetHeader>
              <SheetTitle>Navigation Menu</SheetTitle>
              <SheetDescription>
                Navigate through your dashboard
              </SheetDescription>
            </SheetHeader>
          </VisuallyHidden>
          <nav className="grid gap-6 font-medium text-lg">
            <DashboardNav />
          </nav>
        </SheetContent>
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            aria-label="profile">
            <CircleUser className="h-6 w-6 text-primary" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <LogoutLink postLogoutRedirectURL="/">Log Out</LogoutLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
