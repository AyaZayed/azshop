import React from "react";
import { Cart } from "@/app/lib/interfaces";
import { currency } from "@/utils/constants";
import { checkout, removeItemFromCart } from "@/app/actions";
import {
  CheckoutButton,
  DeleteItemButton,
  QuantityButtons,
} from "../SubmitButtons";
import HoverImage from "./HoverImage";

export default async function CartContent({
  cart,
  totalPrice,
}: {
  cart: Cart;
  totalPrice: number;
}) {
  return (
    <div className="grid content-between gap-8 h-full font-bold">
      <div className="flex flex-col gap-6">
        {cart.items.map((item) => (
          <div
            className="grid grid-cols-2 grid-flow-row content-start"
            key={item.id}>
            <div className="w-[120px]">
              <HoverImage
                image={item.imageString}
                title={item.name}
                height={160}
                category="sunscreen"
                hover={true}
              />
            </div>
            <div className="grid content-between">
              <div className="">
                <h3 className="uppercase leading-6 mb-2">{item.name}</h3>
                <h4 className="font-normal">
                  {currency}
                  {item.price}
                </h4>
              </div>
              <div className="flex  justify-between">
                <div className="flex gap-3 items-center  text-xl">
                  <QuantityButtons itemId={item.id} quantity={item.quantity} />
                </div>
                <form action={removeItemFromCart}>
                  <input type="hidden" name="productId" value={item.id} />
                  <DeleteItemButton
                    label="Remove"
                    style="uppercase hover:text-sf_primary text-sf_sedcondary"
                  />
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
      <form action={checkout}>
        <CheckoutButton label="Checkout" total={totalPrice} style=" w-full" />
        <p className="font-primary mt-4 text-center font-light leading-6">
          Tax incl. Shipping calculated at checkout.
        </p>
      </form>
    </div>
  );
}
