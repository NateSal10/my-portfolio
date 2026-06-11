// Official Microsoft four-square mark + wordmark lockup.
// `size` controls the square glyph height in px; the wordmark scales with it.
export default function MicrosoftLogo({ size = 18, withWordmark = true, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 21 21"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="flex-shrink-0"
      >
        <rect x="0" y="0" width="10" height="10" fill="#f25022" />
        <rect x="11" y="0" width="10" height="10" fill="#7fba00" />
        <rect x="0" y="11" width="10" height="10" fill="#00a4ef" />
        <rect x="11" y="11" width="10" height="10" fill="#ffb900" />
      </svg>
      {withWordmark && (
        <span
          className="font-sans font-semibold tracking-tight text-zinc-700 dark:text-zinc-200 leading-none"
          style={{ fontSize: size * 0.92 }}
        >
          Microsoft
        </span>
      )}
    </span>
  );
}
