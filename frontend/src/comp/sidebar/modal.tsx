import Image from "next/image";
import { useRef } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { POST } from "@/comp/logic/post";

import { _Scale, AnimsProps, View } from "@/lib/motion";

import { CancelHandler, UploadHandler } from "./manage";
import { FileType, InputType, ModalType, TitleType } from "./type";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCirclePlus,
  faXmark,
  faMusic,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";

export default function Modal({ utility, disUtility, fetchData }: ModalType) {
  const input = useRef<HTMLInputElement | null>(null);
  const { cover, title: rawTitle, artist: rawArtist } = utility.file;

  const title = rawTitle?.trim() || "";
  const artist = rawArtist?.trim() || "";

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
              onSubmit={async (e) => {
                e.preventDefault();
                if (!cover || !title || !artist) {
                  console.error("Validation failed: Missing fields");
                  return;
                }

                try {
                  await POST({
                    cover,
                    title,
                    artist,
                    fileURL: "blazingsoul.mp3",
                  });

                  CancelHandler({ disUtility, input });
                  disUtility({ type: "MODAL" });

                  fetchData();
                } catch (err) {
                  console.error("Error during submission:", err);
                }
              }}
              className="absolute top-1/2 left-[calc(50%+40px)] z-40 w-[calc(91.667%-70px)] max-w-[500px] min-w-[275px] -translate-1/2"
            >
              <motion.div
                variants={{
                  hidden: { ...View.hidden, scale: 0, y: 0 },
                  show: {
                    ...View.show,
                    scale: utility.tab === "FILE" ? 1 : 0.95,
                    y: utility.tab === "FILE" ? 0 : -55,
                  },
                }}
                initial="hidden"
                animate="show"
                exit="hidden"
                key="INPUT"
                className={` ${utility.tab === "FILE" ? "z-40" : "pointer-events-none -z-10 brightness-90"} bg-secondary absolute flex w-full flex-col items-center justify-center gap-6 rounded-md border-2 p-4`}
              >
                <TITLE
                  utility={utility}
                  disUtility={disUtility}
                  input={input}
                  text="Add new track"
                />

                <FILE utility={utility} disUtility={disUtility} input={input} />

                <motion.button
                  variants={_Scale}
                  initial="normal"
                  whileHover="hover"
                  whileTap="tap"
                  type="button"
                  onClick={() => disUtility({ type: "TAB" })}
                  disabled={input.current?.value ? false : true}
                  className={`${input.current?.value ? "bg-accent text-contrast-II cursor-pointer" : "bg-tertiary cursor-not-allowed brightness-85"} ml-auto rounded-md px-5 py-1.5 text-lg font-semibold transition-[background-color,text]`}
                >
                  Next
                </motion.button>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { ...View.hidden, y: 0 },
                  show: {
                    opacity: utility.tab === "INPUT" ? 1 : 0,
                    y: utility.tab === "INPUT" ? 0 : 150,

                    transition: {
                      ease: AnimsProps.ease,
                    },
                  },
                }}
                initial="hidden"
                animate="show"
                exit="hidden"
                key="FILE"
                className={` ${utility.tab === "INPUT" ? "z-40" : "pointer-events-none -z-10"} bg-secondary flex flex-col items-center justify-center gap-6 rounded-md border-2 p-4`}
              >
                <TITLE
                  utility={utility}
                  disUtility={disUtility}
                  input={input}
                  text="Track details"
                />

                <INPUT disUtility={disUtility} field="TITLE" value={title} />

                <INPUT disUtility={disUtility} field="ARTIST" value={artist} />

                <div className="ml-auto flex items-center justify-center gap-4 text-lg font-semibold">
                  <motion.button
                    variants={_Scale}
                    initial="normal"
                    whileHover="hover"
                    whileTap="tap"
                    type="button"
                    onClick={() => disUtility({ type: "TAB" })}
                    className="bg-tertiary cursor-pointer rounded-md px-5 py-1.5 transition-[background-color] hover:bg-red-400/20 hover:text-red-600 active:bg-red-400/30 active:text-red-600"
                  >
                    Return
                  </motion.button>

                  <motion.button
                    variants={_Scale}
                    initial="normal"
                    whileHover="hover"
                    whileTap="tap"
                    type="submit"
                    onClick={() => console.log(cover, title, artist)}
                    disabled={!title || !artist ? true : false}
                    className={`${title && artist ? "bg-accent text-contrast-II cursor-pointer" : "bg-tertiary cursor-not-allowed brightness-85"} rounded-md px-5 py-1.5 transition-[background-color,text]`}
                  >
                    Publish
                  </motion.button>
                </div>
              </motion.div>
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
              onClick={() => {
                CancelHandler({ disUtility, input });
                disUtility({ type: "MODAL" });
              }}
              className="via-tertiary/40 from-tertiary absolute z-30 size-full bg-linear-to-t to-transparent brightness-0"
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

const TITLE = ({ utility, disUtility, input, text }: TitleType) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center justify-center gap-x-2 font-semibold">
        <span className="bg-tertiary text-accent flex size-10 items-center justify-center rounded-md">
          <FontAwesomeIcon className="text-2xl" icon={faFileCirclePlus} />
        </span>

        <p className="max-xs:text-lg text-xl">{text}</p>
      </div>

      <button
        onClick={() => {
          CancelHandler({ disUtility, input });
          disUtility({ type: "MODAL" });
        }}
        className="hover:bg-tertiary active:bg-tertiary hover:text-accent active:text-accent text-subtext size-10 cursor-pointer rounded-md text-xl"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
};

const FILE = ({ utility, disUtility, input }: FileType) => {
  return (
    <div
      className={`${utility.tab !== "FILE" && "pointer-events-none"} bg-primary ${utility.file.cover ? "w-[175px]" : "w-full"} relative h-[175px] shrink-0 origin-right overflow-hidden rounded-md border-2 border-dashed`}
    >
      {utility.file.cover ? (
        <Image
          src={utility.file.cover}
          sizes="175px"
          fill
          alt="Preview"
          loading="lazy"
          className="object-cover object-center"
        />
      ) : (
        <span className="text-subtext pointer-events-none absolute top-1/2 left-1/2 -translate-1/2 text-xl font-semibold">
          {input.current?.value ? utility.file.cover : "+ Choose File"}
        </span>
      )}

      <input
        ref={input}
        type="file"
        accept="audio/*"
        title=""
        className="size-full cursor-pointer text-transparent"
        onChange={(e) => {
          const files = e.target.files;

          if (files?.[0]) {
            UploadHandler({
              file: files[0],
              disUtility: disUtility,
            });
          }
        }}
      />
    </div>
  );
};

const INPUT = ({ disUtility, field, value }: InputType) => {
  return (
    <div className="bg-tertiary relative flex h-[45px] w-full items-center gap-x-4 overflow-hidden rounded-md px-3">
      <input
        required
        onChange={(e) =>
          disUtility({
            type: "UPLOAD",
            payload: { [field.toLowerCase()]: e.target.value },
          })
        }
        type="text"
        value={value}
        placeholder={field === "TITLE" ? "Song's title?" : "Who made it?"}
        className="placeholder:text-subtext size-full outline-none"
      />

      <FontAwesomeIcon
        icon={field === "TITLE" ? faMusic : faMicrophone}
        className="text-subtext text-xl"
      />
    </div>
  );
};
