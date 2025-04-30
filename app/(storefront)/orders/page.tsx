import Currency from "@/app/components/Currency";
import HoverImage from "@/app/components/storefront/HoverImage";
import { MartiniSVG } from "@/app/components/SVGs";
import { auth } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { loginLink } from "@/utils/constants";
import { ArrowRight } from "lucide-react";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function OrdersPage() {
  unstable_noStore();
  const { userId } = await auth();
  if (!userId) return redirect(loginLink);

  const orders = await prisma.order.findMany({
    where: { userId: userId },
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: true } } },
  });

  const orderQuantity = orders.reduce(
    (acc, order, idx) => acc + order.items[idx].quantity,
    0
  );

  return (
    <section className="flex flex-col gap-8 justify-center items-center pt-32 pb-20 p-4">
      <MartiniSVG className="fill-sf_sedcondary" width={100} height={100} />
      <h1>Your Orders</h1>
      <div
        className={`mt-6 grid grid-cols-1 ${
          orders.length > 1 ? "md:grid-cols-2" : ""
        } gap-8`}>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="order flex gap-6 p-6 font-secondary border-[1px] border-sf_sedcondary">
              <div className="order-img w-[130px] h-full">
                <HoverImage
                  key={order.items[0].id}
                  image={order.items[0].product.images[0]}
                  category={order.items[0].product.category}
                  title={order.items[0].product.name}
                  hover={true}
                />
              </div>
              <div className="order-text flex flex-col gap-2">
                <h2 className="font-semibold flex gap-2">
                  Order #{order.id.split("-")[0]}
                  <p className="font-normal bg-sf_primary_opaque w-fit px-2 pb-[1px] text-sf_primary rounded-[8px]">
                    {order.status}
                  </p>
                </h2>
                <div className="text-[14px] flex flex-col gap-1">
                  <p>
                    Placed on{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>

                  <p>
                    Total: <Currency />
                    {(order.total / 100).toFixed(2)}
                  </p>
                  <p>Quantity: {orderQuantity}</p>
                  <Link
                    href={`/orders/${order.id}`}
                    className="flex gap-2 font-semibold transition-all ease-in-out duration-300 hover:text-sf_primary">
                    View Details <ArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </section>
  );
}
