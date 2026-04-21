import { UtilityActionType, InitialUtilityType } from "./type";

export const InitialUtility: InitialUtilityType = {
  search: "",
  hoveredID: null,
  modal: false,
  file: {
    id: "",
    cover: "",
    title: "",
    artist: "",
    favorited: false,
  },
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
      return { ...state, modal: !state.modal };

    case "UPLOAD":
      return { ...state, file: { ...state.file, ...action.payload } };

    case "RESET":
      return {
        ...state,
        file: { id: "", cover: "", title: "", artist: "", favorited: false },
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
