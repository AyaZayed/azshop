import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().min(1, "Price must be greater than 0"),
  status: z.enum(["draft", "published", "archived"]),
  isFeatured: z.boolean().optional(),
  images: z.array(z.string()).min(1, "Image is required"),
  category: z.enum(["men", "women", "unisex"]),
});
