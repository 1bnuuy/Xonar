"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useReducer } from "react";
import { motion } from "motion/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import { _Scale, View } from "@/lib/motion";

import { InitialUtility, UtilityReducer } from "@/app/_/var";

import { useUI } from "../assets/UI";
import { AvailablePaths } from "../assets/var";
import { useData } from "../logic/get";

import { Brand } from "./brand";
import { links } from "./var";
import Modal from "./modal";

const MotionLink = motion.create(Link);

export default function Sidebar() {
  const path = usePathname();
  const { audio } = useUI();
  const [utility, disUtility] = useReducer(UtilityReducer, InitialUtility);
  const { FETCH, authenticated, email } = useData();

  const isAvail = AvailablePaths.includes(path);

  const active = links.findIndex((l) => l.path === path);

  return (
    <>
      {isAvail && (
        <>
          <Modal utility={utility} disUtility={disUtility} fetchData={FETCH} />

          <motion.div
            variants={{
              hidden: {
                ...View.hidden,
                x: -40,
              },

              show: {
                ...View.show,
                x: 0,
              },
            }}
            initial="hidden"
            animate="show"
            className={`bg-secondary relative z-50 flex ${audio ? "h-[calc(100dvh-98px)]" : "h-dvh"} w-18 shrink-0 flex-col items-center justify-center gap-y-12 overflow-hidden border-r-2 px-2 py-5 transition-[width,height]`}
          >
            <h1 className="sr-only">Xonar</h1>
            <Link href="/" className="flex items-center gap-2">
              <Brand />
            </Link>

            <button
              onClick={() => disUtility({ type: "MODAL" })}
              className="bg-tertiary text-subtext hover:bg-accent active:bg-accent hover:text-contrast-II active:text-contrast-II size-12.5 shrink-0 cursor-pointer rounded-full text-5xl transition-[background,color]"
            >
              +
            </button>

            <div className="relative flex size-full flex-col items-center gap-4">
              {links.map((l) => {
                return (
                  <MotionLink
                    variants={_Scale}
                    initial="normal"
                    whileHover="hover"
                    whileTap="tap"
                    href={l.path}
                    key={l.path}
                    className={`relative flex size-12.5 shrink-0 items-center justify-center rounded-md text-2xl font-semibold ${l.path === path ? "text-accent" : "text-subtext hover:bg-tertiary/50 active:bg-tertiary/50"}`}
                  >
                    <h3 className="sr-only">{l.title}</h3>
                    <FontAwesomeIcon icon={l.icon} />
                  </MotionLink>
                );
              })}

              {active !== -1 && (
                <motion.span
                  layoutId="highlight"
                  animate={{ y: active * (50 + 16) }} // 50px (link's size) + 16px (gap)
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="bg-tertiary absolute left-1/2 -z-10 size-12.5 -translate-x-1/2 rounded-md"
                />
              )}

              <MotionLink
                variants={_Scale}
                initial="normal"
                whileHover="hover"
                whileTap="tap"
                href={authenticated ? "/dashboard" : "/auth"}
                key="/auth"
                className={`text-subtext bg-tertiary relative mt-auto flex size-12.5 shrink-0 items-center justify-center rounded-md text-2xl font-semibold ${path === "/profile" && "ring-accent ring-offset-secondary ring-2 ring-offset-2"}`}
              >
                <h3 className="sr-only">Account</h3>
                {authenticated ? (
                  <span className="capitalize">{email[0]}</span>
                ) : (
                  <FontAwesomeIcon icon={faUser} />
                )}
              </MotionLink>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}
