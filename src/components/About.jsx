import { CheckCircle, ExternalLink } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Reveal } from "./ui/motion";

export default function About() {
  return (
    <section id="about">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-28">
        <SectionHeading index="01" label="Background" title="About" accent="me." />

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          <Reveal className="lg:col-span-3 space-y-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            <p className="first-letter:float-left first-letter:font-serif first-letter:italic first-letter:text-[3.3em] first-letter:leading-[0.78] first-letter:mr-3 first-letter:mt-1 first-letter:text-accent-600 dark:first-letter:text-accent-400">
              I'm a junior at the University of Washington studying Informatics with a focus on
              cybersecurity. I'm really interested in where security engineering meets
              automation, so I love building tools that help teams move fast without
              compromising on security.
            </p>
            <p>
              My work covers everything from compliance automation and incident response to
              penetration testing and security tooling. I'm most energized by projects that
              require translating complex requirements, like a regulatory framework or an
              architectural diagram, into working systems that are actually secure.
            </p>
            <p>
              Outside of security, you'll usually find me on the tennis court. I love playing
              with friends and competing in my local USTA league. When I'm not playing sports, I
              enjoy getting creative in the kitchen and learning new recipes.
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
                <a
                  href="https://www.credly.com/badges/7562db1d-caea-4601-9203-1261ca31f980/public_url"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start gap-3.5"
                >
                  <CheckCircle size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium inline-flex items-center gap-1.5 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                      CompTIA Security+
                      <ExternalLink size={12} className="text-zinc-400 dark:text-zinc-600 group-hover:text-accent-500 transition-colors" />
                    </div>
                    <div className="font-mono text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">
                      Certified · Verify on Credly
                    </div>
                  </div>
                </a>
                <div className="flex items-start gap-3.5">
                  <CheckCircle size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium">Cybersecurity Certificate</div>
                    <div className="font-mono text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">
                      Purdue / Simplilearn
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
