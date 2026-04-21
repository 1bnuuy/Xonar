"use client";

import { usePathname } from "next/navigation";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

import { AnimsProps } from "@/lib/motion";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const path = usePathname();

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
      key={path} //Missing a key breaks motion on route change
      initial="hidden"
      animate="show"
      className={`bg-primary relative flex min-h-dvh ${path === "/auth" ? "w-screen":"w-[calc(100%-72px)]"} flex-col items-center justify-between overflow-hidden`}
    >
      {children}
    </motion.main>
  );
}
