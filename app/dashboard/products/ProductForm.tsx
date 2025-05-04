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
import { categories } from "@/lib/categories";
import SubmitButton from "@/app/components/SubmitButtons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type $Enums } from "@prisma/client";
import { productTypes } from "@/lib/productTypes";
import Currency from "@/app/components/Currency";
import dynamic from "next/dynamic";
const ImageUploadWidget = dynamic(
  () => import("@/app/components/dashboard/ImageUploadWidget"),
  { ssr: false }
);

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
    inStock: {
      key: string;
      name: string;
      initialValue: number | undefined;
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
    ingredients: {
      key: string;
      name: string;
      initialValue: string | undefined;
      errors: string[] | undefined;
    };
    how_to: {
      key: string;
      name: string;
      initialValue: string | undefined;
      errors: string[] | undefined;
    };
    scent: {
      key: string;
      name: string;
      initialValue: string | undefined;
      errors: string[] | undefined;
    };
    size: {
      key: number;
      name: string;
      initialValue: number | undefined;
      errors: string[] | undefined;
    };
    type: {
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
    ingredients: string;
    how_to: string;
    scent: string;
    size: number;
    type: "face" | "body" | "both" | "other";
    inStock: number;
  };
  header: string;
};

export default async function ProductForm({
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
            <Button variant={"outline"} size={"icon"} asChild aria-label="Back">
              <Link href="/dashboard/products" aria-label="Back">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="name">Name*</Label>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="price">Price*</Label>
                  <Input
                    type="number"
                    id="price"
                    placeholder={`${(<Currency />)}55`}
                    className="w-full"
                    key={fields.price.key}
                    name={fields.price.name}
                    defaultValue={
                      (data && data.price) || fields.price.initialValue
                    }
                  />
                  <p className="text-sm text-red-500">{fields.price.errors}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="inStock">Units in Stock*</Label>
                  <Input
                    type="number"
                    id="inStock"
                    placeholder={`40 units`}
                    className="w-full"
                    key={fields.inStock.key}
                    name={fields.inStock.name}
                    defaultValue={
                      (data && data.inStock) || fields.inStock.initialValue
                    }
                  />
                  <p className="text-sm text-red-500">{fields.price.errors}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="desc">Description*</Label>
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
              <Label htmlFor="isFeatured">Featured Product*</Label>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="size">Size (ml)*</Label>
                <Input
                  type="number"
                  id="size"
                  placeholder="ex: 30ml"
                  className="w-full"
                  key={fields.size.key}
                  name={fields.size.name}
                  defaultValue={(data && data.size) || fields.size.initialValue}
                />
                <p className="text-sm text-red-500">{fields.price.errors}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="name">Scent</Label>
                <Input
                  type="text"
                  id="scent"
                  key={fields.scent.key}
                  name={fields.scent.name}
                  defaultValue={
                    (data && data.scent) || fields.scent.initialValue
                  }
                  placeholder="Product Scent"
                  className="w-full"
                />
                <p className="text-sm text-red-500">{fields.name.errors}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="ingredients">Ingredients*</Label>
                <Textarea
                  id="ingredients"
                  placeholder="Product Ingredients"
                  className="w-full"
                  key={fields.ingredients.key}
                  name={fields.ingredients.name}
                  defaultValue={
                    (data && data.ingredients) ||
                    fields.ingredients.initialValue
                  }
                />
                <p className="text-sm text-red-500">
                  {fields.description.errors}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="how_to">How To Use*</Label>
                <Textarea
                  id="how_to"
                  placeholder="Product How To Use"
                  className="w-full"
                  key={fields.how_to.key}
                  name={fields.how_to.name}
                  defaultValue={
                    (data && data.how_to) || fields.how_to.initialValue
                  }
                />
                <p className="text-sm text-red-500">{fields.how_to.errors}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="type">Type*</Label>
                <Select
                  key={fields.type.key}
                  name={fields.type.name}
                  defaultValue={
                    (data && data.type) || fields.type.initialValue
                  }>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    {productTypes.map((c) => (
                      <SelectItem key={c.id} value={c.name}>
                        {c.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-red-500">{fields.type.errors}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="category">Category*</Label>
                <Select
                  key={fields.category.key}
                  name={fields.category.name}
                  defaultValue={
                    (data && data.category) || fields.category.initialValue
                  }>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(
                      (c) =>
                        c.name !== "all" && (
                          <SelectItem key={c.id} value={c.name}>
                            {c.title}
                          </SelectItem>
                        )
                    )}
                  </SelectContent>
                </Select>
                <p className="text-sm text-red-500">{fields.category.errors}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="status">Status*</Label>
              <Select
                key={fields.status.key}
                name={fields.status.name}
                defaultValue={
                  (data && data.status) || fields.status.initialValue
                }>
                <SelectTrigger id="status">
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
            <div className="flex flex-col md:flex-row gap-3">
              <ImageUploadWidget
                label="Product Images"
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
