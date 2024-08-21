"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ContactSchema } from "@/types/contact-schema";
import { FormSuccess } from "../auth/form-success";
import { FormError } from "../auth/form-error";
import { Textarea } from "../ui/textarea";
import { contactForm } from "@/server/actions/contact-form";

export const ContactForm = () => {
  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      nume: "",
      prenume: "",
      email: "",
      telefon: "",
      mesaj: "",
    },
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { execute, status } = useAction(contactForm, {
    onSuccess(data) {
      if (data?.error) setError(data.error);
      if (data?.success) setSuccess(data.success);
    },
  });

  const onSubmit = (values: z.infer<typeof ContactSchema>) => {
    execute(values);
  };
  return (
    <div className="mb-20">
      <div className="min-h-[400px] bg-secondary-foreground text-secondary px-8 lg:px-24 pt-40 pb-20">
        <p className="uppercase text-sm">
          <Link
            href={"/"}
            className="uppercase font-gothamXLight relative after:absolute after:w-0 after:h-px after:bottom-0 after:left-0 after:bg-primary hover:after:w-full after:transition-all after:duration-500"
          >
            Homepage
          </Link>{" "}
          / <span className="font-gothamThin">Contactați-ne</span>
        </p>
        <h1 className="text-6xl font-gothamBlack py-5">Contactați-ne</h1>
        <p className="text-2xl font-gothamXLight lg:w-1/2">
          Pe aceasta pagina puteti gasi date de contact Racebox precum si
          informatii despre compania noastră
        </p>
      </div>
      <div className="mx-8 lg:mx-24 my-20">
        <p className="text-6xl font-gothamBlack">Trimiteți-ne un mesaj</p>
        <div className="grid lg:grid-cols-3 gap-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="lg:col-span-2"
            >
              <div className="pt-10 space-y-4">
                <div className="grid grid-cols-2 gap-4 -my-2">
                  <FormField
                    control={form.control}
                    name="nume"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        {/* <FormLabel>Nume</FormLabel> */}
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Nume*"
                            type="text"
                            autoComplete="family-name"
                            className={`rounded-none border-2 text-lg px-4 py-6 ${
                              fieldState.error
                                ? "border-red-600"
                                : "border-primary"
                            } focus-visible:ring-0`}
                          />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="prenume"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        {/* <FormLabel>Nume</FormLabel> */}
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Prenume*"
                            type="text"
                            autoComplete="given-name"
                            className={`rounded-none border-2 text-lg px-4 py-6 ${
                              fieldState.error
                                ? "border-red-600"
                                : "border-primary"
                            } focus-visible:ring-0`}
                          />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Email*"
                          type="text"
                          autoComplete="email"
                          className={`rounded-none border-2 text-lg px-4 py-6 ${
                            fieldState.error
                              ? "border-red-600"
                              : "border-primary"
                          } focus-visible:ring-0`}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="telefon"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Număr de telefon*"
                          type="tel"
                          autoComplete="tel"
                          className={`rounded-none border-2 text-lg px-4 py-6 ${
                            fieldState.error
                              ? "border-red-600"
                              : "border-primary"
                          } focus-visible:ring-0`}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mesaj"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={3}
                          placeholder="Mesajul dumneavoastră"
                          className={`rounded-none border-2 text-lg px-4 py-2 ${
                            fieldState.error
                              ? "border-red-600"
                              : "border-primary"
                          } focus-visible:ring-0`}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormSuccess message={success} />
                <FormError message={error} />
              </div>
              <Button
                type="submit"
                className={cn(
                  "w-full my-2",
                  status === "executing" ? "animate-pulse" : ""
                )}
              >
                Trimiteți mesajul
              </Button>
            </form>
          </Form>
          <div className="relative">
            <div className="bg-secondary-foreground text-secondary lg:w-fit p-4 rounded-md mx-auto">
              <p className="font-gotham text-lg">Racebox Romania</p>
              <p className="font-gotham py-3 text-lg">
                Calea Ion Zăvoi 8, București 077190
              </p>
              <p className="">Contact: +40 (747) 859 859</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
