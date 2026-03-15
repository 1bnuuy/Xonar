"use client";

import { motion } from "motion/react";
import Link from "next/link";

import { _Shift, View } from "@/lib/motion";

import { ItemType } from "./type";

const MotionLink = motion.create(Link);

export const Item = ({ title, href, direction, size }: ItemType) => {
  return (
    <MotionLink
      custom={direction}
      variants={{
        hidden: {
          //Object destructuring
          ...View.hidden,
          scale: 0.9,
        },
        show: {
          ...View.show,
          scale: 1,
        },
      }}
      whileHover={_Shift.hover}
      whileTap={_Shift.tap}
      className={`box px-3 py-2 bg-primary h-full ${size}`}
      href={href}
    >
      <h3 className="text-contrast">{title}</h3>
    </MotionLink>
  );
};
