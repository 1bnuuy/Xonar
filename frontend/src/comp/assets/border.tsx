import { View } from "@/lib/motion";

import { BorderType } from "./type";

import { motion } from "framer-motion";

export const Border = ({ w, animate }: BorderType) => {
  const style =
    "border-contrast pointer-events-none absolute top-0 h-full border-3";

  return (
    <>
      <motion.span
        variants={{
          hidden: {
            ...View.hidden,
            x: -25,
          },
          show: {
            ...View.show,
            x: 0,
          },
        }}
        initial="hidden"
        animate={animate ? "show" : "hidden"}
        key="left"
        className={`${w} left-0 border-r-0 ${style}`}
      />
      <motion.span
        variants={{
          hidden: {
            ...View.hidden,
            x: 25,
          },
          show: {
            ...View.show,
            x: 0,
          },
        }}
        initial="hidden"
        animate={animate ? "show" : "hidden"}
        key="right"
        className={`${w} ${style} right-0 border-l-0`}
      />
    </>
  );
};
