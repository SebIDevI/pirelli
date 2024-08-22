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

const prods = [
  {
    mini: "for suv",
    name: "Scroprion",
    desc: "The best in wet conditions, rolling resistance and driving comfort",
    img: scorpion,
  },
  {
    mini: "the most loved",
    name: "P ZERO",
    desc: "The perfect fit for all the performances you want to satisfy",
    img: pzero,
  },
  {
    mini: "for car and crossovers",
    name: "Cinturato P7",
    desc: "The best in wet conditions, rolling resistance and driving comfort",
    img: cinturato,
  },
];

function Products() {
  return (
    <div className="pt-8 lcontainer bg-[#f0f0f0] dark:bg-[#0e0e0e] text-secondary-foreground px-6 md:px-12 pb-8">
      <div className="container">
        <h3 className="font-gotham text-center text-5xl mb-16 py-10">
          Featured Tyres
        </h3>
        <div className="lg:grid hidden grid-cols-3 gap-4">
          {prods.map((prod, i) => (
            <div className="md:basis-[500px] basis-full h-full" key={i}>
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
            </div>
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
                  <div className="flex flex-col bg-secondary max-w-[500px] shadow-lg font-gotham justify-between text-center p-6 pb-0 gap-6 h-full">
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
