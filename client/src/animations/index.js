import { delay, easeInOut } from "framer-motion";

export const buttonClick = {
  whileTap: { scale: 0.9 },
};

export const fadeInOut = {
  initial:{ opacity: 0 },
  animate:{opacity: 1, transition: { duration: 0.5, ease: easeInOut } },
  exit:{opacity: 0, transition: { duration: 0.5, ease: easeInOut }},
};

export const slideTop = {
  initial: {opacity: 0,y:30},
  animate: {opacity: 1,y:0},
  exit: {opacity: 0,y:30},
};

export const staggerFadeInOut = (i) => {
  return {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0},
    exit : { opacity: 0, y: 50},
    transition: { duration: 0.3, delay: i * 0.15},
    key: { i },
  };
};