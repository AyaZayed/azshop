import React from "react";
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
import { categories } from "@/app/lib/categories";
import SubmitButton from "@/app/components/SubmitButtons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ImageUploadWidget from "@/app/components/ImageUploadWidget";
import { type $Enums } from "@prisma/client";

type productFormProps = {
  images: string[];
  setImages: (images: string[]) => void;
  fields: {
    name: {
      key: string;
      name: string;
      initialValue: string | undefined;
      errors: string[] | undefined;
    };
    description: {
      key: string;
      name: string;
      initialValue: string | undefined;
      errors: string[] | undefined;
    };
    price: {
      key: string;
      name: string;
      initialValue: string | undefined;
      errors: string[] | undefined;
    };
    status: {
      key: string;
      name: string;
      initialValue: string | undefined;
      errors: string[] | undefined;
    };
    isFeatured: {
      key: string;
      name: string;
      initialValue: boolean | undefined;
      errors: string[] | undefined;
    };
    category: {
      key: string;
      name: string;
      initialValue: string | undefined;
      errors: string[] | undefined;
    };
    images: {
      key: string;
      name: string;
      initialValue: string | undefined;
      errors: string[] | undefined;
    };
  };
  data?: {
    id: string;
    name: string;
    description: string;
    price: number;
    status: $Enums.ProductStatus;
    isFeatured: boolean;
    images: string[];
    category: $Enums.Category;
  };
  header: string;
};

export default function ProductForm({
  images,
  setImages,
  fields,
  data,
  header,
}: productFormProps) {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"outline"} size={"icon"} asChild>
              <Link href="/dashboard/products">
                <ChevronLeft className="w-4 h-4" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Back to Products</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-xl font-semibold tracking-tight">
            {header}
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
                defaultValue={(data && data.name) || fields.name.initialValue}
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
                defaultValue={
                  (data && data.description) || fields.description.initialValue
                }
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
                defaultValue={(data && data.price) || fields.price.initialValue}
              />
              <p className="text-sm text-red-500">{fields.price.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="isFeatured">Featured Product</Label>
              <Switch
                id="isFeatured"
                key={fields.isFeatured.key}
                name={fields.isFeatured.name}
                checked={
                  (data && data.isFeatured) || fields.isFeatured.initialValue
                }
              />
              <p className="text-sm text-red-500">{fields.isFeatured.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="status">Status</Label>
              <Select
                key={fields.status.key}
                name={fields.status.name}
                defaultValue={
                  (data && data.status) || fields.status.initialValue
                }>
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
                defaultValue={
                  (data && data.category) || fields.category.initialValue
                }>
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
              <ImageUploadWidget
                images={images}
                setImages={setImages}
                fieldsImages={{
                  key: fields.images.key as string,
                  name: fields.images.name,
                  initialValue:
                    (data && data.images) || fields.images.initialValue,
                  errors: fields.images.errors,
                }}
              />
            </div>
            <SubmitButton variant="default" label="Submit" />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
