export const AnimsProps = {
  entrance: {
    duration: 0.45,
    stagger: 0.3,
    viewAmount: 0.35,
    delay: 0.25, //Initial delay
  },

  interaction: {
    duration: 0.15,
  },

  ease: [0.34, 1.56, 0.64, 1],
} as const;

export const _Scale = {
  normal: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export const _Shift = {
  normal: {
    x: 0,
    y: 0,
    boxShadow: "-4px 4px 0px var(--color-contrast)",
  },

  hover: {
    x: 2,
    y: -2,
    boxShadow: "-6px 6px 0px var(--color-contrast)",

    transition: {
      duration: AnimsProps.interaction.duration,
      ease: AnimsProps.ease,
    },
  },

  tap: {
    x: -2,
    y: 2,
    boxShadow: "-2px 2px 0px var(--color-contrast)",

    transition: {
      duration: AnimsProps.interaction.duration,
      ease: AnimsProps.ease,
    },
  },
};

export const View = {
  hidden: {
    opacity: 0,
  },

  show: {
    opacity: 1,

    transition: {
      duration: AnimsProps.entrance.duration,
      ease: AnimsProps.ease,
    },
  },
};
