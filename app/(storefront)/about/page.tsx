import { SunSVG, UmbrellaSVG } from "@/app/components/SVGs";
import getSettings from "@/utils/db/settings";
import Image from "next/image";
import React from "react";

export const metadata = {
  title: "About",
};

export default async function AboutPage() {
  const { storeName } = await getSettings();
  return (
    <>
      <section className="flex justify-center items-center pt-36 pb-20 p-4 text-center">
        <div
          className="w-full md:w-3/4 flex flex-col justify-center 
      items-center gap-8">
          <SunSVG className="fill-sf_sedcondary" width={100} height={100} />
          <p>
            <span className="uppercase">{storeName}</span> is a new range of
            luxury sunscreen and after sun, created to answer the simple
            question: why can’t suncare feel amazing and be kind to the planet?
          </p>
          <p>The answer? It can.</p>
          <p>
            By combining the Mediterranean’s finest natural ingredients with
            modern clean beauty techniques,{" "}
            <span className="uppercase">{storeName}</span> delivers
            next-generation luxury suncare that feels incredible and doesn’t
            harm the environment.
          </p>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative w-full h-screen">
          <Image
            src="/ABOUT-beach.webp"
            alt={`${storeName} sunscreen`}
            fill
            className="object-cover"
          />
        </div>
        <div className="relative w-full h-screen hidden md:block">
          <Image
            src="/ABOUT-sunscreen.webp"
            alt={`${storeName} sunscreen`}
            fill
            className="object-cover "
          />
        </div>
      </section>
      <section className="flex justify-center items-center">
        <div className="p-4 py-16 md:py-20 w-full md:w-3/4 flex flex-col items-center gap-10 text-center">
          <p>
            We were inspired to create
            <span className="uppercase">{storeName}</span> because we trying
            every other sunscreen on the market and weren’t satisfied with the
            options available, which often came down to a choice between sticky
            textures that leave a white cast on skin, or luxury options which
            used synthetic or harmful ingredients.
          </p>
          <UmbrellaSVG
            className="fill-sf_sedcondary"
            width={100}
            height={100}
          />
          <p>
            To create the brand, we drew on our love for the Mediterranean, the
            sun, and its positive effects on our mood, health, and energy
            levels. A combination we like to call The Good Life. Our goal is to
            give everyone the chance to
          </p>
        </div>
      </section>
      <section className="mb-20">
        <div className="relative w-full h-screen">
          <Image
            src="/ABOUT-window.webp"
            alt="window over blue ocean"
            fill
            className="object-cover"
          />
          <h1 className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-sf_background text-2xl md:text-4xl w-3/4 text-center">
            Our goal is to give everyone the chance to experience The Good Life
            for themselves — protecting your health and beauty and having fun
            while doing it.
          </h1>
        </div>
      </section>
    </>
  );
}
