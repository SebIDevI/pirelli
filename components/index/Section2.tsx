"use client";

import React from "react";
import Sel from "./select";
import { motion } from "framer-motion";

export default function Section2() {
  return (
    <div className="lcontainer py-20 bg-[repeating-linear-gradient(45deg,#f0f0f0,#f0f0f0_50%,#ffffff_50%,#ffffff_100%)] dark:bg-[repeating-linear-gradient(45deg,#0e0e0e,#0e0e0e_50%,#070707_50%,#070707_100%)]">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ ease: "linear", delay: 0.3 }}
          viewport={{ margin: "-100px" }}
          className="font-gotham text-secondary-foreground text-center uppercase text-5xl pb-16 opacity-0"
        >
          Găsește anvelopa care ți se potrivește
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ ease: "linear", delay: 0.3 }}
          viewport={{ margin: "-100px" }}
          className="w-full opacity-0"
        >
          <Sel />
        </motion.div>
      </div>
    </div>
  );
}
