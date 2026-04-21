import { LabelType } from "./type";

export const Label = ({ text }: LabelType) => {
  return (
    <h3 className="text-accent relative text-2xl font-bold tracking-wide">
      {text}{" "}
      <span className="bg-accent max-xs:left-1/2 max-xs:-translate-x-1/2 absolute -bottom-2 left-0 h-1 w-3/4 rounded-md" />
    </h3>
  );
};
