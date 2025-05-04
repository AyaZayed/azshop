"use client";
import Image from "next/image";
import React from "react";

type Props = {
  image: string;
  category: string;
  title: string;
  hover?: boolean;
};

export default function HoverImage({ image, category, title, hover }: Props) {
  const [isHovered, setIsHovered] = React.useState(hover || false);
  const background =
    category === "sunscreen" ? "/video1webp.webp" : "/video2webp.webp";

  function handleMouseEnter() {
    if (hover) return;
    setIsHovered(true);
  }

  function handleMouseLeave() {
    if (hover) return;
    setIsHovered(false);
  }
  return (
    <div className="relative w-full h-full">
      <Image
        unoptimized
        loading="lazy"
        src={background}
        alt={title}
        fill
        className={`object-cover z-0 absolute top-0 right-0 transition-all duration-300 ease-in opacity-100 ${
          isHovered ? "opacity-100" : "lg:opacity-0"
        }`}
      />
      <Image
        src={image}
        alt={title}
        fill
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="object-cover transition-all duration-500 ease-in z-10 absolute top-0 right-0"
      />
    </div>
  );
}
