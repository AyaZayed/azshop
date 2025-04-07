import Image from "next/image";
import React from "react";
import {
  freeShipping,
  giftEarnBack,
  giftValue,
  orderDispatch,
} from "@/utils/constants";

export default function Protection() {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-center p-4 py-20 gap-10">
        <div className="flex flex-col items-center">
          <Image src="/spiral.avif" alt="spiral" width={50} height={50} />
          <h3 className="font-bold mt-8 capitalize">Free Beauty Pouch</h3>
          <p>with every order</p>
        </div>
        <div className="flex flex-col items-center">
          <Image src="/star.png" alt="sea star" width={50} height={50} />
          <h3 className="font-bold mt-8 capitalize">Free Shipping</h3>
          <p>
            on all orders above{" "}
            <span className="font-secondary">€{freeShipping}</span>
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Image src="/boat.png" alt="boat" width={50} height={50} />
          <h3 className="font-bold mt-8 capitalize">Fast Delivery</h3>
          <p>
            orders dispatched within{" "}
            <span className="font-secondary">{orderDispatch}</span> business day
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Image src="/seahorses.webp" alt="seahorses" width={50} height={50} />
          <h3 className="font-bold mt-8 capitalize">
            Give <span className="font-secondary">€{giftValue}</span>, Earn{" "}
            <span className="font-secondary">€{giftEarnBack}</span>
          </h3>
          <p>with every friend your refer</p>
        </div>
      </section>
      <section className="w-full h-screen relative">
        <Image
          src="/beach-bench.webp"
          alt="beach bench"
          fill
          className="object-cover"
        />
        <div className="p-6 w-full md:w-3/4 text-center text-sf_background z-10 absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]  ">
          <h1 className="text-[60px] mb-14 capitalize">Wear Protection</h1>
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
