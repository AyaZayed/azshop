"use client";
/* eslint-disable @next/next/no-img-element */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type ImageUploadWidgetProps = {
  images: string[];
  setImages: (images: string[]) => void;
  fieldsImages: {
    key: string;
    name: string;
    initialValue: [string, ...string[]];
    errors: string[];
  };
};
export default function ImageUploadWidget({
  images,
  setImages,
  fieldsImages,
}: ImageUploadWidgetProps) {
  const [localPreviews, setLocalPreviews] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Generate previews
    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setLocalPreviews(previews);

    // Upload to Cloudinary
    const uploadedUrls = [];
    for (const file of files) {
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

    setUploadedImages(uploadedUrls); // Permanent Cloudinary links
    setImages([...images, ...uploadedUrls]);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setLocalPreviews(updatedImages);
    setImages(updatedImages); // Update the parent state
  };

  return (
    <>
      <Label htmlFor="upload">Images</Label>
      <input
        type="hidden"
        value={images}
        key={fieldsImages.key}
        name={fieldsImages.name}
        defaultValue={fieldsImages.initialValue as [string, ...string[]]}
      />
      <Input type="file" multiple onChange={handleFileChange} id="upload" />
      {localPreviews.length > 0 && (
        <div className="flex gap-2 relative h-[100px] w-[100px]">
          {localPreviews.map((url, index) => (
            <div key={index}>
              <Image
                src={url}
                alt="product image"
                className="rounded-md object-cover"
                layout="fill"
              />
              <button
                type="button"
                className="absolute top-[-5px] right-[-5px] bg-red-500 rounded-full p-1"
                onClick={() => {
                  handleRemoveImage(index);
                }}>
                <XIcon className="h-3 w-3 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
      <p className="text-sm text-red-500">{fieldsImages.errors}</p>
    </>
  );
}
