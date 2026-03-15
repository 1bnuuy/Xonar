"use client";

import { Title } from "@/comp/assets/title";
import { AnimsProps } from "@/lib/motion";
import { AnimatePresence, motion } from "motion/react";
import { testimonials } from "./var";
import { Info } from "./card";

export default function Testimonials() {
  return (
    <section className="content relative flex w-full flex-col items-center justify-start gap-[45px]">
      <Title
        subtitle="SHARED_EXPERIENCES"
        title="VOICES OF"
        highlight="OUR COMMUNITY"
        hlColor="bg-accent"
        inherited={true}
      />

      <div className="flex items-center justify-evenly gap-15 text-pretty max-md:flex-col max-md:items-center max-md:text-center">
        <AnimatePresence>
          <motion.div
            variants={{
              show: {
                transition: {
                  staggerChildren: AnimsProps.entrance.stagger,
                  delayChildren: AnimsProps.entrance.delay,
                },
              },
            }}
            key="steps"
            initial="hidden"
            whileInView="show"
            className="z-20 flex w-screen bg-red-500 gap-y-[45px]"
          >
            {testimonials.map((t) => {
              return (
                <Info
                  key={t.id}
                  name={t.name}
                  title={t.title}
                  opinion={t.opinion}
                  direction={t.id % 2 === 0 ? 1 : -1}
                />
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
