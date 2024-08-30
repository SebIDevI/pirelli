"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import dubai from "@/public/urus.png";
import urusBG from "@/public/urus-mov-full.jpg";
import rollsBG from "@/public/rolls-royce-full.jpg";
import maybachBG from "@/public/maybach-full.jpg";
import porscheBG from "@/public/turbo-s-full.jpg";
import ferrariBG from "@/public/f8-full.jpg";
import goptsuteBG from "@/public/g800-full.jpg";
import dreaming from "@/public/rolls.png";
import racetrack from "@/public/maybach.png";
import porsche from "@/public/porsche.png";
import ferrari from "@/public/ferrari.png";
import brabus from "@/public/brabus.png";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

function Section3() {
  const dates = [
    {
      title: "lamborghini",
      header: "LAMBORGHINI URUS",
      text: "Urus a fost expediat din Ungaria pentru o schimbare completă: Full 1016industries Vision Widebody, cu roți VELOS de 23 inchi și înveliș complet cu pragurile ușii în mov Bespoke Satin.",
      img: [dubai, urusBG],
      link: "https://www.instagram.com/reel/C3AVWMhKKhz/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    },
    {
      title: "ROLLS ROYCE",
      header: "ROLLS ROYCE CULLINAN MANSORY",
      text: "Una dintre numeroasele construcții Mansory, dar preferata noastră, gri pe portocaliu nu dezamăgește niciodată.",
      img: [dreaming, rollsBG],
      link: "https://www.instagram.com/p/C8EyFjEqjae/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    },
    {
      title: "MAYBACH BRABUS",
      header: "MAYBACH BRABUS S580",
      text: "Primul din lume. Din Bulgaria, acest Maybach a primit tratamentul complet Brabus cu Monoblock M de 21” și un Wrap TwoTone.",
      img: [racetrack, maybachBG],
      link: "https://www.instagram.com/p/Cou8pNbKrrX/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    },
    {
      title: "PORSCHE",
      header: "992 TURBO S TECHART",
      text: "Primul Techart 992 Turbo S din lume, și fostul deținător al recordului mondial pentru cel mai rapid 992 Turbo S: 4,0 100-200 KMH, 2,2 0-100 KMH, 9,5 1/4 mile în 2021.",
      img: [porsche, porscheBG],
      link: "https://www.instagram.com/p/Ctmo7bKq8Wf/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    },
    {
      title: "FERRARI",
      header: "FERRARI F8 TRIBUTO",
      text: "Project Car-ul nostru 2021-2022, Ferrari F8 Tributo cu un kit de caroserie complet 1016industries, evacuare Capristo și roți forjate Yido de 21-22 inci.",
      img: [ferrari, ferrariBG],
      link: "https://www.instagram.com/p/CxNMVLrqaZQ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    },
    {
      title: "BRABUS",
      header: "BRABUS G800 SQUARED WIDESTAR",
      text: "Primul din lume. Primul client a livrat kit-ul Widestar pentru G63 4x4 Squared. Împreună cu FI Exhaust ULTRA și Stage 2 Tune-ul nostru, ajungând până la 800 CP, împreună cu un set de roți VOSSEN LC3-01T de 24 inchi.",
      img: [brabus, goptsuteBG],
      link: "https://www.instagram.com/p/CzQ_mjlK0kR/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    },
  ];

  const MotionTabs = motion(Tabs);

  return (
    <div className="pb-20 py-20 bg-secondary text-secondary-foreground">
      <div className="container">
        <p className="mb-8">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ ease: "linear", delay: 0.3 }}
            viewport={{ margin: "-100px" }}
            className="relative py-2 uppercase text-sm opacity-0"
          >
            racebox
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: "66%" }}
              transition={{ ease: "easeInOut", duration: 0.4, delay: 0.3 }}
              viewport={{ margin: "-100px" }}
              className="absolute h-full top-0 left-0 w-0 border-b-2 border-primary"
            ></motion.span>
          </motion.span>
        </p>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ ease: "linear", delay: 0.3 }}
          viewport={{ margin: "-100px" }}
          className="text-center my-10 text-5xl font-gotham text-secondary-foreground uppercase opacity-0"
        >
          Ultimele proiecte
        </motion.h2>
        <MotionTabs
          defaultValue={dates[0].title}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ ease: "linear", delay: 0.3 }}
          viewport={{ margin: "-100px" }}
          className="font-gotham grid lg:grid-cols-2 gap-8 opacity-0"
        >
          <div className="me-8">
            <TabsList className="rounded-none flex-wrap">
              {dates.map((date, index) => (
                <TabsTrigger
                  className="text-base rounded-none p-3 px-5 text-secondary-foreground hover:text-secondary-foreground hover:bg-background uppercase sm:text-lg"
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
                <div className="my-8 flex isolate">
                  <Link
                    href={date.link}
                    target="_blank"
                    className="py-2 px-8 rounded-none uppercase font-bold text-base border-primary border bg-transparent text-primary hover:text-primary-foreground hover:border-primary transition-all duration-500 flex items-center gap-2 relative after:w-0 after:h-full after:absolute after:top-0 after:-translate-x-1/2 after:left-1/2 after:bg-primary after:z-10 hover:after:w-full after:transition-all after:duration-500 after:origin-center"
                  >
                    <span className="z-20">Read the story</span>
                  </Link>
                </div>
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
                    width={5}
                    height={5}
                    src={date.img[0]}
                    alt={`${date.header} story`}
                    className={`h-auto w-full lg:w-auto opacity-0 lg:hidden`}
                  />
                  <Image
                    src={date.img[0]}
                    alt={`${date.header} story`}
                    className={`absolute top-0 h-auto w-full lg:w-auto ${
                      date.title === "MAYBACH BRABUS"
                        ? "-top-16 -right-10"
                        : date.title === "PORSCHE"
                        ? "-top-10 sm:right-20"
                        : date.title === "lamborghini"
                        ? "-right-10"
                        : "-top-0 right-0"
                    } ${date.title === "FERRARI" && "scale-75"} ${
                      date.title === "lamborghini" && "scale-90"
                    } ${date.title === "BRABUS" && "scale-[0.85]"}`}
                  />
                  <Image
                    src={date.img[1]}
                    alt={`${date.header} story`}
                    className={`absolute top-0 h-auto w-full lg:w-auto ${
                      date.title === "MAYBACH BRABUS"
                        ? "-top-16 -right-10"
                        : date.title === "PORSCHE"
                        ? "-top-10 sm:right-20"
                        : date.title === "lamborghini"
                        ? "-right-10"
                        : "-top-0 right-0"
                    } ${date.title === "FERRARI" && "scale-75"} ${
                      date.title === "lamborghini" && "scale-90"
                    } ${date.title === "BRABUS" && "scale-[0.85]"} ${
                      date.title === "MAYBACH BRABUS"
                        ? "[clip-path:polygon(10%_15%,75%_0,75%_85%,10%_75%)]"
                        : date.title === "lamborghini"
                        ? "[clip-path:polygon(0%_0%,80%_10%,80%_85%,0%_100%)]"
                        : date.title === "ROLLS ROYCE"
                        ? "[clip-path:polygon(0%_10%,70%_20%,70%_85%,0%_100%)]"
                        : date.title === "PORSCHE"
                        ? "[clip-path:polygon(15%_25%,80%_40%,80%_80%,15%_100%)]"
                        : date.title === "FERRARI"
                        ? "[clip-path:polygon(0%_0%,100%_0,85%_80%,15%_80%)]"
                        : date.title === "BRABUS"
                        ? "[clip-path:polygon(0%_0%,70%_20%,70%_80%,0%_100%)]"
                        : ""
                    }`}
                  />
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </MotionTabs>
      </div>
    </div>
  );
}

export default Section3;
