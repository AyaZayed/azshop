"use client";
import { editProduct } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/app/lib/zodSchemas";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Check, XCircle, XIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { categories } from "@/app/lib/categories";
import SubmitButton from "@/app/components/SubmitButtons";
import { type $Enums } from "@prisma/client";

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
  };
}

export default function EditForm({ data }: dataTypes) {
  const [alert, setAlert] = useState(false);
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
      <div className="flex items-center gap-4">
        <Button size={"icon"} variant={"outline"} asChild>
          <Link href="/dashboard/products">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-xl font-semibold tracking-tight">
            Edit Product
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={data.name}
                placeholder="Product Name"
                className="w-full"
              />
              <p className="text-sm text-red-500">{fields.name.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="desc">Description</Label>
              <Textarea
                id="desc"
                placeholder="Product Description"
                className="w-full"
                key={fields.description.key}
                name={fields.description.name}
                defaultValue={data.description}
              />
              <p className="text-sm text-red-500">
                {fields.description.errors}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="price">Price</Label>
              <Input
                type="number"
                id="price"
                placeholder="$55"
                className="w-full"
                key={fields.price.key}
                name={fields.price.name}
                defaultValue={data.price}
              />
              <p className="text-sm text-red-500">{fields.price.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="isFeatured">Featured Product</Label>
              <Switch
                id="isFeatured"
                key={fields.isFeatured.key}
                name={fields.isFeatured.name}
                defaultChecked={data.isFeatured}
              />
              <p className="text-sm text-red-500">{fields.isFeatured.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="status">Status</Label>
              <Select
                key={fields.status.key}
                name={fields.status.name}
                defaultValue={data.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-red-500">{fields.status.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="status">Category</Label>
              <Select
                key={fields.category.key}
                name={fields.category.name}
                defaultValue={data.category}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.name}>
                      {c.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-red-500">{fields.category.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="upload">Images</Label>
              <input
                type="hidden"
                value={images}
                key={fields.images.key}
                name={fields.images.name}
                defaultValue={
                  fields.images.initialValue as [string, ...string[]]
                }
              />
              {images.length > 0 ? (
                <div className="flex gap-5">
                  {images.map((image, index) => (
                    <div className="relative w-[100px] h-[100px]" key={index}>
                      <Image
                        src={image}
                        alt="Product image"
                        width={100}
                        height={100}
                        className="object-cover border lg:rounded"
                      />
                      <button
                        type="button"
                        className="absolute top-[-5px] right-[-5px] bg-red-500 rounded-full p-1"
                        onClick={() => {
                          setImages(images.filter((_, i) => i !== index));
                        }}>
                        <XIcon className="h-3 w-3 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <UploadDropzone
                    className="ut-button:bg-primary text-primary ut-label:hover:text-primary ut-label:hover:font-bold"
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setImages(res.map((file) => file?.url));
                      setAlert(true);
                    }}
                    onUploadError={() => {
                      setAlert(false);
                    }}
                  />
                  <p className="text-sm text-red-500">{fields.images.errors}</p>
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

            <SubmitButton variant="default" label="Edit Product" />
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
