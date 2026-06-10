import { motion as Motion } from "framer-motion";
import { Stagger } from "../ui/motion";
import { staggerItem } from "../ui/motionTokens";

// Animated pipeline diagram — numbered nodes joined by connectors with a
// travelling data pulse on each segment
export default function ArchitectureFlow({ architecture }) {
  const steps = architecture.split("→").map(s => s.trim());

  return (
    <Stagger gap={0.08} className="flex flex-wrap items-center gap-y-6">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center">
          <Motion.div variants={staggerItem} className="relative group">
            <span className="absolute -top-2 left-3 px-1.5 font-mono text-[9px] text-zinc-400 dark:text-zinc-600 bg-[#fafafa] dark:bg-[#09090b]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="block font-mono text-xs px-4 py-2.5 border rule rounded-md text-zinc-700 dark:text-zinc-300 transition-colors group-hover:border-accent-500 group-hover:text-accent-600 dark:group-hover:text-accent-400">
              {step}
            </span>
          </Motion.div>

          {i < steps.length - 1 && (
            <Motion.div
              variants={staggerItem}
              className="relative w-7 sm:w-11 h-px mx-1.5 bg-zinc-300 dark:bg-zinc-700"
            >
              <span
                className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-accent-500 animate-flow"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-zinc-400 dark:border-zinc-600 rotate-45" />
            </Motion.div>
          )}
        </div>
      ))}
    </Stagger>
  );
}
