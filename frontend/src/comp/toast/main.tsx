"use client";

import {
  useState,
  createContext,
  useContext,
  useCallback,
  useRef,
} from "react";
import { AnimatePresence, motion } from "motion/react";

import {
  ToastContextType,
  ToastType,
  ToastContentType,
  ToastComponentType,
  ToastStatusType,
} from "./type";

import { AnimsProps } from "@/lib/motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faInfoCircle,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");

  return context;
};

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const cd = useRef<boolean>(false);

  const config = {
    SUCCESS: {
      background: "bg-[#eff9f6]",
      border: "border-[#61c9a8]!",
      text: "text-[#61c9a8]!",
      icon: faCheck,
    },

    ERROR: {
      background: "bg-[#fbeced]",
      border: "border-[#d64550]!",
      text: "text-[#d64550]!",
      icon: faXmark,
    },

    INFO: {
      background: "bg-[#ecf6fd]",
      border: "border-[#40a2ed]!",
      text: "text-[#40a2ed]!",
      icon: faInfoCircle,
    },
  };

  const open = (component: ToastComponentType, state: ToastStatusType) => {
    if (!cd.current) {
      const id = window.crypto.randomUUID();
      cd.current = true;

      setToasts((prev) => {
        return [...prev, { id, component: component(id), state }].slice(-3);
      });
      setTimeout(() => (cd.current = false), 150);
      setTimeout(() => close(id), 3500);
    }
  };

  const close = (id: string) =>
    setToasts((toast) => toast.filter((toast) => toast.id !== id));

  const TOAST = useCallback(
    ({ state, message }: ToastContentType) => {
      open(
        (id) => (
          <>
            <p className="z-20 flex w-[calc(100%-40px)] items-center gap-x-2 text-lg font-semibold">
              <FontAwesomeIcon
                className={`${config[state].text} shrink-0`}
                icon={config[state].icon}
              />
              <span className="line-clamp-2 font-semibold">{message}</span>
            </p>

            <button
              className="text-subtext z-20 shrink-0 cursor-pointer text-lg"
              onClick={() => close(id)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <span
              className={`absolute ${config[state].background} top-0 -left-10 z-0 h-full w-3/4 -skew-x-25`}
            />
          </>
        ),
        state,
      );
    },
    [open],
  );

  return (
    <ToastContext.Provider value={{ TOAST }}>
      {children}
      <div className="absolute bottom-5 left-1/2 z-50 flex w-11/12 max-w-135 -translate-x-1/2 flex-col items-center gap-4 px-6">
        <AnimatePresence mode="popLayout">
          {toasts.map(({ id, component, state }) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{
                duration: AnimsProps.entrance.duration,
                ease: AnimsProps.ease,
              }}
              key={id}
              className={`relative border-2 ${config[state].border} bg-secondary flex w-full items-center justify-between gap-2 overflow-hidden rounded-md px-4 py-2`}
            >
              {component}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
