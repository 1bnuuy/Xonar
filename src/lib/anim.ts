export const AnimsProps = {
  animDelay: 0.25,
  animDuration: 0.3,
  viewPercent: 0.3,
};

export const InteractScale = {
  initial: { scale: 1 },
  hover: { scale: 1.1 },
  tap: { scale: 0.9 },
};

export const InteractRelocateLeft = {
  initial: { scale: 1, x: 0 },
  hover: { x: -20 },
  tap: { scale: 0.95, x: -20 },
};

export const InteractRelocateRight = {
  initial: { scale: 1, x: 0 },
  hover: { x: 20 },
  tap: { scale: 0.95, x: 20 },
};

export const Scale = {
  initial: { scale: 0 },
  animate: { scale: 1 },
};

export const Fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const FadeInBottom = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
};

export const FadeInTop = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
};

export const FadeInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
};

export const FadeInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
};
