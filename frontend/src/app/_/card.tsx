import Image from "next/image";
import { motion } from "framer-motion";

import { CardType } from "./type";

import { DeleteType, PatchType } from "@/comp/logic/type";
import { usePatch } from "@/comp/logic/data/patch";
import { useDelete } from "@/comp/logic/data/delete";
import { useData } from "@/comp/logic/get";
import { usePlayer } from "@/comp/music/handler";
import { useUI } from "@/comp/assets/UI";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faRegularHeart,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";

const Card = ({ disUtility, fS, ref, ...anims }: CardType) => {
  const { state, dispatch } = usePlayer();
  const { audio, toggleAudio } = useUI();
  const { mutate: deleteMutate } = useDelete();
  const { mutate: patchMutate } = usePatch();
  const { FETCH } = useData();

  const Delete = (id: DeleteType) => {
    deleteMutate(
      { id, fS },
      {
        onSettled: () => {
          disUtility({ type: "HOVER", payload: null });
          FETCH();
        }, // onSettled runs regardless of failure or not <-- taking note
      },
    );
  };

  const Patch = (id: PatchType) => {
    patchMutate(
      { id, fS },
      {
        onSettled: () => {
          disUtility({ type: "HOVER", payload: null });
          FETCH();
        },
      },
    );
  };

  return (
    <div
      ref={ref}
      {...anims}
      onMouseEnter={() => disUtility({ type: "HOVER", payload: fS.id })}
      onMouseLeave={() => disUtility({ type: "HOVER", payload: null })}
      onClick={() => {
        if (!fS) return;

        if (state.currentID === null && audio === false) toggleAudio();

        dispatch({ type: "SELECT", payload: fS });
      }}
      className="bg-secondary hover:bg-tertiary/35 active:bg-tertiary/35 relative flex h-25 w-full min-w-61.25 shrink-0 cursor-pointer items-center gap-4 overflow-hidden rounded-md border-2 px-4 max-sm:gap-2 max-sm:px-2"
    >
      <div className="bg-tertiary relative size-18.75 shrink-0 overflow-hidden rounded-md border-2 max-sm:size-15">
        <Image
          src={fS.coverURL || "/Pee.webp"}
          alt="bnuuy"
          fill
          loading="eager"
          sizes="70px"
          className="object-cover object-center"
        />
      </div>

      {/* min-w-0 on children and specified width on the parent (ex. w-full) fixes truncate */}
      <div className="flex min-w-0 flex-1 flex-col justify-center *:truncate *:capitalize">
        <h3 className="text-xl font-bold max-sm:text-lg">{fS.title}</h3>

        <p className="text-subtext">{fS.artist}</p>
      </div>

      <div className="ml-auto flex items-center justify-center gap-4">
        <button
          onClick={async (e) => {
            e.stopPropagation();

            if (!fS.id) return;

            Patch({ id: fS.id });
          }}
          className={`hover:text-accent cursor-pointer text-2xl ${fS.favorited ? "text-accent" : "text-subtext"}`}
        >
          <FontAwesomeIcon
            icon={fS.favorited ? faSolidHeart : faRegularHeart}
          />
        </button>

        <button
          onClick={async (e) => {
            e.stopPropagation();

            if (!fS.id) return;

            Delete({ id: fS.id });
          }}
          className="text-subtext cursor-pointer text-2xl hover:text-red-600"
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    </div>
  );
};

export const MotionCard = motion.create(Card);
