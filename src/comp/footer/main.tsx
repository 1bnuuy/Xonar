"use client";

import Link from "next/link";

import { AnimatePresence, motion } from "motion/react";

import { _Scale, _Shift } from "@/lib/motion";

import { links } from "../header/var";

const MotionLink = motion.create(Link);

export default function Footer() {
  return (
    <div className="border-contrast absolute bottom-0 left-1/2 z-50 flex w-11/12 -translate-x-1/2 items-center justify-between gap-3 border-t-3 px-5 py-4 max-md:flex-col">
      <div className="z-50 flex basis-[50%] items-center gap-5">
        <AnimatePresence>
          {links.map((link) => {
            return (
              <MotionLink
                variants={_Scale}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                href={link.path}
                key={link.path}
                className="text-contrast hover:text-accent active:text-accent text-xl"
              >
                <span>{link.id}</span>
              </MotionLink>
            );
          })}
        </AnimatePresence>
      </div>

      <p className="text-contrast z-50 flex basis-[50%] items-center justify-end gap-5 text-lg font-semibold">
        © 2026 · Nguyen Tuan Duong
      </p>
    </div>
  );
}
