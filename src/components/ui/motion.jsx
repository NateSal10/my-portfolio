import { motion as Motion } from "framer-motion";
import { EASE } from "./motionTokens";

export function Reveal({ children, delay = 0, y = 28, className = "", ...rest }) {
  return (
    <Motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </Motion.div>
  );
}

// Masked line reveal — text slides up from behind an overflow-hidden clip
export function LineReveal({ children, delay = 0, className = "" }) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <Motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </Motion.span>
    </span>
  );
}

export function Stagger({ children, className = "", delay = 0, gap = 0.08 }) {
  return (
    <Motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
      className={className}
    >
      {children}
    </Motion.div>
  );
}
