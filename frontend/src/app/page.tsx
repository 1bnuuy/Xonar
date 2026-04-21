"use client";

import { AnimatePresence, motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faShuffle } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import { useEffect, useMemo, useReducer, useRef } from "react";

import { useData } from "@/comp/logic/get";
import { usePlayer } from "@/comp/music/handler";
import { Label } from "@/comp/assets/label";

import { _Arise, _Scale, _Shift, AnimsProps } from "@/lib/motion";

import { Card } from "./_/card";
import { PlaylistType } from "./_/type";
import { InitialUtility, UtilityReducer } from "./_/var";
import Loading from "./_/load";
import Header from "./_/header";

export default function Menu() {
  const { state, dispatch } = usePlayer();
  const [utility, disUtility] = useReducer(UtilityReducer, InitialUtility);
  const { data, FETCH, loading } = useData();

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

      <section className="content relative flex h-[calc(100dvh-77px)] w-full max-w-[900px]! flex-col items-center gap-y-10 overflow-hidden">
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
                console.log(state.song);
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

        <div className="custom-scroll flex h-5/6 w-full max-w-[900px] flex-col items-start gap-y-3 overflow-x-hidden overflow-y-auto pr-3">
          <AnimatePresence>
            {loading ? (
              <Loading />
            ) : (
              <>
                {data.length ? (
                  [...(Array.isArray(FData) ? FData : [FData])].map((fS, i) => {
                    return (
                      <Card
                        key={fS.id}
                        utility={utility}
                        disUtility={disUtility}
                        fS={fS}
                        fetchData={FETCH}
                        index={i}
                      />
                    );
                  })
                ) : (
                  <p className="w-full text-center text-lg font-semibold">
                    You haven't added any songs yet!
                  </p>
                )}
              </>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}

const Playlist = ({ state, dispatch }: PlaylistType) => {
  const currentSong = state.song.find((s) => s.id === state.currentID);

  const scroll = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollTo({
        left: scroll.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [state.song.length]);

  return (
    <div className="relative flex w-full min-w-[150px] flex-col items-center justify-start gap-5 md:w-[calc(100%-100px)]">
      <Label text="PLAYING" />

      <div
        ref={scroll}
        className="flex size-full h-[225px] items-center justify-start gap-10 overflow-hidden p-4"
      >
        {state.song.map((s) => {
          return (
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -45,
                },
                show: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="show"
              whileHover={{
                y: -12,

                transition: {
                  duration: AnimsProps.interaction.duration,
                  ease: AnimsProps.ease,
                },
              }}
              whileTap={{
                y: -6,

                transition: {
                  duration: AnimsProps.interaction.duration,
                  ease: AnimsProps.ease,
                },
              }}
              onClick={() => {
                if (!s.id) return;

                if (currentSong?.id === s.id) dispatch({ type: "NEXT" });
                dispatch({ type: "DELETE", payload: s.id });
              }}
              key={s.id}
              className={`${currentSong?.id === s.id ? "border-accent" : "border-tertiary"} flex h-full w-[165px] shrink-0 flex-col items-start justify-center gap-y-1 border-b-3 p-2`}
            >
              <div className="bg-accent border-contrast relative size-[150px] shrink-0 overflow-hidden rounded-md border-3">
                <Image
                  src="/Pee.webp"
                  alt="bnuuy"
                  fill
                  sizes="200px"
                  className="object-cover object-center"
                />
              </div>

              <h3 className="text-2xl font-bold capitalize">{s.title}</h3>

              <p className="text-contrast">{s.artist}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
