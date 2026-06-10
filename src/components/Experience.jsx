import SectionHeading from "./SectionHeading";
import { Stagger } from "./ui/motion";
import { staggerItem } from "./ui/motionTokens";
import { motion as Motion } from "framer-motion";
import { EXPERIENCE } from "../data/portfolioData";

function ExperienceRow({ job }) {
  return (
    <Motion.div variants={staggerItem} className="grid sm:grid-cols-12 gap-x-6 gap-y-3 border-t rule last:border-b py-9">
      {/* Period / type */}
      <div className="sm:col-span-3">
        <div className="font-mono text-xs text-zinc-500 dark:text-zinc-400">{job.period}</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600 mt-2">
          {job.type}
        </div>
      </div>

      {/* Role */}
      <div className="sm:col-span-9">
        <h3 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight">{job.title}</h3>
        <p className="mt-1.5 mb-5">
          <span className="font-serif italic text-lg text-accent-600 dark:text-accent-400">{job.company}</span>
          <span className="text-sm text-zinc-400 dark:text-zinc-600"> · {job.location}</span>
        </p>
        <ul className="space-y-2.5 max-w-2xl">
          {job.bullets.map((b, j) => (
            <li key={j} className="text-sm flex gap-3.5 leading-relaxed text-zinc-600 dark:text-zinc-400">
              <span className="font-mono text-accent-500 select-none flex-shrink-0">—</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </Motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="border-t rule">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-28">
        <SectionHeading index="03" label="Career" title="Work" accent="experience." />
        <Stagger gap={0.08}>
          {EXPERIENCE.map((job, i) => (
            <ExperienceRow key={i} job={job} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
