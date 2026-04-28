export type DataType = {
  id: string | null;
  coverURL: string;
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
  email: string;
};

export type ClientReloadType = {
  url: string;
  options?: RequestInit;
};

export type PostType = {
  cover: File;
  title: string;
  artist: string;
  file: File;
};

export type PatchType = {
  id: string;
};

export type DeleteType = {
  id: string;
};

export type RegisterType = {
  email: string;
  password: string;
};

export type LoginType = RegisterType;
