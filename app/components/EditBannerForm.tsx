"use client";
import { editBanner } from "@/app/actions";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { bannerSchema } from "@/app/lib/zodSchemas";
import { useState } from "react";

import BannerForm from "./BannerForm";

interface dataTypes {
  data: {
    id: string;
    title: string;
    image: string;
  };
}

export default function EditBannerForm({ data }: dataTypes) {
  const [image, setImage] = useState<string[]>([data.image]);
  const [lastResult, action] = useFormState(editBanner, undefined);

  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: bannerSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
      <input type="hidden" name="bannerId" value={data.id} />
      <BannerForm
        fields={fields}
        image={image}
        setImage={setImage}
        data={data}
        label={"Edit Banner"}
      />
    </form>
  );
}
