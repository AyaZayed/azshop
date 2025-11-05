const ReviewsStars = dynamic(
  () => import("@/app/components/storefront/ReviewsStars")
);
import { getFeaturedReviews } from "@/utils/db/reviews";
import dynamic from "next/dynamic";
import React from "react";

export default async function FeaturedReviews() {
  const reviews = await getFeaturedReviews(3);
  return (
    <>
      {reviews.length > 0 && (
        <section className="p-6 py-16 flex flex-col items-center justify-center">
          <h1 className="capitalize mb-16 text-center text-[34px] md:text-[60px]">
            What our customers say
          </h1>
          <div
            className={`grid grid-cols-1 md:grid-cols-${reviews.length} gap-6 md:p-10`}>
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-6 border md:max-w-[380px] border-sf_sedcondary flex flex-col transition-transform duration-500 ease-in-out md:hover:-translate-y-4 justify-between">
                <div className="flex flex-col gap-3">
                  <ReviewsStars rating={review.rating} starColor="primary" />
                  <h3 className="font-semibold capitalize text-xl">
                    {review.headline}
                  </h3>
                  <p className="line-clamp-5 font-secondary text-sm text-ellipsis first-letter:capitalize">
                    {review.content}
                  </p>
                </div>
                <h4 className="font-semibold text-lg mt-12 text-sf_primary capitalize">
                  @{review.author}
                </h4>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
