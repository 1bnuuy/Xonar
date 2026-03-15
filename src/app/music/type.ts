export type CardType = {
  id: number;
  name: string;
  author: string;
};

export type SongType = {
  id: string;
  name: string;
  author: string;
  date: string;
  favorite: boolean;
};

export type InitialMusicType = {
  song: SongType[];
  search: string;
};

export type MusicActionType = { type: "SEARCH"; payload: string };
