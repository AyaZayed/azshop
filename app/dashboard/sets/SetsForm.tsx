"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { productSchema } from "@/lib/zodSchemas";
import { SubmissionResult, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useFormState } from "react-dom";
import ImageUploadWidget from "../products/ImageUploadWidget";
import SubmitButton from "@/app/components/SubmitButtons";
import { Textarea } from "@/components/ui/textarea";
import { productTypes } from "@/lib/productTypes";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { categories } from "@/lib/categories";
import { Product } from "@prisma/client";

interface Props {
  products: {
    id: string;
    name: string;
  }[];
  currency: string;
  formAction: (
    prevState: unknown,
    formData: FormData
  ) => Promise<SubmissionResult<string[]>>;
  data?: Product;
  setProducts?: string[];
}

export default function SetsForm({
  products,
  currency,
  data,
  formAction,
  setProducts,
}: Props) {
  const [images, setImages] = useState<string[] | string>(data?.images || []);
  const [lastResult, action] = useFormState(formAction, undefined);
  const [selectedProducts, setSelectedProducts] = useState<string[]>(
    setProducts || []
  );

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

  const handleSelection = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  return (
    <form id={form.id} action={action}>
      {selectedProducts.map((id) => (
        <input key={id} type="hidden" name="productIds" value={id} />
      ))}
      <input type="hidden" name="setId" value={data?.id} />

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
          <CardTitle className="text-xxl font-semibold tracking-tight">
            {data ? "Edit Set" : "New Set"}
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
                  defaultValue={data ? data.name : fields.name.initialValue}
                  placeholder="Set Name"
                  className="w-full capitalize"
                />
                <p className="text-sm text-red-500">{fields.name.errors}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="price">Price*</Label>
                  <Input
                    type="number"
                    id="price"
                    placeholder={`${currency}55`}
                    className="w-full"
                    key={fields.price.key}
                    name={fields.price.name}
                    defaultValue={data ? data.price : fields.price.initialValue}
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
                      data ? data.inStock : fields.inStock.initialValue
                    }
                  />
                  <p className="text-sm text-red-500">{fields.price.errors}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="desc">Description*</Label>
                <Textarea
                  id="desc"
                  placeholder="Set Description"
                  className="w-full h-full capitalize"
                  key={fields.description.key}
                  name={fields.description.name}
                  defaultValue={
                    data ? data.description : fields.description.initialValue
                  }
                />
                <p className="text-sm text-red-500">
                  {fields.description.errors}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="products">Products*</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full justify-between">
                        Select Products
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full flex flex-col items-start">
                      {products.map((product) => (
                        <DropdownMenuCheckboxItem
                          key={product.id}
                          className="w-full text-start"
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={() => handleSelection(product.id)}>
                          {product.name}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <p className="text-sm text-red-500">
                    {fields.productsId.errors}
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="isFeatured">Featured Set</Label>
                  <Switch
                    id="isFeatured"
                    key={fields.isFeatured.key}
                    name={fields.isFeatured.name}
                    checked={
                      data
                        ? data.isFeatured
                        : fields.isFeatured.initialValue?.toString() === "true"
                    }
                  />
                  <p className="text-sm text-red-500">
                    {fields.isFeatured.errors}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <div className="flex flex-col gap-3">
                <Label htmlFor="type">Type*</Label>
                <Select
                  key={fields.type.key}
                  name={fields.type.name}
                  defaultValue={data ? data.type : fields.type.initialValue}>
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
                <Label htmlFor="status">Status*</Label>
                <Select
                  key={fields.status.key}
                  name={fields.status.name}
                  defaultValue={
                    data ? data.status : fields.status.initialValue
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
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <ImageUploadWidget
                label="Set Images"
                images={images}
                setImages={setImages}
                fieldsImages={{
                  key: fields.images.key as string,
                  name: fields.images.name,
                  initialValue: data ? data.images : fields.images.initialValue,
                  errors: fields.images.errors,
                }}
              />
            </div>
            <SubmitButton label="Save" />
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
