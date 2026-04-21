import { DataType } from "@/comp/logic/type";
import { InitialPlayerType, PlayerActionType } from "@/comp/music/type";

export type CardType = {
  utility: InitialUtilityType;
  disUtility: React.Dispatch<UtilityActionType>;
  fS: DataType;
  fetchData: () => void;
  index: number;
};

export type HeaderType = {
  utility: InitialUtilityType;
  disUtility: React.Dispatch<UtilityActionType>;
  input: React.RefObject<HTMLInputElement | null>;
};

export type PlaylistType = {
  state: InitialPlayerType;
  dispatch: React.Dispatch<PlayerActionType>;
};

export type InitialUtilityType = {
  search: string;
  hoveredID: string | number | null;
  modal: boolean;
  file: Partial<Omit<DataType, "fileURL">>;
  tab: "FILE" | "INPUT";
};

export type UtilityActionType =
  | { type: "SEARCH"; payload: string }
  | { type: "HOVER"; payload: string | number | null }
  | { type: "MODAL" }
  | { type: "UPLOAD"; payload: Partial<Omit<DataType, "fileURL">> }
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
