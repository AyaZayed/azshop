"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

interface buttonProps {
  label: string;
  variant:
    | "secondary"
    | "destructive"
    | "default"
    | "outline"
    | "ghost"
    | "link"
    | null
    | undefined;
}
export default function SubmitButton({ label, variant }: buttonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="w-fit" variant={variant}>
          <Loader2 className="mr-2" />
          Please wait
        </Button>
      ) : (
        <Button className="w-fit" variant={variant} type="submit">
          {label}
        </Button>
      )}
    </>
  );
}
