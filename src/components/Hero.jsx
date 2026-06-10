import { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown, Linkedin, Github } from "lucide-react";
import { LineReveal, Reveal } from "./ui/motion";
import { EASE } from "./ui/motionTokens";
import { ROLES } from "../data/roles";

const HERO_STATS = [
  { value: "7", label: "Projects Built" },
  { value: "3.8", label: "GPA" },
  { value: "3+", label: "Roles Held" },
  { value: "Jun '27", label: "Graduation" },
];

function RotatingRole({ words, interval = 2800 }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(v => (v + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);

  return (
    <span className="relative inline-block h-[1.5em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <Motion.span
          key={words[idx]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="inline-block whitespace-nowrap"
        >
          {words[idx]}
        </Motion.span>
      </AnimatePresence>
    </span>
  );
}

const ctaSecondary =
  "group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium border rule rounded-md text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors";

export default function Hero({ scrollTo }) {
  return (
    <section className="relative min-h-[92vh] flex items-center">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-5 gap-14 lg:gap-16 items-center">
          <div className="lg:col-span-3">
            <Reveal y={12}>
              <div className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400 mb-10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Open to internships & full-time roles
              </div>
            </Reveal>

            <h1 className="font-display font-black uppercase tracking-tight leading-[0.9] text-[clamp(3.6rem,9.5vw,7.5rem)] mb-8">
              <LineReveal delay={0.05}>Nathan</LineReveal>
              <LineReveal delay={0.15}>
                <span>
                  <span className="text-outline">Salman</span>
                  <span className="text-accent-500">.</span>
                </span>
              </LineReveal>
            </h1>

            <Reveal delay={0.3} y={16}>
              <div className="flex items-baseline gap-3 mb-7">
                <span className="font-mono text-base sm:text-lg text-accent-500 select-none">{">"}</span>
                <span className="font-serif italic text-2xl sm:text-3xl text-zinc-700 dark:text-zinc-200">
                  <RotatingRole words={ROLES} />
                </span>
              </div>

              <p className="text-base sm:text-lg max-w-xl mb-12 leading-relaxed text-zinc-500 dark:text-zinc-400">
                UW Informatics student building tools that make organizations safer — from
                AI-powered compliance automation to incident response and penetration testing.
              </p>

              <div className="flex flex-wrap gap-3 mb-16">
                <button
                  onClick={() => scrollTo("projects")}
                  className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-md bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 hover:bg-accent-600 dark:hover:bg-accent-400 transition-colors"
                >
                  View Projects
                  <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                <a
                  href="https://drive.google.com/file/d/1ddjB4fltQp0Zs28W6BWM5NOpqg6uZd1M/view?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                  className={ctaSecondary}
                >
                  Resume
                  <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/nathan-e-salman"
                  target="_blank"
                  rel="noreferrer"
                  className={ctaSecondary}
                  aria-label="LinkedIn"
                >
                  <Linkedin size={15} />
                </a>
                <a
                  href="https://github.com/NateSal10"
                  target="_blank"
                  rel="noreferrer"
                  className={ctaSecondary}
                  aria-label="GitHub"
                >
                  <Github size={15} />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.45} y={16}>
              <div className="grid grid-cols-2 sm:grid-cols-4 border-t rule">
                {HERO_STATS.map(s => (
                  <div key={s.label} className="py-5 pr-6">
                    <div className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                      {s.value}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500 mt-1.5">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Photo */}
          <Motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: EASE }}
            className="hidden md:flex lg:col-span-2 justify-center items-center"
          >
            <div className="relative group">
              {/* Offset frame */}
              <div className="absolute inset-0 translate-x-4 translate-y-4 border rule rounded-md transition-transform duration-500 group-hover:translate-x-2.5 group-hover:translate-y-2.5" />
              <div className="relative w-80 h-[420px] rounded-md overflow-hidden border rule">
                <img
                  src="/nathan.webp"
                  alt="Nathan Salman, Cybersecurity student at UW"
                  className="w-full h-full object-cover object-top grayscale-[35%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.02]"
                />
              </div>
              <div className="absolute -bottom-7 left-0 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600">
                Seattle, WA — UW Informatics
              </div>
            </div>
          </Motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-bounce">
        <ChevronDown size={18} className="text-zinc-400 dark:text-zinc-600" />
      </div>
    </section>
  );
}
