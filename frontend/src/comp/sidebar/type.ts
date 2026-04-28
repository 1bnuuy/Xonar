import { InitialUtilityType, UtilityActionType } from "@/app/_/type";
import { ToastContentType } from "../toast/type";

export type ModalType = {
  utility: InitialUtilityType;
  disUtility: React.Dispatch<UtilityActionType>;
  fetchData: () => void;
};

export type TitleType = {
  disUtility: React.Dispatch<UtilityActionType>;
  input: React.RefObject<HTMLInputElement | null>;
  text: string
  isPending: boolean
  TOAST: (content: ToastContentType) => void
};

export type FileType = {
  utility: InitialUtilityType
  disUtility: React.Dispatch<UtilityActionType>;
  audio: React.RefObject<HTMLInputElement | null>;
  image: React.RefObject<HTMLInputElement | null>;
};

export type InputType = {
  disUtility: React.Dispatch<UtilityActionType>;
  field: "TITLE" | "ARTIST";
  value: string
};
