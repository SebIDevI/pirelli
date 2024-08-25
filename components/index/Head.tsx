"use client";
import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

import pzero from "@/public/index/logo_pzero_world.svg";
import roata from "@/public/index/roata_pzero_copy_v3.png";
import { GiCarWheel } from "react-icons/gi";
import { Button } from "../ui/button";

function Head() {
  const { scrollYProgress } = useScroll();
  const spring = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 45,
    restDelta: 0.000001,
  });
  const scale = useTransform(spring, [0, 1], [360, -60]);
  return (
    <div className="relative h-screen w-full bg-gradient-to-l dark:from-[#000000] dark:to-[#202020] from-[#ffffff] to-[#dadada] flex items-center overflow-x-hidden overflow-y-clip">
      <motion.div
        style={{ rotate: scale, translateY: "-54%" }}
        className="absolute w-full h-auto origin-center lg:top-full lg:-translate-y-full lg:left-[30%] top-[98%] flex items-center justify-center p-6 md:p-12 aspect-square"
      >
        <Image
          src={roata}
          alt={"Wheel pzero"}
          width={1000}
          height={1000}
          className="lg:w-4/5 lg:h-4/5 w-full h-full aspect-square scale-[0.8]"
        />
      </motion.div>
      <div className="absolute block lg:hidden w-full h-full dark:bg-[#00000064] bg-[#ffffff9d]"></div>
      <div className="container z-0">
        <div className="lg:w-1/2 lg:py-20 z-10">
          <Image src={pzero} alt="Logo PZERO WORLD" className="mt-20 py-8" />
          <hr className="w-[60%] border-primary animate-grow" />
          <h1 className="relative text-[1.5em] pt-4 uppercase font-gothamXLight tracking-[1em] text-primary">
            <span className="">R</span>acebox
          </h1>
          <p className="py-8 font-gothamXLight text-lg text-secondary-foreground w-full">
            O EXPERIENȚĂ DE RETAIL ȘI BRAND CARE ESTE „UNICĂ PIRELLI”
          </p>
          <Button
            variant={"pirelli"}
            className="px-8 border-secondary-foreground"
            onClick={() => (location.href = "/catalog")}
          >
            <span className="flex items-center justify-center gap-2 z-20">
              <GiCarWheel /> Catalog Produse
            </span>
          </Button>{" "}
          <br />
          <br />
          {/* <button
          className="py-2 px-8 uppercase font-gothamLight border-gray-600 border text-yellow-400 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 transition"
          onClick={() => (location.href = "/shop")}
        >
          Book an appointment
        </button> */}
        </div>
      </div>
      {/* <div className="w-full h-full relative">
        
      </div> */}
    </div>
  );
}

export default Head;
