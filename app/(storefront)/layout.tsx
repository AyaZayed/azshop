import React from "react";

export default async function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="">
      <div className="">{children}</div>
    </main>
  );
}
