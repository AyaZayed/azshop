"use client";

import { usePathname } from "next/navigation";

export default function DashboardHome({
  stats,
  sales,
  transactions,
}: {
  stats: React.ReactNode;
  sales: React.ReactNode;
  transactions: React.ReactNode;
}) {
  const pathname = usePathname();

  // Only render @home when the path is '/dashboard'
  if (pathname !== "/dashboard") return null;
  return (
    <>
      {stats}
      <div className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {transactions}
        {sales}
      </div>
    </>
  );
}
