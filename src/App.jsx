import { useState, useEffect, useRef } from "react";
import {
  Menu, X, ExternalLink, Linkedin, Mail, ArrowLeft,
  CheckCircle, AlertTriangle, Terminal, Eye, Database,
  Shield, Code, Server, ChevronDown, ChevronUp,
  TrendingUp, BarChart2, Layers, PlayCircle, Github
} from "lucide-react";

import { NAV_ITEMS, PROJECTS, EXPERIENCE, SKILLS_DATA } from "./data/portfolioData";
import ProjectCaseStudy from "./components/ProjectCaseStudy";

// ─── HOOKS & UTILITIES ────────────────────────────────────────────────────────

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return progress;
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

function TypingText({ words }) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    const word = words[wordIdx];
    let t;
    if (phase === "typing") {
      if (display.length < word.length) {
        t = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), 75);
      } else {
        t = setTimeout(() => setPhase("deleting"), 2400);
      }
    } else {
      if (display.length > 0) {
        t = setTimeout(() => setDisplay(display.slice(0, -1)), 40);
      } else {
        t = setTimeout(() => {
          setWordIdx((wordIdx + 1) % words.length);
          setPhase("typing");
        }, 0);
      }
    }
    return () => clearTimeout(t);
  }, [display, wordIdx, phase, words]);

  return (
    <span>
      {display}
      <span className="cursor text-blue-400">|</span>
    </span>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
    >
      <ChevronUp size={20} />
    </button>
  );
}

function SectionLabel({ text, dm }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="h-px w-8 bg-gradient-to-r from-blue-500 to-cyan-400" />
      <span className={`text-xs font-bold tracking-[0.2em] uppercase font-mono ${dm ? "text-blue-400" : "text-blue-500"}`}>{text}</span>
    </div>
  );
}

// ─── PROJECT PAGE ─────────────────────────────────────────────────────────────

// ─── CONTACT FORM ─────────────────────────────────────────────────────────────

function ContactForm({ dm }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const inputCls = `w-full px-4 py-3 rounded-xl text-sm outline-none transition-all border font-sans ${
    dm
      ? "bg-slate-800/60 border-slate-700 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:bg-slate-800"
      : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-400 focus:bg-white"
  }`;

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      // Replace "YOUR_FORMSPREE_ID" with your form ID from formspree.io (e.g. "xrgvwpqz")
      const res = await fetch("https://formspree.io/f/xpwzggqb", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") return (
    <div className="text-center py-10">
      <div className="w-14 h-14 rounded-2xl bg-green-500/12 border border-green-500/25 flex items-center justify-center mx-auto mb-4">
        <CheckCircle size={24} className="text-green-400" />
      </div>
      <p className="font-semibold text-green-400 text-lg mb-1">Message sent!</p>
      <p className={`text-sm ${dm ? "text-slate-400" : "text-slate-500"}`}>Thanks for reaching out — I'll get back to you soon.</p>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
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
        <p className="text-red-400 text-xs font-mono">Something went wrong — please email me directly at nathansalman10@gmail.com</p>
      )}
      <button
        onClick={handleSubmit}
        disabled={status === "sending"}
        className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl font-semibold text-white transition-all hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </div>
  );
}

// ─── MAIN PORTFOLIO ───────────────────────────────────────────────────────────

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [currentPage, setCurrentPage] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("dm");
    return stored !== null ? stored === "true" : true;
  });

  const toggleDark = () => setDarkMode(d => {
    localStorage.setItem("dm", String(!d));
    return !d;
  });

  const progress = useScrollProgress();
  const dm = darkMode;

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handler = () => {
      const sections = NAV_ITEMS.map(n => n.toLowerCase());
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveSection(id); break; }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (currentPage) {
    const p = PROJECTS.find(p => p.id === currentPage);
    return (
      <ProjectCaseStudy
        key={p.id}
        nextProject={PROJECTS[(PROJECTS.findIndex(item => item.id === p.id) + 1) % PROJECTS.length]}
        onNext={() => setCurrentPage(PROJECTS[(PROJECTS.findIndex(item => item.id === p.id) + 1) % PROJECTS.length].id)}
        project={p}
        onBack={() => {
          setCurrentPage(null);
          setTimeout(() => {
            scrollTo("projects");
            document.getElementById(`project-${p.id}`)?.focus({ preventScroll: true });
          }, 100);
        }}
        dm={dm}
      />
    );
  }

  const muted = dm ? "text-slate-400" : "text-slate-500";
  const subtle = dm ? "text-slate-500" : "text-slate-400";
  const border = dm ? "border-slate-800/70" : "border-slate-200";
  const card = dm
    ? "bg-slate-900/60 border border-slate-800 hover:border-slate-700"
    : "bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300";

  return (
    <div className={`min-h-screen font-sans ${dm ? "bg-[#030712] text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <BackToTop />

      {/* ── NAVIGATION ── */}
      <nav className={`sticky top-0 z-50 backdrop-blur-xl border-b ${dm ? "bg-[#030712]/85 border-slate-800/60" : "bg-white/85 border-slate-200"}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className={`font-bold text-lg tracking-tight select-none shrink-0 ${dm ? "text-slate-100" : "text-slate-900"}`}>
              <span className={dm ? "text-cyan-300" : "text-blue-700"}>Nathan</span>
              <span> Salman</span>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map(item => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    activeSection === item.toLowerCase()
                      ? "text-blue-400"
                      : dm
                      ? "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400" />
                  )}
                </button>
              ))}
              <div className={`w-px h-4 mx-2 ${dm ? "bg-slate-700" : "bg-slate-200"}`} />
              <a
                href="https://github.com/NateSal10"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${dm ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"}`}
              >
                <Github size={16} />
              </a>
              <button
                onClick={() => toggleDark()}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${dm ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"}`}
              >
                {dm ? "☀️" : "🌙"}
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${dm ? "text-slate-400 hover:bg-slate-800" : "text-slate-500 hover:bg-slate-100"}`}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={`md:hidden border-t ${dm ? "border-slate-800 bg-[#030712]" : "border-slate-200 bg-white"}`}>
            <div className="max-w-6xl mx-auto px-4 py-3 space-y-1">
              {NAV_ITEMS.map(item => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item.toLowerCase()
                      ? "text-blue-400 bg-blue-500/10"
                      : dm ? "text-slate-300 hover:bg-slate-800/60" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {item}
                </button>
              ))}
              <a
                href="https://github.com/NateSal10"
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm transition-colors ${dm ? "text-slate-300 hover:bg-slate-800/60" : "text-slate-600 hover:bg-slate-100"}`}
              >
                <Github size={15} /> GitHub
              </a>
              <button
                onClick={() => toggleDark()}
                className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${muted}`}
              >
                {dm ? "☀️  Light Mode" : "🌙  Dark Mode"}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden min-h-[94vh] flex items-center">
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
        <div className="absolute -top-20 -left-40 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none animate-float-slow" />
        <div className="absolute -bottom-20 -right-40 w-[400px] h-[400px] bg-cyan-500/12 rounded-full blur-3xl pointer-events-none animate-float-medium" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/4 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <FadeIn className="lg:col-span-3">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-5 leading-[0.93]">
              Nathan<br />
              <span className={dm ? "text-cyan-300" : "text-blue-600"}>
                Salman.
              </span>
            </h1>

            <div className={`text-xl sm:text-2xl font-semibold mb-6 h-9 font-mono ${dm ? "text-slate-300" : "text-slate-600"}`}>
              <TypingText words={[
                "Cybersecurity Specialist",
                "Security Engineer",
                "Penetration Tester",
                "Compliance Analyst",
                "Incident Responder"
              ]} />
            </div>

            <p className={`text-lg max-w-xl mb-10 leading-relaxed ${muted}`}>
              I'm a UW Informatics student building tools that make organizations safer. My experience includes security operations at Velera, AI-powered compliance automation, and incident response.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <button
                onClick={() => scrollTo("projects")}
                className="px-7 py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl font-semibold text-white text-sm transition-all hover:shadow-xl hover:shadow-blue-500/25 hover:scale-[1.03] active:scale-[0.98]"
              >
                View Projects
              </button>
              <a
                href="https://docs.google.com/document/d/1BW5IYufl3V8Y4Fyp1LWWboyN8RkXFlUX6g6bCv54iQw/preview"
                target="_blank"
                rel="noreferrer"
                className={`px-7 py-3.5 rounded-xl font-semibold text-sm transition-all border flex items-center gap-2 hover:scale-[1.03] active:scale-[0.98] ${
                  dm
                    ? "border-slate-700 hover:border-slate-500 text-slate-300 hover:bg-slate-800/60"
                    : "border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <ExternalLink size={15} /> Resume
              </a>
              <a
                href="https://www.linkedin.com/in/nathan-e-salman"
                target="_blank"
                rel="noreferrer"
                className={`px-7 py-3.5 rounded-xl font-semibold text-sm transition-all border flex items-center gap-2 hover:scale-[1.03] active:scale-[0.98] ${
                  dm
                    ? "border-slate-700 hover:border-slate-500 text-slate-300 hover:bg-slate-800/60"
                    : "border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Linkedin size={15} /> LinkedIn
              </a>
              <a
                href="https://github.com/NateSal10"
                target="_blank"
                rel="noreferrer"
                className={`px-7 py-3.5 rounded-xl font-semibold text-sm transition-all border flex items-center gap-2 hover:scale-[1.03] active:scale-[0.98] ${
                  dm
                    ? "border-slate-700 hover:border-slate-500 text-slate-300 hover:bg-slate-800/60"
                    : "border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Github size={15} /> GitHub
              </a>
            </div>

            {/* Stats */}
            <div className={`flex flex-wrap gap-8 sm:gap-10 pt-6 border-t ${border}`}>
              {[
                { value: "7", label: "Projects Built" },
                { value: "3.86", label: "GPA" },
                { value: "Jun '27", label: "Graduation" },
              ].map(s => (
                <div key={s.label}>
                  <div className={`text-2xl font-black leading-none mb-1 ${dm ? "text-cyan-300" : "text-blue-600"}`}>
                    {s.value}
                  </div>
                  <div className={`text-xs font-medium font-mono ${subtle}`}>{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Photo */}
          <FadeIn delay={200} className="hidden md:flex lg:col-span-2 justify-center items-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 blur-2xl opacity-20 scale-105" />
              <div className="relative w-80 h-[420px] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
                <img
                  src="/nathan.webp"
                  alt="Nathan Salman, Cybersecurity student at UW"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </FadeIn>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-bounce">
          <ChevronDown size={20} className={subtle} />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className={`border-t ${border}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <FadeIn>
            <SectionLabel text="Background" dm={dm} />
            <h2 className="text-4xl font-bold mb-12">About Me</h2>
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
              <div className={`lg:col-span-3 space-y-5 text-base leading-relaxed ${muted}`}>
                <p>
                  I'm studying Informatics at the University of Washington with a specialization in cybersecurity, graduating in June 2027. I'm really interested in where security engineering meets automation, so I love building tools that help teams move fast without compromising on security.
                </p>
                <p>
                  During my information security internship at Velera, I built 15+ detection rules in Rapid7 InsightIDR, triaged alerts across SIEM, EDR, and email security tools, and mapped detections to MITRE ATT&CK. I also completed a Microsoft-sponsored compliance capstone that achieved 80% accuracy in automated gap detection and cut manual review time by weeks per regulation.
                </p>
                <p>
                  Outside of security, you'll usually find me on the tennis court. I love playing with friends and competing in my local USTA league. When I'm not playing sports, I enjoy getting creative in the kitchen and learning new recipes.
                </p>
              </div>

              <div className="lg:col-span-2 space-y-4">
                <div className={`p-5 rounded-2xl border transition-all ${card}`}>
                  <div className="text-xs font-bold text-blue-400 uppercase tracking-[0.18em] mb-4 font-mono">Education</div>
                  <div className="font-semibold">B.S. Informatics — Cybersecurity</div>
                  <div className={`text-sm mt-1 ${muted}`}>University of Washington</div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-green-400 font-bold text-sm">GPA: 3.86</span>
                    <span className={`text-xs font-mono ${subtle}`}>Expected Jun 2027</span>
                  </div>
                </div>

                <div className={`p-5 rounded-2xl border transition-all ${card}`}>
                  <div className="text-xs font-bold text-blue-400 uppercase tracking-[0.18em] mb-4 font-mono">Certifications</div>
                  <div className="space-y-3.5">
                    <div className={`flex items-center gap-3 p-3 rounded-xl border ${dm ? "bg-blue-500/10 border-blue-400/30" : "bg-blue-50 border-blue-200"}`}>
                      <div className="w-12 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        <img src="/comptia-logo.svg" alt="CompTIA logo" className="w-10 h-auto" />
                      </div>
                      <div>
                        <div className={`text-sm font-semibold ${dm ? "text-slate-100" : "text-slate-900"}`}>CompTIA Security+</div>
                        <div className={`text-xs font-mono ${dm ? "text-blue-200" : "text-blue-700"}`}>Issued May 2026</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-green-500/12 border border-green-500/25 flex items-center justify-center flex-shrink-0">
                        <CheckCircle size={14} className="text-green-400" />
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${dm ? "text-slate-300" : "text-slate-700"}`}>Cybersecurity Certificate</div>
                        <div className={`text-xs font-mono ${subtle}`}>Purdue / Simplilearn · August 2025</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className={`border-t ${border}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <FadeIn>
            <SectionLabel text="Work" dm={dm} />
            <div className="flex flex-wrap justify-between items-end gap-4 mb-12">
              <div>
                <h2 className="text-4xl font-bold mb-2">Projects</h2>
                <p className={`${muted}`}>Click any completed project to see a full technical breakdown.</p>
              </div>
            </div>
          </FadeIn>

          {/* All projects — uniform grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.map((p, i) => (
              <FadeIn key={p.id} delay={i * 80}>
                <div
                  onClick={() => !p.noPage && setCurrentPage(p.id)}
                  className={`group p-6 rounded-2xl border transition-all h-full ${
                    !p.noPage ? "cursor-pointer hover:scale-[1.02] hover:shadow-2xl" : "cursor-default"
                  } ${
                    dm
                      ? `bg-slate-900/60 border-slate-800 ${!p.noPage ? "hover:border-blue-500/40 hover:shadow-blue-500/5" : ""}`
                      : `bg-white border-slate-200 shadow-sm ${!p.noPage ? "hover:border-blue-300 hover:shadow-blue-50" : ""}`
                  }`}
                >
                  <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${p.color} text-white mb-5 shadow-md`}>
                    {p.icon}
                  </div>

                  <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                    <div className="flex flex-wrap gap-1.5">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full font-mono ${
                        p.status === "In Progress"
                          ? "bg-blue-500/12 text-blue-400 border border-blue-500/20"
                          : "bg-emerald-500/12 text-emerald-400 border border-emerald-500/20"
                      }`}>
                        {p.status === "In Progress" ? "● In Progress" : "✓ Completed"}
                      </span>
                      {p.microsoft && (
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full font-mono bg-purple-500/12 text-purple-400 border border-purple-500/20">
                          🏢 Microsoft
                        </span>
                      )}
                    </div>
                    <span className={`text-xs font-mono ${subtle}`}>{p.period}</span>
                  </div>

                  <h3 className={`text-base font-bold mb-1 transition-colors ${!p.noPage ? "group-hover:text-blue-400" : ""}`}>
                    {p.title}
                  </h3>
                  <p className={`text-xs font-medium mb-2.5 ${muted}`}>{p.role}</p>
                  <p className={`text-xs leading-relaxed mb-4 ${muted}`}>{p.summary}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tags.slice(0, 3).map(t => (
                      <span key={t} className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                        dm ? "bg-slate-800 text-slate-400 border border-slate-700/50" : "bg-slate-100 text-slate-500"
                      }`}>
                        {t}
                      </span>
                    ))}
                    {p.tags.length > 3 && <span className={`text-xs px-2 py-0.5 ${subtle}`}>+{p.tags.length - 3}</span>}
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    {!p.noPage
                      ? <button
                          id={`project-${p.id}`}
                          aria-label={`View case study: ${p.title}`}
                          onClick={event => { event.stopPropagation(); setCurrentPage(p.id); }}
                          className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 group-hover:gap-2.5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
                        >
                          View case study <ExternalLink size={12} />
                        </button>
                      : <div className="flex items-center gap-1.5 text-xs font-mono text-blue-400/60 italic">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse flex-shrink-0" />
                          In development
                        </div>
                    }
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={e => e.stopPropagation()}
                        className={`flex items-center gap-1 text-xs font-mono px-2 py-1 rounded-lg transition-colors ${dm ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800" : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"}`}
                      >
                        <ExternalLink size={11} /> Live
                      </a>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className={`border-t ${border}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <FadeIn>
            <SectionLabel text="Career" dm={dm} />
            <h2 className="text-4xl font-bold mb-12">Experience</h2>

            <div className="relative max-w-3xl">
              <div className={`absolute left-0 top-3 bottom-0 w-px ${
                dm
                  ? "bg-gradient-to-b from-blue-500/50 via-blue-500/15 to-transparent"
                  : "bg-gradient-to-b from-blue-400/40 via-blue-400/10 to-transparent"
              }`} />

              <div className="space-y-8">
                {EXPERIENCE.map((job, i) => (
                  <FadeIn key={i} delay={i * 100}>
                    <div className="relative pl-10">
                      <div className="absolute left-0 top-2 w-2 h-2 -translate-x-[3.5px] rounded-full bg-blue-500 ring-4 ring-blue-500/20" />
                      <div className={`p-6 rounded-2xl border transition-all ${card}`}>
                        <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                          <div>
                            <h3 className="font-bold text-base">{job.title}</h3>
                            <p className="text-blue-400 font-semibold text-sm mt-0.5">
                              {job.company}
                              <span className={`font-normal text-sm ml-1 ${subtle}`}>· {job.location}</span>
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className={`text-xs font-mono mb-1.5 ${muted}`}>{job.period}</div>
                            <span className={`text-xs px-2.5 py-1 rounded-full font-mono ${
                              dm ? "bg-slate-800 text-slate-400 border border-slate-700" : "bg-slate-100 text-slate-500"
                            }`}>{job.type}</span>
                          </div>
                        </div>
                        <ul className="space-y-2.5">
                          {job.bullets.map((b, j) => (
                            <li key={j} className={`text-sm flex gap-3 leading-relaxed ${dm ? "text-slate-300" : "text-slate-600"}`}>
                              <span className="text-blue-400 mt-2 flex-shrink-0 w-1 h-1 rounded-full bg-blue-400" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className={`border-t ${border}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <FadeIn>
            <SectionLabel text="Expertise" dm={dm} />
            <h2 className="text-4xl font-bold mb-12">Skills & Tools</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SKILLS_DATA.map((group, i) => (
                <FadeIn key={group.category} delay={i * 80}>
                  <div className={`p-6 rounded-2xl border h-full transition-all ${card}`}>
                    <div className={`flex items-center gap-2.5 mb-5 ${group.color}`}>
                      {group.icon}
                      <span className="font-bold text-xs uppercase tracking-[0.18em] font-mono">{group.category}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map(skill => (
                        <span
                          key={skill}
                          className={`text-xs px-3 py-1.5 rounded-lg border font-mono cursor-default transition-colors ${
                            dm
                              ? "bg-slate-800/70 border-slate-700/60 text-slate-300 hover:border-slate-600 hover:bg-slate-800"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-white hover:border-slate-300"
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className={`border-t ${border}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <FadeIn>
            <SectionLabel text="Contact" dm={dm} />
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
              <div>
                <h2 className="text-4xl font-bold mb-4">Let's Connect</h2>
                <p className={`text-base leading-relaxed mb-10 max-w-md ${muted}`}>
                  I'm actively looking for cybersecurity internship and full-time opportunities starting Summer/Fall 2027. Whether you have a role, a project, or just want to connect, my inbox is always open.
                </p>
                <div className="space-y-3">
                  {[
                    { icon: <Mail size={18} />, label: "Email", value: "nathansalman10@gmail.com", href: "mailto:nathansalman10@gmail.com" },
                    { icon: <Linkedin size={18} />, label: "LinkedIn", value: "/in/nathan-e-salman", href: "https://www.linkedin.com/in/nathan-e-salman" },
                    { icon: <Github size={18} />, label: "GitHub", value: "github.com/NateSal10", href: "https://github.com/NateSal10" },
                  ].map(c => (
                    <a
                      key={c.label}
                      href={c.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center gap-4 p-4 rounded-xl border transition-all group hover:border-blue-400/50 ${card}`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/15 transition-colors flex-shrink-0">
                        {c.icon}
                      </div>
                      <div className="min-w-0">
                        <div className={`text-xs font-bold uppercase tracking-[0.18em] font-mono mb-0.5 ${subtle}`}>{c.label}</div>
                        <div className={`text-sm font-medium truncate ${dm ? "text-slate-200" : "text-slate-700"}`}>{c.value}</div>
                      </div>
                      <ExternalLink size={14} className={`ml-auto flex-shrink-0 ${subtle} group-hover:text-blue-400 transition-colors`} />
                    </a>
                  ))}
                </div>
              </div>

              <div className={`p-8 rounded-2xl border ${dm ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}>
                <h3 className="font-bold text-lg mb-6">Send a Message</h3>
                <ContactForm dm={dm} />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={`border-t ${border}`}>
        <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm ${muted}`}>
          <span className="font-mono text-xs">© 2026 Nathan Salman. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <a href="mailto:nathansalman10@gmail.com" className="hover:text-blue-400 transition-colors" aria-label="Email">
              <Mail size={16} />
            </a>
            <a href="https://www.linkedin.com/in/nathan-e-salman" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors" aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
            <a href="https://github.com/NateSal10" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors" aria-label="GitHub">
              <Github size={16} />
            </a>
          </div>
          <div className="font-mono text-xs">
            Built with React & Tailwind
          </div>
        </div>
      </footer>
    </div>
  );
}
