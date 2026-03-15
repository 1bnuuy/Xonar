import { InitialMusicType, MusicActionType } from "./type";

export const musicInfo = [
  {
    id: 1,
    name: "Why We Lose",
    author: "Cartoon feat. Coleman Trapp",
  },

  {
    id: 2,
    name: "Espresso",
    author: "Cartoon feat. Coleman Trapp",
  },

  {
    id: 3,
    name: "Mocha",
    author: "Cartoon feat. Coleman Trapp",
  },
];

export const InitialMusic = {
  song: [],
  search: "",
};

export const MusicReducer: (
  state: InitialMusicType,
  action: MusicActionType,
) => InitialMusicType = (state, action) => {
  switch (action.type) {
    case "SEARCH":
      return { ...state, search: action.payload };
  }
};
