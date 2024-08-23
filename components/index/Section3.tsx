"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import dubai from "@/public/urus.png";
import dreaming from "@/public/rolls.png";
import racetrack from "@/public/maybach.png";
import porsche from "@/public/porsche.png";
import ferrari from "@/public/ferrari.png";
import brabus from "@/public/brabus.png";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";

function Section3() {
  const dates = [
    {
      title: "lamborghini",
      header: "LAMBORGHINI URUS",
      text: "Urus a fost expediat din Ungaria pentru o schimbare completă: Full 1016industries Vision Widebody, cu roți VELOS de 23 inchi și înveliș complet cu pragurile ușii în mov Bespoke Satin.",
      img: dubai,
    },
    {
      title: "ROLLS ROYCE",
      header: "ROLLS ROYCE CULLINAN MANSORY",
      text: "Una dintre numeroasele construcții Mansory, dar preferata noastră, gri pe portocaliu nu dezamăgește niciodată.",
      img: dreaming,
    },
    {
      title: "MAYBACH BRABUS",
      header: "MAYBACH BRABUS S580",
      text: "Primul din lume. Din Bulgaria, acest Maybach a primit tratamentul complet Brabus cu Monoblock M de 21” și un Wrap TwoTone.",
      img: racetrack,
    },
    {
      title: "PORSCHE",
      header: "992 TURBO S TECHART",
      text: "Primul Techart 992 Turbo S din lume, și fostul deținător al recordului mondial pentru cel mai rapid 992 Turbo S: 4,0 100-200 KMH, 2,2 0-100 KMH, 9,5 1/4 mile în 2021.",
      img: porsche,
    },
    {
      title: "FERRARI",
      header: "FERRARI F8 TRIBUTO",
      text: "Project Car-ul nostru 2021-2022, Ferrari F8 Tributo cu un kit de caroserie complet 1016industries, evacuare Capristo și roți forjate Yido de 21-22 inci.",
      img: ferrari,
    },
    {
      title: "BRABUS",
      header: "BRABUS G800 SQUARED WIDESTAR",
      text: "Primul din lume. Primul client a livrat kit-ul Widestar pentru G63 4x4 Squared. Împreună cu FI Exhaust ULTRA și Stage 2 Tune-ul nostru, ajungând până la 800 CP, împreună cu un set de roți VOSSEN LC3-01T de 24 inchi.",
      img: brabus,
    },
  ];

  return (
    <div className="pb-20 px-6 md:px-12 py-20 bg-secondary">
      <div className="container">
        <p className="mb-8">
          <span className="relative text-secondary-foreground py-2 uppercase text-sm before:absolute before:top-0 before:left-0 before:w-2/3 before:h-full before:border-b-2 before:border-primary">
            racebox
          </span>
        </p>
        <h2 className="text-center my-10 text-5xl font-gotham text-secondary-foreground uppercase">
          Ultimele proiecte
        </h2>
        <Tabs
          defaultValue={dates[0].title}
          className="font-gotham grid lg:grid-cols-2 gap-8 "
        >
          <div className="me-8">
            <TabsList className="rounded-none flex-wrap">
              {dates.map((date, index) => (
                <TabsTrigger
                  className="text-lg rounded-none p-3 px-5 text-secondary-foreground hover:text-secondary-foreground hover:bg-background uppercase"
                  value={date.title}
                  key={index}
                >
                  {date.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {dates.map((date, index) => (
              <TabsContent
                className="text-secondary-foreground font-gothamLight p-3 text-lg w-full"
                value={date.title}
                key={index}
              >
                <motion.h3
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="uppercase font-gothamBlack text-xl py-8"
                >
                  {date.header}
                </motion.h3>
                <motion.p
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {date.text}
                </motion.p>
                <Button variant={"pirelli"} className="my-8">
                  <span className="z-20">Read the story</span>
                </Button>
              </TabsContent>
            ))}
          </div>
          {dates.map((date, index) => (
            <TabsContent
              value={date.title}
              className="border-none relative"
              key={index}
            >
              <AnimatePresence>
                <motion.div
                  animate={{ x: 0 }}
                  initial={{ x: -10 }}
                  exit={{ x: -10 }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={date.img}
                    alt={`${date.header} story`}
                    className={`lg:absolute h-auto w-full lg:w-auto ${
                      date.title === "MAYBACH BRABUS"
                        ? "-top-16 -right-10"
                        : date.title === "PORSCHE"
                        ? "-top-10 right-20"
                        : "-top-0 right-0"
                    } ${date.title === "FERRARI" && "scale-75"} ${
                      date.title === "lamborghini" && "scale-90"
                    } ${date.title === "BRABUS" && "scale-[0.85]"}`}
                  />
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

export default Section3;
