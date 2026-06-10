import { Mail, Linkedin, Github } from "lucide-react";
import { Reveal } from "./ui/motion";

export default function Footer() {
  return (
    <footer className="border-t rule">
      {/* Giant outline wordmark, cropped at the page edge */}
      <div className="overflow-hidden">
        <Reveal y={40}>
          <div
            aria-hidden="true"
            className="font-display font-black uppercase tracking-tight text-center leading-[0.78] select-none pointer-events-none whitespace-nowrap text-[clamp(2.6rem,10vw,9.5rem)] text-outline text-zinc-300 dark:text-zinc-800 translate-y-[0.16em] pt-16"
          >
            Nathan Salman
          </div>
        </Reveal>
      </div>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 border-t rule flex flex-col sm:flex-row justify-between items-center gap-5">
        <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-600">
          © 2026 Nathan Salman. All rights reserved.
        </span>
        <div className="flex items-center gap-6 text-zinc-400 dark:text-zinc-600">
          <a href="mailto:nathansalman10@gmail.com" aria-label="Email" className="hover:text-accent-500 transition-colors">
            <Mail size={15} />
          </a>
          <a href="https://www.linkedin.com/in/nathan-e-salman" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-accent-500 transition-colors">
            <Linkedin size={15} />
          </a>
          <a href="https://github.com/NateSal10" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-accent-500 transition-colors">
            <Github size={15} />
          </a>
        </div>
        <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-600">
          Built with React & Tailwind
        </span>
      </div>
    </footer>
  );
}
