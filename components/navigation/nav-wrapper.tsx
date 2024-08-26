"use client";

import React, { useEffect, useState } from "react";
import { ButtonProps } from "../ui/button";
import { cn } from "@/lib/utils";

export const NavWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [pathname, setPathname] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    setPathname(window.location.pathname);
    const handleScroll = () => {
      if (window.scrollY >= 80) {
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
      className={cn(
        isScrolled ? `py-5 bg-secondary` : "py-8 bg-transparent",
        `${pathname === "/" ? "dark" : ""}`,
        className
      )}
      {...props}
    />
  );
});
NavWrapper.displayName = "NavWrapper";
