import { z } from "zod";

export const reviewSchema = z.object({
  headline: z.string().min(1, "Headline is required"),
  content: z
    .string()
    .min(10, "Review content must be at least 10 characters long")
    .max(1000, "Review content cannot exceed 1000 characters"),
  rating: z
    .number()
    .min(1, "Rating is required")
    .max(5, "Rating must be between 1 and 5"),
});

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().min(1, "Price must be greater than 0"),
  status: z.enum(["draft", "published", "archived"]),
  isFeatured: z.boolean().optional(),
  images: z.array(z.string()).min(1, "Image is required"),
  category: z.enum(["sunscreen", "repair", "gifts", "sets"]),
  reviewsCount: z.number().int().nonnegative().optional(),
  overallRating: z.number().min(1).max(5).optional(),
  reviews: z.array(reviewSchema).optional(),
});

export const bannerSchema = z.object({
  title: z.string().min(1, "Title is required"),
  image: z.string().min(1, "Image is required"),
  location: z.enum(["landing", "about"]),
});
