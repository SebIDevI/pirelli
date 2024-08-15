"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import dubai from "@/public/index/dubai_story.jpg";
import dreaming from "@/public/index/dreaming_story.jpg";
import racetrack from "@/public/index/racetrack_story.jpg";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

function Section3() {
  const dates = [
    {
      title: "dubai",
      header: "DUBAI’S NEW DESTINATION FOR MOTOR ENTHUSIASTS",
      text: "You know you’re in a place that loves cars when even the police turn up in a Lamborghini Aventador.",
      img: dubai,
    },
    {
      title: "dreaming",
      header: "“DREAMING”, THE 2019 PIRELLI CALENDAR SHOT BY ALBERT WATSON",
      text: "For this year’s Pirelli Calendar, the celebrated photographer Albert Watson has created a series of vignettes centring on the dreams and aspirations of four successful and talented women.",
      img: dreaming,
    },
    {
      title: "race track to road",
      header: "FROM THE RACE TRACK TO THE ROAD",
      text: "It is tiny, it has low horsepower and it can even be without a roof.",
      img: racetrack,
    },
  ];

  return (
    <div className="pb-20 px-6 md:px-12 py-20 bg-secondary">
      <p className="mb-8">
        <span className="relative text-secondary-foreground py-2 uppercase text-sm before:absolute before:top-0 before:left-0 before:w-2/3 before:h-full before:border-b-2 before:border-primary">
          from pirelli
        </span>
      </p>
      <h2 className="text-center my-10 text-5xl font-gotham text-secondary-foreground uppercase">
        Latest stories
      </h2>
      <Tabs
        defaultValue={dates[0].title}
        className="font-gotham grid lg:grid-cols-2 gap-8 "
      >
        <div className="me-8">
          <TabsList className="rounded-none">
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
              <Button className="uppercase font-gotham border-2 border-primary text-primary bg-transparent rounded-none text-sm p-2 px-5 hover:bg-primary hover:text-primary-foreground transition my-8">
                Read the story
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
                className="lg:absolute h-full xs:max-w-96 w-full lg:w-auto aspect-square right-0 xl:-translate-x-1/2"
              />
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default Section3;
