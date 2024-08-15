import { db } from "@/server";
import placeholder from "@/public/placeholder-image.svg";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Products() {
  const session = await auth();

  if (session?.user.role !== "admin") return redirect("/dashboard/settings");

  const products = await db.query.products.findMany({
    with: {
      productVariants: { with: { variantImages: true, variantTags: true } },
    },
    orderBy: (products, { desc }) => [desc(products.id)],
  });
  if (!products) throw new Error("Products not found");

  const dataTable = products.map((product) => {
    return {
      id: product.id,
      title: product.title,
      variants: product.productVariants,
      image:
        product.productVariants[0] &&
        product.productVariants[0].variantImages[0]
          ? product.productVariants[0].variantImages[0].url
          : placeholder.src,
    };
  });
  if (!dataTable) throw new Error("Data not found");
  return (
    <div>
      <DataTable columns={columns} data={dataTable} />
    </div>
  );
}
