import {
  freeShipping,
  giftEarnBack,
  giftValue,
  orderDispatch,
} from "@/lib/constants";
import React from "react";
import { BoatSVG, SeahorsesSVG, SeaStarSVG, SpiralSVG } from "../SVGs";
import getSettings from "@/utils/db/settings";

export async function getEncouragements() {
  const { currencySymbol } = await getSettings();

  return [
    {
      image: SpiralSVG,
      title: "Free Beauty Pouch",
      description: "with every order",
    },
    {
      image: SeaStarSVG,
      title: "Free Shipping",
      description: `on orders over ${currencySymbol}${freeShipping}`,
    },
    {
      image: BoatSVG,
      title: "Fast Delivery",
      description: `orders dispatched within ${orderDispatch} business day`,
    },
    {
      image: SeahorsesSVG,
      title: `Give ${currencySymbol}${giftValue}, Earn ${currencySymbol}${giftEarnBack}`,
      description: "on your first order",
    },
  ];
}

export default async function Encouragements() {
  const encouragements = await getEncouragements();

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-center p-4 py-20 gap-10">
      {encouragements.map((encouragement) => (
        <div
          key={encouragement.title}
          className="flex flex-col items-center font-secondary gap-1">
          <encouragement.image
            className="fill-sf_primary opacity-85"
            width={50}
            height={50}
          />
          <h3 className="font-bold mt-6 capitalize">{encouragement.title}</h3>
          <p>{encouragement.description}</p>
        </div>
      ))}
    </section>
  );
}
