"use client";

import { AnimatePresence, motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faShuffle } from "@fortawesome/free-solid-svg-icons";

import { useMemo, useReducer, useRef } from "react";

import { useData } from "@/comp/logic/get";
import { usePlayer } from "@/comp/music/handler";
import { Label } from "@/comp/assets/label";

import { _Scale } from "@/lib/motion";

import { MotionCard } from "./_/card";
import { InitialUtility, UtilityReducer } from "./_/var";
import Loading from "./_/load";
import Header from "./_/header";

export default function Music() {
  const { state, dispatch } = usePlayer();
  const [utility, disUtility] = useReducer(UtilityReducer, InitialUtility);
  const { data, loading, authenticated } = useData();

  const input = useRef<HTMLInputElement | null>(null);

  const FData = useMemo(() => {
    return data?.filter((item) => {
      return item.title?.toLowerCase().includes(utility.search.toLowerCase());
    });
  }, [data, utility.search]);

  const style = `flex justify-center items-center gap-x-2 text-accent font-bold cursor-pointer hover:bg-tertiary active:bg-tertiary transition-[background-color] px-3 py-0.5 rounded-md`;

  return (
    <>
      <Header utility={utility} disUtility={disUtility} input={input} />

      <section className="content relative flex h-[calc(100dvh-77px)] w-full max-w-225! flex-col items-center gap-y-10 overflow-hidden">
        <div className="max-xs:flex-col max-xs:justify-center flex w-full items-center justify-between gap-y-6 pr-3">
          <Label text="My Music" />

          <div className="flex items-center justify-center gap-2">
            <motion.button
              variants={_Scale}
              initial="normal"
              whileHover="hover"
              whileTap="tap"
              onClick={() => {
                if (!data) return;

                dispatch({ type: "PLAY", payload: data });
              }}
              className={style}
            >
              <FontAwesomeIcon icon={faPlay} />
              <span>Play</span>
            </motion.button>

            <motion.button
              variants={_Scale}
              initial="normal"
              whileHover="hover"
              whileTap="tap"
              onClick={() => dispatch({ type: "SHUFFLE" })}
              className={`${style} ${state.shuffle && "bg-tertiary"}`}
            >
              <FontAwesomeIcon icon={faShuffle} />
              <span>Shuffle</span>
            </motion.button>
          </div>
        </div>

        <div className="custom-scroll flex h-5/6 w-full max-w-225 flex-col items-start gap-y-4 overflow-x-hidden overflow-y-auto pr-3">
          {/* <Card /> has to be the direct child of <AnimatePresence /> for the exit animation to work bruh */}

          {/* To resolve the popLayout doesn't work with exit animation (child props are delayed on unmounting), 
          there are 2 ways: 
          1. Use ref on custom component (<Card />), make the component itself a motion component instead of its content
          2. Don't use custom components at all, instead of map()... <Card />, 
          use map()... <div>...</div> 
          <-- <div>...</div> is the content of <Card />
          (silly me, I had to use ref for custom component)
          It's redundant to pass ref as motion.create() handles it (ref) itself
          
          => The main reason was popLayout take the direct child as <Card /> 
          instead of its content which is motion.div */}

          <AnimatePresence mode="popLayout">
            {loading ? (
              <Loading key="loading" />
            ) : data.length ? (
              [...(Array.isArray(FData) ? FData : [FData])]
                .sort((a, b) => {
                  const fav = (b.favorited ? 1 : 0) - (a.favorited ? 1 : 0);

                  if (fav !== 0) return fav;

                  return 0;
                })
                .map((fS, i) => {
                  return (
                    <MotionCard
                      custom={i}
                      layout
                      key={fS.id}
                      disUtility={disUtility}
                      fS={fS}
                      variants={{
                        hidden: {
                          opacity: 0,
                          x: -75,
                          y: 0,
                        },

                        show: (i) => ({
                          x: 0,

                          transition: {
                            delay: Math.log(i + 1) * 0.125,
                          },
                        }),

                        inactive: {
                          opacity: 1,
                          x: 0,
                          y: 0,
                        },

                        active: {
                          opacity: 0.35,
                          x: 0,
                          y: 3,
                        },

                        exit: {
                          opacity: 0,
                          x: 75,
                          y: 0,
                        },
                      }}
                      initial="hidden"
                      whileInView="show"
                      animate={
                        utility.hoveredID !== null &&
                        utility.hoveredID !== fS.id
                          ? "active"
                          : "inactive"
                      }
                      exit="exit"
                    />
                  );
                })
            ) : (
              <p className="w-full text-center text-lg font-semibold">
                {!authenticated
                  ? "Please log in to add songs!"
                  : "You haven't added any songs yet!"}
              </p>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
