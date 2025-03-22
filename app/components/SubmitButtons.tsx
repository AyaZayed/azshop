"use client";
import { Button } from "@/components/ui/button";
import { currency, loginLink } from "@/utils/constants";
import { Loader2, LoaderPinwheel, XCircleIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { useFormStatus } from "react-dom";
import { decreaseItemQuantity, increaseItemQuantity } from "../actions";

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
  href?: string;
  style?: string;
  total?: number;
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

export function PrimaryButton({ label, href, style }: buttonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          disabled
          className={`px-6 border-[1px] border-sf_primary bg-sf_background text-sf_primary uppercase hover:bg-sf_primary hover:text-sf_background rounded-none ${style}`}>
          <Loader2 className="mr-2" />
          Please wait
        </Button>
      ) : (
        <Link href={href || ""}>
          <Button
            type="submit"
            className={`px-6 border-[1px] border-sf_primary bg-sf_background text-sf_primary uppercase hover:bg-sf_primary hover:text-sf_background rounded-none ${style}`}>
            {label}
          </Button>
        </Link>
      )}
    </>
  );
}

export function SecondaryButton({ label, href, style }: buttonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          disabled
          className={`font-secondary px-6 border-[1px] border-sf_sedcondary bg-sf_background text-sf_sedcondary uppercase hover:bg-sf_sedcondary hover:text-sf_background rounded-none ${style}`}>
          <Loader2 className="mr-2" />
          Please wait
        </Button>
      ) : (
        <Link href={href || ""} className="w-full h-full" passHref>
          <Button
            type="submit"
            className={`font-secondary px-6 border-[1px] border-sf_sedcondary bg-sf_background text-sf_sedcondary uppercase hover:bg-sf_sedcondary hover:text-sf_background rounded-none ${style}`}>
            {label}
          </Button>
        </Link>
      )}
    </>
  );
}

export function AddToCartButton({ style, label }: buttonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className={`${style}`}>
          <Loader2 className="mr-2" />
          Please wait
        </Button>
      ) : (
        <Link href="/cart" className="w-full h-full" passHref>
          <Button type="submit" className={`${style}`}>
            {label}
          </Button>
        </Link>
      )}
    </>
  );
}

export function DeleteItemButton({ style, label }: buttonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <button
          type="submit"
          disabled
          className={`flex gap-2 opacity-50 ${style}`}>
          <Loader2 />
          Please wait
        </button>
      ) : (
        <button type="submit" className={`${style}`}>
          {label}
        </button>
      )}
    </>
  );
}

export function QuantityButtons({
  itemId,
  quantity,
}: {
  itemId: string;
  quantity: number;
}) {
  const { pending } = useFormStatus();

  return (
    <>
      <form action={decreaseItemQuantity}>
        <input type="hidden" name="productId" value={itemId} />
        <Button
          disabled={quantity === 1}
          size={"icon"}
          className="bg-transparent text-[20px] font-bold text-sf_sedcondary border-2 border-sf_sedcondary rounded-full w-7 h-7 hover:bg-sf_sedcondary hover:text-sf_background">
          -
        </Button>
      </form>
      <span>
        {pending ? <LoaderPinwheel className="animate-spin" /> : quantity}
      </span>
      <form action={increaseItemQuantity}>
        <input type="hidden" name="productId" value={itemId} />
        <Button
          size={"icon"}
          className="bg-transparent text-[20px] font-bold text-sf_sedcondary border-2 border-sf_sedcondary rounded-full w-7 h-7 hover:bg-sf_sedcondary hover:text-sf_background">
          +
        </Button>
      </form>
    </>
  );
}

export function CheckoutButton({ label, href, style, total }: buttonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          disabled
          className={`px-6 border-[1px] bg-sf_primary text-sf_background hover:bg-sf_background hover:text-sf_primary border-sf_primary hover:border-[1px] uppercase rounded-none ${style}`}>
          <Loader2 className="mr-2" />
          Please wait
        </Button>
      ) : (
        <Link href={href || ""}>
          <Button
            type="submit"
            className={`flex justify-between px-6 bg-sf_primary text-sf_background hover:bg-sf_background hover:text-sf_primary border-sf_primary hover:border-[1px] uppercase rounded-none ${style}`}>
            <span>{label}</span>
            {total && (
              <span>
                {currency}
                {total}
              </span>
            )}
          </Button>
        </Link>
      )}
    </>
  );
}
