import { Cart } from "@/app/lib/interfaces";
import { redis } from "@/app/lib/redis";
import React from "react";
import { SecondaryButton } from "@/app/components/SubmitButtons";
import CartContent from "@/app/components/storefront/CartContent";
import { unstable_noStore } from "next/cache";
import { getSessionId } from "@/app/lib/getSessionId";
import { FanSVG } from "@/app/components/SVGs";

export const metadata = {
  title: "Cart",
};

export default async function page() {
  unstable_noStore();
  const { sessionId } = await getSessionId();
  const cart: Cart | null = await redis.get(`cart-${sessionId}`);
  let totalPrice = 0;

  if (cart && cart.items.length > 0) {
    totalPrice = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }

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
