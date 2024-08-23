"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import wheels from "@/public/index/cursePirelli.jpeg";

function Section1() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="w-full dark:bg-[#070707] bg-white lcontainer py-12 relative">
      <div
        className={`absolute top-0 right-0 ${
          isScrolled ? "w-2/3" : "w-28"
        } h-0.5 bg-primary transition-all duration-500`}
      ></div>
      <div className="absolute bottom-0 left-0 w-1/2 -translate-x-1/2 h-0.5 bg-primary"></div>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-5 text-secondary-foreground border-primary w-full">
          <div className="py-4 lg:pe-16 lg:self-center">
            <span className="relative py-2 uppercase text-sm before:absolute before:top-0 before:left-0 before:w-2/3 before:h-full before:border-b-2 before:border-primary">
              NICIO LIMITĂ
            </span>
            <h2 className="font-gotham uppercase text-5xl py-6">
              O COMPANIE DE TUNING PREMIATĂ
            </h2>
            <p className="font-gothamBook text-lg">
              Suntem o companie de tuning cu peste 17 ani de experiență în
              domeniu, deținând mai multe recorduri mondiale pentru diverse
              configurații de tuning. Suntem specializați în modificarea
              vehiculelor premium si superpremium, dar am obținut performanțe
              notabile și pentru modelele de bază.
            </p>
          </div>
          <div className="w-full h-full relative">
            <Image
              src={wheels}
              alt="Wheels garage"
              className="w-full lg:self-center mx-auto max-w-full lg:max-w-full pe-16 xs:pe-0 scale-90 origin-right"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section1;
