import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <section className="z-1 w-full h-full grid grid-cols-1 md:grid-cols-2">
      <div className="w-full h-full relative">
        <Skeleton className="w-full h-full object-cover" />
      </div>
      <div className="p-6 py-16 md:p-24 md:pt-36 flex flex-col gap-4 items-center text-center">
        <Skeleton className="w-1/2 h-10" />
        <Skeleton className="w-2/3 h-16" />
        <Skeleton className="w-1/3 h-10" />
        <Skeleton className="w-1/2 h-10" />
        <Skeleton className="w-1/3 h-14" />
      </div>
    </section>
  );
}
