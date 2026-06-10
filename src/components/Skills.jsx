import SectionHeading from "./SectionHeading";
import { Stagger } from "./ui/motion";
import { staggerItem } from "./ui/motionTokens";
import { motion as Motion } from "framer-motion";
import { SKILLS_DATA } from "../data/portfolioData";

function SkillRow({ group }) {
  return (
    <Motion.div variants={staggerItem} className="grid sm:grid-cols-12 gap-x-6 gap-y-3 border-t rule last:border-b py-8">
      <div className="sm:col-span-4 flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
        <span className="text-accent-600 dark:text-accent-400">{group.icon}</span>
        <span className="font-display font-semibold tracking-tight">{group.category}</span>
      </div>
      <div className="sm:col-span-8 flex flex-wrap gap-2">
        {group.items.map(skill => (
          <span
            key={skill}
            className="font-mono text-[11px] px-3 py-1.5 border rule rounded-full text-zinc-600 dark:text-zinc-400 hover:border-accent-500 hover:text-accent-600 dark:hover:text-accent-400 transition-colors cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </Motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="border-t rule">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-28">
        <SectionHeading index="04" label="Expertise" title="Skills & Tools" />
        <Stagger gap={0.07}>
          {SKILLS_DATA.map(group => (
            <SkillRow key={group.category} group={group} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
