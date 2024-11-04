import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function BannerPage() {
  return (
    <>
      <div className="flex items-center justify-end">
        <Button asChild className="flex gap-x-2">
          <Link href="/dashboard/banner/new">
            <PlusCircle className="h-8 w-8" />
          </Link>
        </Button>
      </div>
    </>
  );
}
