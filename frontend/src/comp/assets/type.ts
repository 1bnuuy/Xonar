export type ToggleContextType = {
  audio: boolean;
  toggleAudio: () => void;
};

export type BorderType = {
  w: string;
  animate: boolean;
};

export type LabelType = {
  text: string;
};

export type PendingType = {
  color:
    | "bg-primary"
    | "bg-secondary"
    | "bg-tertiary"
    | "bg-accent"
    | "bg-muted"
    | "bg-subtext";
  scale: number;
  height: string;
  isAbsolute: boolean;
};
