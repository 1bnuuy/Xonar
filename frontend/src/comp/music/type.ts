import { DataType } from "../logic/type";

export type InitialPlayerType = {
  currentID: string | null;
  song: DataType[];
  time: number;
  duration: number;
  pause: boolean;
  volume: number;
  loop: boolean;
  muted: boolean;
  shuffle: boolean;
};

export type PlayerActionType =
  | { type: "SELECT"; payload: DataType }
  | { type: "PLAY"; payload: DataType[] }
  | { type: "DELETE"; payload: string }
  | { type: "PREVIOUS" }
  | { type: "NEXT" }
  | { type: "TIME"; payload: number }
  | { type: "DURATION"; payload: number }
  | { type: "PAUSE" }
  | { type: "VOLUME"; payload: number }
  | { type: "LOOP" }
  | { type: "SHUFFLE" }
  | { type: "MUTE" };

export type PlayerContextType = {
  state: InitialPlayerType;
  dispatch: React.Dispatch<PlayerActionType>;
  player: React.RefObject<HTMLAudioElement | null>;
};
