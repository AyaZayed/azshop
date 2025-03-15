import { checkout } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function CancelPayment() {
  return (
    <section className="w-full h-screen flex items-center justify-center font-sans p-4">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <XCircle className="w-12 h-12 rounded-full bg-sf_sedcondary/20 text-sf_primary p-2" />
          </div>

          <div className="mt-3 text-center sm:mt-5 w-full">
            <h3 className="text-lg leading-6 font-medium">Payment Cancelled</h3>
            <p className="mt-2 text-sm text-muted-foreground font-serif">
              Something went wrong with your payment. Please try again
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2">
              <Button
                asChild
                className="w-full text-sf_sedcondary bg-transparentborder-sf_sedcondary border-[1px] hover:bg-stone-200/50">
                <Link href="/">Back to Homepage</Link>
              </Button>
              <form action={checkout}>
                <Button
                  type="submit"
                  className="w-full bg-sf_sedcondary hover:bg-transparent hover:text-sf_sedcondary hover:border-sf_sedcondary hover:border-[1px]">
                  Try Again
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
