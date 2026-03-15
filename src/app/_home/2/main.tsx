"use client";

import { Title } from "@/comp/assets/title";

import { categories } from "./var";
import { Item } from "./item";

import { AnimatePresence } from "motion/react";

export default function Featured() {
  return (
    <section className="content relative flex w-full flex-col items-center justify-start gap-[45px]">
      <Title
        subtitle="EXPLORE"
        title="SIT BACK"
        highlight="RELAX"
        hlColor="bg-success"
        inherited={true}
      />

      <div className="z-20 grid h-[700px] w-full max-md:grid-cols-1 max-md:grid-rows-6 max-w-[1150px] grid-cols-3 items-center justify-center gap-[15px]">
        <AnimatePresence>
          {categories.map((c) => {
            return (
              <Item
                key={c.id}
                title={c.title}
                href={c.href}
                direction={c.id % 2 === 0 ? 1 : -1}
                size={c.id === 1 || c.id === 4 ? "col-span-2 max-md:row-span-2 max-md:col-span-1" : "col-span-1"}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
