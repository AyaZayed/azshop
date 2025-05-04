import { redis } from "@/lib/redis";
import { getSessionId } from "./auth/getSessionId";
import { Cart } from "@/lib/interfaces";
import { Product } from "@prisma/client";

export async function getCart() {
  const { sessionId } = await getSessionId();

  const cart: Cart | null = await redis.get(`cart-${sessionId}`);

  return cart;
}

export async function getCartTotal() {
  const { sessionId } = await getSessionId();

  const cart: Cart | null = await redis.get(`cart-${sessionId}`);

  const total = cart?.items.reduce((acc, item) => acc + item.quantity, 0);

  return total || 0;
}

export async function getCartQuantity(product: Product) {
  const { sessionId } = await getSessionId();

  const cart: Cart | null = await redis.get(`cart-${sessionId}`);

  const quantity = cart?.items.find((item) => item.id === product.id)?.quantity;

  return quantity || 0;
}

export async function getTotalPrice() {
  const { sessionId } = await getSessionId();
  const cart: Cart | null = await redis.get(`cart-${sessionId}`);
  let totalPrice = 0;

  if (cart && cart.items.length > 0) {
    totalPrice = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }

  return totalPrice;
}
