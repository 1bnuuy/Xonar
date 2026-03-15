"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { AnimatePresence, motion } from "motion/react";
import { _Scale, _Shift } from "@/lib/motion";

import { links } from "./var";

import Link from "next/link";

const MotionLink = motion.create(Link);

export const Navigation = () => {
  const musicIcon = `
    last-of-type:bg-accent-II
    last-of-type:text-contrast-II
    last-of-type:size-13
    last-of-type:md:flex
    last-of-type:justify-center
    last-of-type:items-center
    last-of-type:text-3xl
    last-of-type:shadow-none!
    last-of-type:ring-3
    last-of-type:ring-contrast
    last-of-type:ring-offset-3
    last-of-type:border-none
  `;

  return (
    <div className="z-50 flex items-center justify-center gap-5">
      <AnimatePresence>
        {links.map((link) => {
          return (
            <MotionLink
              variants={link.id === "♪" ? _Scale : _Shift}
              initial="normal"
              whileHover="hover"
              whileTap="tap"
              href={link.path}
              key={link.path}
              className={`text-contrast box ${musicIcon} bg-primary hidden px-3 py-1.5 text-lg font-semibold md:block`}
            >
              <span>{link.id}</span>
            </MotionLink>
          );
        })}
      </AnimatePresence>

      <div className="hidden cursor-pointer items-center justify-center max-md:flex">
        <FontAwesomeIcon
          icon={faBars}
          className="text-contrast hover:text-accent active:text-accent text-2xl"
        />
      </div>
    </div>
  );
};
