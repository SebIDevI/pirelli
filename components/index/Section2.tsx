"use client";

import React, { useState } from "react";
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
import Sel from "./select";

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
    subselect: ["P ZERO™", "CINTURATO™", "SCORPION™", "CARRIER™"],
  },
  {
    name: "tech",
    title: "Tehnologie",
    subselect: ["PNCS™", "RUN FLAT", "SEAL INSIDE™", "ELECT™"],
  },
];

export default function Section2() {
  const [sezon, setSezon] = useState("");
  const [fam, setFam] = useState("");
  const [tech, setTech] = useState("");
  return (
    <div className="lcontainer py-20 bg-[repeating-linear-gradient(45deg,#f0f0f0,#f0f0f0_50%,#ffffff_50%,#ffffff_100%)] dark:bg-[repeating-linear-gradient(45deg,#0e0e0e,#0e0e0e_50%,#070707_50%,#070707_100%)]">
      <div className="container">
        <h2 className="font-gotham text-secondary-foreground text-center uppercase text-4xl pb-16">
          Găsește anvelopa care ți se potrivește
        </h2>
        <div className="w-full">
          <Sel />
        </div>
      </div>
    </div>
  );
}
