export const dynamic = "force-static";

import { SecondaryButton, PrimaryButton } from "@/app/components/SubmitButtons";
import { SunSVG } from "@/app/components/SVGs";
import getSettings from "@/utils/db/settings";
import Image from "next/image";
import React from "react";

export default async function Hero() {
  const storeName = (await getSettings()).storeName;
  return (
    <>
      <section className="z-1 w-full h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:block md:order-1 w-full h-screen relative">
          <Image
            src="/hero-gif.webp"
            alt={`${"hero"}`}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
        <div className="md:order-2 relative w-full h-screen text-sf_background">
          <Image
            src="/hero-sea.webp"
            alt="ocean"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover z-1"
            priority
          />
          <div className="content w-full p-10 z-2 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-sf_background flex flex-col gap-3 items-end text-end">
            <h1 className="text-4xl md:text-6xl font-bold">Unlock Your Glow</h1>
            <p className="mb-6">
              At {storeName}, we protect your skin while you enjoy the sun.
              Whether at the beach or on the go, trust us to keep your glow safe
              and radiant.
            </p>
            <PrimaryButton
              label="Shop Now"
              href="/products/all"
              style="font-bold font-secondary tracking-[1.5px] uppercase"
            />
          </div>
        </div>
      </section>
      <section className="text-sf_sedcondary p-16 flex items-center flex-col justify-center">
        <div className="content w-full md:w-1/2 text-center flex items-center flex-col gap-6 md:gap-10">
          <SunSVG className="fill-sf_sedcondary" width={100} height={100} />
          <h1 className="text-[50px] md:text-[60px] font-bold leading-[50px]">
            Hello, Sunshine
          </h1>
          <p>
            Get to know our lineup of dreamy suncare formulas, created by a
            squad of summer-lovin’ skincare specialists. Made in Italy with
            locally sourced Mediterranean ingredients.
          </p>
          <SecondaryButton
            label="Shop the full range here"
            style="font-bold font-secondary text-[13px]"
            href="/products"
          />
        </div>
      </section>
    </>
  );
}
