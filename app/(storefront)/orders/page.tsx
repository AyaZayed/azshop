import { auth } from "@/app/lib/auth";
import { loginLink } from "@/utils/constants";
import { unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";

export default async function OrdersPage() {
  unstable_noStore();
  const { userId } = await auth();
  if (!userId) return redirect(loginLink);
  return <div>OrdersPage</div>;
}
