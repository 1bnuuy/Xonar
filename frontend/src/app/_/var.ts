import { UtilityActionType, InitialUtilityType } from "./type";

export const InitialUtility: InitialUtilityType = {
  search: "",
  hoveredID: null,
  modal: false,
  file: {
    coverURL: "",
    title: "",
    artist: "",
    fileURL: "",
  },
  coverObject: null,
  fileObject: null,
  tab: "FILE",
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
      return { ...state, modal: !state.modal, tab: "FILE" };

    case "UPLOAD":
      return { ...state, file: { ...state.file, ...action.payload } };

    case "SELECT_FILE":
      return { ...state, fileObject: action.payload };

    case "SELECT_COVER":
      return { ...state, coverObject: action.payload };

    case "RESET":
      return {
        ...state,
        file: { coverURL: "", title: "", artist: "", fileURL: "" },
        fileObject: null,
        coverObject: null,
      };

    case "TAB":
      return {
        ...state,
        tab: action.payload
          ? action.payload
          : state.tab === "FILE"
            ? "INPUT"
            : "FILE",
      };

    default:
      return state;
  }
};
