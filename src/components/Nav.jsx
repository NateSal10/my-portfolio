import { Menu, X, Github, Sun, Moon } from "lucide-react";
import { NAV_ITEMS } from "../data/portfolioData";

const linkBase =
  "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100";

export default function Nav({ activeSection, scrollTo, darkMode, toggleDark, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md border-b rule bg-[#fafafa]/80 dark:bg-[#09090b]/80">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display font-semibold text-base tracking-tight select-none"
          >
            Nathan Salman<span className="text-accent-500">.</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item, i) => {
              const active = activeSection === item.toLowerCase();
              return (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className={`group relative px-3.5 py-2 text-sm transition-colors ${
                    active ? "text-zinc-900 dark:text-zinc-100" : linkBase
                  }`}
                >
                  <span className="font-mono text-[10px] text-accent-600 dark:text-accent-400 mr-1.5 align-top">
                    0{i + 1}
                  </span>
                  {item}
                  <span
                    className={`absolute left-3.5 right-3.5 -bottom-px h-px bg-zinc-900 dark:bg-zinc-100 origin-left transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </button>
              );
            })}
            <div className="w-px h-4 mx-3 bg-zinc-300 dark:bg-zinc-700" />
            <a
              href="https://github.com/NateSal10"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className={`p-2 transition-colors ${linkBase}`}
            >
              <Github size={16} />
            </a>
            <button
              onClick={toggleDark}
              aria-label="Toggle theme"
              className={`p-2 transition-colors ${linkBase}`}
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
            className={`md:hidden p-2 ${linkBase}`}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t rule bg-[#fafafa] dark:bg-[#09090b]">
          <div className="max-w-6xl mx-auto px-5 py-4 space-y-1">
            {NAV_ITEMS.map((item, i) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className={`block w-full text-left px-3 py-2.5 text-sm transition-colors ${
                  activeSection === item.toLowerCase()
                    ? "text-zinc-900 dark:text-zinc-100"
                    : linkBase
                }`}
              >
                <span className="font-mono text-[10px] text-accent-600 dark:text-accent-400 mr-2">0{i + 1}</span>
                {item}
              </button>
            ))}
            <div className="flex items-center gap-2 px-3 pt-2 border-t rule">
              <a
                href="https://github.com/NateSal10"
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-2 py-2.5 text-sm ${linkBase}`}
              >
                <Github size={15} /> GitHub
              </a>
              <button onClick={toggleDark} className={`flex items-center gap-2 py-2.5 px-4 text-sm ${linkBase}`}>
                {darkMode ? <Sun size={15} /> : <Moon size={15} />}
                {darkMode ? "Light" : "Dark"}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
