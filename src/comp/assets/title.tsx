import { AnimsProps, View } from "@/lib/motion";
import { TitleType } from "./type";
import { AnimatePresence, motion } from "motion/react";
import { useId } from "react";

export const Title = ({
  subtitle,
  title,
  highlight,
  hlColor,
  inherited,
}: TitleType) => {
  const id = useId();
  const inView = inherited
    ? {}
    : {
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, amount: AnimsProps.entrance.viewAmount },
      };

  return (
    <div className="flex flex-col items-center justify-center gap-y-5 text-center">
      <AnimatePresence>
        {subtitle && (
          <motion.p
            variants={{
              ...View,
              hidden: {
                ...View.hidden,
                x: -50,
              },
              show: {
                ...View.show,
                x: 0,
              },
            }}
            {...inView}
            key={`${id}-subtitle`}
            className="text-contrast-II bg-accent-II relative z-20 px-4 text-lg font-semibold text-nowrap"
          >
            {subtitle}
            <span
              key={`${id}-span-right`}
              className="border-contrast absolute top-0 right-0 h-full w-3 border-3 border-l-0 select-none"
            />
            <span
              key={`${id}-span-left`}
              className="border-contrast absolute top-0 left-0 h-full w-3 border-3 border-r-0 select-none"
            />
          </motion.p>
        )}

        <motion.h2
          variants={{
            ...View,
            hidden: {
              ...View.hidden,
              x: 50,
            },
            show: {
              ...View.show,
              x: 0,
            },
          }}
          {...inView}
          key={`${id}-title`}
          className="space-x-[1ch] text-5xl font-semibold tracking-wide md:text-6xl"
        >
          <span key="title">{title}</span>
          <span key="highlight" className="relative z-20 px-2">
            {highlight}
            <span
              className={`${hlColor} absolute -bottom-1 left-1/2 -z-10 h-1/2 w-full -translate-x-1/2 -rotate-2`}
            />
          </span>
        </motion.h2>
      </AnimatePresence>
    </div>
  );
};
