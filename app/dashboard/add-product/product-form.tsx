/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useForm } from "react-hook-form";
import { ProductSchema, zProductSchema } from "@/types/product-schema";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Tiptap from "./tiptap";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { createProduct } from "@/server/actions/create-product";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { getProduct } from "@/server/actions/get-product";
import { useEffect } from "react";
import VariantImages from "../products/variant-images";
import { ProductImages } from "@/lib/infer-type";

const toastId = toast("c-e toaster");

export default function ProductForm() {
  const form = useForm<zProductSchema>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      variantImages: [],
      title: "",
      description: "",
      smalldesc: "",
    },
    mode: "onChange",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const editMode = searchParams.get("id");

  const checkProduct = async (id: number) => {
    if (editMode) {
      const data = await getProduct(id);

      if (data.error) {
        toast.error(data.error);
        router.push("/dashboard/products");
        return;
      }
      if (data.success) {
        const id = parseInt(editMode);
        form.setValue("title", data.success.title);
        form.setValue("description", data.success.description);
        form.setValue("smalldesc", data.success.smalldesc);
        form.setValue(
          "variantImages",
          data.success.productImages.map((img) => ({
            name: img.name,
            size: img.size,
            url: img.url,
          }))
        );
      }
    }
  };

  useEffect(() => {
    if (editMode) {
      checkProduct(parseInt(editMode));
    }
  }, []);

  const { execute, status } = useAction(createProduct, {
    onSuccess: (data) => {
      if (data?.error) {
        toast.error(data.error, { id: toastId });
      }
      if (data?.success) {
        router.push("/dashboard/products");
        toast.success(data.success, { id: toastId });
      }
    },
    onExecute: (data) => {
      if (editMode) toast.loading("Editing product", { id: toastId });
      else toast.loading("Creating product", { id: toastId });
    },
  });

  async function onSubmit(values: zProductSchema) {
    execute(values);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{editMode ? "Edit Product" : "Create Product"}</CardTitle>
        <CardDescription>
          {editMode
            ? "Make changes to existing product"
            : "Add a brand new product"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product title</FormLabel>
                  <FormControl>
                    <Input placeholder="Saekdong Stripe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="smalldesc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Small Description</FormLabel>
                  <FormControl>
                    <Input placeholder="SmallDesc" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Tiptap val={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <VariantImages />

            <Button
              type="submit"
              className="w-full"
              disabled={
                status === "executing" ||
                !form.formState.isValid ||
                !form.formState.isDirty
              }
            >
              {editMode ? "Save changes" : "Create product"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
