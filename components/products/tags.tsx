import { VariantsWithImagesTags } from "@/lib/infer-type";
import { variantTags } from "@/server/schema";
import React from "react";
import { BsFillSunFill, BsSnow } from "react-icons/bs";
import { FaFlagCheckered } from "react-icons/fa";
import { GiRaceCar } from "react-icons/gi";
import { LuSunSnow } from "react-icons/lu";
import { PiCarProfileFill, PiVanFill } from "react-icons/pi";
import Pmsf from "./icon-pmsf";

interface VariantTagsFullSize {
  variantTags: VariantsWithImagesTags;
}

const Tagz: React.FC<VariantTagsFullSize> = ({ variantTags }) => {
  return (
    <div>
      <div className="flex gap-2 pb-2 text-secondary-foreground">
        {/* <GiRaceCar className="text-4xl text-yellow-400" /> */}
        {/* CAR */}
        {variantTags.variantTags.map((tag, i) => {
          return (
            <React.Fragment key={i}>
              {tag.tag === "CAR" ? (
                <div className="text-xs text-green font-gothamBlack flex gap-2 items-center bg-gray-400/20 dark:bg-secondary rounded p-2 py-1">
                  <div className="max-h-5 text-xs text-green font-gothamBlack flex gap-2 items-center">
                    <GiRaceCar className="text-4xl" />
                    CAR
                  </div>
                </div>
              ) : tag.tag === "VAN" ? (
                <div className="text-xs text-green font-gothamBlack flex gap-2 items-center bg-gray-400/20 dark:bg-secondary rounded p-2 py-1">
                  <div className="max-h-5 text-xs text-green font-gothamBlack flex gap-2 items-center">
                    <PiVanFill className="text-xl" />
                    VAN
                  </div>
                </div>
              ) : tag.tag === "SUV" ? (
                <div className="text-xs text-green font-gothamBlack flex gap-2 items-center bg-gray-400/20 dark:bg-secondary rounded p-2 py-1">
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
                <div className="text-xs text-green font-gothamBlack flex gap-2 items-center bg-gray-400/20 dark:bg-secondary rounded p-2 py-1">
                  <div className="max-h-5 text-xs text-green font-gothamBlack flex gap-2 items-center">
                    <BsFillSunFill className="text-xl" />
                    SUMMER
                  </div>
                </div>
              ) : tag.tag === "WINTER" ? (
                <div className="text-xs text-green font-gothamBlack flex gap-2 items-center bg-gray-400/20 dark:bg-secondary rounded p-2 py-1">
                  <div className="max-h-5 text-xs text-green font-gothamBlack flex gap-2 items-center">
                    <BsSnow className="text-xl" />
                    WINTER
                  </div>
                </div>
              ) : tag.tag === "ALLSEASON" || tag.tag === "ALL SEASON" ? (
                <div className="text-xs text-green font-gothamBlack flex gap-2 items-center bg-gray-400/20 dark:bg-secondary rounded p-2 py-1">
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
                  className="text-xs text-green font-gothamBlack flex gap-2 items-center bg-gray-400/20 dark:bg-secondary
                   rounded p-2 py-1"
                >
                  <div className="max-h-5 text-xs text-green font-gothamBlack flex gap-2 items-center">
                    <Pmsf className="text-xl" />
                    3PMSF
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
        {variantTags.fullSize.split(" ")[1].includes("W") && (
          <li className="text-xs text-green font-gothamBlack flex gap-2 items-center bg-gray-400/20 dark:bg-secondary rounded p-2 py-1">
            <div className="max-h-5 text-xs text-green font-gothamBlack flex gap-2 items-center">
              <FaFlagCheckered className="text-xl" />
              Sport
            </div>
          </li>
        )}
      </div>
    </div>
  );
};

export default Tagz;
