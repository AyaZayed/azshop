import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import { auth } from "../lib/auth";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import DashboardHome from "../components/dashboard/DashboardHome";
import { unstable_noStore } from "next/cache";

export default async function DashboardLayout({
  stats,
  sales,
  transactions,
  children,
}: {
  stats: React.ReactNode;
  sales: React.ReactNode;
  transactions: React.ReactNode;
  children: React.ReactNode;
}) {
  unstable_noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect("/");
  }
  return (
    <main
      className={`w-full flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-nunito`}>
      <DashboardHeader />
      <div className="py-8">
        <DashboardHome
          stats={stats}
          sales={sales}
          transactions={transactions}
        />
        {children}
      </div>
    </main>
  );
}
