/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ProductImages, VariantsWithImagesTags } from "@/lib/infer-type";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { VariantSchema } from "@/types/variant-schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputTags } from "./input-tags";
import VariantImages from "./variant-images";
import { useAction } from "next-safe-action/hooks";
import { createVariant } from "@/server/actions/create-variant";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { deleteVariant } from "@/server/actions/delete-variant";
import { Switch } from "@/components/ui/switch";

const toastId = toast("c-e toaster");
export const ProductVariant = ({
  editMode,
  productID,
  variant,
  children,
}: {
  editMode: boolean;
  productID?: number;
  variant?: VariantsWithImagesTags;
  children: React.ReactNode;
}) => {
  const form = useForm<z.infer<typeof VariantSchema>>({
    resolver: zodResolver(VariantSchema),
    defaultValues: {
      tags: [],
      // variantImages: [],
      editMode,
      id: undefined,
      productID,
      productType: "",
      price: 0,
      pirelliId: "",
      ean: "",
      eprellLink: "",
      fullSize: "",
      lssc: "",
      rr: "",
      wg: "",
      prestige: false,
      protectieRIM: false,
      size: "",
    },
    mode: "onChange",
  });

  const [open, setOpen] = useState(false);

  const setEdit = () => {
    if (!editMode) {
      form.reset();
      return;
    }
    if (editMode && variant) {
      form.setValue("editMode", true);
      form.setValue("id", variant.id);
      form.setValue("productID", variant.productID);
      form.setValue("productType", variant.productType);
      form.setValue(
        "tags",
        variant.variantTags.map((tag) => tag.tag)
      );
      // form.setValue(
      //   "variantImages",
      //   images.map((img) => ({
      //     name: img.name,
      //     size: img.size,
      //     url: img.url,
      //   }))
      // );
      form.setValue("price", variant.price);
      form.setValue("pirelliId", variant.pirelliId);
      form.setValue("ean", variant.ean);
      form.setValue("eprellLink", variant.eprellLink);
      form.setValue("fullSize", variant.fullSize);
      form.setValue("lssc", variant.lssc);
      form.setValue("rr", variant.rr);
      form.setValue("wg", variant.wg);
      form.setValue("prestige", variant.prestige);
      form.setValue("protectieRIM", variant.protectieRIM);
      form.setValue("size", variant.size);
    }
  };

  useEffect(() => {
    setEdit();
  }, []);

  const { execute, status } = useAction(createVariant, {
    onExecute() {
      toast.loading("Creating variant...", { id: toastId });
      setOpen(false);
    },
    onSuccess(data) {
      if (data?.error) {
        toast.error(data.error, { id: toastId });
      }
      if (data?.success) {
        toast.success(data.success, { id: toastId });
      }
    },
  });

  const variantAction = useAction(deleteVariant, {
    onExecute() {
      toast.loading("Deleting variant...", { id: toastId });
      setOpen(false);
    },
    onSuccess(data) {
      if (data?.error) {
        toast.error(data.error, { id: toastId });
      }
      if (data?.success) {
        toast.success(data.success, { id: toastId });
      }
    },
  });

  function onSubmit(values: z.infer<typeof VariantSchema>) {
    execute(values);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="lg:max-w-screen-lg overflow-y-scroll max-h-[860px] rounded-md">
        <DialogHeader>
          <DialogTitle>{editMode ? "Edit" : "Create"} your variant</DialogTitle>
          <DialogDescription>
            Manage your product variants here. You can add tags, images, and
            more.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="productType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Pick a title for your variant"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant tags</FormLabel>
                  <FormControl>
                    <InputTags {...field} onChange={(e) => field.onChange(e)} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ean"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>EAN code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the EAN code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eprellLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Eprell Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://eprel..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full size</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="235/55R19 105H XL P7-CNT(MO) elt"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <Input placeholder="235/55R19" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pirelliId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pirelli ID</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-start gap-4 flex-wrap">
              <FormField
                control={form.control}
                name="prestige"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormLabel className="pt-2">Prestige</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="protectieRIM"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormLabel className="pt-2">Protectie RIM</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="rr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RR</FormLabel>
                  <FormControl>
                    <Input placeholder="RR" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="wg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WG</FormLabel>
                  <FormControl>
                    <Input placeholder="WG" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lssc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>L.S / S.C</FormLabel>
                  <FormControl>
                    <Input placeholder="- / LS / SC" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product price</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <span className="h-10 uppercase font-bold text-xs px-3 rounded-md bg-slate-200/80 flex items-center">
                        ron
                      </span>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Your price in RON"
                        step="0.01"
                        min={0}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <VariantImages /> */}
            <div className="flex gap-4 items-center justify-center">
              {editMode && variant && (
                <Button
                  variant={"destructive"}
                  type="button"
                  disabled={variantAction.status === "executing"}
                  onClick={(e) => {
                    e.preventDefault();
                    variantAction.execute({ id: variant.id });
                  }}
                >
                  Delete variant
                </Button>
              )}
              <Button
                type="submit"
                disabled={
                  status === "executing" ||
                  !form.formState.isValid ||
                  !form.formState.isDirty
                }
              >
                {editMode ? "Update variant" : "Create variant"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
