import { InitialPlayerType, PlayerActionType } from "./type";

export const InitialPlayer: InitialPlayerType = {
  currentID: null,
  song: [],
  time: 0,
  duration: 0,
  pause: true,
  volume: 100,
  loop: false,
  muted: false,
  shuffle: false,
};

export const PlayerReducer: (
  state: InitialPlayerType,
  action: PlayerActionType,
) => InitialPlayerType = (state, action) => {
  switch (action.type) {
    case "SELECT":
      const exist = state.song.find((s) => s.id === action.payload.id);

      return {
        ...state,
        song: exist ? state.song : [...state.song, action.payload],
        currentID: action.payload.id,
        pause: false,
        time: 0,
      };

    case "DELETE":
      const newSong = state.song.filter((s) => s.id !== action.payload);

      return {
        ...state,
        song: newSong,
        currentID: state.currentID === action.payload ? null : state.currentID,
        pause: newSong.length === 0 ? true : state.pause,
      };

    case "PREVIOUS":
      if (state.song.length === 0) return state;

      const currentP = state.song.findIndex((s) => s.id === state.currentID);
      const safeP = currentP === -1 ? 0 : currentP;
      const prevIndex = (safeP - 1 + state.song.length) % state.song.length; //Loop back to start if at the end

      return {
        ...state,
        currentID: state.song[prevIndex].id,
        pause: false,
        time: 0,
      };

    case "NEXT":
      if (state.song.length === 0) return state;

      const currentN = state.song.findIndex((s) => s.id === state.currentID);
      const safeN = currentN === -1 ? 0 : currentN;
      const nextIndex = (safeN + 1) % state.song.length;

      return {
        ...state,
        currentID: state.song[nextIndex].id,
        pause: false,
        time: 0,
      };

    case "PAUSE":
      return { ...state, pause: !state.pause };

    case "TIME":
      return { ...state, time: action.payload };

    case "DURATION":
      return { ...state, duration: action.payload };

    case "VOLUME":
      return { ...state, volume: action.payload };

    case "LOOP":
      return { ...state, loop: !state.loop };

    case "SHUFFLE":
      return { ...state, shuffle: !state.shuffle };

    case "MUTE":
      return { ...state, muted: !state.muted };

    default:
      return state;
  }
};
