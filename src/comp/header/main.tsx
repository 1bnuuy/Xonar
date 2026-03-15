"use client";

import Link from "next/link";

import { motion } from "motion/react";

import { _Scale } from "@/lib/motion";

import { Navigation } from "./nav";
import { Brand } from "../assets/svg";

const MotionLink = motion.create(Link);

export default function Header() {
  return (
    <div className="absolute left-1/2 z-50 flex w-11/12 -translate-x-1/2 items-center justify-between py-4">
      <MotionLink
        variants={_Scale}
        initial="normal"
        whileHover="hover"
        whileTap="tap"
        key="/"
        href="/"
        className="text-contrast flex items-center justify-center gap-2"
      >
        <Brand />
        <span className="text-2xl font-bold tracking-wider">XONAR</span>
      </MotionLink>

      <Navigation />
    </div>
  );
}
