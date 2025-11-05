/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/db";
import { redis } from "@/lib/redis";
import { stripe } from "@/lib/stripe";
import { unstable_noStore } from "next/cache";
import Stripe from "stripe";

export async function POST(req: Request) {
   console.log("✅ Stripe webhook route was hit");
   unstable_noStore();

   const body = await req.text();
   const signature = req.headers.get("Stripe-Signature") as string;
   let event;

   try {
      event = stripe.webhooks.constructEvent(
         body,
         signature,
         process.env.STRIPE_WEBHOOK_SECRET as string
      );
   } catch (error: any) {
      console.error("❌ Stripe signature error:", error.message);
      return new Response(`Webhook Error: ${error.message}`, { status: 400 });
   }

   console.log("📦 Event type:", event.type);

   switch (event.type) {
      case "checkout.session.completed": {
         const session = event.data.object as Stripe.Checkout.Session;

         try {
            const userId = session.metadata?.userId;
            const redisKey = `cart-${userId}`;
            console.log("🔍 Looking for cart under key:", redisKey);

            const rawCart = await redis.get(redisKey);
            console.log("🛒 Raw cart from Redis:", rawCart);

            if (!rawCart) throw new Error("Cart not found in Redis");

            const parsedCart =
               typeof rawCart === "string" ? JSON.parse(rawCart) : rawCart;

            const order = await prisma.order.create({
               data: {
                  total: session.amount_total || 0,
                  userId,
                  status: session.status || "pending",
                  items: {
                     create: parsedCart.items.map((item: any) => ({
                        product: {
                           connect: { id: item.id },
                        },
                        quantity: item.quantity,
                        unitPrice: item.price,
                     })),
                  },
               },
            });

            await prisma.product.updateMany({
               where: {
                  id: { in: parsedCart.items.map((item: any) => item.id) },
               },
               data: { inStock: { decrement: parsedCart.items.length } },
            });

            console.log("✅ Order created:", order);

            await redis.del(`cart-${userId}`);
            console.log("🧹 Cart cleared from Redis");
         } catch (err: any) {
            console.error(
               "❌ Error in checkout.session.completed:",
               err.message
            );
            return new Response("Webhook Error: Order creation failed", {
               status: 500,
            });
         }

         break;
      }

      default:
         console.log(`⚠️ Unhandled event type ${event.type}`);
   }

   return new Response(null, { status: 200 });
}
