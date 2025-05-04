"use client";
import React from "react";

export default function Quantity() {
  const [cartQuantity, setCartQuantity] = React.useState(1);
  return (
    <div className="quantity flex gap-4 items-center">
      <button
        onClick={() => setCartQuantity((prev) => prev - 1)}
        aria-label="minus"
        className={`border-[1px] border-sf_sedcondary rounded-full w-6 h-6 text-sm font-bold hover:bg-sf_sedcondary hover:text-sf_background flex items-center justify-center ${
          cartQuantity === 1 && "opacity-50"
        }`}
        disabled={cartQuantity === 1}>
        -
      </button>
      <span className="text-xl font-[500]">{cartQuantity}</span>
      <button
        onClick={() => setCartQuantity((prev) => prev + 1)}
        aria-label="plus"
        className={`border-[1px] border-sf_sedcondary rounded-full w-6 h-6 text-sm font-bold hover:bg-sf_sedcondary hover:text-sf_background flex items-center justify-center`}>
        +
      </button>
    </div>
  );
}
