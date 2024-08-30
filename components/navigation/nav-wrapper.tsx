"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const NavWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
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
  }, [pathname]);
  return (
    <div
      ref={ref}
      className={cn(
        isScrolled ? `py-5 bg-secondary` : "py-8 bg-transparent",
        `${
          pathname === "/" ||
          pathname === "/catalog" ||
          pathname === "/catalog/marime"
            ? "dark"
            : ""
        }`,
        className
      )}
      {...props}
    />
  );
});
NavWrapper.displayName = "NavWrapper";
