"use client";

import React from "react";
import Image from "next/image";

import scorpion from "@/public/index/scorpion_tyre.png";
import pzero from "@/public/index/pzero_tyre.png";
import cinturato from "@/public/index/cinturatoP7_tyre.png";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { motion } from "framer-motion";

const prods = [
  {
    mini: "pentru suv",
    name: "Scroprion",
    desc: "Cea mai bună în condiții umede, rezistență la rulare și confort pentru condus",
    img: scorpion,
    link: "/catalog/linie-de-produse/scorpion",
  },
  {
    mini: "cele mai iubite",
    name: "P ZERO",
    desc: "Opțiunea perfectă pentru toate performanțele pe care doriți să le obțineți",
    img: pzero,
    link: "/catalog/linie-de-produse/p-zero",
  },
  {
    mini: "pentru mașini și crossovers",
    name: "Cinturato P7",
    desc: "Cea mai bună în condiții umede, rezistență la rulare și confort pentru condus",
    img: cinturato,
    link: "/catalog/linie-de-produse/cinturato",
  },
];

function Products() {
  const MotionLink = motion(Link);
  return (
    <div className="pt-8 lcontainer bg-[#f0f0f0] dark:bg-[#0e0e0e] text-secondary-foreground px-6 md:px-12 pb-8">
      <div className="container">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ ease: "linear", delay: 0.3 }}
          viewport={{ margin: "-100px" }}
          className="font-gotham text-center text-5xl mb-16 py-10 uppercase opacity-0"
        >
          Anvelope populare
        </motion.h3>
        <div className="lg:grid hidden grid-cols-3 gap-4">
          {prods.map((prod, i) => (
            <MotionLink
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ ease: "linear", delay: i === 1 ? 0.3 : 0.4 }}
              viewport={{ margin: "-100px" }}
              href={prod.link}
              className="md:basis-[500px] basis-full h-full"
              key={i}
            >
              <div className="flex flex-col justify-between bg-secondary max-w-[500px] shadow-lg font-gotham text-center p-6 pb-0 gap-6 h-full">
                <div className="space-y-6">
                  <h5 className="uppercase text-primary font-gothamBlack">
                    {prod.mini}
                  </h5>
                  <h3 className="text-secondary-foreground font-gothamBlack italic text-4xl xl:text-5xl">
                    {prod.name}
                  </h3>
                  <p className="text-secondary-foreground font-gothamLight">
                    {prod.desc}
                  </p>
                </div>
                <Image src={prod.img} alt={`Tyre ${prod.name}`} />
              </div>
            </MotionLink>
          ))}
        </div>
        <div className="w-full h-full lg:hidden">
          <Carousel
            opts={{
              align: "start",
            }}
          >
            <CarouselContent>
              {prods.map((prod, i) => (
                <CarouselItem className="sm:basis-1/2 basis-full" key={i}>
                  <Link
                    href={prod.link}
                    className="flex flex-col bg-secondary max-w-[500px] shadow-lg font-gotham justify-between text-center p-6 pb-0 gap-6 h-full"
                  >
                    <div className="space-y-6">
                      <h5 className="uppercase text-primary font-gothamBlack">
                        {prod.mini}
                      </h5>
                      <h3 className="text-secondary-foreground font-gothamBlack italic text-4xl xl:text-5xl">
                        {prod.name}
                      </h3>
                      <p className="text-secondary-foreground font-gothamLight">
                        {prod.desc}
                      </p>
                    </div>
                    <Image src={prod.img} alt={`Tyre ${prod.name}`} />
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          {/* {prods.map((prod, i) => (
          <div className="flex flex-col bg-[#0e0e0e] max-w-[500px] shadow-lg font-gotham text-center p-6 pb-0 gap-6 h-fit">
          <h5 className="uppercase text-yellow-400 font-gothamBlack">
          {prod.mini}
          </h5>
          <h3 className="text-primary-foreground font-gothamBlack italic text-4xl xl:text-5xl">
          {prod.name}
          </h3>
          <p className="text-primary-foreground font-gothamLight">
          {prod.desc}
          </p>
          <Image src={prod.img} alt={`Tyre ${prod.name}`} />
          </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default Products;
