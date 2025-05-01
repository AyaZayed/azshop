import React from "react";
import { StarSVG } from "../SVGs";

export default function ReviewsStars({
  rating,
  starSize,
  starColor,
}: {
  rating: number | null;
  starSize?: number;
  starColor?: "primary" | "secondary" | string;
}) {
  return (
    <div className="relative flex items-center">
      {/* Outlined Stars (Background Layer) */}
      <div className="flex z-0">
        {Array.from({ length: 5 }, (_, index) => (
          <StarSVG
            key={index}
            width={starSize || 20}
            height={starSize || 20}
            className={`${
              starColor === "primary"
                ? "fill-muted_primary stroke-sf_primary"
                : starColor === "secondary"
                ? "fill-muted_secondary stroke-sf_sedcondary"
                : `fill-${starColor} stroke-${starColor}`
            }`}
          />
        ))}
      </div>

      {/* Filled Stars (Foreground Layer Clipped by Percentage) */}
      <div
        className="absolute top-0 left-0 flex z-10"
        style={{ clipPath: `inset(0 ${100 - (rating || 0) * 20}% 0 0)` }}>
        {Array.from({ length: 5 }, (_, index) => (
          <StarSVG
            key={index}
            width={starSize || 20}
            height={starSize || 20}
            className={`${
              starColor === "primary"
                ? "fill-sf_primary"
                : starColor === "secondary"
                ? "fill-sf_sedcondary"
                : `fill-${starColor}`
            }`}
          />
        ))}
      </div>
    </div>
  );
}
