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
              We have no limits
            </span>
            <h2 className="font-gotham uppercase text-4xl py-6">
              AN AWARD WINNING TUNING COMPANY
            </h2>
            <p className="font-gothamBook text-lg">
              We are a tuning company with over 17 years of experience in the
              field, holding multiple world records for various tuning
              configurations. We are specialized in modifying premium and
              superpremium vehicles, but we have also achieved notable
              performance for base models.
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
