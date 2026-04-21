export const AnimsProps = {
  entrance: {
    duration: 0.35,
    stagger: 0.3,
    viewAmount: 0.75,
    delay: 0.25, //Initial delay
  },

  interaction: {
    duration: 0.15,
  },

  loop: {
    duration: 0.8,
    delay: 0.15,
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
  },

  hover: {
    x: 6,

    transition: {
      duration: AnimsProps.interaction.duration,
      ease: AnimsProps.ease,
    },
  },

  tap: {
    x: -5,

    transition: {
      duration: AnimsProps.interaction.duration,
      ease: AnimsProps.ease,
    },
  },
};

export const _Arise = {
  normal: { opacity: 0, y: 25 },
  hover: {
    opacity: 1,
    y: 0,
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
