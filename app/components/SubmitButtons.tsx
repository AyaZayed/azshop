"use client";
import { Button } from "@/components/ui/button";
import { loginLink } from "@/utils/constants";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { useFormStatus } from "react-dom";

interface buttonProps {
  label: string;
  variant?:
    | "secondary"
    | "destructive"
    | "default"
    | "outline"
    | "ghost"
    | "link"
    | null
    | undefined;
  userId?: string;
}
export default function SubmitButton({ label, variant, userId }: buttonProps) {
  const { pending } = useFormStatus();
  function auth() {
    if (!userId) {
      return redirect(loginLink);
    }
  }
  return (
    <>
      {pending ? (
        <Button
          onClick={() => auth()}
          disabled
          className="w-fit"
          variant={variant}>
          <Loader2 className="mr-2" />
          Please wait
        </Button>
      ) : (
        <Button
          onClick={() => auth()}
          className="w-fit"
          variant={variant || "default"}
          type="submit">
          {label}
        </Button>
      )}
    </>
  );
}
