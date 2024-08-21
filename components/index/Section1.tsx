"use client";

import React from "react";
import Image from "next/image";
import wheels from "@/public/index/cursePirelli.jpeg";

function Section1() {
  return (
    <div className="w-full dark:bg-black bg-white lcontainer py-12 px-6 md:px-12">
      <div className="border-2 grid lg:grid-cols-2 gap-5 p-8 py-10 text-secondary-foreground border-primary w-full">
        <div className="p-4 lg:pe-16 lg:self-center">
          <span className="relative py-2 uppercase text-sm before:absolute before:top-0 before:left-0 before:w-2/3 before:h-full before:border-b-2 before:border-primary">
            We have no limits
          </span>
          <h2 className="font-gotham uppercase text-4xl py-6">
            AN AWARD WINNING TUNING COMPANY
          </h2>
          <p className="font-gothamBook">
            We are a tuning company with over 17 years of experience in the
            field, holding multiple world records for various tuning
            configurations. We are specialized in modifying premium and
            superpremium vehicles, but we have also achieved notable performance
            for base models.
          </p>
        </div>
        <div className="w-full h-full relative">
          <Image
            src={wheels}
            alt="Wheels garage"
            className="w-full lg:self-center mx-auto max-w-full lg:max-w-full pe-16 xs:pe-0"
          />
        </div>
      </div>
    </div>
  );
}

export default Section1;
