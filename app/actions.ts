"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { bannerSchema, productSchema, reviewSchema } from "./lib/zodSchemas";
import prisma from "./lib/db";
import { revalidatePath } from "next/cache";
import { redis } from "./lib/redis";
import { Cart } from "./lib/interfaces";
import { stripe } from "./lib/stripe";
import Stripe from "stripe";
import { auth } from "./lib/auth";
import { getCartId } from "./lib/cartUtils";

async function isAdmin() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return redirect("/");
  }
}

export async function createProduct(prevState: unknown, formData: FormData) {
  isAdmin();

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const flatUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  await prisma.product.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      price: submission.value.price,
      status: submission.value.status,
      isFeatured: submission.value.isFeatured === true ? true : false,
      images: flatUrls,
      category: submission.value.category,
      ingredients: submission.value.ingredients,
      how_to: submission.value.how_to,
      scent: submission.value.scent,
      size: submission.value.size,
      type: submission.value.type,
    },
  });

  redirect("/dashboard/products");
}

export async function editProduct(prevState: unknown, formData: FormData) {
  isAdmin();

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  const flatUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  const productId = formData.get("productId") as string;

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: submission.value.name,
      description: submission.value.description,
      price: submission.value.price,
      status: submission.value.status,
      isFeatured: submission.value.isFeatured === true ? true : false,
      images: flatUrls,
      category: submission.value.category,
      ingredients: submission.value.ingredients,
      how_to: submission.value.how_to,
      scent: submission.value.scent,
      size: submission.value.size,
      type: submission.value.type,
    },
  });

  redirect("/dashboard/products");
}

export async function deleteProduct(formData: FormData) {
  isAdmin();

  await prisma.product.delete({
    where: {
      id: formData.get("productId") as string,
    },
  });

  revalidatePath("/dashboard/products");
}

export async function createBanner(prevState: unknown, formData: FormData) {
  isAdmin();

  const submission = parseWithZod(formData, {
    schema: bannerSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.banner.create({
    data: {
      title: submission.value.title,
      image: submission.value.image,
      location: submission.value.location,
    },
  });

  redirect("/dashboard/banners");
}

export async function createReview(prevState: unknown, formData: FormData) {
  const userId = (await auth()).userId!;
  const submission = parseWithZod(formData, {
    schema: reviewSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const productId = formData.get("productId") as string;

  await prisma.review.create({
    data: {
      author: submission.value.author,
      rating: submission.value.rating,
      productId: submission.value.productId,
      headline: submission.value.headline,
      content: submission.value.content,
      userId: userId,
    },
  });

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      reviewsCount: {
        increment: 1,
      },
      rating: {
        increment: submission.value.rating,
      },
    },
  });

  revalidatePath("/product");
}

export async function editBanner(prevState: unknown, formData: FormData) {
  isAdmin();

  const submission = parseWithZod(formData, {
    schema: bannerSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const bannerId = formData.get("bannerId") as string;

  await prisma.banner.update({
    where: {
      id: bannerId,
    },
    data: {
      title: submission.value.title,
      image: submission.value.image,
      location: submission.value.location,
    },
  });

  redirect("/dashboard/banners");
}

export async function deleteBanner(formData: FormData) {
  isAdmin();

  await prisma.banner.delete({
    where: {
      id: formData.get("bannerId") as string,
    },
  });

  revalidatePath("/dashboard/banners");
}

export async function addItemToCart(productId: string) {
  const userId = await getCartId();
  const cart: Cart | null = await redis.get(`cart-${userId}`);

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
    myCart.items = cart.items.map((item) => {
      if (item.id === productId) {
        itemFound = true;
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

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
  const userId = await getCartId();
  const cart: Cart | null = await redis.get(`cart-${userId}`);

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
  const userId = await getCartId();
  const cart: Cart | null = await redis.get(`cart-${userId}`);

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
  const userId = await getCartId();
  const cart: Cart | null = await redis.get(`cart-${userId}`);

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
  const userId = await getCartId();
  const cart = (await redis.get(`cart-${userId}`)) as Cart | null;
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
