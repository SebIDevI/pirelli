"use client";

import Image from "next/image";

import pirelliLogo from "@/public/pirelliLogo.png";
import raceboxLogo from "@/public/raceboxLogo.png";

export default function Logo() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Image
        src={pirelliLogo}
        alt="Logo Pirelli"
        width={130}
        className="h-auto"
      />
      <div className="h-full w-[140px] bg-[url('/raceboxLogo.png')] dark:bg-[url('/raceboxLogo_white.png')] bg-contain bg-no-repeat scale-105" />
    </div>
  );
}
