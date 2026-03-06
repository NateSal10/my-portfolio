import { useState, useEffect, useRef } from "react";
import { Menu, X, ExternalLink, Linkedin, Mail, ArrowLeft, CheckCircle, AlertTriangle, Terminal, Eye, Database, Shield, Code, Server, Zap } from "lucide-react";

const NAV_ITEMS = ["About", "Projects", "Experience", "Skills", "Contact"];

const PROJECTS = [
  {
    id: "compliance-copilot",
    title: "AI-Powered Compliance Copilot",
    role: "Informatics Capstone",
    period: "January 2026 – Present",
    status: "In Progress",
    tags: ["AI Agents", "Azure DevOps", "Compliance Automation", "Python", "Prompt Engineering"],
    summary: "An AI-driven compliance automation platform that converts complex regulatory requirements into structured, actionable Azure DevOps work items — complete with gap analysis, traceability, and remediation planning.",
    icon: <Shield size={28} />,
    color: "from-blue-500 to-cyan-500",
    featured: true,
    microsoft: true,
    noPage: true,
    overview: "",
    problem: "",
    solution: "",
    techDetails: [],
    outcomes: [],
    architecture: ""
  },
  {
    id: "zero-day-response",
    title: "Zero-Day Incident Response Tabletop",
    role: "ThinkCyber UW Challenge",
    period: "November 2025",
    status: "Completed",
    tags: ["Incident Response", "IOC Analysis", "PCI DSS", "MITRE ATT&CK", "Threat Intelligence"],
    summary: "Investigated a simulated zero-day exploit targeting SecureShare, identifying IOCs including malicious .aspx webshells, SQL injection chains, and DLL hijacking — delivering a full IR plan with SEC disclosure guidance.",
    icon: <AlertTriangle size={28} />,
    color: "from-red-500 to-orange-500",
    featured: true,
    microsoft: false,
    noPage: false,
    overview: "A high-fidelity tabletop exercise simulating a real-world zero-day attack on a fictional fintech company (SecureShare). The exercise required active threat hunting, evidence analysis, and the development of a production-grade incident response plan under time pressure.",
    problem: "SecureShare's SOC detected anomalous outbound traffic patterns and unusual file writes to their web server. Initial triage was inconclusive. The challenge: determine the attack vector, scope the breach, and produce a complete IR plan within the exercise window.",
    solution: "I led a systematic investigation using MITRE ATT&CK as the analytical framework — mapping observed behaviors to techniques, building an attack timeline, and developing detection rules and remediation steps aligned to PCI DSS and SEC disclosure requirements.",
    techDetails: [
      { label: "IOCs Identified", value: "Malicious .aspx webshell (T1505.003), SQL injection payload chains (T1190), DLL search order hijacking (T1574.001), and C2 beaconing over HTTPS" },
      { label: "Attack Timeline", value: "Reconstructed full kill chain from initial access through lateral movement, privilege escalation, and data exfiltration" },
      { label: "Detection Rules", value: "SIEM correlation rules written in SPL (Splunk) to detect webshell execution, anomalous SQL patterns, and unusual DLL loads" },
      { label: "Compliance", value: "Mapped breach to PCI DSS 4.0 incident response requirements (Req 12.10) and SEC cybersecurity disclosure rules (Reg S-K Item 106)" },
      { label: "Remediation", value: "Phased containment plan: immediate isolation → forensic preservation → eradication → recovery with rollback procedures" }
    ],
    outcomes: [
      "Identified 3 distinct attack vectors across the kill chain",
      "Produced a 25-page incident response report accepted as exercise deliverable",
      "Wrote 8 Splunk detection rules covering identified TTPs",
      "Developed SEC 8-K disclosure draft aligned to materiality standards"
    ],
    architecture: "Initial Alert → Threat Hunt → IOC Extraction → MITRE Mapping → Detection Rules → IR Plan → Compliance Reporting"
  },
  {
    id: "pentest",
    title: "Web Application Penetration Test",
    role: "Security Assessment Project",
    period: "July 2025",
    status: "Completed",
    tags: ["Penetration Testing", "Burp Suite", "Nmap", "OWASP Top 10", "Vulnerability Assessment"],
    summary: "Conducted a comprehensive black-box penetration test on a sandbox web application, identifying critical vulnerabilities including SQLi, XSS, and broken authentication — with full remediation guidance.",
    icon: <Terminal size={28} />,
    color: "from-purple-500 to-pink-500",
    featured: false,
    microsoft: false,
    noPage: false,
    overview: "A structured penetration test following a black-box methodology against a deliberately vulnerable web application environment. The engagement covered OWASP Top 10 vulnerability classes and produced a professional pentest report suitable for executive and technical audiences.",
    problem: "The target application had never undergone a formal security assessment despite handling simulated user credentials and sensitive form data. Unknown attack surface with no baseline security posture established.",
    solution: "Executed a full penetration test across reconnaissance, scanning, exploitation, and reporting phases. Documented all findings with CVSS scores, proof-of-concept evidence, and prioritized remediation steps.",
    techDetails: [
      { label: "Reconnaissance", value: "Passive OSINT using WHOIS, DNS enumeration; active scanning with Nmap for service/version detection and Dirb for directory enumeration" },
      { label: "Vulnerability Scanning", value: "Burp Suite for web application scanning; manual testing for business logic flaws not detectable by automated tools" },
      { label: "Exploitation", value: "Confirmed SQL injection via manual payload testing; XSS via DOM manipulation; session token entropy analysis revealing predictable tokens" },
      { label: "Findings", value: "Critical: SQLi (CVSS 9.8), High: Stored XSS (CVSS 8.8), Medium: Broken Auth (CVSS 7.5), Low: Security misconfigurations (CVSS 4.3)" },
      { label: "Reporting", value: "Executive summary + technical findings report with CVSS scoring, PoC screenshots, and remediation roadmap" }
    ],
    outcomes: [
      "Identified 4 unique vulnerability classes across the application",
      "Achieved simulated RCE via chained SQLi and file upload bypass",
      "Produced professional pentest report in industry-standard format",
      "All critical findings resolved in follow-up remediation verification"
    ],
    architecture: "Scope Definition → Recon → Scanning → Exploitation → Post-Exploitation → Reporting → Remediation Verification"
  },
  {
    id: "windows-monitoring",
    title: "Windows Security Monitoring System",
    role: "Incident Response / SIEM Project",
    period: "June 2025",
    status: "Completed",
    tags: ["PowerShell", "SIEM", "NIST CSF", "Windows Events", "Splunk"],
    summary: "Built an automated Windows event log monitoring system in PowerShell that detects unauthorized access in real time, generates alerts, and produces HTML SOC dashboards — simulating enterprise SIEM workflows.",
    icon: <Eye size={28} />,
    color: "from-green-500 to-teal-500",
    featured: false,
    microsoft: false,
    noPage: false,
    overview: "A lightweight security monitoring solution built in PowerShell that ingests Windows Event Logs, correlates events against detection rules, and surfaces findings through an automated HTML dashboard — mimicking the workflow of enterprise SIEM tools like Splunk.",
    problem: "Small teams without enterprise SIEM budgets lack visibility into authentication anomalies, privilege escalation attempts, and lateral movement on Windows systems. Native Windows Event Viewer is not operationally scalable.",
    solution: "Developed a PowerShell-based monitoring engine that continuously parses Security, System, and Application event logs, applies detection logic aligned to NIST CSF Detect function, and generates timestamped alerts with an auto-refreshing HTML dashboard.",
    techDetails: [
      { label: "Detection Rules", value: "Event ID monitoring for 4624/4625 (logon/failure), 4648 (explicit credentials), 4720 (account creation), 4698 (scheduled task creation), 7045 (service install)" },
      { label: "Alert Logic", value: "Threshold-based alerting: 5+ failed logons in 60s triggers brute-force alert; new admin account creation triggers immediate critical alert" },
      { label: "Dashboard", value: "Auto-generated HTML report with color-coded severity, timeline charts — scheduled via Windows Task Scheduler" },
      { label: "NIST Alignment", value: "Mapped to NIST CSF 2.0 Detect (DE.CM, DE.AE) and Respond (RS.AN) functions" },
      { label: "Tools", value: "PowerShell, Windows Event Viewer, Splunk" }
    ],
    outcomes: [
      "Detected simulated brute-force attack within 12 seconds of threshold breach",
      "Reduced mean-time-to-detect (MTTD) by ~70% vs. manual log review",
      "Dashboard adopted as SOC workflow simulation tool in course lab",
      "Applied NIST incident response principles throughout the workflow"
    ],
    architecture: "Event Log Sources → PowerShell Collector → Detection Engine → Alert Queue → HTML Dashboard → SOC Review"
  },
  {
    id: "student-data-system",
    title: "Student Data Management System",
    role: "Full-Stack Web Application",
    period: "September – December 2024",
    status: "Completed",
    tags: ["Flask", "Python", "SQL", "Authentication", "Security Best Practices"],
    summary: "A Flask web app with secure authentication and full CRUD workflows for 200+ users, featuring parameterized queries, input validation, and admin dashboards — achieving a ~40% improvement in data retrieval efficiency.",
    icon: <Database size={28} />,
    color: "from-yellow-500 to-orange-400",
    featured: false,
    microsoft: false,
    noPage: false,
    overview: "A production-grade student records management system built with Flask and MySQL, designed for academic staff to manage enrollment data, grades, and student profiles. Security and performance were first-class design requirements.",
    problem: "The existing system used spreadsheets with no access control, exposing all student records to any staff member. Data entry errors were frequent with no validation layer, and queries on large datasets were timing out.",
    solution: "Built a full-stack web application with role-based access control (RBAC), server-side input validation, parameterized SQL queries to eliminate injection risks, and optimized database indexing to dramatically improve query performance.",
    techDetails: [
      { label: "Backend", value: "Flask (Python) with SQLAlchemy ORM, Flask-Login for session management, and bcrypt for password hashing" },
      { label: "Database", value: "MySQL with normalized schema design, composite indexes on frequently queried columns" },
      { label: "Security", value: "Parameterized queries (100% SQLi protection), CSRF tokens on all forms, rate limiting on auth endpoints, and role-based route guards" },
      { label: "Frontend", value: "Jinja2 templating with responsive UI, DataTables.js for client-side filtering/sorting, and Chart.js dashboards" },
      { label: "Performance", value: "Query optimization and composite indexes cut data retrieval time by ~40%" }
    ],
    outcomes: [
      "Deployed to serve 200+ active users across academic departments",
      "~40% improvement in data retrieval efficiency through indexing strategy",
      "Prevented SQL injection via parameterized queries throughout the app",
      "Reduced data entry errors through robust server-side validation"
    ],
    architecture: "Browser → Flask Routes → Auth Middleware → Business Logic → SQLAlchemy ORM → MySQL"
  }
];

const EXPERIENCE = [
  {
    title: "Tennis Shop Associate",
    company: "Avanti Sports Seattle",
    location: "Seattle, WA",
    period: "December 2023 – Present",
    type: "Part-Time",
    bullets: [
      "Delivered tailored equipment recommendations to 1,000+ customers, contributing to a 15% increase in repeat purchases.",
      "Streamlined the stringing workflow, completing 1,500+ rackets and reducing turnaround time by 30%."
    ]
  },
  {
    title: "IT Support & Front Desk Associate",
    company: "Mill Creek Tennis Club",
    location: "Mill Creek, WA",
    period: "January 2019 – Present",
    type: "Part-Time",
    bullets: [
      "Provide IT support for hardware, Wi-Fi, and network troubleshooting to ensure smooth daily operations.",
      "Led full website redesign and launched an online reservation platform, improving member engagement by 35% and reducing scheduling errors by 50%."
    ]
  }
];

const SKILLS_DATA = [
  {
    category: "Cybersecurity",
    icon: <Shield size={18} />,
    color: "text-blue-400",
    items: ["Incident Response", "Vulnerability Assessment", "Risk Assessment", "Governance & Compliance", "Gap Assessment", "Compliance Reporting", "MITRE ATT&CK", "NIST CSF", "Networking", "Firewalls", "TCP Wrappers"]
  },
  {
    category: "Security Tools",
    icon: <Terminal size={18} />,
    color: "text-red-400",
    items: ["Splunk (SIEM)", "Burp Suite", "Wireshark", "Nmap", "Metasploit", "Fail2Ban", "Dirb"]
  },
  {
    category: "Programming & Scripting",
    icon: <Code size={18} />,
    color: "text-green-400",
    items: ["Python", "PowerShell", "SQL", "JavaScript", "Java", "R", "Git", "Prompt Engineering", "AI Agent Development"]
  },
  {
    category: "Systems & Networks",
    icon: <Server size={18} />,
    color: "text-purple-400",
    items: ["Linux", "Windows", "Network Security", "Vulnerability Scanning", "Firewall Management"]
  },
  {
    category: "Data & Web",
    icon: <Database size={18} />,
    color: "text-yellow-400",
    items: ["Flask", "React", "HTML", "CSS", "MySQL", "Firebase", "Azure DevOps", "Matplotlib", "Seaborn", "Data Visualization"]
  }
];

function FadeIn({ children, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
      {children}
    </div>
  );
}

function ProjectPage({ project, onBack }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-700/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors text-sm">
            <ArrowLeft size={16} /> Back to Portfolio
          </button>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 text-sm font-medium truncate">{project.title}</span>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-12">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${project.color} mb-6 text-white shadow-lg`}>{project.icon}</div>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30">✅ Completed</span>
            <span className="text-slate-400 text-sm">{project.period}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{project.title}</h1>
          <p className={`text-lg font-semibold bg-gradient-to-r ${project.color} bg-clip-text text-transparent mb-6`}>{project.role}</p>
          <p className="text-slate-300 text-lg leading-relaxed">{project.overview}</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-12">
          {project.tags.map(t => <span key={t} className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-full text-xs text-slate-300">{t}</span>)}
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
            <h2 className="text-red-400 font-bold text-sm uppercase tracking-wider mb-3">The Problem</h2>
            <p className="text-slate-300 leading-relaxed">{project.problem}</p>
          </div>
          <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6">
            <h2 className="text-green-400 font-bold text-sm uppercase tracking-wider mb-3">My Solution</h2>
            <p className="text-slate-300 leading-relaxed">{project.solution}</p>
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 mb-12">
          <h2 className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-4">Pipeline / Architecture</h2>
          <div className="flex flex-wrap items-center gap-2">
            {project.architecture.split("→").map((step, i, arr) => (
              <div key={i} className="flex items-center gap-2">
                <span className={`px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r ${project.color} text-white shadow`}>{step.trim()}</span>
                {i < arr.length - 1 && <span className="text-slate-600 text-lg">→</span>}
              </div>
            ))}
          </div>
        </div>
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6">Technical Deep Dive</h2>
          <div className="space-y-4">
            {project.techDetails.map((d, i) => (
              <div key={i} className="flex gap-4 bg-slate-800/30 border border-slate-700/50 rounded-lg p-4">
                <div className="text-xs font-bold text-blue-400 uppercase tracking-wider min-w-32 pt-0.5">{d.label}</div>
                <div className="text-slate-300 text-sm leading-relaxed">{d.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Key Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {project.outcomes.map((o, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300 text-sm leading-relaxed">{o}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactForm({ darkMode }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const handleSubmit = () => { if (!form.name || !form.email || !form.message) return; setSent(true); };
  if (sent) return (
    <div className="text-center py-8">
      <CheckCircle size={40} className="text-green-400 mx-auto mb-3" />
      <p className="font-semibold text-green-400">Message sent!</p>
      <p className="text-sm mt-1 text-slate-400">Thanks for reaching out — I'll get back to you soon.</p>
    </div>
  );
  const cls = `w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors border focus:border-blue-400 ${darkMode ? "bg-slate-700/50 border-slate-600 text-slate-100 placeholder-slate-500" : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"}`;
  return (
    <div className="space-y-4">
      <input placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={cls} />
      <input placeholder="Your email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={cls} />
      <textarea placeholder="Your message..." rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className={cls + " resize-none"} />
      <button onClick={handleSubmit} className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold text-white transition-all hover:scale-[1.02]">Send Message</button>
    </div>
  );
}

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [currentPage, setCurrentPage] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobileMenuOpen(false); };

  useEffect(() => {
    const handler = () => {
      const sections = NAV_ITEMS.map(n => n.toLowerCase());
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveSection(id); break; }
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (currentPage) {
    const p = PROJECTS.find(p => p.id === currentPage);
    return <ProjectPage project={p} onBack={() => { setCurrentPage(null); setTimeout(() => scrollTo("projects"), 100); }} />;
  }

  const dm = darkMode;
  const border = dm ? "border-slate-700/50" : "border-slate-200";

  return (
    <div className={`min-h-screen ${dm ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100" : "bg-gray-50 text-slate-900"}`}>

      {/* NAV */}
      <nav className={`sticky top-0 z-50 backdrop-blur-md ${dm ? "bg-slate-900/80" : "bg-white/80"} border-b ${border}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Nathan Salman</div>
            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map(item => (
                <button key={item} onClick={() => scrollTo(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors ${activeSection === item.toLowerCase() ? "text-blue-400" : dm ? "text-slate-400 hover:text-slate-100" : "text-slate-600 hover:text-slate-900"}`}>
                  {item}
                </button>
              ))}
              <button onClick={() => setDarkMode(!dm)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${dm ? "border-slate-600 text-slate-400 hover:border-slate-400" : "border-slate-300 text-slate-600 hover:border-slate-500"}`}>
                {dm ? "☀️ Light" : "🌙 Dark"}
              </button>
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-400">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-3">
              {NAV_ITEMS.map(item => (
                <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="block w-full text-left py-2 text-slate-300 hover:text-blue-400 transition-colors">{item}</button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-36">
        <FadeIn>

          <h1 className="text-5xl sm:text-7xl font-black mb-6 leading-tight">
            Security-First<br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">Builder.</span>
          </h1>
          <p className={`text-xl sm:text-2xl mb-4 max-w-2xl leading-relaxed ${dm ? "text-slate-400" : "text-slate-500"}`}>
            UW Informatics student specializing in cybersecurity. I build systems that make organizations safer and more compliant — without sacrificing speed.
          </p>
          <p className={`mb-10 max-w-xl ${dm ? "text-slate-500" : "text-slate-400"}`}>
            From AI-powered compliance automation to incident response and penetration testing, I bridge the gap between security theory and engineering practice.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => scrollTo("projects")} className="px-8 py-3.5 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-500/25">View Projects</button>
            <a href="https://drive.google.com/file/d/17WwDWGOnPLG-52KIfBAJ8gVdmTbGNiwi/view?usp=sharing" target="_blank" rel="noreferrer"
              className={`px-8 py-3.5 rounded-xl font-semibold transition-colors border flex items-center gap-2 ${dm ? "border-slate-600 hover:border-blue-400 text-slate-300" : "border-slate-300 hover:border-blue-400 text-slate-700"}`}>
              <ExternalLink size={16} /> View Resume
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ABOUT */}
      <section id="about" className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t ${border}`}>
        <FadeIn>
          <h2 className="text-3xl font-bold mb-10">About Me</h2>
          <div className="grid md:grid-cols-5 gap-12">
            <div className={`md:col-span-3 space-y-4 ${dm ? "text-slate-300" : "text-slate-600"}`}>
              <p className="leading-relaxed">I'm a junior at the University of Washington studying Informatics with a cybersecurity specialization. My focus is on the intersection of security engineering and automation — building tools that help teams move fast without creating risk.</p>
              <p className="leading-relaxed">My work spans compliance automation, incident response, penetration testing, and security tooling. I'm most energized by projects that require translating ambiguous requirements — whether a regulatory framework or an architectural diagram — into working, secure systems.</p>
              <p className="leading-relaxed">Outside of security, I enjoy exploring AI agent architectures and finding creative ways to automate complex workflows. I believe the best security engineers are also great communicators.</p>
            </div>
            <div className="md:col-span-2 space-y-4">
              <div className={`p-5 rounded-xl border ${dm ? "bg-slate-800/50 border-slate-700/50" : "bg-white border-slate-200"}`}>
                <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3">Education</div>
                <div className="font-semibold">B.S. Informatics — Cybersecurity</div>
                <div className={`text-sm mt-1 ${dm ? "text-slate-400" : "text-slate-500"}`}>University of Washington</div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-green-400 font-semibold">GPA: 3.8</span>
                  <span className={dm ? "text-slate-500" : "text-slate-400"}>Expected Jun 2026</span>
                </div>
              </div>
              <div className={`p-5 rounded-xl border ${dm ? "bg-slate-800/50 border-slate-700/50" : "bg-white border-slate-200"}`}>
                <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3">Certifications</div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2"><CheckCircle size={14} className="text-green-400" /><span className={dm ? "text-slate-300" : "text-slate-600"}>Cybersecurity Certificate — Purdue / Simplilearn</span></div>
                  <div className="flex items-center gap-2"><Zap size={14} className="text-yellow-400" /><span className={dm ? "text-slate-300" : "text-slate-600"}>CompTIA Security+ — In Progress (Jan 2026)</span></div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* PROJECTS */}
      <section id="projects" className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t ${border}`}>
        <FadeIn>
          <h2 className="text-3xl font-bold mb-3">Projects</h2>
          <p className={`mb-12 ${dm ? "text-slate-400" : "text-slate-500"}`}>Click any completed project to see a full technical breakdown.</p>
        </FadeIn>

        {/* Featured */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {PROJECTS.filter(p => p.featured).map((p, i) => (
            <FadeIn key={p.id} delay={i * 100}>
              <div
                onClick={() => !p.noPage && setCurrentPage(p.id)}
                className={`w-full text-left p-6 rounded-2xl border transition-all group ${!p.noPage ? "hover:scale-[1.02] hover:shadow-xl cursor-pointer" : "cursor-default"} ${dm ? `bg-slate-800/40 border-slate-700/50 ${!p.noPage ? "hover:border-blue-500/50 hover:shadow-blue-500/10" : ""}` : `bg-white border-slate-200 ${!p.noPage ? "hover:border-blue-400 hover:shadow-blue-100" : ""}`}`}>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} text-white mb-4 shadow-md`}>{p.icon}</div>
                <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                  <div className="flex flex-wrap gap-1.5">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.status === "In Progress" ? "bg-blue-500/20 text-blue-300" : "bg-green-500/20 text-green-300"}`}>
                      {p.status === "In Progress" ? "🔵 In Progress" : "⭐ Featured"}
                    </span>
                    {p.microsoft && <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">🏢 Microsoft Sponsored</span>}
                  </div>
                  <span className={`text-xs ${dm ? "text-slate-500" : "text-slate-400"}`}>{p.period}</span>
                </div>
                <h3 className={`text-lg font-bold mt-3 mb-1 transition-colors ${!p.noPage ? "group-hover:text-blue-400" : ""}`}>{p.title}</h3>
                <p className={`text-sm mb-1 font-medium ${dm ? "text-slate-400" : "text-slate-500"}`}>{p.role}</p>
                <p className={`text-sm mb-4 leading-relaxed ${dm ? "text-slate-400" : "text-slate-500"}`}>{p.summary}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 3).map(t => <span key={t} className={`text-xs px-2 py-0.5 rounded-full ${dm ? "bg-slate-700 text-slate-400" : "bg-slate-100 text-slate-500"}`}>{t}</span>)}
                  {p.tags.length > 3 && <span className={`text-xs px-2 py-0.5 ${dm ? "text-slate-500" : "text-slate-400"}`}>+{p.tags.length - 3} more</span>}
                </div>
                {!p.noPage
                  ? <div className="mt-4 flex items-center gap-1 text-blue-400 text-sm font-medium">View case study <ExternalLink size={13} className="ml-1 group-hover:translate-x-1 transition-transform" /></div>
                  : <div className="mt-4 text-xs text-slate-500 italic">Case study coming soon</div>
                }
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Other projects */}
        <div className="grid md:grid-cols-3 gap-4">
          {PROJECTS.filter(p => !p.featured).map((p, i) => (
            <FadeIn key={p.id} delay={i * 80}>
              <div onClick={() => setCurrentPage(p.id)}
                className={`w-full text-left p-5 rounded-xl border transition-all hover:scale-[1.02] cursor-pointer group ${dm ? "bg-slate-800/30 border-slate-700/50 hover:border-blue-500/40" : "bg-white border-slate-200 hover:border-blue-400"}`}>
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${p.color} text-white mb-3 shadow`}>{p.icon}</div>
                <h3 className="font-bold mb-1 group-hover:text-blue-400 transition-colors text-sm">{p.title}</h3>
                <p className={`text-xs leading-relaxed mb-3 ${dm ? "text-slate-400" : "text-slate-500"}`}>{p.summary}</p>
                <div className="flex flex-wrap gap-1">
                  {p.tags.slice(0, 2).map(t => <span key={t} className={`text-xs px-1.5 py-0.5 rounded ${dm ? "bg-slate-700 text-slate-400" : "bg-slate-100 text-slate-500"}`}>{t}</span>)}
                </div>
                <div className="mt-3 text-xs text-blue-400 font-medium flex items-center gap-1">View details <ExternalLink size={11} /></div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t ${border}`}>
        <FadeIn>
          <h2 className="text-3xl font-bold mb-10">Work Experience</h2>
          <div className="space-y-0">
            {EXPERIENCE.map((job, i) => (
              <div key={i} className="relative pl-8 border-l-2 border-blue-500/30 pb-10 last:pb-0">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500 border-2 border-slate-900" />
                <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                  <div>
                    <h3 className="text-lg font-bold">{job.title}</h3>
                    <p className="text-blue-400 font-semibold">{job.company} <span className={`font-normal text-sm ${dm ? "text-slate-500" : "text-slate-400"}`}>· {job.location}</span></p>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm ${dm ? "text-slate-400" : "text-slate-500"}`}>{job.period}</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${dm ? "bg-slate-700 text-slate-400" : "bg-slate-100 text-slate-500"}`}>{job.type}</span>
                  </div>
                </div>
                <ul className="space-y-1.5 mt-3">
                  {job.bullets.map((b, j) => (
                    <li key={j} className={`text-sm flex gap-2 ${dm ? "text-slate-300" : "text-slate-600"}`}>
                      <span className="text-blue-400 mt-1 flex-shrink-0">•</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* SKILLS */}
      <section id="skills" className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t ${border}`}>
        <FadeIn>
          <h2 className="text-3xl font-bold mb-12">Skills</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SKILLS_DATA.map(group => (
              <div key={group.category}>
                <div className={`flex items-center gap-2 mb-5 ${group.color}`}>
                  {group.icon}
                  <span className="font-bold text-sm uppercase tracking-wider">{group.category}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map(skill => (
                    <span key={skill} className={`text-sm px-3 py-1.5 rounded-lg border ${dm ? "bg-slate-800/50 border-slate-700 text-slate-300" : "bg-white border-slate-200 text-slate-600"}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* CONTACT */}
      <section id="contact" className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t ${border}`}>
        <FadeIn>
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className={`mb-10 max-w-xl leading-relaxed ${dm ? "text-slate-400" : "text-slate-500"}`}>
            I'm actively looking for cybersecurity internship and full-time opportunities starting Summer/Fall 2026. Whether you have a role, a project, or just want to connect — my inbox is open.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-10 max-w-xl">
            {[
              { icon: <Mail size={20} />, label: "Email", value: "nathansalman10@gmail.com", href: "mailto:nathansalman10@gmail.com" },
              { icon: <Linkedin size={20} />, label: "LinkedIn", value: "nathan-e-salman", href: "https://www.linkedin.com/in/nathan-e-salman" },
            ].map(c => (
              <a key={c.label} href={c.href} target="_blank" rel="noreferrer"
                className={`flex items-start gap-4 p-5 rounded-xl border transition-all hover:border-blue-400 group ${dm ? "bg-slate-800/30 border-slate-700/50" : "bg-white border-slate-200"}`}>
                <div className="text-blue-400 group-hover:scale-110 transition-transform mt-0.5">{c.icon}</div>
                <div>
                  <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${dm ? "text-slate-500" : "text-slate-400"}`}>{c.label}</div>
                  <div className={`text-sm font-medium ${dm ? "text-slate-300" : "text-slate-700"}`}>{c.value}</div>
                </div>
              </a>
            ))}
          </div>

        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer className={`border-t py-8 mt-8 ${border}`}>
        <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm ${dm ? "text-slate-500" : "text-slate-400"}`}>
          <span>© 2026 Nathan Salman. All rights reserved.</span>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>Open to opportunities</span>
          </div>
        </div>
      </footer>
    </div>
  );
}