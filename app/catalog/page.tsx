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
      { text: "SOTTOZERO™", link: "/catalog/linie-de-produse/sottozero" },
    ],
  },
];

const variantsDropdown: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    translateY: "-100%",
    transition: {
      ease: "easeInOut",
      duration: 0.2,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    translateY: "-100%",
    transition: {
      ease: "easeInOut",
      duration: 0.2,
    },
  },
};

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
      <div className="w-full md:h-[90vh] xs:h-screen min-h-[90vh] md:min-h-full text-primary-foreground relative overflow-hidden lg:px-24 px-8 p-6 bg-black">
        <div className="w-full h-full absolute top-0 left-0 scale-[1.5]">
          {/* <ReactPlayer
            url="https://www.youtube.com/watch?v=g0Oah5C5ppA"
            playing={true}
            pip={false}
            loop={true}
            controls={false}
            volume={0}
            muted
            width={"100%"}
            height={"100%"}
            className="w-full h-full"
          /> */}
          <video
            autoPlay
            muted
            playsInline
            controls
            loop
            className="w-full h-full"
          >
            <source src={"/Pirelli Design.mp4"} />
            Your browser does not support the video tag...
          </video>
        </div>
        {/* <div className="w-full h-full absolute top-0 left-0 bg-black">
          <Image src={tyre} alt="Tyre" className="absolute right-0 scale-90" />
        </div> */}
        <div className="w-full h-full relative mt-10">
          <div className="w-full h-full flex items-center py-14 gap-2">
            <div className="flex flex-col gap-10 md:gap-0 justify-between w-full h-full">
              <div className="lg:w-1/2">
                <div className="font-gothamLight uppercase text-sm">
                  <Link
                    href={"/"}
                    className="uppercase relative after:absolute after:w-0 after:h-px after:bottom-0 after:left-0 after:bg-secondary hover:after:w-full after:transition-all after:duration-500"
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
                <div className="flex flex-col lg:flex-row w-full gap-4">
                  {select.map((types, index) => (
                    <>
                      <DropdownMenu modal={false}>
                        <div className="relative w-full">
                          <DropdownMenuTrigger asChild className="w-full">
                            <Button
                              className="w-full rounded-none h-16 bg-transparent border-2 font-medium border-primary hover:bg-primary text-primary hover:text-primary-foreground text-left px-10 uppercase flex items-center justify-between transition-all duration-300 ease-in-out"
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
                                <Link href={type.link}>{type.text}</Link>
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
