import { AnimatePresence, motion } from "framer-motion";

import { InitialUtilityType, UtilityActionType } from "./type";
import { CancelHandler } from "./manage";

import Post from "@/comp/logic/post";
import { Border } from "@/comp/assets/border";

import { _Arise, _Scale, _Shift, View } from "@/lib/motion";

export default function Modal({
  utility,
  disUtility,
  input,
}: {
  utility: InitialUtilityType;
  disUtility: React.Dispatch<UtilityActionType>;
  input: React.RefObject<HTMLInputElement | null>;
}) {
  const { title: rawTitle, artist: rawArtist } = utility.file;

  const title = rawTitle?.trim();
  const artist = rawArtist?.trim();

  return (
    <div
      className={`fixed z-40 size-full ${!utility.modal && "pointer-events-none"}`}
    >
      <AnimatePresence>
        {utility.modal && (
          <>
            <motion.form
              variants={{
                hidden: { ...View.hidden, scale: 0 },
                show: { ...View.show, scale: 1 },
              }}
              initial="hidden"
              animate="show"
              exit="hidden"
              key="form"
              onSubmit={(e) => {
                if (!title || !artist) return;

                e.preventDefault();
                Post({
                  title: title,
                  artist: artist,
                  fileURL: "blazingsoul.mp3",
                });
              }}
              className="box bg-primary absolute top-1/2 left-1/2 z-40 flex w-11/12 max-w-[650px] min-w-[300px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-[25px] p-4"
            >
              <p className="text-contrast bg-tertiary relative w-full max-w-[300px] min-w-[200px] px-3 py-1 text-center text-2xl font-extrabold text-nowrap">
                UPLOAD FILE
                <Border w="w-5" animate={true} />
              </p>

              <input
                required
                onChange={(e) =>
                  disUtility({
                    type: "UPLOAD",
                    payload: { title: e.target.value },
                  })
                }
                type="text"
                value={title || ""}
                className="border-contrast focus:from-primary bg-tertiary w-full max-w-[475px] min-w-[200px] border-b-3 px-3 py-1 text-lg font-semibold capitalize outline-none focus:bg-linear-to-t focus:from-55% focus:to-transparent"
              />

              <input
                required
                onChange={(e) =>
                  disUtility({
                    type: "UPLOAD",
                    payload: { artist: e.target.value },
                  })
                }
                type="text"
                value={artist || ""}
                className="border-contrast focus:from-primary bg-tertiary w-full max-w-[475px] min-w-[200px] border-b-3 px-3 py-1 text-lg font-semibold capitalize outline-none focus:bg-linear-to-t focus:from-55% focus:to-transparent"
              />

              <div className="flex w-full max-w-[375px] min-w-[200px] items-center justify-between gap-2 text-xl font-semibold">
                <motion.button
                  variants={_Scale}
                  initial="normal"
                  whileHover="hover"
                  whileTap="tap"
                  type="button"
                  disabled={!title || !artist ? true : false}
                  className={`${title && artist ? "bg-success cursor-pointer" : "bg-tertiary cursor-not-allowed brightness-85"} relative px-8 py-1 transition-[background-color]`}
                >
                  Upload
                  <Border w="w-3" animate={title && artist ? true : false} />
                </motion.button>

                <motion.button
                  variants={_Scale}
                  initial="normal"
                  whileHover="hover"
                  whileTap="tap"
                  type="button"
                  onClick={() => {
                    CancelHandler({ disUtility, input });
                    disUtility({ type: "MODAL" });
                  }}
                  className="bg-tertiary hover:bg-accent-II active:text-primary hover:text-primary active:bg-error cursor-pointer px-8 py-1 transition-[background-color]"
                >
                  Abort
                </motion.button>
              </div>
            </motion.form>

            <motion.span
              variants={{
                hidden: { ...View.hidden },
                show: { opacity: 0.3 },
              }}
              initial="hidden"
              animate="show"
              exit="hidden"
              key="bg"
              onClick={() => disUtility({ type: "MODAL" })}
              className="bg-tertiary absolute z-30 size-full opacity-30 brightness-0"
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
