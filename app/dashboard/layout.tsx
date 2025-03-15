"use client";
import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
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
  const path = usePathname();

  return (
    <main
      className={`w-full flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-nunito`}>
      <DashboardHeader />
      <div className="py-8">
        {path === "/dashboard" && (
          <>
            {stats}
            <div className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
              {transactions}
              {sales}
            </div>
          </>
        )}
        {children}
      </div>
    </main>
  );
}
