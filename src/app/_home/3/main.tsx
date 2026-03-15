"use client";

import { Title } from "@/comp/assets/title";
import { _Shift } from "@/lib/motion";

import { AnimatePresence } from "motion/react";

import { Box } from "./box";
import { steps } from "./var";

export default function Instruction() {
  return (
    <section className="content relative flex w-full flex-col items-center justify-start gap-[45px]">
      <Title
        key="Instruction"
        subtitle="QUANTIX_101"
        title="BEGIN IN"
        highlight="4 STEPS"
        hlColor="bg-accent-II"
        inherited={false}
      />

      <div
        key="steps"
        className="z-20 flex w-full flex-col items-center justify-center gap-y-[45px]"
      >
        <AnimatePresence>
          {steps.map((s) => {
            return (
              <Box
                key={s.id}
                id={s.id}
                title={s.title}
                desc={s.desc}
                direction={s.id % 2 === 0 ? 1 : -1}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
