"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

import { motion, AnimatePresence, Variants } from "framer-motion";

interface LocalTypesProps {
  text: string;
  link?: string;
}

interface LocalDropdownProps {
  title: string;
  types: LocalTypesProps[];
  pos?: "up" | "down";
}

const LocalDropdown: React.FC<LocalDropdownProps> = ({ title, types, pos }) => {
  const tr = pos === "up" ? "-100%" : pos === "down" ? "12px" : "-100%";

  const variantsDropdown: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      translateY: tr,
      transition: {
        ease: "easeInOut",
        duration: 0.1,
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      translateY: tr,
      transition: {
        ease: "easeInOut",
        duration: 0.1,
      },
    },
  };

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);
  return (
    <div className="w-full items-center justify-center border-2 border-yellow-400 relative text-yellow-400">
      <div
        className="flex w-full py-4 px-10 items-center justify-between hover:bg-yellow-400 hover:text-primary-foreground transition cursor-pointer"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <p className="text-lg uppercase">{title}</p>
        <ChevronDown className="w-4 h-4 opacity-50" />
      </div>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            className={`absolute w-full ${
              pos == "up" ? "-top-3" : pos === "down" ? "top-full" : "-top-3"
            } border-2 border-yellow-400 left-0 p-2 bg-black/90`}
            variants={variantsDropdown}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <ul>
              {types.map((type, index) => (
                <li
                  key={index}
                  className="w-full h-full hover:bg-yellow-400 hover:text-primary transition uppercase"
                >
                  {type.link ? (
                    <Link href={type.link} className="w-full">
                      <span className="p-4 px-10">{type.text}</span>
                    </Link>
                  ) : (
                    <div className="w-full">
                      <p className="p-4 px-10">{type.text}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { LocalDropdown };
