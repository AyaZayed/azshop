import { WavesSVG } from "@/app/components/SVGs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Product } from "@prisma/client";
import React from "react";

export default function ProductAccordions({ product }: { product: Product }) {
  return (
    <section className="p-6 w-full md:px-24 mx-auto flex flex-col items-center">
      <WavesSVG className="fill-sf_sedcondary" width={100} height={100} />
      <h1 className="text-5xl font-primary font-bold mb-5 text-center">
        Details
      </h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="uppercase text-base">
            Ingredients
          </AccordionTrigger>
          <AccordionContent>{product.ingredients}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="uppercase text-base">
            How To Use
          </AccordionTrigger>
          <AccordionContent>{product.how_to}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="uppercase text-base">
            Scent
          </AccordionTrigger>
          <AccordionContent>{product.scent}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="uppercase text-base">
            Size
          </AccordionTrigger>
          <AccordionContent>{product.size}ml</AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
