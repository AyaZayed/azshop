import React from "react";
import { SecondaryButton } from "@/app/components/SubmitButtons";
import { FanSVG } from "@/app/components/SVGs";
import { getCart, getTotalPrice } from "@/utils/cart";
import dynamic from "next/dynamic";
const CartContent = dynamic(
  () => import("@/app/components/storefront/CartContent")
);

export const metadata = {
  title: "Cart",
};

export default async function page() {
  const cart = await getCart();
  const totalPrice = await getTotalPrice();

  return (
    <div className="p-6 md:px-10 pt-32 flex flex-col items-center h-screen font-secondary">
      {cart && cart.items.length > 0 ? (
        <div className="md:w-1/3 h-full">
          <CartContent cart={cart} totalPrice={totalPrice} />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 h-20">
            <FanSVG className="fill-sf_sedcondary" />
          </div>
          <h2 className="font-bold text-2xl">Your cart is empty</h2>
          <div className="flex justify-center mt-4">
            <SecondaryButton label="Shop Now" href="/products/all" />
          </div>
        </div>
      )}
    </div>
  );
}
