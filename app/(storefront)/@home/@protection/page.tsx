import Image from "next/image";
import React from "react";
import Encouragements from "@/app/components/storefront/Encouragements";

export default function Protection() {
  return (
    <>
      <Encouragements />
      <section className="w-full h-screen relative">
        <Image
          src="/beach-bench.webp"
          alt="beach bench"
          fill
          className="object-cover"
        />
        <div className="p-6 w-full md:w-3/4 text-center text-sf_background z-10 absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]  ">
          <h1 className="text-[60px] mb-10 md:mb-14 capitalize leading-[50px]">
            Wear Protection
          </h1>
          <p>
            Harmful UVA and UVB rays can damage our skin on even the cloudiest
            of days. Our mineral SPF formulas are made to slip effortlessly into
            your daily routine, rain or shine.
          </p>
        </div>
      </section>
    </>
  );
}
