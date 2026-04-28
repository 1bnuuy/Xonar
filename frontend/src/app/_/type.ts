import { DataType } from "@/comp/logic/type";

export type CardType = {
  disUtility: React.Dispatch<UtilityActionType>;
  fS: DataType;
  index: number;
  ref: React.RefObject<HTMLDivElement>
};

export type HeaderType = {
  utility: InitialUtilityType;
  disUtility: React.Dispatch<UtilityActionType>;
  input: React.RefObject<HTMLInputElement | null>;
};

export type InitialUtilityType = {
  search: string;
  hoveredID: string | number | null;
  modal: boolean;
  file: Omit<DataType, "id" | "favorited">;
  fileObject: File | null;
  coverObject: File | null;
  tab: "FILE" | "INPUT";
};

export type UtilityActionType =
  | { type: "SEARCH"; payload: string }
  | { type: "HOVER"; payload: string | number | null }
  | { type: "MODAL" }
  | { type: "UPLOAD"; payload: Partial<Omit<DataType, "id" | "favorited">> }
  | { type: "SELECT_FILE"; payload: File }
  | { type: "SELECT_COVER"; payload: File }
  | { type: "RESET" }
  | { type: "TAB"; payload?: "FILE" | "INPUT" };

export type UploadHandlerType = {
  file: File;
  disUtility: React.Dispatch<UtilityActionType>;
};

export type CancelHandlerType = {
  disUtility: React.Dispatch<UtilityActionType>;
  input: React.RefObject<HTMLInputElement | null>;
};
