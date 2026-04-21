import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { HeaderType } from "./type";

import { AnimsProps, View } from "@/lib/motion";

export default function Header({ utility, disUtility, input }: HeaderType) {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <motion.div
        variants={{
          hidden: {
            ...View.hidden,
            width: "45px",
          },

          show: {
            ...View.show,
            width: "100%",

            transition: {
              duration: AnimsProps.entrance.duration,
            },
          },
        }}
        key="searchbar"
        className="bg-tertiary relative flex h-[45px] max-w-[400px] min-w-[45px] items-center gap-x-2 overflow-hidden rounded-md px-0.5"
      >
        <motion.input
          variants={{
            hidden: {
              ...View.hidden,
              display: "none",
            },

            show: {
              ...View.show,
              display: "block",
            },
          }}
          key="input"
          ref={input}
          placeholder="What do you want to play?"
          value={utility.search}
          onChange={(e) =>
            disUtility({ type: "SEARCH", payload: e.target.value })
          }
          type="text"
          className="placeholder:text-subtext size-full pl-3 outline-none"
        />

        <p className="flex size-[45px] shrink-0 items-center justify-center">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-subtext text-xl"
          />
        </p>
      </motion.div>
    </div>
  );
}
