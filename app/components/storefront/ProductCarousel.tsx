/* eslint-disable @next/next/no-img-element */
"use client";
import { unstable_noStore } from "next/cache";
import Image from "next/image";
import React from "react";
import HoverImage from "./HoverImage";

export default function ProductCarousel({
  images,
  category,
}: {
  images: string[];
  category: string;
}) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  function handlePrevious() {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  function handleNext() {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }

  unstable_noStore();
  return (
    <div className="relative">
      <div className="carousel-buttons absolute z-10 inset-0 w-full h-full grid grid-cols-2">
        <button
          onClick={handlePrevious}
          className={`w-full cursor-leftArrow flex flex-col justify-center items-center `}></button>
        <button
          onClick={handleNext}
          className="w-full cursor-rightArrow flex flex-col justify-center items-center "></button>
      </div>
      <div className="thumbnails-container absolute bottom-10 left-1/2 -translate-x-1/2 md:top-1/2 md:-translate-y-1/2 md:left-10 flex md:flex-col gap-2 z-20">
        {images &&
          images.map((image, index) => (
            <button
              key={index}
              className={`relative cursor-pointer w-[40px] h-[45px] md:w-[45px] md:h-[60px] ${
                activeIndex === index
                  ? "border-[1px] border-sf_primary"
                  : "border-[1px] border-sf_background"
              }`}
              onClick={() => setActiveIndex(index)}>
              {index === 0 && (
                <HoverImage
                  image={image}
                  category={category}
                  title={`Thumbnail ${index + 1}`}
                  height={45}
                  hover={true}
                />
              )}
              <Image
                src={image}
                alt={`thumbnail-${index}`}
                fill
                className="object-cover"
                quality={30}
              />
            </button>
          ))}
      </div>
      <div className="carousel relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
          }}>
          {images &&
            images.map((image, index) => (
              <div
                key={index}
                className="relative w-full h-full min-h-screen flex-shrink-0">
                {index === 0 ? (
                  <>
                    <HoverImage
                      image={image}
                      category={category}
                      title={`Slide ${index + 1}`}
                      height={700}
                      hover={true}
                    />
                  </>
                ) : (
                  <Image
                    src={image}
                    alt={`Slide ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
