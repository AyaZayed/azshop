"use client";
import { createProduct } from "@/app/actions/productActions";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/lib/zodSchemas";
import { useState } from "react";
import ProductForm from "../ProductForm";

export default function ProductFormWrapper({ currency }: { currency: string }) {
  const [images, setImages] = useState<string[] | string>([]);
  const [lastResult, action] = useFormState(createProduct, undefined);

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
      <ProductForm
        images={images}
        setImages={setImages}
        fields={fields}
        header="New Product"
        currency={currency}
      />
    </form>
  );
}
