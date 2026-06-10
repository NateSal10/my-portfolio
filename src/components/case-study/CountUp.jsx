import { useState, useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

// Animates numeric stat values (e.g. "5", "8+", "3.8") counting up when
// scrolled into view; non-numeric values ("Google", "Custom") render as-is.
export default function CountUp({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const match = /^(\d+(?:\.\d+)?)(.*)$/.exec(String(value).trim());
  const [display, setDisplay] = useState(match ? `0${match[2]}` : value);

  useEffect(() => {
    if (!inView) return;
    const m = /^(\d+(?:\.\d+)?)(.*)$/.exec(String(value).trim());
    if (!m) return;
    const target = parseFloat(m[1]);
    const decimals = m[1].includes(".") ? m[1].split(".")[1].length : 0;
    const controls = animate(0, target, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => setDisplay(`${v.toFixed(decimals)}${m[2]}`),
    });
    return () => controls.stop();
  }, [inView, value]);

  return <span ref={ref}>{display}</span>;
}
