import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SubmitButton from "@/app/components/SubmitButtons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { locations } from "@/app/lib/locations";
import ImageUploadWidget from "./ImageUploadWidget";

type bannerFormProps = {
  image: string | undefined;
  setImage: (image: string) => void;
  fields: any;
  data?: any;
  label: string;
};

export default function BannerForm({
  image,
  setImage,
  fields,
  data,
  label,
}: bannerFormProps) {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"outline"} size={"icon"} asChild>
              <Link href="/dashboard/banners">
                <ChevronLeft className="w-4 h-4" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Back to Banners</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Banner Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-3">
              <Label>Title</Label>
              <Input
                name={fields.title.name}
                key={fields.title.key}
                defaultValue={(data && data.title) || fields.title.initialValue}
                type="text"
                placeholder="Create title for Banner"
              />
              <p className="text-xs text-red-500">{fields.title.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="status">Location</Label>
              <Select
                key={fields.location.key}
                name={fields.location.name}
                defaultValue={
                  (data && data.location) || fields.location.initialValue
                }>
                <SelectTrigger>
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((c) => (
                    <SelectItem key={c.id} value={c.name}>
                      {c.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-red-500">{fields.location.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <ImageUploadWidget
                images={image}
                setImages={setImage}
                fieldsImages={{
                  key: fields.images.key as string,
                  name: fields.images.name,
                  initialValue:
                    (data && data.images) || fields.images.initialValue,
                  errors: fields.images.errors,
                }}
                multiple={false}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton label={label} variant={"default"} />
        </CardFooter>
      </Card>
    </>
  );
}
