export type TitleType = {
  subtitle?: string;
  title: string;
  highlight: string;
  hlColor:
    | "bg-transparent"
    | "bg-primary"
    | "bg-accent"
    | "bg-accent-II"
    | "bg-tertiary"
    | "bg-contrast"
    | "bg-contrast-II"
    | "bg-success"
    | "bg-error";
  inherited: boolean;
};

export type AddOnTypes = {
  size?: number;
  t?: string;
  r?: string;
  b?: string;
  l?: string;
  fill?:
    | "fill-transparent"
    | "fill-primary"
    | "fill-accent"
    | "fill-accent-II"
    | "fill-tertiary"
    | "fill-contrast"
    | "fill-contrast-II"
    | "fill-success"
    | "fill-error";
  stroke?:
    | "stroke-transparent"
    | "stroke-primary"
    | "stroke-accent"
    | "stroke-accent-II"
    | "stroke-tertiary"
    | "stroke-contrast"
    | "stroke-contrast-II"
    | "stroke-success"
    | "stroke-error";
  color?:
    | "bg-transparent"
    | "bg-primary"
    | "bg-accent"
    | "bg-accent-II"
    | "bg-tertiary"
    | "bg-contrast"
    | "bg-contrast-II"
    | "bg-success"
    | "bg-error";
  rotate?: string;
};
