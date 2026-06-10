import { CheckCircle, Zap } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Reveal } from "./ui/motion";

export default function About() {
  return (
    <section id="about" className="border-t rule">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-28">
        <SectionHeading index="01" label="Background" title="About Me" />

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          <Reveal className="lg:col-span-3 space-y-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            <p>
              I'm a junior at the University of Washington studying Informatics with a
              cybersecurity specialization. My focus is on the intersection of security
              engineering and automation — building tools that help teams move fast without
              creating risk.
            </p>
            <p>
              My work spans compliance automation, incident response, penetration testing, and
              security tooling. I'm most energized by projects that require translating ambiguous
              requirements — whether a regulatory framework or an architectural diagram — into
              working, secure systems.
            </p>
            <p>
              Outside of security, I enjoy exploring AI agent architectures and finding creative
              ways to automate complex workflows. I believe the best security engineers are also
              great communicators.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-2 space-y-8">
            <div className="border-t rule pt-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent-600 dark:text-accent-400 mb-4">
                Education
              </div>
              <div className="font-display font-semibold text-lg">
                B.S. Informatics — Cybersecurity
              </div>
              <div className="text-sm mt-1 text-zinc-500 dark:text-zinc-400">
                University of Washington
              </div>
              <div className="flex justify-between items-center mt-4 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                <span>GPA 3.8</span>
                <span>Expected Jun 2027</span>
              </div>
            </div>

            <div className="border-t rule pt-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent-600 dark:text-accent-400 mb-5">
                Certifications
              </div>
              <div className="space-y-5">
                <div className="flex items-start gap-3.5">
                  <CheckCircle size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium">Cybersecurity Certificate</div>
                    <div className="font-mono text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">
                      Purdue / Simplilearn
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <Zap size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium">CompTIA Security+</div>
                    <div className="font-mono text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">
                      In Progress · Expected 2026
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
