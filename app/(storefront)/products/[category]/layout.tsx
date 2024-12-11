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
    <div className="flex flex-col gap-12 pt-40 md:pt-44 p-6 md:p-24 items-center text-center">
      <ProductsHeader category={category} />
      <ul className="flex gap-8">
        {categories.map((c) => (
          <li key={c.id}>
            <Link
              href={`/products/${c.name}`}
              className={`font-serif uppercase font-bold text-[13px] flex gap-2 hover:border-[1px] border-sf_sedcondary py-2 px-4 ${
                category === c.name && "border-[1px]"
              }`}>
              {c.icon && (
                <img src={c.icon} alt={c.title} width={15} height={15} />
              )}
              <span className={`${c.name !== "all" && "hidden md:block"}`}>
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
