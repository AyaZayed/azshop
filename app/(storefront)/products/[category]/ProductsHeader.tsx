import { revalidatePath } from "next/cache";
import React from "react";

const data = [
  {
    category: "all",
    title: "Suncare with skincare benefits",
    description: `Meet the next generation of invisible mineral sun protection and
            natural after sun care. Keep skin beautifully protected and hydrated
            all year round, with nourishing natural antioxidants and a
            silky-smooth formula that slips seamlessly into your daily wear.`,
  },
  {
    title: "Protect and Hydrate",
    description: `Protect your skin every day with our lightweight and non-greasy
            sunscreen, designed to shield you from harmful UVA and UVB rays.
            Infused with nourishing ingredients, it hydrates while providing
            broad-spectrum protection, keeping your skin healthy and glowing.
            Whether you&apos;re outdoors or indoors.`,
    category: "sunscreen",
  },
  {
    title: "Repair and Revitalize",
    description: `Revitalize your skin with our moisturizing and nourishing
            serum, designed to repair and rejuvenate your skin. Infused with
            nourishing Mediterranean ingredients, it hydrates while providing a
            broad-spectrum protection, keeping your skin healthy and glowing.
            Whether you&apos;re outdoors or indoors.`,
    category: "repair",
  },
  {
    title: "Skin Care Ritual Sets",
    description: `Revitalize your skin with our moisturizing and nourishing
            serum, designed to repair and rejuvenate your skin. Infused with
            nourishing Mediterranean ingredients, it hydrates while providing a
            broad-spectrum protection, keeping your skin healthy and glowing.
            Whether you&apos;re outdoors or indoors.`,
    category: "sets",
  },
];

export default function ProductsHeader({ category }: { category: string }) {
  revalidatePath(`/products/${category}`);

  return (
    <>
      {data.map((d) => (
        <div
          key={d.category}
          className="w-full md:w-[85%] flex flex-col gap-10">
          {d.category === category && (
            <>
              <h1>{d.title}</h1>
              <p>{d.description}</p>
            </>
          )}
        </div>
      ))}
    </>
  );
}
