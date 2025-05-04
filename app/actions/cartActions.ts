"use server";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { revalidatePath } from "next/cache";
import { getSessionId } from "@/utils/auth/getSessionId";
import { Cart } from "@/lib/interfaces";
import { redis } from "@/lib/redis";
import prisma from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { getCart } from "@/utils/cart";

export async function addItemToCart(productId: string) {
  const { sessionId } = await getSessionId();
  const userId = sessionId;
  const cart = await getCart();

  const selectedProduct = await prisma.product.findUnique({
    select: {
      name: true,
      price: true,
      images: true,
    },
    where: {
      id: productId,
    },
  });

  if (!selectedProduct) {
    throw new Error("Product not found");
  }

  let myCart = {} as Cart;

  if (!cart || !cart.items) {
    myCart = {
      userId: userId,
      items: [
        {
          id: productId,
          price: selectedProduct.price,
          name: selectedProduct.name,
          imageString: selectedProduct.images[0],
          quantity: 1,
        },
      ],
    };
  } else {
    let itemFound = false;
    myCart = {
      userId,
      items: cart.items.map((item) => {
        if (item.id === productId) {
          itemFound = true;
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      }),
    };

    if (!itemFound) {
      myCart.items.push({
        id: productId,
        name: selectedProduct.name,
        price: selectedProduct.price,
        imageString: selectedProduct.images[0],
        quantity: 1,
      });
    }
  }

  await redis.set(`cart-${userId}`, myCart);
  revalidatePath("/", "layout");
  redirect("/cart");
}

export async function removeItemFromCart(formData: FormData) {
  const { sessionId } = await getSessionId();
  const userId = sessionId;
  const cart = await getCart();

  if (!cart || !cart.items) {
    return;
  }

  const productId = formData.get("productId") as string;

  const myCart = {
    userId: userId,
    items: cart.items.filter((item) => item.id !== productId),
  };

  await redis.set(`cart-${userId}`, myCart);

  revalidatePath("/", "layout");
}

export async function increaseItemQuantity(formData: FormData) {
  const { sessionId } = await getSessionId();
  const userId = sessionId;
  const cart = await getCart();

  if (!cart || !cart.items) {
    return;
  }

  const productId = formData.get("productId") as string;

  const myCart = {
    userId: userId,
    items: cart.items.map((item) => {
      if (item.id === productId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    }),
  };

  await redis.set(`cart-${userId}`, myCart);

  revalidatePath("/", "layout");
}

export async function decreaseItemQuantity(formData: FormData) {
  const { sessionId } = await getSessionId();
  const userId = sessionId;
  const cart = await getCart();

  if (!cart || !cart.items) {
    return;
  }

  const productId = formData.get("productId") as string;

  const myCart = {
    userId: userId,
    items: cart.items.map((item) => {
      if (item.id === productId) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    }),
  };

  await redis.set(`cart-${userId}`, myCart);

  revalidatePath("/", "layout");
}

export async function checkout() {
  const { sessionId } = await getSessionId();
  const userId = sessionId;
  console.log("userId:", userId);
  const cart = await getCart();
  if (!cart || !cart.items) {
    return;
  }

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
    cart.items.map((item) => ({
      price_data: {
        currency: "aed",
        product_data: {
          name: item.name,
          images: [item.imageString],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: "http://localhost:3000/payment/success",
    cancel_url: "http://localhost:3000/payment/cancel",
    metadata: {
      userId: userId,
    },
  });

  return redirect(session.url as string);
}
