"use client";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PaymentSuccess() {
  //   redirect after a second
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 1000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [router]);

  return (
    <section className="w-full h-screen flex items-center justify-center font-sans p-4">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <CheckCircle className="w-12 h-12 rounded-full bg-green-100 text-green-500 p-2" />
          </div>

          <div className="mt-3 text-center sm:mt-5 w-full">
            <h3 className="text-lg leading-6 font-medium">
              Successful Payment
            </h3>
            <p className="mt-5 text-sm text-muted-foreground font-serif">
              Your payment has been processed successfully. We hope you enjoy
              our products.
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
}
