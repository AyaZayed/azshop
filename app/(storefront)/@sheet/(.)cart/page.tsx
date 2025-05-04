import React from "react";
import { SecondaryButton } from "@/app/components/SubmitButtons";
import CartContent from "@/app/components/storefront/CartContent";
import CartSheet from "@/app/components/storefront/CartSheet";
import { FanSVG } from "@/app/components/SVGs";
import { getCart, getTotalPrice } from "@/utils/cart";

export default async function page() {
  const cart = await getCart();
  const totalPrice = await getTotalPrice();

  return (
    <CartSheet>
      <div className=" flex flex-col items-center h-full">
        <h3 className="self-start uppercase mb-8">{`${
          cart?.items.length === 0
            ? "cart"
            : cart?.items.length === 1
            ? "1 product"
            : cart?.items.length + " products"
        }`}</h3>
        {cart && cart.items.length > 0 ? (
          <CartContent cart={cart} totalPrice={totalPrice} />
        ) : (
          <div className="pt-32 flex flex-col items-center gap-6">
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
    </CartSheet>
  );
}
