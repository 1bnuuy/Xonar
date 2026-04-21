export type DataType = {
  id: string | null;
  cover: string;
  title: string;
  artist: string;
  fileURL: string;
  favorited: boolean;
};

export type DataContextType = {
  data: DataType[];
  FETCH: () => Promise<void>;
  loading: boolean;
  authenticated: boolean;
  username: string
};

export type PostType = Omit<DataType, "id" | "favorited">;

export type PatchType = {
  id: string;
} & Partial<Omit<DataType, "id">>;

export type DeleteType = {
  id: string;
} & Partial<Omit<DataType, "id">>;

export type RegisterType = {
  username: string;
  password: string;
};
