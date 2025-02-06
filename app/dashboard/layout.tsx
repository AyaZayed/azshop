import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { loginLink } from "@/utils/constants";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect(loginLink);
  }

  return (
    <main
      className={`w-full flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-nunito`}>
      <DashboardHeader />
      <div className="py-8">{children}</div>
    </main>
  );
}
