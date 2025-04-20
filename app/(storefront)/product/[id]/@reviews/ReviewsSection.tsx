"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import { Review } from "@prisma/client";
const ReviewsList = dynamic(() => import("./ReviewsList"), {
  ssr: false,
  loading: () => <p>Loading reviews...</p>,
});

const ReviewForm = dynamic(() => import("./ReviewForm"), {
  ssr: false,
  loading: () => <p>Loading form...</p>,
});

interface Props {
  reviews: Review[];
  productId: string;
  sessionId: string;
}

export default function ReviewsSection({
  reviews,
  productId,
  sessionId,
}: Props) {
  const [shownReviews, setShownReviews] = React.useState(reviews.slice(0, 5));
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <div className="border-b-[1px] border-sf_sedcondary flex justify-between">
        <h2 className="px-2 text-3xl font-bold font-primary border-b-4 border-sf_sedcondary">
          Reviews{" "}
          <span className="text-xs font-normal font-secondary">
            {reviews.length > 0 && `(${reviews.length})`}
          </span>
        </h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button
              className="text-sf_background bg-sf_sedcondary border-[1px] border-sf_sedcondary hover:bg-sf_background 
        hover:text-sf_sedcondary p-1 px-3 text-xs mb-2 font-[500]">
              Write a review
            </button>
          </DialogTrigger>
          <DialogContent className="font-secondary text-sm">
            <DialogHeader>
              <DialogTitle className="text-xl">Write a review</DialogTitle>
              <DialogDescription>
                Give your honest opinion about this product
              </DialogDescription>
            </DialogHeader>
            <ReviewForm
              productId={productId}
              userId={sessionId}
              setShownReviews={setShownReviews}
              setIsOpen={setIsOpen}
            />
          </DialogContent>
        </Dialog>
      </div>
      <ReviewsList
        shownReviews={shownReviews}
        setShownReviews={setShownReviews}
        reviews={reviews}
      />
    </>
  );
}
