import prisma from "@/app/lib/db";
import React from "react";
import { getSessionId } from "@/app/lib/getSessionId";
import ReviewsSection from "./ReviewsSection";

export default async function Reviews({ params }: { params: { id: string } }) {
  const productId = params.id;
  const reviews = await prisma.review.findMany({
    where: {
      productId: productId,
    },
    orderBy: {
      created_at: "desc",
    },
  });
  const { sessionId } = await getSessionId();

  return (
    <section id="reviews" className="p-10 md:px-24 text-base font-secondary">
      <ReviewsSection
        reviews={reviews}
        productId={productId}
        sessionId={sessionId}
      />
    </section>
  );
}
