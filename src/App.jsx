import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, ArrowUpRight } from "lucide-react";

import { NAV_ITEMS, LINKS, PROJECTS, EXPERIENCE, SKILLS_DATA } from "./data/portfolioData";
import ProjectCaseStudy from "./components/ProjectCaseStudy";
import "./site.css";

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function readStoredTheme() {
  try {
    const stored = localStorage.getItem("dm");
    if (stored !== null) return stored === "true";
  } catch {
    // Storage can be blocked; fall through to the system setting.
  }
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches;
}

function MicrosoftMark() {
  return (
    <svg className="ms-mark" viewBox="0 0 21 21" width="13" height="13" aria-hidden="true">
      <rect x="0" y="0" width="10" height="10" fill="#f25022" />
      <rect x="11" y="0" width="10" height="10" fill="#7fba00" />
      <rect x="0" y="11" width="10" height="10" fill="#00a4ef" />
      <rect x="11" y="11" width="10" height="10" fill="#ffb900" />
    </svg>
  );
}

// ─── CONTACT FORM ─────────────────────────────────────────────────────────────

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xpwzggqb", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="form-done" role="status">
        <p className="form-done-title">Message sent.</p>
        <p>Thanks, {form.name.split(" ")[0]}. I'll write back to {form.email}.</p>
      </div>
    );
  }

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="field-row">
        <label className="field">
          <span>Name</span>
          <input required value={form.name} onChange={update("name")} autoComplete="name" />
        </label>
        <label className="field">
          <span>Email</span>
          <input required type="email" value={form.email} onChange={update("email")} autoComplete="email" />
        </label>
      </div>
      <label className="field">
        <span>Message</span>
        <textarea required rows={5} value={form.message} onChange={update("message")} />
      </label>
      {status === "error" && (
        <p className="form-error" role="alert">
          That didn't go through. You can email me directly at {LINKS.email}.
        </p>
      )}
      <button type="submit" className="btn" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

// ─── MAIN PORTFOLIO ───────────────────────────────────────────────────────────

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [dm, setDm] = useState(readStoredTheme);

  const toggleDark = () =>
    setDm((d) => {
      try { localStorage.setItem("dm", String(!d)); } catch { /* ignore */ }
      return !d;
    });

  useEffect(() => {
    document.documentElement.dataset.theme = dm ? "dark" : "light";
  }, [dm]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    if (currentPage) return;
    const handler = () => {
      let current = null;
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) current = id;
      }
      setActiveSection(current);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [currentPage]);

  if (currentPage) {
    const index = PROJECTS.findIndex((item) => item.id === currentPage);
    const p = PROJECTS[index];
    const next = PROJECTS[(index + 1) % PROJECTS.length];
    return (
      <ProjectCaseStudy
        key={p.id}
        project={p}
        nextProject={next}
        onNext={() => setCurrentPage(next.id)}
        onBack={() => {
          setCurrentPage(null);
          setTimeout(() => {
            document.getElementById(`project-${p.id}`)?.scrollIntoView({ block: "center" });
            document.getElementById(`project-${p.id}`)?.focus({ preventScroll: true });
          }, 50);
        }}
        dm={dm}
      />
    );
  }

  return (
    <div className={`site ${dm ? "dark" : ""}`}>
      <a className="skip" href="#projects">Skip to projects</a>

      {/* ── NAVIGATION ── */}
      <nav className="topbar" aria-label="Main">
        <div className="wrap topbar-inner">
          <a href="#top" className="wordmark" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            Nathan Salman
          </a>

          <div className="nav-links">
            {NAV_ITEMS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                aria-current={activeSection === id ? "true" : undefined}
              >
                {label}
              </a>
            ))}
            <a href={LINKS.resume} target="_blank" rel="noreferrer">Resume</a>
            <button className="icon-btn" onClick={toggleDark} aria-label={dm ? "Switch to light theme" : "Switch to dark theme"}>
              {dm ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>

          <div className="nav-mobile">
            <button className="icon-btn" onClick={toggleDark} aria-label={dm ? "Switch to light theme" : "Switch to dark theme"}>
              {dm ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button className="icon-btn" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Menu">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mobile-menu wrap">
            {NAV_ITEMS.map(({ id, label }) => (
              <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>{label}</a>
            ))}
            <a href={LINKS.resume} target="_blank" rel="noreferrer">Resume</a>
          </div>
        )}
      </nav>

      <main id="top">
        {/* ── HERO ── */}
        <header className="hero wrap">
          <h1 className="hero-name">Nathan Salman</h1>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="hero-intro">
                I study Informatics at the University of Washington with a focus on cybersecurity, and I graduate in June 2027.
                This past summer I interned on the security team at Velera, where I{" "}
                <mark className="hl hl-1">wrote 15+ detection rules</mark> and triaged alerts every day.
              </p>
              <p className="hero-intro">
                I'm <mark className="hl hl-2">looking for security roles</mark> that start in 2027.
              </p>
              <div className="hero-actions">
                <a className="btn" href={`mailto:${LINKS.email}`}>Email me</a>
                <a className="text-link" href={LINKS.resume} target="_blank" rel="noreferrer">Resume</a>
                <a className="text-link" href={LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                <a className="text-link" href={LINKS.github} target="_blank" rel="noreferrer">GitHub</a>
              </div>
            </div>
            <figure className="hero-photo">
              <img src="/nathan.webp" alt="Nathan Salman" width="800" height="1200" />
            </figure>
          </div>
        </header>

        {/* ── PROJECTS ── */}
        <section id="projects" className="section wrap" aria-labelledby="projects-h">
          <div className="section-head">
            <h2 id="projects-h">Projects</h2>
            <p>A capstone, some class projects, and a couple of things I built on my own. Each one has a full write-up.</p>
          </div>

          <ol className="projects">
            {PROJECTS.map((p) => (
              <li key={p.id} className="project">
                <button id={`project-${p.id}`} className="project-btn" onClick={() => setCurrentPage(p.id)}>
                  <span className="project-when">
                    {p.period}
                    {p.status === "In Progress" && <span className="project-status">Still building</span>}
                  </span>
                  <span className="project-main">
                    <span className="project-title"><span>{p.title}</span></span>
                    <span className="project-role">
                      {p.microsoft && <MicrosoftMark />}
                      {p.role}
                    </span>
                    <span className="project-summary">{p.summary}</span>
                    <span className="project-tags">{p.tags.join(", ")}</span>
                  </span>
                  <span className="project-cta">Read the write-up</span>
                </button>
                {p.liveUrl && (
                  <a className="project-live text-link" href={p.liveUrl} target="_blank" rel="noreferrer">
                    Live site <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                )}
              </li>
            ))}
          </ol>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" className="section wrap" aria-labelledby="experience-h">
          <div className="section-head">
            <h2 id="experience-h">Experience</h2>
          </div>
          <ol className="jobs">
            {EXPERIENCE.map((job) => (
              <li key={job.company + job.title} className="job">
                <div className="job-when">
                  {job.period}
                  <span>{job.type}</span>
                </div>
                <div>
                  <h3 className="job-title">{job.title}, {job.company}</h3>
                  <p className="job-where">{job.location}</p>
                  <ul className="job-bullets">
                    {job.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="section wrap" aria-labelledby="about-h">
          <div className="section-head">
            <h2 id="about-h">About</h2>
          </div>
          <div className="about-grid">
            <div className="about-copy">
              <p>
                My first tech job was at the front desk of Mill Creek Tennis Club, where I ended up handling the club's IT and rebuilding its website.
                Now I study Informatics at UW with a focus on cybersecurity.
              </p>
              <p>
                I'm most interested in where security meets automation: detection rules, compliance tooling, and anything that takes repetitive work off a security team's plate.
                At Velera that meant writing rules in Rapid7. In my capstone it meant getting an AI agent to turn regulations into Azure DevOps tickets.
              </p>
              <p>
                Away from a keyboard I'm usually on a tennis court, either with friends or in my local USTA league.
                I also strung more than 1,500 rackets at Avanti Sports, so I have opinions about string tension.
                When I'm not playing, I like cooking and trying new recipes.
              </p>
            </div>

            <dl className="facts">
              <div>
                <dt>School</dt>
                <dd>
                  B.S. in Informatics, cybersecurity track
                  <span>University of Washington, graduating June 2027, 3.86 GPA</span>
                </dd>
              </div>
              <div>
                <dt>Certifications</dt>
                <dd className="cert">
                  <img src="/comptia-logo.svg" alt="" width="40" height="20" />
                  <span className="cert-text">
                    CompTIA Security+
                    <span>Earned May 2026</span>
                  </span>
                </dd>
                <dd>
                  Cybersecurity Certificate
                  <span>Purdue University and Simplilearn, August 2025</span>
                </dd>
              </div>
            </dl>
          </div>

          <h3 className="tools-head">Tools and skills</h3>
          <dl className="tools">
            {SKILLS_DATA.map((group) => (
              <div key={group.category}>
                <dt>{group.category}</dt>
                <dd>{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="section wrap contact" aria-labelledby="contact-h">
          <div className="contact-lead">
            <h2 id="contact-h">Get in touch</h2>
            <p>
              If you're hiring for a security role in 2027, or you just want to talk about detection engineering or tennis, email me.
            </p>
            <a className="contact-email" href={`mailto:${LINKS.email}`}><span>{LINKS.email}</span></a>
            <p className="contact-elsewhere">
              Or find me on <a className="text-link" href={LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> and{" "}
              <a className="text-link" href={LINKS.github} target="_blank" rel="noreferrer">GitHub</a>.
            </p>
          </div>
          <div className="contact-form-wrap">
            <h3>Or send a message here</h3>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="footer wrap">
        <span>Nathan Salman, Seattle</span>
        <span>© 2026</span>
      </footer>
    </div>
  );
}
