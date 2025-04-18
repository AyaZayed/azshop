/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { categories } from "@/app/lib/categories";
import { revalidatePath, unstable_noStore } from "next/cache";
import ProductsHeader from "@/app/components/storefront/ProductsHeader";

type Category = "all" | "sunscreen" | "repair" | "sets" | "gifts";

export default function ProductsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { category: Category };
}) {
  const category = params.category;
  unstable_noStore();
  revalidatePath(`/products/${category}`);
  return (
    <div className="flex flex-col gap-4 md:gap-6 p-6 md:p-10 pt-32 md:pt-40 items-center text-center">
      <ProductsHeader category={category} />
      <ul className="flex gap-4 md:gap-8 justify-center items-center">
        {categories.map((c) => (
          <li key={c.id}>
            <Link
              href={`/products/${c.name}`}
              className={`font-secondary tracking-wider uppercase font-bold text-[13px] flex md:p-2 md:px-4 hover:border-[1px] border-sf_sedcondary align-middle ${
                category === c.name && "border-[1px]"
              } ${c.name === "all" && "p-2"}`}>
              {c.icon && (
                <div className="w-7 h-7 md:w-6 md:h-6 flex flex-col items-center justify-center">
                  <img src={c.icon} alt={c.title} width={20} height={20} />
                </div>
              )}
              <span
                className={`${c.name !== "all" && "hidden sm:block sm:ml-2"}`}>
                {c.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}
