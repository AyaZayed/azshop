"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  image: string;
  category: string;
  title: string;
  height: number;
  hover?: boolean;
  href?: string;
};

export default function HoverImage({
  image,
  category,
  title,
  height,
  hover,
  href,
}: Props) {
  const [isHovered, setIsHovered] = React.useState(hover || false);
  const background =
    category === "sunscreen" ? "/video1webp.webp" : "/video2webp.webp";
  return (
    <div className={`relative w-full`} style={{ height: `${height}px` }}>
      <Link href={href || ""}>
        <Image
          src={background}
          alt={title}
          fill
          className={`object-cover z-0 absolute top-0 right-0 transition-all duration-300 ease-in opacity-100 ${
            isHovered ? "opacity-100" : "md:opacity-0"
          }`}
        />
        <Image
          src={image}
          alt={title}
          fill
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="object-cover transition-all duration-500 ease-in z-10 absolute top-0 right-0"
        />
      </Link>
    </div>
  );
}
