import { db } from "@/server";
import { auth } from "@/server/auth";
import { orders } from "@/server/schema";
import { desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDistance, subMinutes } from "date-fns";
import { ro } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 1;

export default async function Page() {
  const user = await auth();
  if (!user) {
    redirect("/login");
  }

  const userOrders = await db.query.orders.findMany({
    orderBy: [desc(orders.id)],
    where: eq(orders.userID, user.user.id),
    with: {
      orderProduct: {
        with: {
          product: { with: { productImages: true } },
          productVariants: true,
          order: true,
        },
      },
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comenzile dvs.</CardTitle>
        <CardDescription>Verificați statusul comenzilor</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>O listă cu facturile recente.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Numărul comenzii</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Creată</TableHead>
              <TableHead>Acțiuni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell className="min-w-36">{order.total} RON</TableCell>
                <TableCell className="min-w-32">
                  <Badge
                    className={cn(
                      order.status === "succeeded"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-yellow-700 hover:bg-yellow-800",
                      ""
                    )}
                  >
                    {order.status === "succeeded" ? "succes" : "în așteptare"}
                  </Badge>
                </TableCell>
                <TableCell className="min-w-36">
                  {formatDistance(subMinutes(order.created!, 0), new Date(), {
                    addSuffix: true,
                    locale: ro,
                  })}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant={"ghost"}>
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <DialogTrigger>
                            <Button className="w-full" variant={"ghost"}>
                              Vezi detalii
                            </Button>
                          </DialogTrigger>
                        </DropdownMenuItem>
                        {order.receiptURL ? (
                          <DropdownMenuItem>
                            <Button
                              asChild
                              className="w-full"
                              variant={"ghost"}
                            >
                              <Link href={order.receiptURL} target="_blank">
                                Descarcă chitanța
                              </Link>
                            </Button>
                          </DropdownMenuItem>
                        ) : null}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent className="rounded-md max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>
                          Detaliile comenzii #{order.id}
                        </DialogTitle>
                        <DialogDescription>
                          Comanda dvs. valorează {order.total} RON
                        </DialogDescription>
                      </DialogHeader>
                      <Card className="overflow-auto p-2 flex-col gap-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Imagine</TableHead>
                              <TableHead>Preț</TableHead>
                              <TableHead>Produs</TableHead>
                              <TableHead>Mărime</TableHead>
                              <TableHead>Cantitate</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {order.orderProduct.map(
                              ({ product, productVariants, quantity }) => (
                                <TableRow key={product.id}>
                                  <TableCell>
                                    <Image
                                      src={product.productImages[0].url}
                                      alt={product.title}
                                      width={48}
                                      height={48}
                                    />
                                  </TableCell>
                                  <TableCell className="min-w-28">
                                    {productVariants.price} RON
                                  </TableCell>
                                  <TableCell className="min-w-44">
                                    {product.title}
                                  </TableCell>
                                  <TableCell>
                                    {productVariants.productType}
                                  </TableCell>
                                  <TableCell>{quantity}</TableCell>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </Card>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
