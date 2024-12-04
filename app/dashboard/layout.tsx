import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { Nunito } from "next/font/google";

const fontNunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect(
      "https://azshop.kinde.com/auth/cx/_:nav&m:login&psid:01939005172ea62adad5cce9f18e5f75"
    );
  }

  return (
    <main
      className={`w-full flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${fontNunito.className}`}>
      <DashboardHeader />
      <div className="py-8">{children}</div>
    </main>
  );
}
