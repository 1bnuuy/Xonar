import { DataType } from "@/comp/logic/type";
import { UtilityActionType, InitialUtilityType, NewType } from "./type";

export const newBtn: NewType = {
  id: "new",
};

export const musicInfo: DataType[] = [
  {
    id: "1",
    title: "1",
    artist: "1",
    fileURL: "chase.mp3",
  },

  {
    id: "2",
    title: "2",
    artist: "2",
    fileURL: "blazingsoul.mp3",
  },

  {
    id: "3",
    title: "3",
    artist: "3",
    fileURL: "chase.mp3",
  },

  {
    id: "4",
    title: "4",
    artist: "4",
    fileURL: "blazingsoul.mp3",
  },

  {
    id: "5",
    title: "5",
    artist: "5",
    fileURL: "chase.mp3",
  },

  {
    id: "6",
    title: "6",
    artist: "6",
    fileURL: "blazingsoul.mp3",
  },

  {
    id: "7",
    title: "7",
    artist: "7",
    fileURL: "chase.mp3",
  },

  {
    id: "8",
    title: "8",
    artist: "8",
    fileURL: "blazingsoul.mp3",
  },
];

export const InitialUtility: InitialUtilityType = {
  search: "",
  hoveredID: null,
  modal: false,
  file: {
    id: "",
    title: "",
    artist: "",
  },
};

export const UtilityReducer: (
  state: InitialUtilityType,
  action: UtilityActionType,
) => InitialUtilityType = (state, action) => {
  switch (action.type) {
    case "SEARCH":
      return { ...state, search: action.payload };

    case "HOVER":
      return { ...state, hoveredID: action.payload };

    case "MODAL":
      return { ...state, modal: !state.modal };

    case "UPLOAD":
      return { ...state, file: { ...state.file, ...action.payload } };

    case "RESET":
      return { ...state, file: { id: "", title: "", artist: "" } };

    default:
      return state;
  }
};
