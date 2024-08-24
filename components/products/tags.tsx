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
  page?: string;
  title: string;
}

const Tagz: React.FC<VariantTagsFullSize> = ({ variantTags, page, title }) => {
  const [firstLineWidth, setFirstLineWidth] = useState<number>(0);
  const ulRef = useRef<HTMLDivElement>(null);
  const plusIconRef = useRef<HTMLDivElement>(null);
  const fullSize = variantTags.fullSize;

  const handleResize = () => {
    if (ulRef.current && plusIconRef.current) {
      let totalWidth = 0;
      const lis = ulRef.current.querySelectorAll(".div-ttl");
      let firstLine = true;
      lis.forEach((li, i) => {
        if (firstLine) {
          if (
            totalWidth + Math.ceil(li.clientWidth) >
            Math.ceil(ulRef.current!.offsetWidth)
          ) {
            firstLine = false;
          } else {
            totalWidth += Math.ceil(li.clientWidth) + 8;
          }
        }
      });
      setFirstLineWidth(totalWidth);
      plusIconRef.current.style.left = `${totalWidth}px`;
    }
  };
  useLayoutEffect(() => {
    handleResize();
    if (ulRef.current) {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [variantTags]);

  return (
    <div>
      <div
        ref={ulRef}
        className={`flex relative flex-wrap ${
          page && page === "choosing" ? "h-11 overflow-hidden" : ""
        } gap-2 py-2 text-secondary-foreground dark:text-secondary`}
      >
        {/* <GiRaceCar className="text-4xl text-yellow-400" /> */}
        {/* CAR */}
        {fullSize.split(" ")[1].includes("W") && (
          <div
            className="div-ttl text-xs text-green font-gothamBlack flex gap-2 items-center bg-gray-200
             rounded p-2 py-1"
          >
            <div className="max-h-5 text-xs text-green font-gothamBlack flex gap-2 items-center">
              <FaFlagCheckered size={18} />
              SPORT
            </div>
          </div>
        )}
        {variantTags.variantTags.map((tag, i) => {
          return (
            <React.Fragment key={i}>
              {tag.tag === "elect" && (
                <div
                  className="div-ttl text-xs text-green font-gothamBlack flex gap-2 items-center bg-blue-500
                   rounded p-2 py-1"
                >
                  <div className="max-h-5 text-xs text-white font-gothamBlack flex gap-2 items-center">
                    <Unplug size={20} />
                    ELECT
                  </div>
                </div>
              )}
              {tag.tag === "CAR" ? (
                <div className="div-ttl text-xs text-green font-gothamBlack flex gap-2 items-center bg-gray-200 rounded p-2 py-1">
                  <div className="max-h-5 text-xs text-green font-gothamBlack flex gap-2 items-center uppercase">
                    <GiRaceCar className="text-4xl" />
                    Mașină
                  </div>
                </div>
              ) : tag.tag === "VAN" ? (
                <div className="div-ttl text-xs text-green font-gothamBlack flex gap-2 items-center bg-gray-200 rounded p-2 py-1">
                  <div className="max-h-5 text-xs text-green font-gothamBlack flex gap-2 items-center uppercase">
                    <PiVanFill className="text-xl" />
                    VAN
                  </div>
                </div>
              ) : tag.tag === "SUV" ? (
                <div className="div-ttl text-xs text-green font-gothamBlack flex gap-2 items-center bg-gray-200 rounded p-2 py-1">
                  <div className="max-h-5 text-xs text-green font-gothamBlack flex gap-2 items-center uppercase">
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
                <div className="div-ttl text-xs text-green font-gothamBlack flex gap-2 items-center bg-gray-200 rounded p-2 py-1">
                  <div className="max-h-5 text-xs text-green font-gothamBlack flex gap-2 items-center uppercase">
                    <BsFillSunFill className="text-xl" />
                    Vară
                  </div>
                </div>
              ) : tag.tag === "WINTER" ? (
                <div className="div-ttl text-xs text-green font-gothamBlack flex gap-2 items-center bg-gray-200 rounded p-2 py-1">
                  <div className="max-h-5 text-xs text-green font-gothamBlack flex gap-2 items-center uppercase">
                    <BsSnow className="text-xl" />
                    Iarnă
                  </div>
                </div>
              ) : tag.tag === "ALLSEASON" || tag.tag === "ALL SEASON" ? (
                <div className="div-ttl text-xs text-green font-gothamBlack flex gap-2 items-center bg-gray-200 rounded p-2 py-1">
                  <div className="max-h-5 text-xs text-green font-gothamBlack flex gap-2 items-center uppercase">
                    <LuSunSnow className="text-xl" />
                    ALL SEASON
                  </div>
                </div>
              ) : (
                ""
              )}
              {tag.tag === "3PMSF" && (
                <div
                  className="div-ttl text-xs text-green font-gothamBlack flex gap-2 items-center bg-gray-200
                   rounded p-2 py-1"
                >
                  <div className="max-h-5 text-xs text-green font-gothamBlack flex gap-2 items-center">
                    <Pmsf className="text-xl" />
                    Snowflake
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
        <div
          ref={plusIconRef}
          style={{ left: firstLineWidth + "px" }}
          className={`absolute ${
            page && page === "choosing" ? "" : "hidden"
          } text-xs text-green font-gothamBlack flex gap-2 items-center bg-gray-200 rounded p-2`}
        >
          <div className="max-h-5 text-xs text-green font-gothamBlack flex gap-2 items-center uppercase">
            <FaPlus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tagz;
