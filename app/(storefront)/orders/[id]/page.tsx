import Currency from "@/app/components/Currency";
import { getOrderDetails } from "@/utils/db/orders";
import { ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
const HoverImage = dynamic(
  () => import("@/app/components/storefront/HoverImage"),
  { ssr: false }
);

export const metadata = {
  title: "Order Details",
};

export default async function page({ params }: { params: { id: string } }) {
  const order = await getOrderDetails(params.id);
  if (!order) return notFound();

  return (
    <section className="flex flex-col gap-8 justify-center items-center pt-28 pb-20 p-4 font-secondary">
      <Link
        href="/orders"
        className="flex gap-2 self-start ml-20 hover:text-sf_primary transition-all ease-in-out duration-300">
        <ArrowLeft />
        Back to orders
      </Link>
      <h1 className="font-primary">Order Details</h1>
      <div className="flex flex-col gap-2 items-center">
        <p>Order #{order.id.split("-")[0]}</p>
        <p>
          Placed on{" "}
          {new Date(order.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p>
          Status:{" "}
          <span className="capitalize font-semibold">{order.status}</span>
        </p>
      </div>
      <div className="order-items border-t-2 border-sf_sedcondary w-full md:w-1/3">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="order-item grid grid-cols-4 gap-4 py-6 border-b-2  border-sf_sedcondary">
            <div className="order-img w-full h-[100px]">
              <HoverImage
                image={item.product.images[0]}
                title={item.product.name}
                category={item.product.category}
                hover={true}
              />
            </div>
            <h3 className="uppercase leading-8 col-span-2">
              {item.product.name}
            </h3>
            <div className="order-details flex flex-col items-end gap-3">
              <p className="text-nowrap">Qty: {item.quantity}</p>
              <p>
                <Currency />
                {item.product.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="total flex justify-between w-full md:w-1/3">
        <h3>Total:</h3>
        <p>
          <Currency />
          {(order.total / 100).toFixed(2)}
        </p>
      </div>
    </section>
  );
}
