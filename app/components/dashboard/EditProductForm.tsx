"use client";
import { editProduct } from "@/app/actions/productActions";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/app/lib/zodSchemas";
import { useState } from "react";
import ProductForm from "@/app/components/dashboard/ProductForm";
import { $Enums } from "@prisma/client";

interface dataTypes {
  data: {
    id: string;
    name: string;
    description: string;
    price: number;
    status: $Enums.ProductStatus;
    isFeatured: boolean;
    images: string[];
    category: $Enums.Category;
    ingredients: string;
    how_to: string;
    scent: string;
    size: number;
    type: $Enums.Type;
    inStock: number;
  };
}

export default function EditProductForm({ data }: dataTypes) {
  const [images, setImages] = useState<string[]>(data.images);
  const [lastResult, action] = useFormState(editProduct, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: productSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
      <input type="hidden" name="productId" value={data.id} />
      <ProductForm
        images={images}
        setImages={setImages}
        fields={fields}
        data={data}
        header="Edit Product"
      />
    </form>
  );
}
