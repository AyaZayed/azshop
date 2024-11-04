import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return (
      <main className="w-full h-screen flex flex-col items-center justify-center">
        <Button asChild>
          <LoginLink>Log In</LoginLink>
        </Button>
      </main>
    );
  }

  return (
    <main className="w-full flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <DashboardHeader />
      <div className="py-8">{children}</div>
    </main>
  );
}
