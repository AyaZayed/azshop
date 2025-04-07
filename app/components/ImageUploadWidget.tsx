"use client";
import { Button } from "@/components/ui/button";
/* eslint-disable @next/next/no-img-element */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type ImageUploadWidgetProps = {
  images: string[] | string; // Can be a single string or an array
  setImages: (images: string[] | string) => void;
  fieldsImages: {
    key: string;
    name: string;
    initialValue: string | (string | undefined)[] | undefined;
    errors: string[] | undefined;
  };
  multiple?: boolean; // Optional prop to toggle between single and multiple image upload
  label?: string;
};

export default function ImageUploadWidget({
  images,
  setImages,
  label = "Images",
  fieldsImages,
  multiple = true, // Default to multiple images
}: ImageUploadWidgetProps) {
  const [localPreviews, setLocalPreviews] = useState<string[]>(
    multiple
      ? Array.isArray(images)
        ? images
        : []
      : [typeof images === "string" ? images : ""]
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    const uploadedUrls: string[] = [];

    const allowedFormats = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/jpg",
    ];

    const validFiles = Array.from(files).filter((file) =>
      allowedFormats.includes(file.type)
    );

    // Upload to Cloudinary
    for (const file of Array.from(validFiles)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "le rub product");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dijc5luus/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await response.json();
      uploadedUrls.push(data.secure_url);
    }

    // Update state based on mode (single or multiple)
    if (multiple) {
      setLocalPreviews([...localPreviews, ...previews]);
      setImages([...(Array.isArray(images) ? images : []), ...uploadedUrls]);
    } else {
      setLocalPreviews([previews[0]]);
      setImages(uploadedUrls[0]); // Only store the first uploaded URL
    }
  };

  const handleRemoveImage = (index: number) => {
    if (multiple) {
      const updatedImages = (Array.isArray(images) ? images : []).filter(
        (_, i) => i !== index
      );
      setLocalPreviews(updatedImages);
      setImages(updatedImages);
    } else {
      setLocalPreviews([]);
      setImages("");
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-2 ">
        <Label htmlFor="upload">{label}</Label>
        <input
          type="hidden"
          value={Array.isArray(images) ? images.join(",") : images}
          key={fieldsImages.key}
          name={fieldsImages.name}
          defaultValue={
            Array.isArray(fieldsImages.initialValue)
              ? fieldsImages.initialValue.join(",")
              : (fieldsImages.initialValue as string)
          }
        />
        <Input
          type="file"
          multiple={multiple}
          onChange={handleFileChange}
          id="upload"
        />
      </div>
      {localPreviews.length > 0 && (
        <div className={`mt-2 flex ${multiple ? "gap-4" : ""}`}>
          {localPreviews.map((url, index) => (
            <div key={index} className={`relative w-[100px] h-[100px]`}>
              <Image
                src={url}
                alt="Uploaded image"
                className="rounded-md object-cover"
                layout="fill"
              />
              <Button
                className="absolute w-fit h-fit top-[-5px] right-[-5px] bg-red-500 rounded-full p-1"
                size={"icon"}
                onClick={() => handleRemoveImage(index)}>
                <XIcon className="h-3 w-3 text-white" />
              </Button>
            </div>
          ))}
        </div>
      )}
      <p className="text-sm text-red-500">{fieldsImages.errors}</p>
    </div>
  );
}
