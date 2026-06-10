import { Reveal } from "./ui/motion";

export default function SectionHeading({ index, label, title, children }) {
  return (
    <Reveal className="mb-14 sm:mb-16">
      <div className="flex items-center gap-4 mb-5">
        <span className="font-mono text-xs text-accent-600 dark:text-accent-400">{index}</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
          {label}
        </span>
        <div className="h-px flex-1 rule border-t" />
      </div>
      <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">{title}</h2>
      {children}
    </Reveal>
  );
}
