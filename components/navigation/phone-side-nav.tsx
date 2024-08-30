"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoMenuOutline } from "react-icons/io5";
import Link from "next/link";
import Marimi from "./marimi";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import Image from "next/image";
import roata from "@/public/hexagoane-multe.svg";

export default function PhoneSideNav() {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger>
        <IoMenuOutline size={36} />
      </SheetTrigger>
      <SheetContent
        overlay={false}
        className={`${
          pathname === "/" ? "dark bg-[#1f1f1f]" : "bg-[#e0e0e0]"
        } lg:w-[600px] max-w-none dark:bg-[#1f1f1f] border-0 text-secondary-foreground px-0 h-auto sm:max-w-[500px]`}
      >
        <SheetHeader className="px-6 py-2">
          <SheetTitle className="uppercase font-gothamBlack text-2xl text-secondary-foreground">
            Pirelli
          </SheetTitle>
        </SheetHeader>
        <Separator className="mt-4 bg-yellow-400" />
        <div className="relative h-full overflow-hidden">
          <div className="pt-6 flex flex-col items-start text-lg relative z-10">
            <Link
              className="w-full py-3 px-6 hover:bg-gray-300/40 transition"
              href={"/catalog"}
            >
              Catalog
            </Link>
            <Marimi />
            <Link
              className="w-full py-3 px-6 hover:bg-gray-300/40 transition"
              href={"/contact"}
            >
              Contact
            </Link>
          </div>
          <div className="absolute top-0 left-0 opacity-10 h-full w-full z-0">
            <div className="-bottom-10 absolute -right-10 w-full flex">
              <Image
                src={roata}
                alt="Hexagoane"
                className="w-[200%] h-auto"
                width={600}
                height={600}
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
