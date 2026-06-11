import { useEffect, useState, useMemo } from "react";
import { motion as Motion, useScroll } from "framer-motion";
import {
  ArrowLeft, ArrowUpRight, CheckCircle, TrendingUp, Layers, Terminal,
} from "lucide-react";
import { Reveal, Stagger } from "./ui/motion";
import { staggerItem } from "./ui/motionTokens";
import BackToTop from "./ui/BackToTop";
import MicrosoftLogo from "./ui/MicrosoftLogo";
import TerminalCard from "./case-study/TerminalCard";
import BrowserFrame from "./case-study/BrowserFrame";
import ArchitectureFlow from "./case-study/ArchitectureFlow";
import CountUp from "./case-study/CountUp";
import CaseToc from "./case-study/CaseToc";
import { PROJECTS } from "../data/portfolioData";

const body = "text-sm leading-relaxed text-zinc-600 dark:text-zinc-400";

function StatusTag({ status }) {
  const inProgress = status === "In Progress";
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] ${
        inProgress ? "text-accent-600 dark:text-accent-400" : "text-emerald-600 dark:text-emerald-400"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${inProgress ? "bg-accent-500 animate-pulse" : "bg-emerald-500"}`} />
      {inProgress ? "In Progress" : "Completed"}
    </span>
  );
}

function SectionBlock({ id, index, label, children }) {
  return (
    <section id={id} className="scroll-mt-28 mb-20 last:mb-0">
      <div className="flex items-center gap-4 mb-8">
        <span className="font-mono text-xs text-accent-600 dark:text-accent-400">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
          {label}
        </span>
        <div className="h-px flex-1 rule border-t" />
      </div>
      {children}
    </section>
  );
}

export default function ProjectPage({ project, onBack, onOpen }) {
  const { scrollYProgress } = useScroll();
  const [activeId, setActiveId] = useState(null);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [project.id]);

  const projectIndex = PROJECTS.findIndex(p => p.id === project.id);
  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  const featuredShot = project.screenshots?.[0];
  const galleryShots = useMemo(() => project.screenshots?.slice(1) ?? [], [project]);

  const sections = useMemo(() => [
    { id: "problem", label: "Problem & Solution" },
    { id: "architecture", label: "Architecture" },
    ...(galleryShots.length ? [{ id: "gallery", label: "Screenshots" }] : []),
    ...(project.featureCards ? [{ id: "features", label: "Key Features" }] : []),
    { id: "tech", label: "Technical Deep Dive" },
    ...(project.teamProcess || project.individualContributions
      ? [{ id: "process", label: "Process" }]
      : []),
    ...(project.takeaways || project.nextSteps
      ? [{ id: "takeaways", label: "Takeaways" }]
      : []),
    { id: "outcomes", label: "Key Outcomes" },
  ], [project, galleryShots]);

  // Scroll-spy for the table of contents
  useEffect(() => {
    const handler = () => {
      for (const { id } of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActiveId(id);
          return;
        }
      }
      setActiveId(null);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [sections]);

  const jumpTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const num = id => sections.findIndex(s => s.id === id);

  return (
    <div className="min-h-screen">
      <Motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-accent-500 z-[100]"
      />
      <BackToTop />

      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b rule bg-[#fafafa]/80 dark:bg-[#09090b]/80">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
            Index
          </button>
          <span className="text-zinc-300 dark:text-zinc-700 select-none">/</span>
          <span className="text-sm font-medium truncate">{project.title}</span>
        </div>
      </nav>

      {/* ── Header ── */}
      <header className="relative border-b rule overflow-hidden">
        {/* Ghost index watermark */}
        <span
          aria-hidden="true"
          className="absolute -top-8 right-0 font-display font-bold leading-none select-none pointer-events-none text-[clamp(8rem,22vw,18rem)] text-zinc-900/[0.04] dark:text-zinc-100/[0.04]"
        >
          {String(projectIndex + 1).padStart(2, "0")}
        </span>

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-16 sm:pt-20 pb-14">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-3">
              <Reveal y={16}>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-7">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg border rule text-accent-600 dark:text-accent-400">
                    {project.icon}
                  </span>
                  <StatusTag status={project.status} />
                  <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-500">{project.period}</span>
                </div>
                {project.microsoft && (
                  <div className="inline-flex items-center gap-3 mb-7 pl-3 pr-4 py-2.5 border rule rounded-lg">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 border-r rule pr-3">
                      Sponsored by
                    </span>
                    <MicrosoftLogo size={20} />
                  </div>
                )}
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600 mb-4">
                  {project.role}
                </p>
                <h1 className="font-display font-bold tracking-tight leading-[1.02] text-[clamp(2.6rem,6vw,4.5rem)] mb-7">
                  {project.title}
                </h1>
                <p className="text-base leading-relaxed max-w-2xl text-zinc-600 dark:text-zinc-400 mb-8">
                  {project.overview}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map(t => (
                    <span key={t} className="font-mono text-[11px] px-3 py-1.5 border rule rounded-full text-zinc-600 dark:text-zinc-400">
                      {t}
                    </span>
                  ))}
                </div>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 hover:bg-accent-600 dark:hover:bg-accent-400 transition-colors"
                  >
                    View Live Site
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
              </Reveal>
            </div>

            {/* Visual: featured screenshot, or terminal readout */}
            <div className="lg:col-span-2 lg:pt-6">
              {featuredShot ? (
                <Motion.div
                  initial={{ opacity: 0, y: 28, rotate: 1.5 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <BrowserFrame src={featuredShot.src} caption={featuredShot.caption} />
                </Motion.div>
              ) : (
                <TerminalCard project={project} />
              )}
            </div>
          </div>

          {/* Stats strip with count-up */}
          {project.stats && (
            <Reveal delay={0.15} className="mt-14">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 dark:bg-zinc-800 border rule rounded-lg overflow-hidden">
                {project.stats.map((s, i) => (
                  <div key={i} className="p-6 bg-[#fafafa] dark:bg-[#09090b]">
                    <div className="font-display text-3xl font-semibold tracking-tight mb-2">
                      <CountUp value={s.value} />
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400 mb-1.5">
                      {s.label}
                    </div>
                    <div className="text-xs leading-snug text-zinc-500 dark:text-zinc-500">{s.sub}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </header>

      {/* ── Body: sticky TOC + content ── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <div className="grid lg:grid-cols-12 gap-x-14">
          <aside className="lg:col-span-3">
            <CaseToc sections={sections} activeId={activeId} onJump={jumpTo} />
          </aside>

          <div className="lg:col-span-9">
            {/* Problem / Solution */}
            <SectionBlock id="problem" index={num("problem")} label="Problem & Solution">
              <Reveal className="grid md:grid-cols-2 gap-10">
                <div className="border-l-2 border-red-400/50 pl-6">
                  <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-red-500 dark:text-red-400 mb-4">
                    The Problem
                  </div>
                  <p className={body}>{project.problem}</p>
                </div>
                <div className="border-l-2 border-emerald-400/50 pl-6">
                  <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400 mb-4">
                    My Solution
                  </div>
                  <p className={body}>{project.solution}</p>
                </div>
              </Reveal>
            </SectionBlock>

            {/* Architecture */}
            <SectionBlock id="architecture" index={num("architecture")} label="Pipeline / Architecture">
              <ArchitectureFlow architecture={project.architecture} />
            </SectionBlock>

            {/* Screenshots */}
            {galleryShots.length > 0 && (
              <SectionBlock id="gallery" index={num("gallery")} label="Screenshots">
                <Stagger gap={0.1} className="grid sm:grid-cols-2 gap-5">
                  {galleryShots.map((s, i) => (
                    <Motion.div key={i} variants={staggerItem} className="sm:last:odd:col-span-2">
                      <BrowserFrame src={s.src} caption={s.caption} />
                    </Motion.div>
                  ))}
                </Stagger>
              </SectionBlock>
            )}

            {/* Key Features */}
            {project.featureCards && (
              <SectionBlock id="features" index={num("features")} label="Key Features">
                <Stagger gap={0.06} className="grid sm:grid-cols-2 gap-4">
                  {project.featureCards.map((f, i) => (
                    <Motion.div
                      key={i}
                      variants={staggerItem}
                      whileHover={{ y: -4 }}
                      className="relative border rule rounded-lg p-6 hover:border-accent-500/60 transition-colors duration-300"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute top-4 right-5 font-display text-3xl font-bold select-none text-zinc-200/80 dark:text-zinc-800/80"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="inline-flex items-center justify-center w-9 h-9 rounded-md border rule text-accent-600 dark:text-accent-400 mb-5">
                        {f.icon}
                      </div>
                      <div className="font-display font-semibold text-sm mb-2.5">{f.title}</div>
                      <div className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{f.desc}</div>
                    </Motion.div>
                  ))}
                </Stagger>
              </SectionBlock>
            )}

            {/* Technical Deep Dive */}
            <SectionBlock id="tech" index={num("tech")} label="Technical Deep Dive">
              <Stagger gap={0.05}>
                {project.techDetails.map((d, i) => (
                  <Motion.div
                    key={i}
                    variants={staggerItem}
                    className="grid sm:grid-cols-12 gap-x-6 gap-y-2 border-t rule last:border-b py-6 px-3 -mx-3 rounded transition-colors hover:bg-zinc-100/60 dark:hover:bg-zinc-900/40"
                  >
                    <div className="sm:col-span-3 font-mono text-[11px] uppercase tracking-[0.15em] text-accent-600 dark:text-accent-400 pt-0.5">
                      {d.label}
                    </div>
                    <div className={`sm:col-span-9 ${body}`}>{d.value}</div>
                  </Motion.div>
                ))}
              </Stagger>
            </SectionBlock>

            {/* Process & Contributions */}
            {(project.teamProcess || project.individualContributions) && (
              <SectionBlock id="process" index={num("process")} label="Process">
                <Reveal className="grid md:grid-cols-2 gap-10">
                  {project.teamProcess && (
                    <div className="border-l-2 border-accent-400/50 pl-6">
                      <div className="flex items-center gap-2.5 mb-4 text-accent-600 dark:text-accent-400">
                        <Layers size={14} />
                        <span className="font-mono text-[11px] uppercase tracking-[0.25em]">Team Process</span>
                      </div>
                      <p className={body}>{project.teamProcess}</p>
                    </div>
                  )}
                  {project.individualContributions && (
                    <div className="border-l-2 border-violet-400/50 pl-6">
                      <div className="flex items-center gap-2.5 mb-4 text-violet-600 dark:text-violet-400">
                        <Terminal size={14} />
                        <span className="font-mono text-[11px] uppercase tracking-[0.25em]">My Contributions</span>
                      </div>
                      <p className={body}>{project.individualContributions}</p>
                    </div>
                  )}
                </Reveal>
              </SectionBlock>
            )}

            {/* Takeaways & Next Steps */}
            {(project.takeaways || project.nextSteps) && (
              <SectionBlock id="takeaways" index={num("takeaways")} label="Takeaways">
                <Reveal className="grid md:grid-cols-2 gap-10">
                  {project.takeaways && (
                    <div>
                      <div className="flex items-center gap-2.5 mb-5">
                        <CheckCircle size={15} className="text-emerald-500" />
                        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
                          Key Takeaways
                        </span>
                      </div>
                      <ul className="space-y-3.5">
                        {project.takeaways.map((t, i) => (
                          <li key={i} className={`flex items-start gap-3.5 ${body}`}>
                            <span className="font-mono text-emerald-500 select-none flex-shrink-0">+</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {project.nextSteps && (
                    <div>
                      <div className="flex items-center gap-2.5 mb-5">
                        <TrendingUp size={15} className="text-amber-500" />
                        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
                          Next Steps
                        </span>
                      </div>
                      <ul className="space-y-3.5">
                        {project.nextSteps.map((t, i) => (
                          <li key={i} className={`flex items-start gap-3.5 ${body}`}>
                            <span className="font-mono text-amber-500 select-none flex-shrink-0">→</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Reveal>
              </SectionBlock>
            )}

            {/* Outcomes */}
            <SectionBlock id="outcomes" index={num("outcomes")} label="Key Outcomes">
              <Stagger gap={0.05} className="grid sm:grid-cols-2 gap-x-10">
                {project.outcomes.map((o, i) => (
                  <Motion.div
                    key={i}
                    variants={staggerItem}
                    className="flex items-start gap-4 border-t rule py-5"
                  >
                    <span className="font-mono text-xs text-accent-600 dark:text-accent-400 pt-0.5 select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={body}>{o}</span>
                  </Motion.div>
                ))}
              </Stagger>
            </SectionBlock>

            {/* Next project */}
            {nextProject && nextProject.id !== project.id && !nextProject.noPage && (
              <Reveal className="mt-24">
                <button
                  onClick={() => onOpen(nextProject.id)}
                  className="group w-full text-left border-t rule pt-10"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 mb-4">
                    Next Project
                  </div>
                  <div className="flex items-end justify-between gap-6">
                    <div>
                      <div className="font-display text-3xl sm:text-4xl font-semibold tracking-tight transition-colors group-hover:text-accent-600 dark:group-hover:text-accent-400">
                        {nextProject.title}
                      </div>
                      <div className="text-sm text-zinc-500 dark:text-zinc-500 mt-2.5">{nextProject.role}</div>
                    </div>
                    <span className="inline-flex flex-shrink-0 items-center justify-center w-12 h-12 border rule rounded-full text-zinc-400 dark:text-zinc-500 transition-all duration-300 group-hover:border-accent-500 group-hover:text-accent-600 dark:group-hover:text-accent-400 group-hover:rotate-45">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </button>
                <button
                  onClick={onBack}
                  className="group inline-flex items-center gap-2 mt-10 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                >
                  <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
                  Back to all projects
                </button>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
