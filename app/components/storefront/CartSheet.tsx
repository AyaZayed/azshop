"use client";
import { SheetContent, Sheet, SheetClose } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import React from "react";

export default function CartSheet({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleOpenChange = () => {
    router.back();
  };

  return (
    <Sheet open={true} onOpenChange={handleOpenChange}>
      <SheetContent
        side="right"
        className="bg-sf_background pt-10 w-full md:w-[600px] [&>button]:hidden font-secondary font-[500] text-lg">
        <SheetClose asChild className="absolute top-10 right-10 uppercase">
          <span className="cursor-pointer">close</span>
        </SheetClose>
        {children}
      </SheetContent>
    </Sheet>
  );
}
