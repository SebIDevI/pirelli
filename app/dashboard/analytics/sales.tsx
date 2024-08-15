import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TotalOrders } from "@/lib/infer-type";
import Image from "next/image";

import placeholderUserFinal from "@/public/placeholder-final.png";

export default function Sales({ totalOrders }: { totalOrders: TotalOrders[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Sales</CardTitle>
        <CardDescription>Here are your recent sales</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Image</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {totalOrders.map(
              ({ order, product, quantity, productVariants }) => (
                <TableRow key={order.id}>
                  <TableCell>
                    {order.user.image && order.user.name ? (
                      <div className="flex gap-2 min-w-32 items-center">
                        <Image
                          src={order.user.image}
                          alt={order.user.name}
                          width={25}
                          height={25}
                          className="rounded-full"
                        />
                        <p className="text-xs font-medium">{order.user.name}</p>
                      </div>
                    ) : (
                      <div className="flex gap-2 items-center">
                        <Image
                          src={placeholderUserFinal}
                          alt={"user not found"}
                          width={25}
                          height={25}
                          className="rounded-full"
                        />
                        <p className="text-xs font-medium">User not found</p>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="min-w-44">
                    {product.title}{" "}
                    <span className="font-bold">{productVariants.size}</span>
                  </TableCell>
                  <TableCell className="min-w-32">
                    {productVariants.price} RON
                  </TableCell>
                  <TableCell>{quantity}</TableCell>
                  <TableCell>
                    <Image
                      src={productVariants.variantImages[0].url}
                      alt={product.title}
                      width={48}
                      height={48}
                      className="rounded-md"
                    />
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
