"use client";

import Image from "next/image";

import pirelliLogo from "@/public/pirelliLogo.png";
import raceboxLogo from "@/public/raceboxLogo.png";
import rlogo from "@/public/racebox_logo.svg";

export default function Logo() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Image
        src={pirelliLogo}
        alt="Logo Pirelli"
        width={130}
        className="h-auto xs:w-[90px] w-[70px] sm:w-[130px]"
      />
      {/* <Image
        src={rlogo}
        alt="Logo Pirelli"
        width={130}
        className="h-auto scale-[1.45] origin-top-left"
      /> */}
      <div className="h-full sm:w-[140px] bg-[url('/raceboxLogo.png')] dark:bg-[url('/racebox_logo.svg')] dark:scale-[1.4] origin-top-left bg-contain bg-no-repeat scale-[1.20] xs:w-[90px] w-[70px]" />
    </div>
  );
}
