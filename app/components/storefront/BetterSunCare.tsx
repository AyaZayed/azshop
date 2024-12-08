import Image from "next/image";
import React from "react";

export default function BetterSunCare() {
  return (
    <section className="w-full h-screen relative">
      <Image
        src="/better-care.webp"
        alt="sunscreen squeezed between two rocks"
        fill
        className="object-cover"
      />
      <h1 className="w-full text-[90px] text-center text-sf_background z-10 absolute bottom-20 left-[50%] translate-x-[-50%]">
        Better (sun)care
      </h1>
    </section>
  );
}
