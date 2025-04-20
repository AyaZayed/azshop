import React from "react";
import Link from "next/link";
import { categories } from "@/app/lib/categories";
import {
  NavigationMenuTrigger,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { SecondaryButton } from "../../SubmitButtons";
import ProductsNav from "./ProductsNav";

export default function CategoriesDropdown() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="bg-sf_background md:bg-transparent rounded-none hover:bg-sf_background hover:border-[1px] border-sf_primary">
        <Link
          className="border-none text-sf_sedcondary md:text-sf_primary font-secondary tracking-wider uppercase font-bold text-[14px] flex hover:border-[1px]"
          href="/products/all">
          Shop
        </Link>
      </NavigationMenuTrigger>
      <NavigationMenuContent className="px-10 py-6 text-sf_sedcondary bg-sf_background font-primary font-[600]">
        <div className="flex md:gap-20 items-center">
          <div className="flex flex-col justify-center gap-8">
            <ul>
              {categories.map(
                (c) =>
                  c.name !== "all" && (
                    <li key={c.id}>
                      <NavigationMenuLink
                        href={`/products/${c.name}`}
                        className="capitalize text-[18px] hover:text-sf_primary">
                        {c.title}
                      </NavigationMenuLink>
                    </li>
                  )
              )}
            </ul>
            <SecondaryButton
              label="Shop All"
              href="/products/all"
              style="font-secondary font-bold"
            />
          </div>
          <ProductsNav />
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
