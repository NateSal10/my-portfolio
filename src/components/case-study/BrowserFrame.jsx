// Screenshot presented inside a minimal browser-chrome mockup
export default function BrowserFrame({ src, caption, className = "" }) {
  return (
    <figure
      className={`group border rule rounded-lg overflow-hidden bg-white dark:bg-zinc-950 transition-shadow duration-300 hover:shadow-xl hover:shadow-zinc-950/10 dark:hover:shadow-zinc-950/50 ${className}`}
    >
      <div className="flex items-center px-4 py-2.5 border-b rule">
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
        </div>
        <figcaption className="mx-auto font-mono text-[10px] text-zinc-400 dark:text-zinc-500 truncate pl-3">
          {caption}
        </figcaption>
      </div>
      <div className="overflow-hidden">
        <img
          src={src}
          alt={caption}
          className="w-full object-cover object-top bg-zinc-100 dark:bg-zinc-900 transition-transform duration-500 group-hover:scale-[1.02]"
          onError={e => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div className="hidden items-center justify-center aspect-video bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-600 text-xs font-mono px-4 text-center">
          {caption}
        </div>
      </div>
    </figure>
  );
}
