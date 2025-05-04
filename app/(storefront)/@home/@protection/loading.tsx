import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <>
      <section className="w-full h-screen relative">
        <Skeleton className="w-full h-full object-cover" />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-center p-4 py-20 gap-10">
        <Skeleton className="w-1/2 h-10" />
        <Skeleton className="w-2/3 h-16" />
        <Skeleton className="w-1/3 h-10" />
      </section>
      <section className="w-full h-screen relative">
        <Skeleton className="w-full h-full object-cover" />
      </section>
    </>
  );
}
