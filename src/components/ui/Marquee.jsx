function Row({ items }) {
  return (
    <div className="flex items-center flex-none">
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span
            className={`font-display font-black uppercase tracking-tight text-2xl sm:text-4xl whitespace-nowrap px-7 sm:px-9 ${
              i % 2 ? "text-outline" : ""
            }`}
          >
            {t}
          </span>
          <span className="text-accent-500 text-xs sm:text-sm select-none">✦</span>
        </span>
      ))}
    </div>
  );
}

// Infinite scrolling type band — duplicated row translates -50% for a seamless loop
export default function Marquee({ items }) {
  return (
    <div aria-hidden="true" className="overflow-hidden border-y rule py-5 sm:py-6 select-none">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <Row items={items} />
        <Row items={items} />
      </div>
    </div>
  );
}
