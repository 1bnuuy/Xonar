import Image from "next/image";
import { motion } from "framer-motion";

import { CardType } from "./type";

import { PATCH } from "@/comp/logic/patch";
import { DELETE } from "@/comp/logic/delete";
import { usePlayer } from "@/comp/music/handler";
import { useUI } from "@/comp/assets/UI";

import { _Scale, AnimsProps } from "@/lib/motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faRegularHeart,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";

export const Card = ({
  utility,
  disUtility,
  fS,
  fetchData,
  index,
}: CardType) => {
  const { state, dispatch } = usePlayer();
  const { audio, toggleAudio } = useUI();

  return (
    <motion.div
      layout
      custom={index}
      variants={{
        hidden: { x: -50 },
        show: (index) => ({
          x: 0,
          transition: {
            delay: Math.pow(index, 0.7) * 0.05,
            type: "spring",
            visualDuration: AnimsProps.entrance.duration,
            bounce: 0.5,
          },
        }),
      }}
      initial="hidden"
      whileInView="show"
      exit={{ opacity: 0 }}
      viewport={{ once: true, amount: AnimsProps.entrance.viewAmount }}
      animate={{
        opacity:
          utility.hoveredID !== null && utility.hoveredID !== fS.id ? 0.5 : 1,
        scale:
          utility.hoveredID !== null && utility.hoveredID !== fS.id ? 0.965 : 1,
      }}
      onMouseEnter={() => disUtility({ type: "HOVER", payload: fS.id })}
      onMouseLeave={() => disUtility({ type: "HOVER", payload: null })}
      onTapStart={() => disUtility({ type: "HOVER", payload: fS.id })}
      onPanEnd={() => disUtility({ type: "HOVER", payload: null })}
      onClick={() => {
        if (!fS) return;

        if (state.currentID === null && audio === false) toggleAudio();
        dispatch({ type: "SELECT", payload: fS });
      }}
      className={`cursor-pointer ${fS.id === "new" ? "bg-accent hover:bg-muted active:bg-muted size-[65px] self-end" : "bg-secondary h-[100px] w-full min-w-[245px] border-2"} relative flex shrink-0 items-center gap-4 overflow-hidden rounded-md px-4 max-sm:gap-2 max-sm:px-2`}
    >
      <div className="bg-accent relative size-[75px] shrink-0 rounded-md border-2 max-sm:size-[60px]">
        <Image
          src="/Pee.webp"
          alt="bnuuy"
          fill
          loading="eager"
          sizes="70px"
          className="object-cover object-center"
        />
      </div>

      {/* min-w-0 fixes truncate */}
      <div className="flex min-w-0 flex-1 flex-col justify-center *:truncate *:capitalize">
        <h3 className="text-xl font-bold max-sm:text-lg">{fS.title}</h3>

        <p className="text-subtext">{fS.artist}</p>
      </div>

      <div className="ml-auto flex items-center justify-center gap-4">
        <button
          onClick={async (e) => {
            e.stopPropagation(); //Hinders parent's onClick from being fired
            if (!fS.id) return;

            await PATCH({ id: fS.id, favorited: !fS.favorited });
            fetchData();
          }}
          className={`hover:text-accent cursor-pointer text-2xl ${fS.favorited ? "text-accent" : "text-subtext"}`}
        >
          <FontAwesomeIcon
            icon={fS.favorited ? faSolidHeart : faRegularHeart}
          />
        </button>

        <button
          onClick={async (e) => {
            e.stopPropagation(); //Hinders parent's onClick from being fired
            if (!fS.id) return;

            await DELETE({ id: fS.id, favorited: !fS.favorited });
            disUtility({ type: "HOVER", payload: null });
            fetchData();
          }}
          className="text-subtext cursor-pointer text-2xl hover:text-red-600"
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    </motion.div>
  );
};
