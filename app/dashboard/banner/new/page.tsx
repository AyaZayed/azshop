"use client";

import { createBanner } from "@/app/actions";
import SubmitButton from "@/app/components/SubmitButtons";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { bannerSchema } from "@/app/lib/zodSchemas";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Check, ChevronLeft, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";

export default function BannerRoute() {
  const [alert, setAlert] = useState(false);
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
      <div className="flex items-center gap-x-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">New Banner</h1>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Banner Details</CardTitle>
          <CardDescription>Create your banner right here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input
                name={fields.title.name}
                key={fields.title.key}
                defaultValue={fields.title.initialValue}
                type="text"
                placeholder="Create title for Banner"
              />
              <p className="text-red-500">{fields.title.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="upload">Image</Label>
              <input
                type="hidden"
                value={image}
                key={fields.image.key}
                name={fields.image.name}
                defaultValue={fields.image.initialValue}
              />
              {image !== undefined ? (
                <div className="flex gap-5">
                  <div className="relative w-[100px] h-[100px]">
                    <Image
                      src={image}
                      alt="Product image"
                      width={200}
                      height={200}
                      className="w-[200px] h-[200px] object-cover border rounded-lg"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <UploadDropzone
                    className="ut-button:bg-primary text-primary ut-label:hover:text-primary ut-label:hover:font-bold"
                    endpoint="bannerUploader"
                    onClientUploadComplete={(res) => {
                      setImage(res[0].url);
                      setAlert(true);
                    }}
                    onUploadError={() => {
                      setAlert(false);
                    }}
                  />
                  <p className="text-sm text-red-500">{fields.image.errors}</p>
                </>
              )}
              {alert && (
                <Alert className="w-full">
                  {alert ? (
                    <>
                      <Check className="h-5 w-5 stroke-green-500" />
                      <AlertTitle>Upload Complete</AlertTitle>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 stroke-red-500" />
                      <AlertTitle>Upload Failed</AlertTitle>
                    </>
                  )}
                </Alert>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton label="Create Banner" variant={"default"} />
        </CardFooter>
      </Card>
    </form>
  );
}
