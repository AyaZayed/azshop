"use client";

import { usePathname } from "next/navigation";

export default function HomeWrapper({ home }: { home: React.ReactNode }) {
  const pathname = usePathname();

  // Only render @home when the path is '/'
  if (pathname !== "/") return null;

  return <>{home}</>;
}
