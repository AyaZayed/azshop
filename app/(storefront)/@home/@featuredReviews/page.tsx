import ReviewsStars from "@/app/components/storefront/ReviewsStars";
import prisma from "@/app/lib/db";
import { unstable_noStore } from "next/cache";
import React from "react";

async function getData() {
  const reviews = await prisma.review.findMany({
    where: {
      rating: { gt: 4 },
    },
    orderBy: {
      created_at: "desc",
    },
    select: {
      id: true,
      rating: true,
      content: true,
      headline: true,
      author: true,
    },
    take: 3,
  });

  return reviews;
}

export default async function featuredReviews() {
  unstable_noStore();
  const reviews = await getData();
  return (
    <>
      {reviews.length > 0 && (
        <section className="p-6 py-16 flex flex-col items-center justify-center">
          <h1 className="capitalize mb-16 text-center">
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
