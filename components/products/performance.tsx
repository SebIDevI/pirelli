import React from "react";
import { Progress } from "../ui/progress";
import {
  InferResultType,
  ProductVariantsWithImagesTags,
} from "@/lib/infer-type";

export default function Performance({
  variantWID,
}: {
  variantWID: InferResultType<
    "productVariants",
    {
      variantTags: true;
      product: {
        with: {
          productVariants: { with: { variantTags: true } };
        };
      };
    }
  >;
}) {
  return (
    <div className="py-16">
      <h3 className="text-secondary-foreground font-gothamBlack italic text-5xl pb-8">
        Performanță
      </h3>
      <div className="text-secondary-foreground font-gothamBlack">
        <div className="py-2">
          <span>USCAT</span>
          <Progress
            value={
              variantWID!.variantTags
                .filter((tag) => tag.tag.includes("DRY"))
                .map((tag) => parseInt(tag.tag.replace("DRY-", "")))[0]
            }
          />
        </div>
        <div className="py-2">
          <span>UMEZEALĂ</span>
          <Progress
            value={
              variantWID!.wg === "A"
                ? 100
                : variantWID!.wg === "B"
                ? 80
                : variantWID!.wg === "C"
                ? 60
                : variantWID!.wg === "D"
                ? 40
                : variantWID!.wg === "E"
                ? 20
                : 0
            }
          />
        </div>
        <div className="py-2">
          <span>SPORT</span>
          <Progress
            value={
              variantWID!.fullSize.split(" ")[1].includes("(Y)")
                ? 100
                : variantWID!.fullSize.split(" ")[1].includes("Y")
                ? 95
                : variantWID!.fullSize.split(" ")[1].includes("W")
                ? 88
                : variantWID!.fullSize.split(" ")[1].includes("Z")
                ? 81
                : variantWID!.fullSize.split(" ")[1].includes("V")
                ? 74
                : variantWID!.fullSize.split(" ")[1].includes("H")
                ? 67
                : variantWID!.fullSize.split(" ")[1].includes("U")
                ? 60
                : variantWID!.fullSize.split(" ")[1].includes("T")
                ? 53
                : variantWID!.fullSize.split(" ")[1].includes("S")
                ? 46
                : variantWID!.fullSize.split(" ")[1].includes("R")
                ? 39
                : variantWID!.fullSize.split(" ")[1].includes("Q")
                ? 32
                : variantWID!.fullSize.split(" ")[1].includes("N")
                ? 25
                : variantWID!.fullSize.split(" ")[1].includes("M")
                ? 18
                : variantWID!.fullSize.split(" ")[1].includes("L")
                ? 11
                : 0
            }
          />
        </div>
        <div className="py-2">
          <span>KILOMETRAJ</span>
          <Progress
            value={
              variantWID!.variantTags
                .filter((tag) => tag.tag.includes("MILEAGE"))
                .map((tag) => parseInt(tag.tag.replace("MILEAGE-", "")))[0]
            }
          />
        </div>
        <div className="py-2">
          <span>CONFORT</span>
          <Progress
            value={
              variantWID!.variantTags
                .filter((tag) => tag.tag.includes("COMFORT"))
                .map((tag) => parseInt(tag.tag.replace("COMFORT-", "")))[0]
            }
          />
        </div>
      </div>
    </div>
  );
}
