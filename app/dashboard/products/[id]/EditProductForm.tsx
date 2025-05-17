"use client";
import { editProduct } from "@/app/actions/productActions";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/lib/zodSchemas";
import { useState } from "react";
import ProductForm from "../ProductForm";
import { Product } from "@prisma/client";

export default function EditProductForm({ data }: { data: Product }) {
  const [images, setImages] = useState<string[] | string>(data.images);
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
