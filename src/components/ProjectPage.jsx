import { useEffect } from "react";
import { motion as Motion, useScroll } from "framer-motion";
import {
  ArrowLeft, ArrowUpRight, CheckCircle, TrendingUp, Layers, Terminal,
} from "lucide-react";
import { Reveal, Stagger } from "./ui/motion";
import { staggerItem } from "./ui/motionTokens";
import BackToTop from "./ui/BackToTop";

function PageHeading({ label, title }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
        {label}
      </span>
      <div className="h-px flex-1 rule border-t" />
      {title}
    </div>
  );
}

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

export default function ProjectPage({ project, onBack }) {
  const { scrollYProgress } = useScroll();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const body = "text-sm leading-relaxed text-zinc-600 dark:text-zinc-400";

  return (
    <div className="min-h-screen">
      <Motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-accent-500 z-[100]"
      />
      <BackToTop />

      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b rule bg-[#fafafa]/80 dark:bg-[#09090b]/80">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-4 flex items-center gap-4">
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

      <Motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto px-5 sm:px-8 pt-16 sm:pt-20 pb-20"
      >
        {/* ── Header ── */}
        <header className="mb-16">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg border rule mb-8 text-accent-600 dark:text-accent-400">
            {project.icon}
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-6">
            <StatusTag status={project.status} />
            <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-500">{project.period}</span>
            <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-600">{project.role}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] mb-7">
            {project.title}
          </h1>
          <p className="text-base leading-relaxed max-w-2xl text-zinc-600 dark:text-zinc-400 mb-8">
            {project.overview}
          </p>
          <div className="flex flex-wrap items-center gap-3">
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
          </div>
        </header>

        {/* ── Stats strip ── */}
        {project.stats && (
          <Reveal className="mb-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 dark:bg-zinc-800 border rule rounded-lg overflow-hidden">
              {project.stats.map((s, i) => (
                <div key={i} className="p-6 bg-[#fafafa] dark:bg-[#09090b]">
                  <div className="font-display text-3xl font-semibold tracking-tight mb-2">{s.value}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400 mb-1.5">
                    {s.label}
                  </div>
                  <div className="text-xs leading-snug text-zinc-500 dark:text-zinc-500">{s.sub}</div>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* ── Tags ── */}
        <Reveal className="flex flex-wrap gap-2 mb-16">
          {project.tags.map(t => (
            <span key={t} className="font-mono text-[11px] px-3 py-1.5 border rule rounded-full text-zinc-600 dark:text-zinc-400">
              {t}
            </span>
          ))}
        </Reveal>

        {/* ── Problem / Solution ── */}
        <Reveal className="grid md:grid-cols-2 gap-10 mb-16">
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

        {/* ── Architecture ── */}
        <Reveal className="mb-16">
          <PageHeading label="Pipeline / Architecture" />
          <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
            {project.architecture.split("→").map((step, i, arr) => (
              <div key={i} className="flex items-center gap-3">
                <span className="font-mono text-xs px-3 py-1.5 border rule rounded text-zinc-700 dark:text-zinc-300 hover:border-accent-500 transition-colors">
                  {step.trim()}
                </span>
                {i < arr.length - 1 && (
                  <span className="font-mono text-accent-500 select-none">→</span>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── Screenshots ── */}
        {project.screenshots && (
          <Reveal className="mb-16">
            <PageHeading label="Screenshots" />
            <div className="grid sm:grid-cols-2 gap-5">
              {project.screenshots.map((s, i) => (
                <figure key={i} className="group border rule rounded-lg overflow-hidden">
                  <div className="overflow-hidden">
                    <img
                      src={s.src}
                      alt={s.caption}
                      className="w-full object-cover aspect-video bg-zinc-100 dark:bg-zinc-900 transition-transform duration-500 group-hover:scale-[1.03]"
                      onError={e => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div className="hidden items-center justify-center aspect-video bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-600 text-xs font-mono px-4 text-center">
                      {s.caption}
                    </div>
                  </div>
                  <figcaption className="px-4 py-3 font-mono text-[11px] text-zinc-500 dark:text-zinc-400 border-t rule">
                    {s.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        )}

        {/* ── Key Features ── */}
        {project.featureCards && (
          <div className="mb-16">
            <PageHeading label="Key Features" />
            <Stagger gap={0.06} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.featureCards.map((f, i) => (
                <Motion.div
                  key={i}
                  variants={staggerItem}
                  className="border rule rounded-lg p-6 hover:border-accent-500/60 transition-colors duration-300"
                >
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-md border rule text-accent-600 dark:text-accent-400 mb-5">
                    {f.icon}
                  </div>
                  <div className="font-display font-semibold text-sm mb-2.5">{f.title}</div>
                  <div className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{f.desc}</div>
                </Motion.div>
              ))}
            </Stagger>
          </div>
        )}

        {/* ── Technical Deep Dive ── */}
        <div className="mb-16">
          <PageHeading label="Technical Deep Dive" />
          <Stagger gap={0.05}>
            {project.techDetails.map((d, i) => (
              <Motion.div
                key={i}
                variants={staggerItem}
                className="grid sm:grid-cols-12 gap-x-6 gap-y-2 border-t rule last:border-b py-6"
              >
                <div className="sm:col-span-3 font-mono text-[11px] uppercase tracking-[0.15em] text-accent-600 dark:text-accent-400 pt-0.5">
                  {d.label}
                </div>
                <div className={`sm:col-span-9 ${body}`}>{d.value}</div>
              </Motion.div>
            ))}
          </Stagger>
        </div>

        {/* ── Process & Contributions ── */}
        {(project.teamProcess || project.individualContributions) && (
          <Reveal className="grid md:grid-cols-2 gap-10 mb-16">
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
        )}

        {/* ── Takeaways & Next Steps ── */}
        {(project.takeaways || project.nextSteps) && (
          <Reveal className="grid md:grid-cols-2 gap-10 mb-16">
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
        )}

        {/* ── Outcomes ── */}
        <div>
          <PageHeading label="Key Outcomes" />
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
        </div>

        {/* ── Footer back link ── */}
        <div className="mt-20 pt-8 border-t rule">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
            Back to all projects
          </button>
        </div>
      </Motion.div>
    </div>
  );
}
