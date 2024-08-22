"use client";

import { VariantsWithImagesTags } from "@/lib/infer-type";
import { variantTags } from "@/server/schema";
import React, { useLayoutEffect, useRef, useState } from "react";
import { BsFillSunFill, BsSnow } from "react-icons/bs";
import { FaFlagCheckered, FaPlus } from "react-icons/fa";
import { GiRaceCar } from "react-icons/gi";
import { LuSunSnow } from "react-icons/lu";
import { PiCarProfileFill, PiVanFill } from "react-icons/pi";
import Pmsf from "./icon-pmsf";
import { Unplug } from "lucide-react";

interface VariantTagsFullSize {
  variantTags: VariantsWithImagesTags;
}

const Tagz: React.FC<VariantTagsFullSize> = ({ variantTags }) => {
  const [firstLineWidth, setFirstLineWidth] = useState<number>(0);
  const ulRef = useRef<HTMLDivElement>(null);
  const plusIconRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (ulRef.current && plusIconRef.current) {
        let totalWidth = 0;
        const lis = ulRef.current.querySelectorAll("div");
        let firstLine = true;
        lis.forEach((li, i) => {
          if (firstLine) {
            if (
              totalWidth + Math.ceil(li.offsetWidth) >
              Math.ceil(ulRef.current!.offsetWidth)
            ) {
              firstLine = false;
            } else {
              totalWidth += Math.ceil(li.offsetWidth);
            }
          }
        });
        setFirstLineWidth(totalWidth);
        plusIconRef.current.style.left = `${totalWidth}px`;
      }
    };

    if (ulRef.current) {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      <div
        ref={ulRef}
        className="flex relative flex-wrap h-11 overflow-hidden gap-2 py-2 text-secondary-foreground dark:text-secondary"
      >
        {/* <GiRaceCar className="text-4xl text-yellow-400" /> */}
        {/* CAR */}
        {variantTags.variantTags.map((tag, i) => {
          return (
            <React.Fragment key={i}>
              {tag.tag === "CAR" ? (
                <div className="text-xs text-green font-gothamBlack flex gap-2 items-center bg-gray-400/20 rounded p-2 py-1">
                  <div className="max-h-5 text-xs text-green font-gothamBlack flex gap-2 items-center">
                    <GiRaceCar className="text-4xl" />
                    CAR
                  </div>
                </div>
              ) : tag.tag === "VAN" ? (
                <div className="text-xs text-green font-gothamBlack flex gap-2 items-center bg-gray-400/20 rounded p-2 py-1">
                  <div className="max-h-5 text-xs text-green font-gothamBlack flex gap-2 items-center">
                    <PiVanFill className="text-xl" />
                    VAN
                  </div>
                </div>
              ) : tag.tag === "SUV" ? (
                <div className="text-xs text-green font-gothamBlack flex gap-2 items-center bg-gray-400/20 rounded p-2 py-1">
                  <div className="max-h-5 text-xs text-green font-gothamBlack flex gap-2 items-center">
                    <PiCarProfileFill className="text-xl" />
                    SUV
                  </div>
                </div>
              ) : (
                ""
              )}
              {/* <BsFillSunFill className="text-xl text-black" />
                  SUMMER */}
              {tag.tag === "SUMMER" ? (
                <div className="text-xs text-green font-gothamBlack flex gap-2 items-center bg-gray-400/20 rounded p-2 py-1">
                  <div className="max-h-5 text-xs text-green font-gothamBlack flex gap-2 items-center">
                    <BsFillSunFill className="text-xl" />
                    SUMMER
                  </div>
                </div>
              ) : tag.tag === "WINTER" ? (
                <div className="text-xs text-green font-gothamBlack flex gap-2 items-center bg-gray-400/20 rounded p-2 py-1">
                  <div className="max-h-5 text-xs text-green font-gothamBlack flex gap-2 items-center">
                    <BsSnow className="text-xl" />
                    WINTER
                  </div>
                </div>
              ) : tag.tag === "ALLSEASON" || tag.tag === "ALL SEASON" ? (
                <div className="text-xs text-green font-gothamBlack flex gap-2 items-center bg-gray-400/20 rounded p-2 py-1">
                  <div className="max-h-5 text-xs text-green font-gothamBlack flex gap-2 items-center">
                    <LuSunSnow className="text-xl" />
                    ALL SEASON
                  </div>
                </div>
              ) : (
                ""
              )}
              {tag.tag === "3PMSF" && (
                <div
                  className="text-xs text-green font-gothamBlack flex gap-2 items-center bg-gray-400/20
                   rounded p-2 py-1"
                >
                  <div className="max-h-5 text-xs text-green font-gothamBlack flex gap-2 items-center">
                    <Pmsf className="text-xl" />
                    3PMSF
                  </div>
                </div>
              )}
              {tag.tag === "elect" && (
                <div
                  className="text-xs text-green font-gothamBlack flex gap-2 items-center bg-blue-500
                   rounded p-2 py-1"
                >
                  <div className="max-h-5 text-xs text-white font-gothamBlack flex gap-2 items-center">
                    <Unplug size={20} />
                    ELECT
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
        {/* <div
          ref={plusIconRef}
          // style={{ left: firstLineWidth + 16 + "px" }}
          className={`h-9 w-min absolute pb-2 top-1.5`}
        >
          <li className="text-xs text-primary w-fit font-gothamBlack flex gap-2 items-center bg-[#f0f0f0] h-full rounded p-2">
            <FaPlus />
          </li>
        </div> */}
      </div>
    </div>
  );
};

export default Tagz;
