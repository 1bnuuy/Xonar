"use client";

import { _Scale } from "@/lib/motion";
import { CardType } from "./type";
import { motion } from "motion/react";

export const Card = ({ id, name, author }: CardType) => {
  return (
    <motion.div
      variants={_Scale}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      key={id}
      className="text-contrast bg-secondary relative h-[400px] w-[300px] cursor-pointer rounded-lg border-3 text-2xl font-semibold text-nowrap"
    >
      <span className="text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] opacity-10 select-none">
        {id > 0 && id < 10 ? `0${id}` : id}
      </span>

      <div className="bg-primary absolute -top-0.75 -right-0.75 flex w-[200px] items-center justify-center rounded-bl-lg border-b-3 border-l-3 pb-2 pl-2 text-center">
        <span className="border-contrast bg-secondary w-full rounded-tr-lg rounded-bl-lg border-3 px-4 py-1">
          {name}
        </span>
      </div>

      <div className="flex size-full items-center justify-center">
        <span>{name}</span>
      </div>

      <div className="bg-primary absolute -bottom-0.75 -left-0.75 flex w-[125px] items-center justify-center rounded-tr-lg border-t-3 border-r-3 pt-2 pr-2 text-center">
        <span className="border-contrast bg-secondary w-full rounded-tr-lg rounded-bl-lg border-3 px-4 py-1">
          {author}
        </span>
      </div>
    </motion.div>
  );
};
