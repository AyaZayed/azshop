import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function HeroLoading() {
  return (
    <>
      <section className="z-1 w-full h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:block md:order-1 w-full h-screen relative">
          <Skeleton className="w-full h-full object-cover" />
        </div>
        <div className="md:order-2 relative w-full h-screen text-sf_background">
          <Skeleton className="w-full h-full object-cover z-1" />
          <div className="content w-full p-10 z-2 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-sf_background flex flex-col gap-3 items-end text-end">
            <Skeleton className="w-1/2 h-10" />
            <Skeleton className="w-2/3 h-16" />
            <Skeleton className="w-1/3 h-10" />
          </div>
        </div>
      </section>
      <section className="text-sf_sedcondary p-16 flex items-center flex-col justify-center">
        <div className="content w-full md:w-1/2 text-center flex items-center flex-col gap-6 md:gap-10">
          <Skeleton className="w-1/2 h-10" />
          <Skeleton className="w-2/3 h-16" />
          <Skeleton className="w-1/3 h-10" />
          <Skeleton className="w-1/2 h-10" />
        </div>
      </section>
    </>
  );
}
