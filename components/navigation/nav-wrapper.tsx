"use client";

import React, { useEffect, useState } from "react";
import { ButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";

export const NavWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      ref={ref}
      className={cn(isScrolled ? "py-5" : "py-8", className)}
      {...props}
    />
  );
});
NavWrapper.displayName = "NavWrapper";
