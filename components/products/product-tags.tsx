"use client";

import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { useRouter, useSearchParams, useParams } from "next/navigation";
// import { useRouter } from "next/router";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { RxMixerHorizontal } from "react-icons/rx";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProductTags({
  tagCount,
  avoid,
}: {
  tagCount: {
    allSez: number;
    summer: number;
    winter: number;
    suv: number;
    car: number;
    van: number;
    elect: number;
    ncs: number;
    rf: number;
    si: number;
    pwg: number;
    pzero: number;
    cint: number;
    scorp: number;
    carrier: number;
    sport: number;
  };
  avoid: string;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const { slug } = useParams();
  const [season, setSeason] = useState<string[]>([]);
  const [vehicleType, setVehicleType] = useState<string[]>([]);
  const [tech, setTech] = useState<string[]>([]);
  const [fam, setFam] = useState<string[]>([]);
  const [util, setUtil] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // season=ALL%20SEASON&vehicleType=CAR,%20SUV

  const setFilter = (type: string) => {
    if (type === "ALL SEASON" || type === "WINTER" || type === "SUMMER") {
      if (season.includes(type)) season.splice(season.indexOf(type), 1);
      else season.push(type);
    }
    if (type === "CARZ" || type === "SUV" || type === "VAN") {
      if (vehicleType.includes(type))
        vehicleType.splice(vehicleType.indexOf(type), 1);
      else vehicleType.push(type);
    }
    if (
      type === "r-f" ||
      type === "ncs" ||
      type === "cyb" ||
      type === "elect" ||
      type === "s-i" ||
      type === "rfwd"
    ) {
      if (tech.includes(type)) tech.splice(tech.indexOf(type), 1);
      else tech.push(type);
    }
    if (type === "Sport") {
      if (util.includes(type)) util.splice(util.indexOf(type), 1);
      else util.push(type);
    }
    if (
      type === "POWERGY" ||
      type === "P ZERO" ||
      type === "CINTURATO" ||
      type === "SCORPION" ||
      type === "CARRIER"
    ) {
      if (fam.includes(type)) fam.splice(fam.indexOf(type), 1);
      else fam.push(type);
    }

    let string = "?";
    if (season.length) string += `season=${season.join(", ")}`;
    if (vehicleType.length) {
      string += `${string !== "?" ? "&" : ""}vehicleType=${vehicleType.join(
        ", "
      )}`;
    }
    if (tech.length) {
      string += `${string !== "?" ? "&" : ""}tech=${tech.join(", ")}`;
    }
    if (fam.length) {
      string += `${string !== "?" ? "&" : ""}family=${fam.join(", ")}`;
    }
    if (util.length) {
      string += `${string !== "?" ? "&" : ""}utils=${util.join(", ")}`;
    }

    router.push(string, { scroll: false });
  };

  const filtersLocal = [
    {
      name: "Toate utilizările",
      types: [
        {
          name: "Turism",
          val: "Turism",
          numb: 0,
        },
        {
          name: "Sport",
          val: "Sport",
          numb: tagCount.sport,
        },
        {
          name: "Controlul puterii",
          val: "Controlul puterii",
          numb: 0,
        },
        {
          name: "Urban",
          val: "Urban",
          numb: 0,
        },
        {
          name: "EV",
          val: "EV",
          numb: 0,
        },
      ],
    },
    {
      name: "Toate tipurile",
      types: [
        {
          name: "SUV",
          val: "SUV",
          numb: tagCount.suv,
        },
        {
          name: "CAR",
          val: "CARZ",
          numb: tagCount.car,
        },
        {
          name: "VAN",
          val: "VAN",
          numb: tagCount.van,
        },
      ],
    },
    {
      name: "Toate tehnologiile",
      types: [
        {
          name: "RUN FLAT",
          val: "r-f",
          numb: tagCount.rf,
        },
        {
          name: "PNCS",
          val: "ncs",
          numb: tagCount.ncs,
        },
        {
          name: "CYBER",
          val: "cyb",
          numb: 0,
        },
        {
          name: "ELECT",
          val: "elect",
          numb: tagCount.elect,
        },
        {
          name: "SEAL INSIDE",
          val: "s-i",
          numb: tagCount.si,
        },
        {
          name: "RUNFORWARD",
          val: "rfwd",
          numb: 0,
        },
      ],
    },
    {
      name: "Toate sezoanele",
      types: [
        {
          name: "Vară",
          val: "SUMMER",
          numb: tagCount.summer,
        },
        {
          name: "Iarnă",
          val: "WINTER",
          numb: tagCount.winter,
        },
        {
          name: "All Season",
          val: "ALL SEASON",
          numb: tagCount.allSez,
        },
      ],
    },
    {
      name: "Toate familiile",
      types: [
        {
          name: "POWEGY",
          val: "POWERGY",
          numb: tagCount.pwg,
        },
        {
          name: "P ZERO",
          val: "P ZERO",
          numb: tagCount.pzero,
        },
        {
          name: "CINTURATO",
          val: "CINTURATO",
          numb: tagCount.cint,
        },
        {
          name: "SCORPION",
          val: "SCORPION",
          numb: tagCount.scorp,
        },
        {
          name: "CARRIER",
          val: "CARRIER",
          numb: tagCount.carrier,
        },
      ],
    },
  ];
  return (
    <>
      <div className="flex gap-4 mt-10">
        <div className="text-secondary">
          <div className="w-full text-secondary-foreground flex items-center gap-4 mt-4">
            <div className="w-full flex gap-0">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <div className="h-full">
                  <SheetTrigger
                    onClick={() => setIsOpen(true)}
                    className="border-2 lg:rounded-l-xl rounded-xl lg:rounded-none dark:bg-yellow-500 bg-yellow-400 dark:border-yellow-500 border-yellow-400 relative text-secondary-foreground dark:hover:bg-yellow-600 dark:hover:border-yellow-600 hover:bg-yellow-500 hover:border-yellow-500 px-3 text-base font-gothamBook flex items-center justify-between p-2 gap-3 transition"
                  >
                    <p>Toate filtrele</p> <RxMixerHorizontal />
                  </SheetTrigger>
                  <SheetContent className="lg:w-[600px] max-w-none bg-[#e0e0e0] dark:bg-[#1f1f1f] border-0 text-secondary-foreground px-0 h-auto">
                    <SheetHeader className="px-6 py-2">
                      <SheetTitle className="uppercase font-gothamBlack text-3xl text-secondary-foreground">
                        Filtre
                      </SheetTitle>
                    </SheetHeader>
                    <Separator className="mt-4 bg-yellow-400" />
                    <div className="h-full">
                      <ScrollArea className="h-full">
                        <div className="px-6 mt-2">
                          <div className="flex items-center justify-between text-xl py-6 border-b border-gray-500/30">
                            Noi (7) <Checkbox className="w-6 h-6" />
                          </div>
                          <div
                            className="flex items-center justify-between text-xl py-6 border-b border-gray-500/30 aria-disabled:text-muted-foreground"
                            aria-disabled
                          >
                            Promotii (0){" "}
                            <Checkbox className="w-6 h-6" disabled />
                          </div>
                        </div>
                        <Accordion type="multiple" className="px-6">
                          {filtersLocal.map(
                            (filter, i) =>
                              filter.name !== avoid && (
                                <AccordionItem
                                  value={filter.name}
                                  className="font-gotham border-gray-500/30"
                                  key={i}
                                >
                                  <AccordionTrigger className="text-xl py-6">
                                    {filter.name}
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <ul className="text-lg flex flex-col gap-2 font-gothamLight">
                                      {filter.types.map((type, index) => (
                                        <li key={index}>
                                          <div
                                            className="flex w-full items-center justify-between aria-disabled:text-muted-foreground"
                                            aria-disabled={
                                              type.numb == 0 ? true : false
                                            }
                                          >
                                            {type.name +
                                              (filter.name === "Toate familiile"
                                                ? "™️"
                                                : "")}{" "}
                                            ({type.numb}){" "}
                                            <Checkbox
                                              onCheckedChange={() => {
                                                setFilter(type.val);
                                                setIsOpen(false);
                                              }}
                                              className="w-6 h-6"
                                              disabled={
                                                type.numb == 0 ? true : false
                                              }
                                              checked={
                                                params
                                                  .toString()
                                                  .includes(
                                                    type.val.replaceAll(
                                                      " ",
                                                      "+"
                                                    )
                                                  )
                                                  ? true
                                                  : false
                                              }
                                            />
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  </AccordionContent>
                                </AccordionItem>
                              )
                          )}
                        </Accordion>
                      </ScrollArea>
                    </div>
                  </SheetContent>
                </div>
              </Sheet>
              <div className="md:flex hidden w-[768px]">
                {filtersLocal.map(
                  (filter, i) =>
                    filter.name !== avoid && (
                      <DropdownMenu key={i} modal={false}>
                        <DropdownMenuTrigger
                          className={`bg-white dark:bg-[#090909] relative text-secondary-foreground hover:bg-gray-100 hover:border-white/40 dark:hover:bg-[#000000] dark:hover:border-[#000000]/40 px-3 text-base font-gothamBook flex items-center justify-between p-2 gap-1.5 transition last-of-type:rounded-e-lg group`}
                        >
                          {filter.name}{" "}
                          <ChevronDown className="w-4 h-4 opacity-80 group-data-[state=open]:rotate-180 transition duration-300" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {filter.types.map((type, index) => (
                            <DropdownMenuItem
                              className="flex w-full items-center justify-between p-0"
                              key={index}
                              disabled={type.numb == 0 ? true : false}
                              onClick={(e) => {
                                e.preventDefault();
                                setFilter(type.val);
                              }}
                            >
                              <label
                                htmlFor={`checkbox` + index}
                                className="w-full h-full cursor-pointer px-2 py-1.5 pe-4"
                              >
                                {type.name +
                                  (filter.name === "Toate familiile"
                                    ? "™️"
                                    : "")}{" "}
                                ({type.numb}){" "}
                              </label>
                              <Checkbox
                                // onCheckedChange={() => {
                                //   setFilter(type.val);
                                // }}
                                id={`checkbox` + index}
                                className="w-6 h-6 me-1.5"
                                disabled={type.numb == 0 ? true : false}
                                checked={
                                  params
                                    .toString()
                                    .includes(type.val.replaceAll(" ", "+"))
                                    ? true
                                    : false
                                }
                              />
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Separator className="mb-16 mt-6 bg-gray-400/30" />
    </>
  );
}
