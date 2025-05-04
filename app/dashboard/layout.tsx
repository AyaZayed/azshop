import React from "react";
import DashboardHome from "../components/dashboard/DashboardHome";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import isAdmin from "@/utils/auth/isAdmin";

export const metadata = {
  title: "Dashboard",
};

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
  isAdmin();
  return (
    <main
      className={`w-full flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-nunito text-foreground`}>
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
