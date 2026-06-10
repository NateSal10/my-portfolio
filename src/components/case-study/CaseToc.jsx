// Sticky table of contents for case study pages (desktop only)
export default function CaseToc({ sections, activeId, onJump }) {
  return (
    <nav className="hidden lg:block sticky top-28 self-start">
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 mb-6">
        Contents
      </div>
      <ul className="space-y-1.5">
        {sections.map((s, i) => {
          const active = activeId === s.id;
          return (
            <li key={s.id}>
              <button
                onClick={() => onJump(s.id)}
                className={`group flex items-center gap-3 py-1 text-sm transition-colors ${
                  active
                    ? "text-zinc-900 dark:text-zinc-100"
                    : "text-zinc-400 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
              >
                <span
                  className={`h-px transition-all duration-300 ${
                    active
                      ? "w-7 bg-accent-500"
                      : "w-3.5 bg-zinc-300 dark:bg-zinc-700 group-hover:w-6"
                  }`}
                />
                <span className="font-mono text-[10px]">{String(i + 1).padStart(2, "0")}</span>
                {s.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
