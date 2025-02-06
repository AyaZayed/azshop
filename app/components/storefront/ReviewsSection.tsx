import prisma from "@/app/lib/db";
import React from "react";
import ReviewForm from "./ReviewForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ReviewsList from "./ReviewsList";

export default async function ReviewsSection({
  productId,
}: {
  productId: string;
}) {
  const reviews = await prisma.review.findMany({
    where: {
      productId: productId,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <section className="p-10 md:px-24 text-base font-secondary" id="reviews">
      <div className="border-b-[1px] border-sf_sedcondary flex justify-between">
        <h2 className="px-2 text-3xl font-bold font-primary border-b-4 border-sf_sedcondary">
          Reviews{" "}
          <span className="text-xs font-normal font-secondary">
            {reviews.length}
          </span>
        </h2>
        <Dialog>
          <DialogTrigger
            className="text-sf_background bg-sf_sedcondary border-[1px] border-sf_sedcondary hover:bg-sf_background 
        hover:text-sf_sedcondary p-1 px-3 text-xs mb-2 font-[500]">
            Write a review
          </DialogTrigger>
          <DialogContent className="font-secondary text-sm">
            <DialogHeader>
              <DialogTitle className="text-xl">Write a review</DialogTitle>
              <DialogDescription>
                Give your honest opinion about this product
              </DialogDescription>
            </DialogHeader>
            <ReviewForm productId={productId} userId={user?.id} />
          </DialogContent>
        </Dialog>
      </div>
      <ReviewsList reviews={reviews} />
    </section>
  );
}
