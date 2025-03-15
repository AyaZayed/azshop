"use client";
import { Button } from "@/components/ui/button";
import { loginLink } from "@/utils/constants";
import { Loader2, XCircleIcon } from "lucide-react";
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
export function SubmitButton({ label, variant, userId }: buttonProps) {
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

export function AddToCartButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          disabled
          className="px-6 border-[1px] border-sf_sedcondary bg-sf_background text-sf_sedcondary uppercase hover:bg-sf_sedcondary hover:text-sf_background rounded-none">
          <Loader2 className="mr-2" />
          Please wait
        </Button>
      ) : (
        <Button
          type="submit"
          className="px-6 border-[1px] border-sf_sedcondary bg-sf_background text-sf_sedcondary uppercase hover:bg-sf_sedcondary hover:text-sf_background rounded-none">
          Add to Cart
        </Button>
      )}
    </>
  );
}

export function DeleteItemButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <button type="submit" disabled className="opacity-5">
          <XCircleIcon />
        </button>
      ) : (
        <button type="submit">
          <XCircleIcon />
        </button>
      )}
    </>
  );
}

export function CheckoutButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          disabled
          className="px-6 border-[1px] border-sf_sedcondary bg-sf_background text-sf_sedcondary uppercase hover:bg-sf_sedcondary hover:text-sf_background rounded-none">
          <Loader2 className="mr-2" />
          Please wait
        </Button>
      ) : (
        <Button
          type="submit"
          className="px-6 border-[1px] border-sf_sedcondary bg-sf_background text-sf_sedcondary uppercase hover:bg-sf_sedcondary hover:text-sf_background rounded-none">
          Checkout
        </Button>
      )}
    </>
  );
}
