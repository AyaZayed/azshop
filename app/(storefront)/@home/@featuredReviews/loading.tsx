import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <section className="p-6 py-16 flex flex-col items-center justify-center">
      <Skeleton className="w-1/2 h-10" />
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 md:p-10`}>
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-40" />
      </div>
    </section>
  );
}
