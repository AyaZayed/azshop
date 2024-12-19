"use client";
import { createBanner } from "@/app/actions";
import BannerForm from "@/app/components/BannerForm";
import { bannerSchema } from "@/app/lib/zodSchemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useState } from "react";
import { useFormState } from "react-dom";

export default function NewBanner() {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [lastResult, action] = useFormState(createBanner, undefined);

  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: bannerSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <BannerForm
        fields={fields}
        image={image}
        setImage={setImage}
        label={"Create Banner"}
      />
    </form>
  );
}
