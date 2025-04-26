import React from "react";
import { Review } from "@prisma/client";
import ReviewsStars from "@/app/components/storefront/ReviewsStars";

export default function ReviewsList({
  shownReviews,
  setShownReviews,
  reviews,
}: {
  shownReviews: Review[];
  setShownReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  reviews: Review[];
}) {
  const handleShowMore = () => {
    setShownReviews((prev) => [
      ...prev,
      ...reviews.slice(prev.length, prev.length + 5),
    ]);
  };
  return (
    <>
      {shownReviews.length > 0 ? (
        <div className="flex flex-col">
          {shownReviews.map((review) => (
            <div key={review.id}>
              <div className="flex flex-col gap-1 pt-10">
                <div className="stars mb-4">
                  <ReviewsStars
                    rating={review.rating}
                    starSize={16}
                    starColor="primary"
                  />
                </div>
                <h3 className="capitalize">
                  @{review.author} -{" "}
                  <span className="font-[500]">{review.headline}</span>
                </h3>
                <p className="font-primary first-letter:capitalize">
                  {review.content}
                </p>
              </div>
            </div>
          ))}
          {reviews.length > shownReviews.length && (
            <button
              onClick={handleShowMore}
              className="mt-10 self-center text-sf_background bg-sf_sedcondary border-[1px] border-sf_sedcondary hover:bg-sf_background 
        hover:text-sf_sedcondary p-2 px-4 text-xs mb-2 font-[500]">
              Show More
            </button>
          )}
        </div>
      ) : (
        <p className="mt-4">
          This product has no reviews yet. Be the first one!
        </p>
      )}
    </>
  );
}
