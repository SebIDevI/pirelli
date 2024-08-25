"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { Variants } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Video from "@/components/catalog/video";
import Sel from "@/components/index/select";

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
      { text: "CARRIER™", link: "/catalog/linie-de-produse/carrier" },
    ],
  },
];

function Home() {
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
    <div className="bg-secondary font-gotham">
      <div className="w-full md:h-[90vh] xs:h-screen min-h-[90vh] md:min-h-full text-white relative overflow-hidden py-6 bg-black">
        <div className="w-full h-full absolute top-0 left-0 scale-[1.5]">
          <Video />
        </div>
        <div className="w-full h-full relative mt-10 container">
          <div className="w-full h-full flex items-center py-14 gap-2">
            <div className="flex flex-col gap-10 md:gap-0 justify-between w-full h-full">
              <div className="lg:w-1/2">
                <div className="font-gothamLight uppercase text-sm">
                  <Link
                    href={"/"}
                    className="uppercase relative after:absolute after:w-0 after:h-px after:bottom-0 after:left-0 after:bg-white hover:after:w-full after:transition-all after:duration-500"
                  >
                    Homepage
                  </Link>{" "}
                  / <span className="font-gotham">Catalog anvelope</span>
                </div>
                <h1 className="text-5xl font-gothamBlack py-4">
                  ANVELOPE AUTO
                </h1>
                <p className="text-base">
                  Catalogul de anvelope Pirelli este rezultatul anilor de
                  investiții, cercetări și inovații și include o gamă largă de
                  modele de vară, iarnă și all-season concepute pentru
                  automobile, modele SUV și van.
                </p>
              </div>
              <div className="w-full">
                <h1 className="text-2xl font-black uppercase py-4">
                  Anvelopele noastre
                </h1>
                <Sel />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-auto w-full container py-10">
        <p className="font-gothamBook">
          Catalogul de anvelope este împărțit pe categorii în funcție de anumite
          caracteristici specifice: <br />
          <br />
          anvelopele de vară Pirelli sunt concepute pentru a asigura fiabilitate
          maximă la temperaturi ridicate datorită rezistenței mai mici la
          rulare, aderenței perfecte pe șosea și distanței de oprire mai scurte.{" "}
          <br />
          <br />
          Anvelopele de iarnă Pirelli oferă aderență și tracțiune mai bune,
          reducând riscul de acvaplanare chiar și în condiții meteorologice
          nefavorabile și la temperaturi scăzute. <br />
          <br />
          Pe de altă parte, anvelopele all-season Pirelli combină unele dintre
          caracteristicile principale ale anvelopelor de sezon cu soluții unice
          care sunt practice și funcționale și pot fi utilizate pe tot parcursul
          anului. <br />
          <br />
          Catalogul de anvelope Pirelli include cinci familii principale:P
          ZERO™, Cinturato™, Scorpion™ și Sottozero™. <br />
          <br />
          Familia P ZERO™ oferă performanțe de top pentru condus sportiv,
          asigurând frânare și tracțiune excelente chiar și la viteze mari.{" "}
          <br />
          <br />
          Pentru șoferii care respectă mediul înconjurător, familia de anvelope
          Cinturato™ de la Pirelli caută să reducă emisiile de CO₂ ale
          automobilului, împreună cu rezistența la rulare. <br />
          Anvelopele Pirelli Scorpion™ sunt concepute pentru a oferi performanțe
          și siguranță deosebite pentru modele SUV și crossover, în timp ce
          familia Pirelli Sottozero™ este dedicată în mod special condusului în
          timpul iernii.
        </p>
      </div>
    </div>
  );
}

export default Home;
