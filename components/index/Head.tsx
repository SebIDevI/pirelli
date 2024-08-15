"use client";
import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

import pzero from "@/public/index/logo_pzero_world.svg";
import roata from "@/public/index/roata_pzero.png";
import { GiCarWheel } from "react-icons/gi";

function Head() {
  const { scrollYProgress } = useScroll();
  const spring = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 45,
    restDelta: 0.000001,
  });
  const scale = useTransform(spring, [0, 1], [0, 420]);
  return (
    <div className="relative h-screen w-full bg-gradient-to-l dark:from-[#000000] dark:to-[#202020] from-[#ffffff] to-[#dadada] flex items-center overflow-x-hidden overflow-y-clip">
      <motion.div
        style={{ rotate: scale }}
        className="absolute w-full h-auto origin-center lg:left-[20%] flex items-center justify-center px-6 md:px-12"
      >
        <Image
          src={roata}
          alt={"Wheel pzero"}
          width={1000}
          height={1000}
          className="lg:w-2/5 lg:h-2/5 w-3/5 h-3/5 pt-20"
        />
      </motion.div>
      <div className="absolute w-full h-full dark:bg-[#00000064] bg-[#ffffff9d]"></div>
      <div className="lg:w-1/2 lg:py-20 z-0 px-6 md:px-12">
        <Image src={pzero} alt="Logo PZERO WORLD" className="mt-20 py-8" />
        <hr className="w-[60%] border-primary animate-grow" />
        <h1 className="relative text-[1.5em] pt-4 uppercase font-gothamXLight tracking-[1em] text-primary">
          <span className="">R</span>acebox
        </h1>
        <p className="py-8 font-gothamXLight text-lg text-secondary-foreground w-[80%]">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa maxime
          assumenda corrupti cumque quis dolores neque iste modi exercitationem,
          cupiditate, nemo aliquam est architecto soluta, debitis corporis!
          Veritatis fugiat molestias in enim nemo vel, similique mollitia eius
          commodi delectus sed?
        </p>
        <button
          className="py-2 px-8 uppercase font-bold border-secondary-foreground border text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition flex items-center gap-2"
          onClick={() => (location.href = "/catalog")}
        >
          <GiCarWheel /> Catalog Produse
        </button>{" "}
        <br />
        <br />
        {/* <button
          className="py-2 px-8 uppercase font-gothamLight border-gray-600 border text-yellow-400 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 transition"
          onClick={() => (location.href = "/shop")}
        >
          Book an appointment
        </button> */}
      </div>
      {/* <div className="w-full h-full relative">
        
      </div> */}
    </div>
  );
}

export default Head;
