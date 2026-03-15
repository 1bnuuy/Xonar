"use client";

import { Square } from "@/comp/assets/svg";
import { _Shift, View } from "@/lib/motion";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

const MotionLink = motion.create(Link);

export default function Banner() {
  return (
    <section className="content relative flex w-full flex-col items-center justify-between gap-12">
      <AnimatePresence mode="wait">
        <div
          key="title"
          className="flex basis-[50%] flex-col items-center justify-center gap-y-8"
        >
          <motion.h1
            variants={{
              hidden: {
                ...View.hidden,
                rotate: 5,
                y: -50,
              },
              show: {
                ...View.show,
                rotate: 0,
                y: 0,
              },
            }} //No whileInView and initial cuz staggerchildren in wrapper's main.tsx handled it
            className="text-contrast z-20 origin-right text-center text-6xl font-bold text-pretty md:text-7xl lg:text-8xl"
          >
            THE MUSIC{" "}
            <span className="relative">
              ARCHIVE
              <span className="animate-blink absolute select-none">_</span>
              <span className="bg-accent absolute -bottom-1.5 left-1/2 -z-10 h-1/2 w-[8ch] -translate-x-1/2 rotate-x-35 -skew-x-25" />
            </span>
          </motion.h1>

          <motion.p
            variants={{
              hidden: {
                ...View.hidden,
                rotate: 5,
                y: 50,
              },
              show: {
                ...View.show,
                rotate: 0,
                y: 0,
              },
            }}
            className="z-20 origin-left text-center text-2xl font-bold text-pretty max-md:text-xl"
          >
            &gt; QUANTIX AUDIO v1.0 //{" "}
            <span className="font-normal">
              SYNC THE FREQUENCY. NAVIGATE THE WAVEFORM.
            </span>
          </motion.p>
        </div>

        <MotionLink
          variants={{
            hidden: {
              ...View.hidden,
              y: 50,
            },
            show: {
              ...View.show,
              y: 0,
            },
          }}
          whileHover={_Shift.hover}
          whileTap={_Shift.tap} //Variants only allow one value (bruh), fixed by omitting _Shift in variants
          key="/about"
          href="/about"
          className="box bg-accent text-xl px-2 py-2.5 font-semibold text-nowrap"
        >
          [ INITIALIZE SESSION ]
        </MotionLink>

        <Square
          key="square-I"
          size={90}
          t="15%"
          l="-2.5%"
          rotate="rotate-15"
          color="bg-accent"
        />
        <Square
          key="square-II"
          size={75}
          b="-17.5%"
          r="10%"
          rotate="-rotate-25"
          color="bg-accent-II"
        />
        <Square
          key="square-III"
          size={65}
          t="2.5%"
          r="-2.5%"
          rotate="rotate-35"
          color="bg-success"
        />
      </AnimatePresence>
    </section>
  );
}
