"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Video from "@/components/catalog/video";

const select = [
  {
    name: "sezon",
    title: "Pe sezon",
    subselect: [
      { text: "Iarnă", link: "/catalog/sezon/iarna" },
      { text: "Vară", link: "/catalog/sezon/vara" },
      { text: "all season", link: "/catalog/sezon/all-season" },
    ],
  },
  {
    name: "fam",
    title: "Pe familie",
    subselect: [
      { text: "P ZERO™", link: "/catalog/linie-de-produse/p-zero" },
      { text: "CINTURATO™", link: "/catalog/linie-de-produse/cinturato" },
      { text: "SCORPION™", link: "/catalog/linie-de-produse/scorpion" },
      { text: "POWERGY™", link: "/catalog/linie-de-produse/powergy" },
      { text: "CARRIER™", link: "/catalog/linie-de-produse/carrier" },
    ],
  },
];

function Sel() {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [contentWidth, setContentWidth] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (triggerRef.current) {
      setContentWidth(triggerRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row w-full gap-4">
      {select.map((types, index) => (
        <>
          <DropdownMenu modal={false}>
            <div className="relative w-full">
              <DropdownMenuTrigger asChild className="w-full">
                <Button
                  className="w-full rounded-none h-16 bg-transparent border-2 text-lg font-medium border-primary hover:bg-primary text-primary hover:text-primary-foreground text-left px-10 uppercase flex items-center justify-between transition-all duration-300 ease-in-out"
                  ref={triggerRef}
                >
                  {types.title} <ChevronDown size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                style={{ width: contentWidth || "auto" }}
                className={`bg-black/90 rounded-none text-primary border-primary`}
              >
                {types.subselect.map((type, index) => (
                  <DropdownMenuItem
                    key={index}
                    className={`text-md uppercase relative cursor-pointer rounded-none hover:bg-primary hover:text-black focus:bg-primary focus:text-black h-14 px-8 m-1`}
                  >
                    <Link href={type.link} className="w-full">
                      {type.text}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </div>
          </DropdownMenu>
        </>
      ))}
      <Link
        href={"/catalog/marime"}
        className="w-full border-2 border-yellow-400 relative text-yellow-400 py-4 px-10 hover:bg-yellow-400 hover:text-primary-foreground transition cursor-pointer text-lg uppercase"
      >
        Pe mărime
      </Link>
    </div>
  );
}

export default Sel;
