export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
};

export const slideInLeft = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }
};

export const slideInRight = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.94 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 }
  }
};
