import { motion as Motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.22, delayChildren: 0.5 } },
};

const line = {
  hidden: { opacity: 0, x: -6 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

// Decorative terminal readout — every line is derived from the project's own data
export default function TerminalCard({ project }) {
  const stages = project.architecture.split("→").length;
  const rows = [
    { key: "status", value: project.status },
    { key: "period", value: project.period },
    { key: "role", value: project.role },
    { key: "stack", value: project.tags.slice(0, 4).join(" · ") },
    { key: "pipeline", value: `${stages} stages` },
  ];

  return (
    <Motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="w-full rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl shadow-zinc-950/30"
    >
      {/* Title bar */}
      <div className="flex items-center px-4 py-2.5 border-b border-zinc-800 bg-zinc-900">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
        </div>
        <span className="mx-auto font-mono text-[10px] text-zinc-500 truncate pl-3">
          nathan@portfolio:~/projects/{project.id}
        </span>
      </div>

      {/* Body */}
      <Motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="p-5 font-mono text-xs leading-relaxed space-y-2"
      >
        <Motion.div variants={line}>
          <span className="text-accent-400 mr-2">➜</span>
          <span className="text-zinc-100">./case-study --open {project.id}</span>
        </Motion.div>
        {rows.map(r => (
          <Motion.div variants={line} key={r.key} className="flex">
            <span className="text-zinc-500 w-20 flex-shrink-0">{r.key}</span>
            <span className="text-zinc-500 mr-3">:</span>
            <span className="text-zinc-300">{r.value}</span>
          </Motion.div>
        ))}
        <Motion.div variants={line}>
          <span className="text-emerald-400 mr-2">✓</span>
          <span className="text-zinc-400">ready — scroll for the full breakdown</span>
        </Motion.div>
        <Motion.div variants={line} className="flex items-center">
          <span className="text-accent-400 mr-2">➜</span>
          <span className="inline-block w-2 h-3.5 bg-zinc-300 animate-blink" />
        </Motion.div>
      </Motion.div>
    </Motion.div>
  );
}
