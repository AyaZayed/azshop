import prisma from "@/app/lib/db";
import { redis } from "@/app/lib/redis";
import { stripe } from "@/app/lib/stripe";
import { unstable_noStore } from "next/cache";
import Stripe from "stripe";

export async function POST(req: Request) {
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
  } catch (error: unknown) {
    return new Response(`Webhook Error:`, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      await prisma.order.create({
        data: {
          amount: session.amount_total as number,
          userId: session.metadata?.userId as string,
          status: session.status as string,
        },
      });

      await redis.del(`cart-${session.metadata?.userId}`);
      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response(null, { status: 200 });
}
