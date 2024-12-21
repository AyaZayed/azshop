"use client";
import { unstable_noStore } from "next/cache";
import Image from "next/image";
import React from "react";

export default function ProductCarousel({
  images,
  category,
}: {
  images: string[];
  category: string;
}) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const videoUrl =
    category === "sunscreen" ? "/sun-video.webm" : "/night-video1.webm";

  unstable_noStore();
  return (
    <>
      <div className="thumbnails-container absolute bottom-10 left-1/2 -translate-x-1/2 md:top-1/2 md:-translate-y-1/2 md:left-10 flex md:flex-col gap-2 z-10">
        {images &&
          images.map((image, index) => (
            <button
              key={index}
              className={`relative w-[40px] h-[45px] md:w-[45px] md:h-[60px] ${
                activeIndex === index
                  ? "border-[1px] border-sf_primary"
                  : "border-[1px] border-sf_background"
              }`}
              onClick={() => setActiveIndex(index)}>
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
                className="relative w-full h-screen flex-shrink-0">
                {index === 0 ? (
                  <>
                    <video
                      src={videoUrl}
                      autoPlay
                      loop
                      muted
                      className="object-cover w-full h-full -z-10"
                    />
                    <Image
                      src={image}
                      alt={`Slide ${index + 1}`}
                      fill
                      className="object-cover"
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
    </>
  );
}