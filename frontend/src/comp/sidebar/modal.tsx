import Image from "next/image";
import { useRef } from "react";

import { AnimatePresence, motion } from "framer-motion";

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

import { useToast } from "../toast/main";
import { useData } from "../logic/get";
import { usePost } from "../logic/data/post";
import { PostType } from "../logic/type";
import Pending from "../assets/pending";

export default function Modal({ utility, disUtility }: ModalType) {
  const inputFile = useRef<HTMLInputElement | null>(null);
  const inputImage = useRef<HTMLInputElement | null>(null);
  const { TOAST } = useToast();
  const { authenticated } = useData();
  const { mutate, isPending } = usePost();
  const { FETCH } = useData();

  const Post = (data: PostType) => {
    mutate(data, {
      onSuccess: () => {
        CancelHandler({ disUtility, input: inputFile });
        disUtility({ type: "MODAL" });
      },
      onError: () => {
        CancelHandler({ disUtility, input: inputFile });
        disUtility({ type: "MODAL" });
      },
      onSettled: () => {
        FETCH();
      },
    });
  };

  const cover = utility.coverObject;
  const { title, artist } = utility.file;
  const file = utility.fileObject;

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
              onKeyDown={(e) => {
                if (isPending && e.key === "Enter") e.preventDefault();

                return;
              }}
              onSubmit={(e) => {
                e.preventDefault();

                if (authenticated) {
                  if (file && cover) {
                    Post({
                      cover,
                      title: title.trim(),
                      artist: artist.trim(),
                      file,
                    });
                  } else {
                    TOAST({
                      state: "ERROR",
                      message: "File is either corrupted or missing(?)",
                    });
                  }
                } else {
                  TOAST({
                    state: "ERROR",
                    message: "Please log in to continue",
                  });
                }
              }}
              className="absolute top-1/2 left-[calc(50%+40px)] z-40 w-[calc(91.667%-70px)] max-w-125 min-w-68.75 -translate-1/2"
            >
              <motion.div
                variants={{
                  hidden: { ...View.hidden, scale: 1, y: -35 },
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
                  disUtility={disUtility}
                  input={inputFile}
                  text="Add new track"
                  isPending
                  TOAST={TOAST}
                />

                <div className="flex w-full flex-col items-center justify-center gap-y-2">
                  <FILE
                    utility={utility}
                    disUtility={disUtility}
                    audio={inputFile}
                    image={inputImage}
                  />

                  {utility.fileObject && (
                    <span className="text-subtext font-semibold text-nowrap">
                      &#8593; Change Cover &#8593;
                    </span>
                  )}
                </div>

                <motion.button
                  variants={_Scale}
                  initial="normal"
                  whileHover="hover"
                  whileTap="tap"
                  type="button"
                  onClick={() => disUtility({ type: "TAB" })}
                  disabled={!utility.fileObject || !utility.coverObject}
                  className={`${utility.fileObject && utility.coverObject ? "bg-accent text-contrast-II cursor-pointer" : "bg-tertiary cursor-not-allowed brightness-85"} ml-auto rounded-md px-5 py-1.5 text-lg font-semibold transition-[background-color,text]`}
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
                  disUtility={disUtility}
                  input={inputFile}
                  text="Track details"
                  isPending
                  TOAST={TOAST}
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
                    onClick={() => {
                      if (!isPending) disUtility({ type: "TAB" });
                      else
                        TOAST({
                          state: "ERROR",
                          message: "Please wait...",
                        });
                    }}
                    className={`bg-tertiary cursor-pointer rounded-md px-5 py-1.5 transition-[background-color] hover:bg-red-400/20 hover:text-red-600 active:bg-red-400/30 active:text-red-600`}
                  >
                    Return
                  </motion.button>

                  <motion.button
                    variants={_Scale}
                    initial="normal"
                    whileHover="hover"
                    whileTap="tap"
                    type="submit"
                    disabled={!title || !artist || isPending}
                    className={`${title && artist ? (isPending ? "bg-muted cursor-not-allowed" : "bg-accent text-contrast-II cursor-pointer") : "bg-tertiary cursor-not-allowed brightness-85"} rounded-md px-5 py-1.5 transition-[background-color,text]`}
                  >
                    {!isPending ? (
                      "Publish"
                    ) : (
                      <Pending
                        color="bg-secondary"
                        height="h-7"
                        scale={0.5}
                        isAbsolute={false}
                      />
                    )}
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
                if (!isPending) {
                  CancelHandler({ disUtility, input: inputFile });
                  disUtility({ type: "MODAL" });
                } else
                  TOAST({
                    state: "ERROR",
                    message: "Please wait...",
                  });
              }}
              className="via-tertiary/40 from-tertiary absolute z-30 size-full bg-linear-to-t to-transparent brightness-0"
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

const TITLE = ({ disUtility, input, text, isPending, TOAST }: TitleType) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center justify-center gap-x-2 font-semibold">
        <span className="bg-tertiary text-accent flex size-10 items-center justify-center rounded-md">
          <FontAwesomeIcon className="text-2xl" icon={faFileCirclePlus} />
        </span>

        <p className="max-xs:text-lg text-xl">{text}</p>
      </div>

      <button
        type="button"
        onClick={() => {
          if (!isPending) {
            CancelHandler({ disUtility, input });
            disUtility({ type: "MODAL" });
          } else
            TOAST({
              state: "ERROR",
              message: "Please wait...",
            });
        }}
        className="hover:bg-tertiary active:bg-tertiary hover:text-accent active:text-accent text-subtext size-10 cursor-pointer rounded-md text-xl"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
};

const FILE = ({ utility, disUtility, audio, image }: FileType) => {
  const { TOAST } = useToast();

  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      TOAST({
        state: "ERROR",
        message: "Your image exceeds the 5MB limit",
      });
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const imageBase64 = reader.result as string;

      disUtility({
        type: "UPLOAD",
        payload: { ...utility.file, coverURL: imageBase64 },
      });

      disUtility({ type: "SELECT_COVER", payload: file });
    };

    reader.readAsDataURL(file);
  };

  return (
    <div
      className={`${utility.tab !== "FILE" && "pointer-events-none"} bg-primary ${utility.file.coverURL ? "w-45" : "w-full"} hover:border-accent! active:border-accent! group relative h-45 shrink-0 origin-right overflow-hidden rounded-md border-2 border-dashed transition-[border-color]`}
    >
      {utility.file.coverURL ? (
        <div className="relative z-10 size-full">
          <Image
            src={utility.file.coverURL}
            sizes="175px"
            fill
            alt="Preview"
            loading="lazy"
            className="-z-10 object-cover object-center"
          />

          <input
            ref={image}
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            title=""
            className="z-20 size-full cursor-pointer text-transparent select-none"
            onChange={(e) => imageHandler(e)}
          />
        </div>
      ) : (
        <span className="text-subtext group-hover:text-accent group-active:text-accent pointer-events-none absolute top-1/2 left-1/2 -translate-1/2 text-xl font-semibold transition-[color]">
          + Choose File
        </span>
      )}

      <input
        ref={audio}
        type="file"
        accept="audio/*"
        title=""
        className="size-full cursor-pointer text-transparent select-none"
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
    <div className="bg-tertiary relative flex h-11.25 w-full items-center gap-x-4 overflow-hidden rounded-md px-3">
      <input
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
