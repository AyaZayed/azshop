import { Button } from "@/components/ui/button";
import { shopName } from "@/utils/constants";
import Image from "next/image";
import React from "react";

type Banners = {
  id: string;
  title: string;
  image: string;
}[];

export default function Hero({ banners }: { banners: Banners }) {
  return (
    <section className="z-1 w-full h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:block md:order-1 w-full h-screen relative">
        <Image
          src="/hero-gif.webp"
          alt={`${"hero"}`}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="md:order-2 relative w-full h-screen text-sf_background">
        <Image
          src="/hero-sea.webp"
          alt="ocean"
          fill
          className="object-cover z-1"
        />
        <div className="content w-full p-10 z-2 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-sf_background flex flex-col gap-3 items-end text-end">
          <h1 className="text-4xl md:text-6xl font-bold">Unlock Your Glow</h1>
          <p>
            At {shopName}, we protect your skin while you enjoy the sun. Whether
            at the beach or on the go, trust us to keep your glow safe and
            radiant.
          </p>
          <Button
            className="mt-6 uppercase font-secondary font-bold bg-sf_background text-sf_primary p-4 border-[1px] rounded-none
           border-sf_primary hover:bg-sf_primary hover:text-sf_background transition-all ease-in-out ">
            Shop Now
          </Button>
        </div>
      </div>
    </section>
  );
}
