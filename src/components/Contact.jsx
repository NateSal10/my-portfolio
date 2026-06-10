import { useState } from "react";
import { Mail, Linkedin, Github, ArrowUpRight, CheckCircle } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Reveal } from "./ui/motion";

const CONTACTS = [
  { icon: <Mail size={16} />, label: "Email", value: "nathansalman10@gmail.com", href: "mailto:nathansalman10@gmail.com" },
  { icon: <Linkedin size={16} />, label: "LinkedIn", value: "/in/nathan-e-salman", href: "https://www.linkedin.com/in/nathan-e-salman" },
  { icon: <Github size={16} />, label: "GitHub", value: "github.com/NateSal10", href: "https://github.com/NateSal10" },
];

const inputCls =
  "w-full bg-transparent border-0 border-b rule px-0 py-3 text-sm outline-none transition-colors placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-accent-600 dark:focus:border-accent-400";

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xpwzggqb", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent")
    return (
      <div className="text-center py-12">
        <CheckCircle size={28} className="text-emerald-500 mx-auto mb-4" />
        <p className="font-display font-semibold text-lg mb-1">Message sent!</p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Thanks for reaching out — I'll get back to you soon.
        </p>
      </div>
    );

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-6">
        <input
          placeholder="Your name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className={inputCls}
        />
        <input
          placeholder="Your email"
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className={inputCls}
        />
      </div>
      <textarea
        placeholder="Your message..."
        rows={5}
        value={form.message}
        onChange={e => setForm({ ...form, message: e.target.value })}
        className={inputCls + " resize-none"}
      />
      {status === "error" && (
        <p className="text-red-500 text-xs font-mono">
          Something went wrong — please email me directly at nathansalman10@gmail.com
        </p>
      )}
      <button
        onClick={handleSubmit}
        disabled={status === "sending"}
        className="group w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-md text-sm font-medium bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 hover:bg-accent-600 dark:hover:bg-accent-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
        <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="border-t rule">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-28">
        <SectionHeading index="05" label="Contact" title="Let's" accent="connect." />

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <Reveal>
            <p className="text-base leading-relaxed mb-10 max-w-md text-zinc-500 dark:text-zinc-400">
              I'm actively looking for cybersecurity internship and full-time opportunities
              starting Summer/Fall 2027. Whether you have a role, a project, or just want to
              connect — my inbox is open.
            </p>
            <a
              href="mailto:nathansalman10@gmail.com"
              className="inline-block font-display font-bold tracking-tight leading-tight text-[clamp(1.4rem,3.2vw,2.3rem)] mb-12 break-all underline decoration-2 underline-offset-8 decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-accent-500 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
            >
              nathansalman10@gmail.com
            </a>
            <div>
              {CONTACTS.map(c => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-5 border-t rule last:border-b py-5 transition-colors"
                >
                  <span className="text-zinc-400 dark:text-zinc-600 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                    {c.icon}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600 w-20 flex-shrink-0">
                    {c.label}
                  </span>
                  <span className="text-sm font-medium truncate group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                    {c.value}
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="ml-auto flex-shrink-0 text-zinc-300 dark:text-zinc-700 transition-all duration-300 group-hover:text-accent-500 group-hover:rotate-45"
                  />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="border rule rounded-lg p-8">
              <h3 className="font-display font-semibold text-lg mb-8">Send a Message</h3>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
