import { InitialUtilityType, UtilityActionType } from "@/app/_/type";

export type ModalType = {
  utility: InitialUtilityType;
  disUtility: React.Dispatch<UtilityActionType>;
  fetchData: () => void;
};

export type TitleType = {
  utility: InitialUtilityType;
  disUtility: React.Dispatch<UtilityActionType>;
  input: React.RefObject<HTMLInputElement | null>;
  text: string
};

export type FileType = Omit<TitleType, "text">;

export type InputType = {
  disUtility: React.Dispatch<UtilityActionType>;
  field: "TITLE" | "ARTIST";
  value: string
};
