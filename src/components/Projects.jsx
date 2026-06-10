import { ArrowUpRight, ExternalLink } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Stagger } from "./ui/motion";
import { staggerItem } from "./ui/motionTokens";
import { motion as Motion } from "framer-motion";
import { PROJECTS } from "../data/portfolioData";

function StatusTag({ status }) {
  if (status === "In Progress") {
    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-accent-600 dark:text-accent-400">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
        In Progress
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      Completed
    </span>
  );
}

function ProjectRow({ project, index, onOpen }) {
  const clickable = !project.noPage;

  return (
    <Motion.article
      variants={staggerItem}
      onClick={() => clickable && onOpen(project.id)}
      className={`group relative border-t rule last:border-b py-9 sm:py-10 px-2 sm:px-4 -mx-2 sm:-mx-4 transition-colors duration-300 ${
        clickable
          ? "cursor-pointer hover:bg-zinc-100/70 dark:hover:bg-zinc-900/50"
          : "cursor-default"
      }`}
    >
      <div className="grid sm:grid-cols-12 gap-x-6 gap-y-4 items-start">
        {/* Index */}
        <div className="hidden sm:block sm:col-span-1 font-serif italic text-2xl leading-none text-zinc-300 dark:text-zinc-700 group-hover:text-accent-500 transition-colors pt-1.5">
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Title + summary */}
        <div className="sm:col-span-6">
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <h3
              className={`font-display text-2xl sm:text-3xl font-extrabold tracking-tight transition-colors duration-300 ${
                clickable ? "group-hover:text-accent-600 dark:group-hover:text-accent-400" : ""
              }`}
            >
              {project.title}
            </h3>
            {project.microsoft && (
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-1 border rule rounded text-zinc-500 dark:text-zinc-400">
                Microsoft Sponsored
              </span>
            )}
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-3">{project.role}</p>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-xl">
            {project.summary}
          </p>
        </div>

        {/* Tags */}
        <div className="sm:col-span-3 flex flex-wrap gap-x-3 gap-y-1.5 sm:pt-2.5 content-start">
          {project.tags.slice(0, 5).map(t => (
            <span key={t} className="font-mono text-[11px] text-zinc-500 dark:text-zinc-500">
              {t}
            </span>
          ))}
          {project.tags.length > 5 && (
            <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-600">
              +{project.tags.length - 5}
            </span>
          )}
        </div>

        {/* Meta + arrow */}
        <div className="sm:col-span-2 flex sm:flex-col sm:items-end gap-3 sm:gap-2.5 sm:pt-2.5 items-center justify-between">
          <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-500 sm:text-right">
            {project.period}
          </span>
          <StatusTag status={project.status} />
          <div className="flex items-center gap-2 sm:mt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={e => e.stopPropagation()}
                className="inline-flex items-center gap-1 font-mono text-[11px] px-2.5 py-1.5 border rule rounded text-zinc-500 dark:text-zinc-400 hover:border-accent-500 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
              >
                <ExternalLink size={11} /> Live
              </a>
            )}
            {clickable && (
              <span className="inline-flex items-center justify-center w-9 h-9 border rule rounded-full text-zinc-400 dark:text-zinc-500 transition-all duration-300 group-hover:border-accent-500 group-hover:text-accent-600 dark:group-hover:text-accent-400 group-hover:rotate-45">
                <ArrowUpRight size={15} />
              </span>
            )}
          </div>
        </div>
      </div>
    </Motion.article>
  );
}

export default function Projects({ onOpen }) {
  return (
    <section id="projects" className="border-t rule">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-28">
        <SectionHeading index="02" label="Selected Work" title="Selected" accent="projects.">
          <p className="mt-5 text-zinc-500 dark:text-zinc-400">
            Click any project to see a full technical breakdown.
          </p>
        </SectionHeading>

        <Stagger gap={0.07}>
          {PROJECTS.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} onOpen={onOpen} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
