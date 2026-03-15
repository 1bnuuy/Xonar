"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { AnimsProps } from "@/lib/motion";
import { usePathname } from "next/navigation";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const location = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.main
      variants={{
        show: {
          transition: {
            staggerChildren: AnimsProps.entrance.stagger,
            delayChildren: AnimsProps.entrance.delay,
          },
        },
      }}
      key={location} //Missing a key breaks motion on route change
      initial="hidden"
      animate="show"
      className={`bg-primary grid-background relative flex min-h-dvh w-full flex-col items-center justify-between overflow-hidden px-5`}
    >
      {children}
    </motion.main>
  );
}
