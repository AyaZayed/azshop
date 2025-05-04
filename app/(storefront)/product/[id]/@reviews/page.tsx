import React from "react";
import ReviewsSection from "./ReviewsSection";
import { getReviewsByProduct } from "@/utils/db/reviews";
import { getSessionId } from "@/utils/auth/getSessionId";

export default async function Reviews({ params }: { params: { id: string } }) {
  const reviews = await getReviewsByProduct(params.id);
  const { userId, guestId } = await getSessionId();

  return (
    <section id="reviews" className="p-10 md:px-24 text-base font-secondary">
      <ReviewsSection
        reviews={reviews}
        productId={params.id}
        userId={userId}
        guestId={guestId}
      />
    </section>
  );
}
