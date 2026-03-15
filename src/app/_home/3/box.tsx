"use client";

import { motion } from "motion/react";

import { _Shift, AnimsProps, View } from "@/lib/motion";

import { BoxType } from "./type";

export const Box = ({ id, title, desc, direction }: BoxType) => {
  return (
    <motion.div
      custom={direction}
      variants={{
        hidden: (direction) => ({
          ...View.hidden,
          rotate: 10 * direction,
          y: 50,
        }),
        show: {
          ...View.show,
          rotate: 0,
          y: 0,
        },
      }}
      initial="hidden"
      whileInView="show"
      whileHover={_Shift.hover}
      whileTap={_Shift.tap}
      viewport={{ once: true, amount: AnimsProps.entrance.viewAmount }}
      className={`bg-primary box p-2 flex min-h-[175px] w-full max-w-[750px] min-w-[300px] flex-col gap-y-2.5 ${id % 2 === 0 ? "-rotate-2" : "rotate-2"}`}
    >
      <div className="flex items-center justify-start gap-x-[15px]">
        <span
          className={`text-contrast border-contrast flex size-[50px] items-center justify-center border-3 text-2xl font-bold ${id === 1 ? "bg-tertiary" : id === 2 ? "bg-accent-II" : id === 3 ? "bg-accent" : id === 4 && "bg-success"}`}
        >
          {"0" + id}
        </span>

        <h3 className="text-3xl font-bold">{title}</h3>
      </div>

      <p className="text-contrast">{desc}</p>
    </motion.div>
  );
};
