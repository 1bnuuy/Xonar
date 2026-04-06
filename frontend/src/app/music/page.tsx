"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";

import { motion } from "framer-motion";

import Image from "next/image";
import { useEffect, useMemo, useReducer, useRef } from "react";

import useGet from "@/comp/logic/get";
import { usePlayer } from "@/comp/music/handler";

import { _Arise, _Scale, _Shift, AnimsProps } from "@/lib/motion";

import Card from "./card";
import Modal from "./modal";
import { LabelType, MusicType, PlaylistType } from "./type";
import { InitialUtility, musicInfo, newBtn, UtilityReducer } from "./var";

export default function Menu() {
  const [utility, disUtility] = useReducer(UtilityReducer, InitialUtility);
  const data = useGet();
  const { state, dispatch, player } = usePlayer();

  const input = useRef<HTMLInputElement | null>(null);

  const filteredSongs = useMemo(() => {
    return data?.filter((item) => {
      return item.title?.toLowerCase().includes(utility.search.toLowerCase());
    });
  }, [data, utility.search]);

  return (
    <>
      <Modal utility={utility} disUtility={disUtility} input={input} />

      <section className="content flex w-full flex-col items-center justify-center gap-[55px]">
        <Music utility={utility} disUtility={disUtility} input={input} />

        <Playlist state={state} dispatch={dispatch} />

        {/* <div className="flex w-full items-center justify-start gap-[25px]">
            <div className="relative h-[30px] w-[400px]">
              <input
                placeholder="Search..."
                value={utility.search}
                onChange={(e) =>
                  disUtility({ type: "SEARCH", payload: e.target.value })
                }
                type="text"
                className="bg-tertiary text-contrast size-full px-3 outline-none placeholder:text-gray-500"
              />

              <span className="border-contrast absolute left-0 h-full w-4 border-2 border-r-0" />
              <span className="border-contrast absolute right-0 h-full w-4 border-2 border-l-0" />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-contrast absolute top-1/2 right-2 -translate-y-1/2"
              />
            </div>

            <button>Sort</button>
          </div> */}
      </section>
    </>
  );
}

const Music = ({ utility, disUtility, input }: MusicType) => {
  return (
    <div className="relative flex w-full min-w-[150px] flex-col items-center justify-start gap-5 md:w-[calc(100%-100px)]">
      <Label text="BROWSE" prev="music-prev" next="music-next" />

      <Swiper
        modules={[Navigation, A11y, Autoplay]}
        spaceBetween={20}
        slidesPerView={1.5}
        centeredSlides={true}
        breakpoints={{
          // >= 480px (xs)
          480: {
            slidesPerView: 2,
            spaceBetween: 25,
            centeredSlides: false,
          },

          // >= 640px (sm)
          640: {
            slidesPerView: 3,
            spaceBetween: 25,
            centeredSlides: false,
          },

          // >= 1024px (lg)
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
            centeredSlides: false,
          },

          // >= 1280px (xl)
          1280: {
            slidesPerView: 6,
            spaceBetween: 40,
            centeredSlides: false,
          },
        }}
        navigation={{ prevEl: ".music-prev", nextEl: ".music-next" }}
        autoplay={{ disableOnInteraction: false, pauseOnMouseEnter: true }}
        onSliderMove={() => disUtility({ type: "HOVER", payload: null })}
        onSlideChange={() => disUtility({ type: "HOVER", payload: null })}
        className="h-[225px] w-full overflow-hidden"
      >
        {[...(musicInfo || []), newBtn].map((fS) => {
          return (
            //SwiperSlide must be the direct child of the Swiper component (bruh)
            <SwiperSlide key={fS.id}>
              <Card
                utility={utility}
                disUtility={disUtility}
                fS={fS}
                input={input}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

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
      <Label text="PLAYING" prev="playlist-prev" next="playlist-next" />

      <div
        ref={scroll}
        className="custom-scroll flex size-full h-[225px] items-center justify-start gap-10 overflow-hidden p-4"
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

const Label = ({ text, prev, next }: LabelType) => {
  const style =
    "bg-tertiary text-contrast-II size-[35px] cursor-pointer rounded-sm text-2xl font-bold";

  return (
    <div className="flex w-full">
      <span className="border-contrast top-3/4 -left-12 z-30 origin-left border-b-3 px-4 py-1 text-center text-2xl font-semibold tracking-widest md:absolute md:-rotate-90 md:text-3xl">
        {text}
      </span>

      <div className="ml-auto flex items-center justify-center gap-3">
        <motion.button
          variants={_Scale}
          initial="normal"
          whileHover="hover"
          whileTap="tap"
          className={`${style} ${prev}`}
        >
          &lt;
        </motion.button>

        <motion.button
          variants={_Scale}
          initial="normal"
          whileHover="hover"
          whileTap="tap"
          className={`${style} ${next}`}
        >
          &gt;
        </motion.button>
      </div>
    </div>
  );
};
