import { checkout, removeItemFromCart } from "@/app/actions";
import { Cart } from "@/app/lib/interfaces";
import { redis } from "@/app/lib/redis";
import { currency, loginLink } from "@/utils/constants";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import {
  CheckoutButton,
  DeleteItemButton,
} from "@/app/components/SubmitButtons";

export default async function page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const cart: Cart | null = await redis.get(`cart-${user.id}`);
  let totalPrice = 0;

  if (cart && cart.items.length > 0) {
    totalPrice = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }

  if (!user || !user.email) {
    redirect(loginLink);
  }
  return (
    <div className="p-10 pt-40 ">
      {cart && cart.items.length > 0 ? (
        <div
          className="flex flex-col gap-4 md:gap-8 items-center text-center text-sf_primary text-base font-secondary font-bold uppercase tracking-wider "
          id="cart-items">
          {cart.items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <Image
                src={item.imageString}
                alt={item.name}
                width={100}
                height={100}
              />
              <h2>{item.name}</h2>
              <p>{item.price}</p>
              <p>{item.quantity}</p>
              <form action={removeItemFromCart}>
                <input type="hidden" name="productId" value={item.id} />
                <DeleteItemButton />
              </form>
            </div>
          ))}
          <div className="flex gap-4">
            <p>Total:</p>
            <p>
              {currency}
              {new Intl.NumberFormat("en-US").format(totalPrice)}
            </p>
            <form action={checkout}>
              <CheckoutButton />
            </form>
          </div>
        </div>
      ) : (
        <p>Cart is empty</p>
      )}
    </div>
  );
}
