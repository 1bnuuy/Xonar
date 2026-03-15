"use client";

import { motion } from "motion/react";

import { _Shift, View } from "@/lib/motion";

import { CardType } from "./type";

export const Info = ({ title, opinion, direction }: CardType) => {
  return (
    <motion.div
      custom={direction}
      variants={{
        hidden: (direction) => ({
          ...View.hidden,
          rotate: 10 * direction,
        }),
        show: {
          ...View.show,
          rotate: 0,
        },
      }}
      whileHover={_Shift.hover}
      whileTap={_Shift.tap}
      className="bg-primary box px-2 flex min-h-[175px] w-full max-w-[750px] min-w-[300px] flex-col gap-y-2.5"
    >
      <div className="flex items-center justify-start gap-x-[15px]">
        <h3 className="text-3xl font-bold">{title}</h3>
      </div>

      <p className="text-contrast">{opinion}</p>
    </motion.div>
  );
};
