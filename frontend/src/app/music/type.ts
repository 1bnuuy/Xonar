import { DataType } from "@/comp/logic/type";
import { InitialPlayerType, PlayerActionType } from "@/comp/music/type";

export type CardType = {
  utility: InitialUtilityType;
  disUtility: React.Dispatch<UtilityActionType>;
  fS: DataType | NewType;
  input: React.RefObject<HTMLInputElement | null>;
};

export type PlaylistType = {
  state: InitialPlayerType;
  dispatch: React.Dispatch<PlayerActionType>;
};

export type MusicType = {
  utility: InitialUtilityType;
  disUtility: React.Dispatch<UtilityActionType>;
  input: React.RefObject<HTMLInputElement | null>;
};

export type LabelType = {
  text: string;
  prev: string;
  next: string;
};

export type InitialUtilityType = {
  search: string;
  hoveredID: string | number | null;
  modal: boolean;
  file: Partial<Omit<DataType, "fileURL">>;
};

export type NewType = { id: "new" };

export type UtilityActionType =
  | { type: "SEARCH"; payload: string }
  | { type: "HOVER"; payload: string | number | null }
  | { type: "MODAL" }
  | { type: "UPLOAD"; payload: Partial<Omit<DataType, "fileURL">> }
  | { type: "RESET" };

export type UploadHandlerType = {
  file: File;
  disUtility: React.Dispatch<UtilityActionType>;
};

export type CancelHandlerType = {
  disUtility: React.Dispatch<UtilityActionType>;
  input: React.RefObject<HTMLInputElement | null>;
};

export type ScrollHandlerType = {
  direction: "LEFT" | "RIGHT";
};
