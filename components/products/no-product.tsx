import Lottie from "lottie-react";
import React from "react";
import loading from "@/public/car search.json";

export default function NoProduct() {
  return (
    <div className="mx-auto col-span-3 max-w-[500px] w-full">
      <p className="text-xl text-center font-gothamBook px-20 mb-6 text-secondary-foreground dark:text-secondary">
        Nu am găsit niciun produs care să se potrivească filtrelor
      </p>
      <Lottie animationData={loading} />
    </div>
  );
}
