"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, spring } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNav({
  allLinks,
}: {
  allLinks: {
    label: string;
    path: string;
    icon: JSX.Element;
  }[];
}) {
  const pathname = usePathname();
  return (
    <nav className="py-2 mb-4 overflow-auto">
      <ul className="flex gap-6 text-xs font-semibold">
        <AnimatePresence>
          {allLinks.map((link, index) => (
            <motion.li whileTap={{ scale: 0.95 }} key={index}>
              <Link
                className={cn(
                  "flex gap-1 flex-col items-center relative",
                  pathname === link.path && "text-primary"
                )}
                href={link.path}
              >
                {link.icon}
                {link.label}
                {pathname === link.path ? (
                  <motion.div
                    className="h-[2px] w-full rounded-full absolute bg-primary z-0 left-0 -bottom-1"
                    initial={{ scaleX: 0.2 }}
                    animate={{ scaleX: 1 }}
                    layoutId="underline"
                    transition={{ type: "spring", stiffness: 42 }}
                  />
                ) : null}
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </nav>
  );
}
