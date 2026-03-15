import { AnimsProps, View } from "@/lib/motion";
import { AddOnTypes } from "./type";
import { motion } from "motion/react";

export const Star = ({ size, t, r, b, l, fill, stroke }: AddOnTypes) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{
        top: `${t}`,
        right: `${r}`,
        bottom: `${b}`,
        left: `${l}`,
      }}
      className={`${fill} pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2`}
    >
      <path
        d="M12 3C12 7.97056 7.97056 12 3 12C7.97056 12 12 16.0294 12 21C12 16.0294 16.0294 12 21 12C16.0294 12 12 7.97056 12 3Z"
        className={stroke}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const StarDouble = ({ size, t, r, b, l, fill, stroke }: AddOnTypes) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{
        top: `${t}`,
        right: `${r}`,
        bottom: `${b}`,
        left: `${l}`,
      }}
      className={`${fill} pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2`}
    >
      <path
        d="M10 4C10 7.31371 7.31371 10 4 10C7.31371 10 10 12.6863 10 16C10 12.6863 12.6863 10 16 10C12.6863 10 10 7.31371 10 4Z"
        className={stroke}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 15C17.5 16.3807 16.3807 17.5 15 17.5C16.3807 17.5 17.5 18.6193 17.5 20C17.5 18.6193 18.6193 17.5 20 17.5C18.6193 17.5 17.5 16.3807 17.5 15Z"
        className={stroke}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Square = ({ size, t, r, b, l, rotate, color }: AddOnTypes) => {
  return (
    <motion.svg
      variants={{
        hidden: {
          ...View.hidden,
          scale: 0.5,
        },

        show: {
          ...View.show,
          scale: 1,
        },
      }}
      viewport={{ once: true, amount: AnimsProps.entrance.viewAmount }}
      width={size}
      height={size}
      style={{
        top: `${t}`,
        right: `${r}`,
        bottom: `${b}`,
        left: `${l}`,
      }}
      viewBox="0 0 512 512"
      className={`fill-contrast ${color} pointer-events-none absolute z-0 ${rotate} -translate-x-1/2 -translate-y-1/2`}
    >
      <path d="M0 0v512h512V0H0zm492 492H20V20h472v472z" />
    </motion.svg>
  );
};

export const Brand = () => {
  return (
    <svg viewBox="0 0 24 24" className="size-12.5 fill-none">
      <path
        d="M5 14H4v7h7v-7H9"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
        className="stroke-accent"
      />
      <path
        d="M14 5V4h7v7h-7V9"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
        className="stroke-error"
      />
      <path
        d="M4 4h7v7H4z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
        className="stroke-success"
      />
      <path
        d="M14 14h7v7h-7z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
        className="stroke-contrast"
      />
    </svg>
  );
};
