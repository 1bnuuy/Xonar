import { motion, scale } from "framer-motion";

import { PendingType } from "./type";

import { AnimsProps } from "@/lib/motion";

export default function Pending({
  color,
  scale,
  height,
  isAbsolute,
}: PendingType) {
  return (
    <div
      style={{ scale: scale }}
      className={`${isAbsolute && "absolute top-1/2 left-1/2 -translate-1/2"} ${height} flex shrink-0 items-center justify-center gap-2`}
    >
      {[
        Array.from({ length: 6 }).map((_, index: number) => {
          const height = [30, 45, 25, 60, 50, 35][index];

          return (
            <motion.span
              key={index}
              animate={{ height: [height * 0.65, height, height * 0.65] }}
              transition={{
                duration: AnimsProps.loop.duration,
                delay: index * AnimsProps.loop.delay,
                repeat: Infinity,
                ease: AnimsProps.ease,
              }}
              className={`${color} z-30 w-1.5 shrink-0 rounded-full`}
            />
          );
        }),
      ]}
    </div>
  );
}
