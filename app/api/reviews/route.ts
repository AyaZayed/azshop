import prisma from "@/app/lib/db";
import { reviewSchema } from "@/app/lib/zodSchemas";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function handler(req: Request, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const data = reviewSchema.parse(req.body);
    const review = await prisma.review.create({
      data: {
        author: data.author,
        headline: data.headline,
        content: data.content,
        rating: data.rating,
        productId: data.productId,
        userId: user.id,
      },
    });

    return res.status(201).json(review);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
