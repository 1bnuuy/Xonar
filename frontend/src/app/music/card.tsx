import Image from "next/image";
import { motion } from "framer-motion";

import { CardType } from "./type";
import { UploadHandler } from "./manage";

import { DataType } from "@/comp/logic/type";
import { usePlayer } from "@/comp/music/handler";
import { useUI } from "@/comp/assets/UI";

import { _Arise, _Scale } from "@/lib/motion";

export default function Card({ utility, disUtility, fS, input }: CardType) {
  const { state, dispatch } = usePlayer();
  const { visible, toggle } = useUI();

  const song = fS.id !== "new" ? (fS as DataType) : null;

  return (
    <motion.div
      variants={_Scale}
      initial="normal"
      whileTap="tap"
      animate={{
        opacity:
          utility.hoveredID !== null && utility.hoveredID !== fS.id ? 0.5 : 1,
        scale:
          utility.hoveredID !== null && utility.hoveredID !== fS.id ? 0.9 : 1,
      }}
      onMouseEnter={() => disUtility({ type: "HOVER", payload: fS.id })}
      onMouseLeave={() => disUtility({ type: "HOVER", payload: null })}
      onTapStart={() => disUtility({ type: "HOVER", payload: fS.id })}
      onPanEnd={() => disUtility({ type: "HOVER", payload: null })}
      onClick={() => {
        if (!song) return;

        if (state.currentID === null && visible === false) toggle();
        dispatch({ type: "SELECT", payload: song });
      }}
      className={`text-contrast cursor-pointer ${fS.id === "new" && "bg-success overflow-hidden border-3 border-dashed"} border-contrast relative flex h-full w-[150px] shrink-0 flex-col items-start justify-center gap-y-1 border-b-3`}
    >
      {song ? (
        <>
          <div className="bg-accent border-contrast relative size-[150px] shrink-0 overflow-hidden rounded-md border-3">
            <Image
              src="/Pee.webp"
              alt="bnuuy"
              fill
              loading="lazy"
              sizes="200px"
              className="object-cover object-center"
            />
          </div>

          <h3 className="text-2xl font-bold capitalize">{song.title}</h3>

          <p className="text-contrast">{song.artist}</p>
        </>
      ) : (
        <>
          <span className="text-accent pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[100px] opacity-50 select-none">
            +
          </span>

          <input
            ref={input}
            type="file"
            accept="audio/*"
            title=""
            className="z-20 size-full cursor-pointer appearance-none text-transparent"
            onChange={(e) => {
              const files = e.target.files;

              if (files?.[0]) {
                UploadHandler({ file: files[0], disUtility: disUtility });
                disUtility({ type: "MODAL" });
              }
            }}
            onClick={(e) => {
              const files = e.currentTarget.files;

              if (files && files.length > 0) {
                e.preventDefault();
                disUtility({ type: "MODAL" });
              }
            }}
          />
        </>
      )}
    </motion.div>
  );
}
