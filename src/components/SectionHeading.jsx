import { Reveal } from "./ui/motion";

// Oversized mixed-type section heading: heavy uppercase display + serif italic accent
export default function SectionHeading({ index, label, title, accent, children }) {
  return (
    <Reveal className="mb-14 sm:mb-20">
      <div className="flex items-center gap-4 mb-7">
        <span className="font-mono text-xs text-accent-600 dark:text-accent-400">{index}</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
          {label}
        </span>
        <div className="h-px flex-1 rule border-t" />
      </div>
      <h2 className="font-display font-black uppercase tracking-tight leading-[0.92] text-5xl sm:text-6xl lg:text-7xl">
        {title}
        {accent && (
          <>
            {" "}
            <span className="font-serif italic font-normal normal-case tracking-normal text-[0.9em] text-accent-600 dark:text-accent-400">
              {accent}
            </span>
          </>
        )}
      </h2>
      {children}
    </Reveal>
  );
}
