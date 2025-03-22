import { Cart } from "@/app/lib/interfaces";
import { redis } from "@/app/lib/redis";
import { loginLink } from "@/utils/constants";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { SecondaryButton } from "@/app/components/SubmitButtons";
import CartContent from "@/app/components/storefront/CartContent";
import CartSheet from "@/app/components/storefront/CartSheet";

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
    <CartSheet>
      <div className=" flex flex-col items-center h-full">
        <h3 className="self-start uppercase mb-8">{`${
          cart?.items.length === 0
            ? "cart"
            : cart?.items.length === 1
            ? cart?.items.length + " product"
            : cart?.items.length + " products"
        }`}</h3>
        {cart && cart.items.length > 0 ? (
          <>
            <CartContent cart={cart} totalPrice={totalPrice} />
          </>
        ) : (
          <div className="pt-32 flex flex-col items-center gap-6">
            <div className="w-20 h-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-sf_sedcondary"
                viewBox="0 0 476 436">
                <path d="M471.92 267.54c-.49-.24-1.05-.43-.99-.88 5.14-7.63 6.58-16.98-4.68-19.21 4.02-5.64 10.99-16.85 2.11-21.17 6.21-8.98 8.49-25.49-3.61-30.4 8.06-12.44 3.9-29.82-12.12-32.01 8.32-15.39 1-30.7-16.99-30.95 11.53-17.33-2.87-34.54-21.96-30.53 3.11-7.69 4.35-18.94-4.28-23.39-6.32-3.8-13.46-5.5-20.44-2.5.8-8.57-1.85-17.41-10.55-20.77-7.58-4.84-15.68-4.58-24.14-3.02 2.37-13.78-8.48-25.21-22.05-25.26-6.26-1.31-11.5-.29-14.54 5.74-3.61-20.32-30.59-26.56-45.21-13.85-2.05-6.47-7.63-10.97-13.61-14-10.84-6.06-24.07-8.05-34.52-.08-5.6 2.81-5.95 15.45-7.8 12.48-9.84-10.21-28.26-7.42-36.99 2.57-3.68 4.03-4.22 9.22-6.1 13.81-.32.05-1.03-.81-1.45-1.21-18.47-15.44-48.99 1-50.5 23.78-16.89-.34-38.49 10.66-41.07 28.9-16.87 4.23-33.32 21.23-30.33 39.44-13.91.29-23.52 12.66-24.57 25.99-11.2 2.86-14.8 17.88-13.94 28.08-8.34 4.34-7.4 18.64-4.07 26.08-1.78 1.85-3.37 2-2.91 5.49.79 4.91-.48 11.41 3.24 15.35-8.3 4.62-9.55 16.94-5.97 24.88-14.71 45.23 84.79 83.94 114.27 105.61-17.52 21.2 2.3 27.9-3.6 41.53-17.18 25.09.98 39.21 26.55 38.45 24.99-.55 45.85-17.45 70.29-20.95 4.09-1.07 3.43 1.36 9.11 4.99 26.4 21.96 47.17 1.88 64.14-20.52 17.55-18.34 37.14-35.12 59.13-47.86 9.08 7.45 12.27 21.68 5.77 31.88-1.88 3.14-4.38 5.92-5.73 9.35-4.85 10.25 4.08 17.4 10.01 24.55 4.39 9.26-10.96 12.77-17.65 11.93-15.22-4.01-29.09-13.67-45.54-13.36-3.21 0-22.7.16-21.27 4.22 9.69-1.12 19.64-.41 29.42 1.43 12.57 1.28 23.06 9.48 35.3 11.65 19.03 2.28 41.83-8.25 20.25-26.66-10.58-13.53 12.54-23.37 6.99-40.02-1.27-7.14-7.09-14.82-12.18-18.34 19.46-12.92 41.17-21.78 62.36-31.4 20.96-8.88 53.74-16.19 65.6-37.16 1.68-4.18 2.08-11.05-3.18-12.69ZM191.28 415.83c-13.29 3.3-25.17 10.81-38.47 14.31-15.59 6.21-47.81-.84-36.28-23.02 15.99-22.69-8.82-24.58 5.27-47.08 16.39 8.17 32.41 17.17 49.17 24.65 13.54 8.11 30.25 14.41 38.72 28.45-5.99 1.64-12.3 1.59-18.41 2.7Zm214.26-102.12c-39.18 16.94-78.21 36.39-110.2 65.18-10.25 8.83-20.01 18.2-28.15 29.07-4.77 7.15-10.99 12.44-18.59 16.36-6.77 3.31-15.15-1.88-19.92-3.74l-8.28-6c-5.21-4.9-5.62-9.34-11.24-13.22-16.95-13.46-36.72-22.09-55.86-31.78-25.09-13.01-49.27-27.64-73.87-41.54-19.01-11.48-38.75-22.01-54.73-37.78-10.37-8.45-17.5-17.11-17-31.21-2.68-13.75 10.22 1.55 13.76 5.12 9.72 3.83-8.01-17.29-11.88-15.36-.28-.03-.82.02-.93-.39-1.48-5.41-3-13.78 2.21-18.01 4.49.79 16.7 20.24 19.58 15.11-4.66-7.16-7.81-17.4-17.09-19.67-.06-.27-.16-.46-.11-.55.83-1.35-.09-2.75-.25-4.28-.62-3.2.28-7.07-1.22-9.93-.66-.55-.16-1.67.73-1.04 5.16.05 15.07 19.7 17.89 13.35-5.17-6.99-7.35-17.21-17.46-18.17-.87-38.22 2.72-18.8 20.09-6.07 1.2-.07 2.1-.95 1.09-1.96-4.82-6.73-7.15-16.85-16.15-18.79.03-8.16 2.73-17.35 8.37-23.36 7.95 3.46 13.18 11.72 18.87 18.05.64.87 1.44 1.26 2.51 1.06 3.61-1.54-7.28-13.41-8.36-16.45-2.07-3.35-5.15-5.29-8.82-6.49 9.19-24 21.39-31.66 32.93-3.64.48 1.32.84 3.06 2.59 2.82 2.73-.06 1.18-3.54 1.14-5.23-1.07-7.5-3.56-15.39-11.03-18.62-3.24-15.3 9.44-30.22 22.61-36.21 8.67-1.36 16.57 16.7 21.73 22.76 9.13 6.47-2.74-13.56-3.12-16.27-1.96-5.56-7.02-9.03-12.41-10.82-.17-3.42 2.4-5.67 4.29-8.13 4.33-6.96 10.88-11.2 18.08-14.8 12.09-6.39 17.3 1.32 19.6 12.66-.04 2.23 1.7 5.58 3.78 2.81.63-6.6.43-15.21-4.79-19.97.79-10.69 9.16-17.08 17.36-22.56 10.09-9.03 25.29-5 27.46 8.98 1.5 6.61.79 13.44 1.86 20.09.78 4.27 7.26 4.1 6.72-.65 2.11-11.4-3.57-22.73.54-33.68 5.11-10.02 19.9-18.95 30.01-10.96 4.51 5.12 4.96 11.47 5.11 18.17.08 1.94-.03 3.14.03 5.09 1.66 6.12 8.08 1.58 7.38-3.46 2.28-12.81-7.86-19.58 5.84-29.06 11.17-9.07 21.8-6.78 32.5 1.73 7.36 6.41 4.02 17.39 4.89 26 .08 2.93-1.17 9.14 3.76 7.38 1.18-.43 2.08-1.21 2.46-2.43 2.39-5.61-.76-13.2 2.45-18.06 17.13-14.03 36.68-8.91 34.4 15.63-.34 7.66-1.96 15.11-3.13 22.66-.6 3.28 3.97 2.75 5.76 1.62 4.46-6.03 5.06-14.99 6.01-22.4.58-3.62 4.76-5.45 6.95-8.14 8.49-7.09 22.55 1.92 21.63 12.6.29 12.15-5.92 22.88-9.14 34.23-.18 3.8 5.79 2.29 6.81-.23 3.9-8.31 8.17-16.51 10.22-25.53 6.34-2.16 12.34.34 18.11 2.85 18.39 9.03.98 33.91-1.41 47.86 7.53 7.82 15.07-21.14 17.45-26.15 18.12-6.02 22.23 9.37 15.88 23.68-1.38 5.49-15.37 18.74-10.85 23.26 4.21 1.02 6.72-3.14 8.38-6.34 3.05-5.57 7.63-10.06 11.07-15.35 8.91-2.43 19.9 5.56 17.73 15.46-.49 11.89-10.76 20.77-15.06 30.65 10.53 5.14 13.94-19.42 23.82-14.77 5.18 2.92 7.94 8.61 8.16 14.42-.2 5.64-1.97 11.42-6.16 15.41-3.94 3.81-6.59 8.66-10.11 12.83-1.82 1.75-1.49 3.79 1.36 3.49 8.98-1.45 11.99-12.67 19.04-17.24 2.87.81 5.19 5.5 5.15 5.21 7.99 12.59 1.38 24.18-8.1 33.07-2.69 2.88-6.74 4.3-9.18 7.41-.58 3.23 4.69 1.47 6.21.53 5.94-3.07 11.25-7.04 15.76-12 .19-.26.96-1.28 1.45-.67 3.67 5.65 1.52 13.01 1.3 16.49-1.26 14.2-16.58 18.08-26.36 25.09-.65 6.36 19.34-5.44 21.53-6.72 6.57-5.17 5.51-2.43 4.1 3.39-2.86 10.13-12.86 15.22-20.83 20.98-5.58 3.18 1.54 4.74 4.37 2.54 5.89-2.49 11.89-9.48 18.41-8.45 2.23 4.88-.86 12.25-4.94 15.73-5.87 4.75-13.09 7.48-19.25 11.72.11 6.86 25.17-8.74 27.61-10.55 7.91 21.47-47.71 37.91-62.88 44.29Z" />
                <path d="M207.25 161.49c-1.05.04-2.32 1.66-3.09 2.55-1.31 1.5-1.48 1.9-2.5 3.07-2.92 3.35-6.29 6.14-10.4 7.92-2.49 1.08-4.59 1.89-7.41 1.48-.71-.1-1.18-.22-2.05-.62.32-.3.4-.38.49-.46 3.93-3.45 7.08-7.39 8.01-12.75.24-1.39-.81-2.91-2.39-2.58-1.24 2.05-2.53 4-3.64 6.03-2.17 3.96-5.16 7.07-9.1 9.27-.62.35-1.4.49-2.27.36-1.36-.2-2.23-.47-3.42-1.22 0 0 .09-.35.17-.54 1.24-2.6 2.54-4.67 3.56-7.25 1.17-2.92 1.17-5.33.83-7.4-.27-1.66-1.87-2.15-2.92-.88-1.09 1.32-1.4 3.34-1.98 4.99-1.63 4.64-4.06 8.54-6.72 12.64-.33.51-1.33 2.19-1.82 2.52-4.93 3.27-5.95 3.33-10.94 6.53-5.62 3.6-12.29 6.51-18.48 8.75-2.4.87-13.12 1.78-12.31 4.98.1.39.35.75 1.2 1.81.58.73 2.04 3 3.02 3.44.29.13.52.43.72.69.41.57 1.9 1.48 2.29 2.06 1.48 2.25 3.94 3.32 5.9 4.99.91.78 1.93 1.44 2.98 2.02 2.56 1.42 10.14 4.43 17.42 5.67 5.79.99 23.82 1.2 33.69-3.35 3.9-1.8 7.64-3.76 11.02-6.32 2.41-1.82 6.47-5.83 7-9.57.17-1.48-1.1-2.52-2.02-2.58-2.3-.15-4.47 3.24-7.87 6.03-4.82 3.95-11.81 7.56-16.66 8.95 2.42-1.84 4.19-4.24 4.78-5.95 1.63-4.75 3.63-16.51-.27-22.8-.18-.29-.38-.54-.6-.79 0-.04.02-.08.03-.13.4.1 3.71.12 3.97.26 1.8.99 3.71 1.56 5.76 1.64 2.03.08 4.03-.11 5.89-1.01 1.45-.71 1.52-1.32.24-2.25-.82-.52-4.1-2.82-4.1-2.82 5.19-1.85 8.51-5.09 11.76-9.47 1.5-2.02 2.38-4.02 2.9-6.61.13-.66.07-1.35-.67-1.32Zm-47.12 52.96c-4.39.37-11.29-.9-15.62-1.85-2.78-.61-13.93-6.59-17.56-12.62.46-.38 16.34-6.15 24.03-9.85 3.6-1.73 8.19-3.53 11.76-5.79-2.76 5.24-7.79 17.28-1.27 25.92 1.32 1.75 2.69 2.98 4.07 3.81-1.71.1-3.47.21-5.41.38ZM351.71 161.49c-1.05.04-2.32 1.66-3.09 2.55-1.31 1.5-1.48 1.9-2.5 3.07-2.92 3.35-6.29 6.14-10.4 7.92-2.49 1.08-4.59 1.89-7.41 1.48-.71-.1-1.18-.22-2.05-.62.32-.3.4-.38.49-.46 3.93-3.45 7.08-7.39 8.01-12.75.24-1.39-.81-2.91-2.39-2.58-1.24 2.05-2.53 4-3.64 6.03-2.17 3.96-5.16 7.07-9.1 9.27-.62.35-1.4.49-2.27.36-1.36-.2-2.23-.47-3.42-1.22 0 0 .09-.35.17-.54 1.24-2.6 2.54-4.67 3.56-7.25 1.17-2.92 1.17-5.33.83-7.4-.27-1.66-1.87-2.15-2.92-.88-1.09 1.32-1.4 3.34-1.98 4.99-1.63 4.64-4.06 8.54-6.73 12.64-.33.51-1.33 2.19-1.82 2.52-4.93 3.27-5.95 3.33-10.94 6.53-5.62 3.6-12.29 6.51-18.48 8.75-2.4.87-13.12 1.78-12.31 4.98.1.39.35.75 1.2 1.81.58.73 2.04 3 3.02 3.44.29.13.52.43.72.69.41.57 1.9 1.48 2.29 2.06 1.48 2.25 3.94 3.32 5.9 4.99.91.78 1.93 1.44 2.98 2.02 2.56 1.42 10.14 4.43 17.42 5.67 5.79.99 23.82 1.2 33.69-3.35 3.9-1.8 7.64-3.76 11.02-6.32 2.41-1.82 6.47-5.83 7-9.57.17-1.48-1.1-2.52-2.02-2.58-2.3-.15-4.47 3.24-7.87 6.03-4.82 3.95-11.81 7.56-16.66 8.95 2.42-1.84 4.19-4.24 4.78-5.95 1.63-4.75 3.63-16.51-.27-22.8-.18-.29-.38-.54-.6-.79 0-.04.02-.08.03-.13.4.1 3.71.12 3.97.26 1.8.99 3.71 1.56 5.76 1.64 2.03.08 4.03-.11 5.89-1.01 1.45-.71 1.52-1.32.24-2.25-.82-.52-4.11-2.82-4.11-2.82 5.19-1.85 8.51-5.09 11.76-9.47 1.5-2.02 2.38-4.02 2.9-6.61.13-.66.07-1.35-.67-1.32Zm-47.12 52.96c-4.39.37-11.29-.9-15.62-1.85-2.78-.61-13.93-6.59-17.56-12.62.46-.38 16.34-6.15 24.03-9.85 3.6-1.73 8.19-3.53 11.76-5.79-2.76 5.24-7.79 17.28-1.27 25.92 1.32 1.75 2.69 2.98 4.07 3.81-1.71.1-3.47.21-5.41.38Z" />
              </svg>
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
