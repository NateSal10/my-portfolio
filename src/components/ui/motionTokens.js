// Shared easing — long, decelerating curve used across the whole site
export const EASE = [0.16, 1, 0.3, 1];

// Variant applied to children of <Stagger>
export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
