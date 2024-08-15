"use client";

import React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useTheme } from "next-themes";

const FormSchema = z.object({
  material: z.string({
    required_error: "⚠️",
  }),
  season: z.string({
    required_error: "⚠️",
  }),
  label: z.string({
    required_error: "⚠️",
  }),
});

const select = [
  {
    name: "sezon",
    title: "Sezon",
    subselect: ["Iarnă", "Vară", "all season"],
  },
  {
    name: "fam",
    title: "Familie",
    subselect: ["P ZERO™", "CINTURATO™", "SCORPION™", "SOTTOZERO™"],
  },
  {
    name: "tech",
    title: "Tehnologie",
    subselect: [
      "PNCS™",
      "RUN FLAT",
      "SEAL INSIDE™",
      "ANVELOPE CYBER™",
      "ELECT™",
      "ANVELOPE CU MARCAJ",
    ],
  },
];

export default function Section2() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("submitted");
  }

  const theme = useTheme();

  return (
    <div
      className="lcontainer py-20 px-6 md:px-12"
      style={
        theme.theme === "dark"
          ? {
              background:
                "repeating-linear-gradient(45deg,#0e0e0e,#0e0e0e 50%,#000000 50%,#000000 100%)",
            }
          : {
              background:
                "repeating-linear-gradient(45deg,#f0f0f0,#f0f0f0 50%,#ffffff 50%,#ffffff 100%)",
            }
      }
    >
      <h2 className="font-gotham text-secondary-foreground text-center uppercase text-4xl pb-16">
        Găsește roata care ți se potrivește
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 items-center justify-center"
        >
          {select.map((types, index) => (
            <FormField
              key={index}
              control={form.control}
              name={types.name as "material" | "season" | "label"}
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full text-primary text-lg uppercase font-gotham border-primary rounded-none px-12 py-8 hover:text-primary-foreground hover:bg-primary transition">
                        <div className="flex items-center gap-4">
                          <FormMessage />
                          <SelectValue placeholder={types.title} />
                        </div>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border-primary text-primary rounded-none text-lg uppercase font-gotham">
                      {types.subselect.map((type, id) => (
                        <SelectItem
                          key={id}
                          className="px-12 py-4 rounded-none hover:bg-black"
                          value={type}
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {/* <FormDescription>
                  You can manage email addresses in your{" "}
                  <Link href="/examples/forms">email settings</Link>.
                </FormDescription> */}
                </FormItem>
              )}
            />
          ))}
          <Button
            type="submit"
            className="w-full rounded-none md:col-span-3 text-primary-foreground border border-primary bg-primary py-8 px-10 text-lg font-gotham hover:bg-transparent hover:text-primary transition"
          >
            SEARCH 🔍
          </Button>
        </form>
      </Form>
    </div>
  );
}
