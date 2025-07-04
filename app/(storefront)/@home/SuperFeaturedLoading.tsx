import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function SuperFeaturedLoading() {
  return (
    <section className="p-6 md:p-16">
      <div className="relative w-full h-screen">
        <Skeleton className="w-full h-full object-cover" />
      </div>
    </section>
  );
}
