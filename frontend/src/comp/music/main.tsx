"use client";

import { motion } from "framer-motion";
import { _Scale } from "@/lib/motion";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesDown,
  faAnglesUp,
  faBackward,
  faForward,
  faPause,
  faPlay,
  faRepeat,
  faShuffle,
  faVolumeHigh,
  faVolumeLow,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef } from "react";
import { usePlayer } from "./handler";
import { useUI } from "../assets/UI";
import { AvailablePaths } from "../assets/var";
import { usePathname } from "next/navigation";

export default function Music() {
  const path = usePathname();
  const { audio, toggleAudio } = useUI();
  const { state, dispatch, player } = usePlayer();

  const request = useRef<number | undefined>(undefined);

  const isAvail = AvailablePaths.includes(path);

  const formatTime = (t: number) => {
    const mins = Math.floor(t / 60);
    const secs = Math.floor(t % 60);

    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const volHigh = !state.muted && state.volume > 50 && state.volume <= 100;
  const volLow = !state.muted && state.volume > 0 && state.volume <= 50;

  const currentSong = state.song.find((s) => s.id === state.currentID);

  const animate = useCallback(() => {
    if (player.current && state.duration > 0) {
      const safeTime = Math.min(player.current.currentTime, state.duration); //Making sure the time not exceed 100%

      dispatch({ type: "TIME", payload: safeTime });

      request.current = requestAnimationFrame(animate); //Handles audio's current time
    }
  }, [state.duration, dispatch]);

  const handleCanPlay = () => {
    if (!state.pause) {
      player.current?.play();
    }
  };

  useEffect(() => {
    if (!state.pause) {
      request.current = requestAnimationFrame(animate);
    } else {
      if (request.current) cancelAnimationFrame(request.current);
    }

    return () => {
      if (request.current) cancelAnimationFrame(request.current);
    };
  }, [state.pause, animate]);

  useEffect(() => {
    const audio = player.current;
    if (!audio) return;

    if (!state.pause && audio.paused) {
      audio.play();
    } else if (state.pause && !audio.paused) {
      audio.pause();
    }
  }, [state.pause]);

  return (
    <>
      {isAvail && (
        <motion.aside
          className={`fixed ${audio ? "bottom-0" : "-bottom-25"} right-0 z-50 h-25 w-full min-w-[269px] transition-[bottom]`}
        >
          <div className="bg-secondary relative flex size-full items-center justify-between gap-5 border-t-2 px-8 py-2.5 max-md:px-5">
            <div className="flex max-w-[275px] flex-1 items-center gap-5 max-sm:hidden">
              <div
                // style={{
                //   boxShadow:
                //     currentSong?.theme.shadow &&
                //     `0 0 20px ${currentSong.theme.shadow}`,
                // }}
                className={`relative size-18 shrink-0 overflow-hidden rounded-md`}
              >
                <Image
                  src="/Pee.webp"
                  alt="bnuuy"
                  fill
                  sizes="100px"
                  className="object-cover object-center"
                />
              </div>

              <div className="flex flex-col max-lg:hidden">
                <p className="truncate text-left text-xl font-bold capitalize">
                  {currentSong?.title || "Select a song"}
                </p>
                <p className="text-subtext truncate text-left font-semibold capitalize">
                  {currentSong?.artist || "..."}
                </p>
              </div>
            </div>

            <div className="flex h-full max-w-[575px] flex-2 flex-col justify-center gap-2">
              <div className="flex w-full items-center justify-center gap-8 *:cursor-pointer max-sm:gap-5">
                <motion.button
                  variants={_Scale}
                  initial="normal"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => dispatch({ type: "SHUFFLE" })}
                >
                  <FontAwesomeIcon
                    icon={faShuffle}
                    className={`${state.shuffle && "text-accent"} aspect-square text-xl`}
                  />
                </motion.button>

                <motion.button
                  variants={_Scale}
                  initial="normal"
                  whileHover="hover"
                  whileTap="tap"
                  className="text-xl"
                  onClick={() => {
                    dispatch({ type: "PREVIOUS" });
                  }}
                >
                  <FontAwesomeIcon icon={faBackward} />
                </motion.button>

                <motion.button
                  variants={_Scale}
                  initial="normal"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => {
                    if (!currentSong) return;

                    dispatch({ type: "PAUSE" });
                  }}
                  className={`${state.pause ? "bg-muted" : "bg-accent"} text-tertiary flex size-[45px] items-center justify-center rounded-md text-3xl`}
                >
                  <FontAwesomeIcon icon={state.pause ? faPlay : faPause} />
                </motion.button>

                <motion.button
                  variants={_Scale}
                  initial="normal"
                  whileHover="hover"
                  whileTap="tap"
                  className="text-xl"
                  onClick={() => {
                    dispatch({ type: "NEXT" });
                  }}
                >
                  <FontAwesomeIcon icon={faForward} />
                </motion.button>

                <motion.button
                  variants={_Scale}
                  initial="normal"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => dispatch({ type: "LOOP" })}
                >
                  <FontAwesomeIcon
                    icon={faRepeat}
                    className={`${state.loop && "text-accent"} aspect-square text-xl`}
                  />
                </motion.button>
              </div>

              <div className="relative z-10 flex items-center justify-between gap-3">
                <p className="font-semibold">{formatTime(state.time)}</p>

                <div className="relative h-1.5 w-full">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={
                      state.duration > 0
                        ? (state.time / state.duration) * 100
                        : 0
                    }
                    onChange={(e) => {
                      const percent = Number(e.target.value);

                      if (player.current)
                        player.current.currentTime =
                          (percent / 100) * state.duration;
                    }}
                    onMouseDown={() => {
                      if (state.pause && currentSong) {
                        dispatch({ type: "PAUSE" });
                      }
                    }}
                    onTouchStart={() => {
                      if (state.pause && currentSong) {
                        dispatch({ type: "PAUSE" });
                      }
                    }}
                    className={`custom-slider ${state.pause ? "[&::-webkit-slider-thumb]:bg-muted" : "[&::-webkit-slider-thumb]:bg-accent"} peer absolute z-20 size-full appearance-none outline-none`}
                  />

                  <span
                    style={{
                      width: `calc(${state.duration > 0 ? (state.time / state.duration) * 100 : 0}% + ${state.time / state.duration <= 0.2 ? "3px" : "0px"})`,
                    }}
                    className={`${state.pause ? "bg-muted" : "bg-accent"} peer-active:bg-muted pointer-events-none absolute top-0 left-0 z-30 h-full rounded-l-md`}
                  />
                </div>

                <p className="font-semibold">{formatTime(state.duration)}</p>
              </div>
            </div>

            <div className="flex max-w-[275px] flex-1 items-center justify-center gap-4 max-sm:hidden">
              <button onClick={() => dispatch({ type: "MUTE" })}>
                <FontAwesomeIcon
                  icon={
                    volHigh ? faVolumeHigh : volLow ? faVolumeLow : faVolumeMute
                  }
                  className="aspect-square text-2xl"
                />
              </button>

              <div className="relative z-20 size-full">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={state.muted ? 0 : state.volume}
                  onChange={(e) => {
                    const vol = e.target.valueAsNumber;

                    if (state.muted) dispatch({ type: "MUTE" });
                    dispatch({ type: "VOLUME", payload: vol });

                    if (player.current) {
                      player.current.volume = vol / 100;

                      player.current.muted = vol === 0;
                    }
                  }}
                  className="custom-slider peer [&::-webkit-slider-thumb]:bg-accent absolute size-full appearance-none outline-none"
                />
                <span
                  style={{ width: `${state.muted ? 0 : state.volume}%` }}
                  className="peer-active:bg-muted bg-accent pointer-events-none absolute top-1/2 left-0 h-[0.4rem] -translate-y-1/2 rounded-l-md"
                />
              </div>
            </div>
          </div>

          <audio
            muted={state.muted}
            loop={state.loop}
            ref={player}
            src={currentSong?.fileURL || undefined}
            onCanPlay={handleCanPlay}
            onLoadedMetadata={(e) => {
              dispatch({
                type: "DURATION",
                payload: player.current?.duration || 0,
              });

              e.currentTarget.volume = state.volume / 100;
            }}
            onEnded={() => {
              if (!currentSong) return;

              const currentIndex = state.song.findIndex(
                (s) => s.id === currentSong.id,
              );
              const isLast = currentIndex === state.song.length - 1;

              if (isLast) dispatch({ type: "PAUSE" });
              else dispatch({ type: "NEXT" });
            }}
            className="hidden"
            controls
          >
            Your browser does not support the audio element.
          </audio>

          <button
            className={`bg-secondary text-subtext absolute -top-6.5 left-1/2 z-50 flex h-7 w-25 -translate-x-1/2 cursor-pointer items-center justify-center rounded-t-md border-2 border-b-0 text-lg`}
            onClick={toggleAudio}
          >
            <FontAwesomeIcon icon={audio ? faAnglesDown : faAnglesUp} />
          </button>
        </motion.aside>
      )}
    </>
  );
}
