export const dynamic = "force-static";
import {
  currency,
  freeShipping,
  giftEarnBack,
  giftValue,
  orderDispatch,
} from "@/utils/constants";
import Image from "next/image";
import React from "react";

const encouragements = [
  {
    image: "/spiral.avif",
    title: "Free Beauty Pouch",
    description: "with every order",
  },
  {
    image: "/star.png",
    title: "Free Shipping",
    description: `on orders over ${currency}${freeShipping}`,
  },
  {
    image: "/boat.png",
    title: "Fast Delivery",
    description: "orders dispatched within " + orderDispatch + " business day",
  },
  {
    image: "/seahorses.webp",
    title: "Give " + currency + giftValue + ", Earn " + currency + giftEarnBack,
    description: "on your first order",
  },
];

export default function Encouragements() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-center p-4 py-20 gap-10">
      {encouragements.map((encouragement) => (
        <div
          key={encouragement.title}
          className="flex flex-col items-center font-secondary gap-1">
          <div className="relative w-[50px] h-[50px]">
            <Image
              src={encouragement.image}
              alt={encouragement.title}
              fill
              className="object-contain"
            />
          </div>
          <h3 className="font-bold mt-6 capitalize">{encouragement.title}</h3>
          <p>{encouragement.description}</p>
        </div>
      ))}
    </section>
  );
}
