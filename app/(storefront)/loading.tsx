import { Loader } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Loader className="animate-spin h-12 w-12 text-sf_primary" />
    </div>
  );
}
