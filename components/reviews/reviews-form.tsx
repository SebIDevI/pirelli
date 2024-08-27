"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { useSearchParams } from "next/navigation";
import { reviewSchema } from "@/types/reviews-schema";
import { Textarea } from "../ui/textarea";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAction } from "next-safe-action/hooks";
import { addReview } from "@/server/actions/add-review";
import { toast } from "sonner";

export default function ReviewsForm() {
  const params = useSearchParams();
  const productID = Number(params.get("productID"));

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: "",
      productID,
    },
  });

  const { execute, status } = useAction(addReview, {
    onSuccess({ error, success }) {
      if (error) {
        toast.error(error);
      }
      if (success) {
        toast.success("Review adăugat");
        form.reset();
      }
    },
  });

  function onSubmit(values: z.infer<typeof reviewSchema>) {
    console.log("runningonsubmit");
    execute({
      comment: values.comment,
      rating: values.rating,
      productID,
    });
  }

  function testest() {
    toast.success("test");
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-full">
          <Button className="w-full text-lg" variant={"secondary"}>
            Adăugați un review
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review-ul dumneavoastră</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Cum ați descrie această anvelopă"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Acordați o notă</FormLabel>
                  <FormControl>
                    <Input
                      type="hidden"
                      placeholder="Notă în stele"
                      {...field}
                    />
                  </FormControl>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((value) => {
                      return (
                        <motion.div
                          className="relative cursor-pointer"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          key={value}
                        >
                          <Star
                            key={value}
                            onClick={() => {
                              form.setValue("rating", value);
                            }}
                            className={cn(
                              "text-primary bg-transparent transition-all duration-300 ease-in-out",
                              form.getValues("rating") >= value
                                ? "fill-primary"
                                : "fill-muted"
                            )}
                          />
                        </motion.div>
                      );
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              disabled={status === "executing"}
              type="submit"
            >
              {status === "executing"
                ? "Adăugăm review-ul..."
                : "Adăugați un review"}
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
