import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/server";
import { orderProduct } from "@/server/schema";
import { desc } from "drizzle-orm";
import Sales from "./sales";
import Earnings from "./earnings";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function Analytics() {
  const session = await auth();

  if (session?.user.role !== "admin") return redirect("/dashboard/settings");

  const totalOrders = await db.query.orderProduct.findMany({
    orderBy: [desc(orderProduct.id)],
    limit: 10,
    with: {
      order: { with: { user: true } },
      product: true,
      productVariants: { with: { variantImages: true } },
    },
  });

  if (totalOrders.length === 0)
    return (
      <Card>
        <CardHeader>
          <CardTitle>No orders yet</CardTitle>
        </CardHeader>
      </Card>
    );

  if (totalOrders)
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Analytics</CardTitle>
          <CardDescription>
            Check your sales, new customers and more
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col xl:flex-row gap-8">
          <Sales totalOrders={totalOrders} />
          <Earnings totalOrders={totalOrders} />
        </CardContent>
      </Card>
    );
}
