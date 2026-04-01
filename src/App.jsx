import { useState, useEffect, useRef } from "react";
import {
  Menu, X, ExternalLink, Linkedin, Mail, ArrowLeft,
  CheckCircle, AlertTriangle, Terminal, Eye, Database,
  Shield, Code, Server, Zap, ChevronDown, ChevronUp,
  TrendingUp, BarChart2, Layers, PlayCircle
} from "lucide-react";

// ─── DATA ─────────────────────────────────────────────────────────────────────

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
    icon: (
      <svg viewBox="0 0 21 21" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="10" height="10" fill="#f25022"/>
        <rect x="11" y="0" width="10" height="10" fill="#7fba00"/>
        <rect x="0" y="11" width="10" height="10" fill="#00a4ef"/>
        <rect x="11" y="11" width="10" height="10" fill="#ffb900"/>
      </svg>
    ),
    color: "from-slate-700 to-slate-900",
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
    icon: <AlertTriangle size={22} />,
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
    icon: <Terminal size={22} />,
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
    icon: <Eye size={22} />,
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
    icon: <Database size={22} />,
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
  },
  {
    id: "trading-simulator",
    title: "TradeForge",
    role: "Trading Simulator & Prop Firm Trainer",
    period: "March 2026 – Present",
    status: "In Progress",
    tags: ["React", "Vite", "TradingView Lightweight Charts", "Firebase Auth", "Google Sign-In", "Backtesting", "JavaScript", "ICT / SMC"],
    summary: "TradeForge is a full-stack trading platform I built to go beyond what TradingView offers — bar-by-bar market replay with real order simulation, a visual strategy backtester, prop firm challenge mode, ICT/SMC overlays, and Google-authenticated accounts that save your trade history and P&L across sessions.",
    icon: <Zap size={22} />,
    color: "from-cyan-500 to-blue-600",
    featured: false,
    microsoft: false,
    noPage: false,
    overview: "TradingView is a great charting tool, but it falls short for serious practice — you can't replay markets with real order execution, test strategies algorithmically, or simulate a prop firm challenge. I built TradeForge from scratch to fill that gap. It's a full trading environment with a bar-by-bar market replay engine, live order simulation, a visual backtesting system with custom SMC/ICT overlays, and a prop firm challenge mode that enforces daily loss limits and max drawdown in real time. Accounts are backed by Google Sign-In so your trade history, equity curve, and P&L persist across every session.",
    problem: "Preparing for a prop firm challenge (like FTMO or MyFundedFX) requires two things most tools don't provide together: realistic discretionary practice under real risk rules, and a way to validate strategies algorithmically before putting money on the line. TradingView's replay is read-only — no order simulation, no P&L tracking, no account rules. Paid simulators are expensive, inflexible, and don't support custom strategies. And nothing on the market combines all of this with persistent account data tied to your identity.",
    solution: "Built TradeForge as a full-stack React app on TradingView Lightweight Charts. The replay engine streams historical candles one at a time — you place market and limit orders that fill at real historical prices, just like live trading. The backtesting page uses a visual rule builder (no code needed) to define strategy conditions, then runs them across months of data in seconds. The dashboard tracks your equity curve, trade calendar, win rate, and streak — all saved to your account via Google Sign-In so nothing is lost between sessions.",
    stats: [
      { label: "Pages Built", value: "5", sub: "Dashboard, Practice, Backtest, Learn, Glossary" },
      { label: "Perf Metrics", value: "8+", sub: "P&L, win rate, streak, drawdown, Sharpe, profit factor" },
      { label: "Auth", value: "Google", sub: "Sign-in with persistent account data & trade history" },
      { label: "Chart Overlays", value: "Custom", sub: "Kill zones, FVG zones, TP/SL lines, B&R zones" }
    ],
    screenshots: [
      { src: "/screenshots/dashboard.png", caption: "Dashboard — equity curve, prop/paper accounts, market clock & live P&L stats" },
      { src: "/screenshots/calendar.png", caption: "Trade Calendar — daily P&L heatmap with economic event tags (CPI, FOMC, NFP)" },
      { src: "/screenshots/practice.png", caption: "Practice Mode — live chart with Asia/London/NY kill zones, SMC overlays & order panel" },
      { src: "/screenshots/backtest.png", caption: "Backtest Page — Break & Retest zones plotted on chart with visual entry rule builder" }
    ],
    featureCards: [
      {
        icon: <PlayCircle size={20} />,
        title: "Market Replay Mode",
        desc: "Replay any historical market candle-by-candle at your own pace. Place market, limit, stop, and stop-limit orders that fill at accurate historical prices — with trailing stop support and a live P&L panel that updates in real time."
      },
      {
        icon: <Shield size={20} />,
        title: "Prop Firm Challenge Simulator",
        desc: "Configure your challenge rules — daily loss limit, max drawdown, minimum trading days. TradeForge tracks your balance in real time and shows how much room you have left each day, so you build the discipline to pass before going live."
      },
      {
        icon: <Code size={20} />,
        title: "Google Sign-In & Account Persistence",
        desc: "Accounts are powered by Google Sign-In — your trade history, equity curve, win rate, and streak are saved to your profile and available from any device. Prop and paper accounts are tracked separately with a one-click reset option."
      },
      {
        icon: <Layers size={20} />,
        title: "Visual Strategy Builder",
        desc: "Define trading strategies without writing code. Add condition blocks — entry time windows, price crossovers, Break & Retest zones — and the engine auto-calculates entries, stop losses, and take profits for every signal generated."
      },
      {
        icon: <BarChart2 size={20} />,
        title: "Backtesting Engine & Trade Calendar",
        desc: "Run strategies across months of data in seconds. Results include a filterable trade log with per-trade entry reasons, plus an equity curve and trade calendar showing daily P&L — with economic event markers (CPI, FOMC, NFP) for context."
      },
      {
        icon: <Eye size={20} />,
        title: "ICT / SMC Chart Overlays",
        desc: "Asia, London, and New York kill zone windows are rendered as colored overlays directly on the chart. FVG (Fair Value Gap) zones are detected automatically. Each overlay is independently toggleable from the chart toolbar."
      }
    ],
    techDetails: [
      { label: "Auth & Persistence", value: "Google Sign-In via Firebase Auth — user profiles, trade history, equity data, and account balances are persisted per user. Prop and paper accounts are tracked independently with full reset capability" },
      { label: "Charting", value: "TradingView Lightweight Charts with custom rendering primitives: TP/SL price lines styled to match TradingView's native look, BoxZonePrimitive for ICT kill zone and B&R overlays, FVG zone detection, and SMC overlay toggles" },
      { label: "Replay Engine", value: "Streams historical OHLCV candles one at a time on a configurable timer. Market, limit, stop, and stop-limit orders are queued and filled at accurate historical prices, with trailing stop logic applied on each bar" },
      { label: "Rule Engine", value: "Evaluates strategy conditions bar-by-bar across the full dataset. Each condition type (zone_time, br_zone, crossover) uses a signal override pattern to inject entry/SL/TP values, keeping the evaluation loop unified regardless of condition complexity" },
      { label: "B&R Zone Logic", value: "Per-day state machine tracks three phases: zone establishment (time window), breakout direction (close vs zone boundary), and retest entry (price returns to zone). One-trade-per-zone-per-day flag prevents duplicate signals" },
      { label: "Dashboard & Analytics", value: "Equity curve chart, trade calendar with daily P&L heatmap and economic event markers (CPI, FOMC, NFP), win/loss streak tracker, profit factor, Sharpe ratio, and best-day metrics — all computed from saved trade history" }
    ],
    outcomes: [
      "Built a full Google-authenticated platform with persistent trade history across sessions",
      "Replaced TradingView's read-only replay with a real order-simulating engine",
      "Prop firm challenge mode enforces funded account rules during practice",
      "Visual rule builder makes strategy backtesting accessible without any coding",
      "Trade calendar and equity curve give data-driven feedback on trading patterns",
      "ICT/SMC overlays and Break & Retest detection bring professional tools to the browser"
    ],
    liveUrl: "https://es-trading-academy.vercel.app/",
    architecture: "Historical Data Feed → Replay Engine → Order Queue → Rule Engine → Signal Evaluation → P&L Tracker → Prop Firm Risk Monitor → Results & Trade Log"
  }
];

const EXPERIENCE = [
  {
    title: "Technology Officer",
    company: "ThinkCyber UW",
    location: "Seattle, WA",
    period: "February 2026 – Present",
    type: "Club Officer",
    bullets: [
      "Lead the Security+ Cohort, facilitating weekly study sessions on exam domains, practice questions, and test strategy to guide UW students toward passing CompTIA Security+.",
      "Oversee the club's technical infrastructure as an executive officer — building and maintaining the website and driving feature improvements to support a growing membership."
    ]
  },
  {
    title: "Public Relations Officer",
    company: "Husky Table Tennis Club",
    location: "Seattle, WA",
    period: "January 2024 – Present",
    type: "Club Officer",
    bullets: [
      "Manage club communications and social media presence, keeping 100+ members informed on upcoming events, tournaments, and fundraisers.",
      "Coordinate and run league tournaments, fostering an inclusive and competitive environment for players of all skill levels."
    ]
  },
  {
    title: "Tennis Shop Associate",
    company: "Avanti Sports Seattle",
    location: "Seattle, WA",
    period: "December 2023 – Present",
    type: "Part-Time",
    bullets: [
      "Provided personalized equipment recommendations to 1,000+ customers, leveraging deep product knowledge to drive a 15% increase in repeat business.",
      "Optimized the racket stringing workflow, completing 1,500+ string jobs while cutting average turnaround time by 30%."
    ]
  },
  {
    title: "IT Support & Front Desk Associate",
    company: "Mill Creek Tennis Club",
    location: "Mill Creek, WA",
    period: "January 2019 – Present",
    type: "Part-Time",
    bullets: [
      "Deliver hands-on IT support for hardware, Wi-Fi infrastructure, and network troubleshooting, maintaining reliable daily operations for staff and members.",
      "Led a full website redesign and built an online reservation system, increasing member engagement by 35% and cutting scheduling errors by 50%."
    ]
  }
];

const SKILLS_DATA = [
  {
    category: "Cybersecurity",
    icon: <Shield size={16} />,
    color: "text-blue-400",
    items: ["Incident Response", "Vulnerability Assessment", "Risk Assessment", "Governance & Compliance", "Gap Assessment", "Compliance Reporting", "MITRE ATT&CK", "NIST CSF", "Networking", "Firewalls", "TCP Wrappers"]
  },
  {
    category: "Security Tools",
    icon: <Terminal size={16} />,
    color: "text-red-400",
    items: ["Splunk (SIEM)", "Burp Suite", "Wireshark", "Nmap", "Metasploit", "Fail2Ban", "Dirb"]
  },
  {
    category: "Programming & Scripting",
    icon: <Code size={16} />,
    color: "text-green-400",
    items: ["Python", "PowerShell", "SQL", "JavaScript", "Java", "R", "Git", "Prompt Engineering", "AI Agent Development"]
  },
  {
    category: "Systems & Networks",
    icon: <Server size={16} />,
    color: "text-purple-400",
    items: ["Linux", "Windows", "Network Security", "Vulnerability Scanning", "Firewall Management"]
  },
  {
    category: "Data & Web",
    icon: <Database size={16} />,
    color: "text-yellow-400",
    items: ["Flask", "React", "HTML", "CSS", "MySQL", "Firebase", "Azure DevOps", "Matplotlib", "Seaborn", "Data Visualization"]
  }
];

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
        setWordIdx((wordIdx + 1) % words.length);
        setPhase("typing");
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

function SectionDivider() {
  return <div className="h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent my-12" />;
}

function SectionHeading({ title, dm }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className={`h-0.5 w-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400`} />
    </div>
  );
}

function ProjectPage({ project, onBack, dm }) {
  const progress = useScrollProgress();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const muted = dm ? "text-slate-400" : "text-slate-500";
  const subtle = dm ? "text-slate-500" : "text-slate-400";
  const card = dm ? "bg-slate-900/70 border-slate-800" : "bg-white border-slate-200 shadow-sm";

  return (
    <div className={`min-h-screen font-sans ${dm ? "bg-[#030712] text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      <nav className={`sticky top-0 z-50 backdrop-blur-xl border-b ${dm ? "bg-[#030712]/85 border-slate-800/60" : "bg-white/85 border-slate-200"}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-blue-400 ${muted}`}
          >
            <ArrowLeft size={15} /> Back to Portfolio
          </button>
          <span className={subtle}>·</span>
          <span className={`text-sm font-medium truncate ${dm ? "text-slate-300" : "text-slate-700"}`}>{project.title}</span>
        </div>
      </nav>

      {/* Header gradient banner */}
      <div className={`relative overflow-hidden`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-[0.06] pointer-events-none`} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-10">
          {/* Header */}
          <div className="mb-12">
            {/* Icon with glow */}
            <div className="relative inline-flex mb-6">
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.color} opacity-30 blur-xl scale-150`} />
              <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${project.color} text-white shadow-xl`}>
                <span className="w-7 h-7 flex items-center justify-center">{project.icon}</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              {project.status === "In Progress" ? (
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-blue-500/12 text-blue-400 border border-blue-500/25 font-mono">
                  ◉ In Progress
                </span>
              ) : (
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-green-500/12 text-green-400 border border-green-500/25 font-mono">
                  ✓ Completed
                </span>
              )}
              <span className={`text-xs font-mono ${subtle}`}>{project.period}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">{project.title}</h1>
            <p className={`text-base font-semibold bg-gradient-to-r ${project.color} bg-clip-text text-transparent mb-6`}>{project.role}</p>
            <p className={`text-base leading-relaxed max-w-2xl ${muted}`}>{project.overview}</p>
            {project.liveUrl && (
              <div className="mt-6">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r ${project.color} text-white shadow-md hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all`}
                >
                  <ExternalLink size={14} /> View Live Site
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">

        {/* Stats Cards */}
        {project.stats && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              {project.stats.map((s, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl p-4 border text-center overflow-hidden transition-shadow hover:shadow-lg ${card}`}
                  style={{ borderTopWidth: "2px", borderTopColor: "transparent", backgroundClip: "padding-box" }}
                >
                  {/* Top accent bar using a pseudo approach via a positioned element */}
                  <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${project.color}`} />
                  {/* Subtle background glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-[0.04] pointer-events-none`} />
                  <div className="relative">
                    <div className={`text-3xl font-bold bg-gradient-to-r ${project.color} bg-clip-text text-transparent mb-1`}>{s.value}</div>
                    <div className="text-xs font-bold uppercase tracking-wider font-mono text-blue-400 mb-1">{s.label}</div>
                    <div className={`text-xs leading-snug ${subtle}`}>{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <SectionDivider />
          </>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-14">
          {project.tags.map(t => (
            <span key={t} className={`px-3 py-1.5 rounded-full text-xs font-medium font-mono border ${dm ? "bg-slate-800/70 border-slate-700/60 text-slate-300" : "bg-white border-slate-200 text-slate-600"}`}>
              {t}
            </span>
          ))}
        </div>

        {/* Problem / Solution */}
        <div className="grid md:grid-cols-2 gap-5 mb-6">
          <div className={`rounded-2xl p-6 border ${dm ? "bg-red-500/5 border-red-500/20" : "bg-red-50 border-red-100"}`}>
            <div className="text-red-400 font-bold text-xs uppercase tracking-[0.18em] mb-3 font-mono">The Problem</div>
            <p className={`text-sm leading-relaxed ${dm ? "text-slate-300" : "text-slate-600"}`}>{project.problem}</p>
          </div>
          <div className={`rounded-2xl p-6 border ${dm ? "bg-green-500/5 border-green-500/20" : "bg-green-50 border-green-100"}`}>
            <div className="text-green-400 font-bold text-xs uppercase tracking-[0.18em] mb-3 font-mono">My Solution</div>
            <p className={`text-sm leading-relaxed ${dm ? "text-slate-300" : "text-slate-600"}`}>{project.solution}</p>
          </div>
        </div>

        <SectionDivider />

        {/* Architecture */}
        <div className={`rounded-2xl p-6 mb-6 border ${card}`}>
          <div className={`font-bold text-xs uppercase tracking-[0.18em] mb-5 font-mono ${subtle}`}>Pipeline / Architecture</div>
          <div className="flex flex-wrap items-center gap-2">
            {project.architecture.split("→").map((step, i, arr) => (
              <div key={i} className="flex items-center gap-2">
                <div className="relative group">
                  <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${project.color} opacity-30 blur-md group-hover:opacity-50 transition-opacity`} />
                  <span className={`relative px-3 py-1.5 rounded-lg text-xs font-medium font-mono bg-gradient-to-r ${project.color} text-white shadow-sm`}>
                    {step.trim()}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <span className={`text-base font-bold ${dm ? "text-slate-500" : "text-slate-400"}`}>
                    ›
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <SectionDivider />

        {/* Screenshots */}
        {project.screenshots && (
          <>
            <div className="mb-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">Screenshots</h2>
                <div className={`h-0.5 w-12 rounded-full bg-gradient-to-r ${project.color}`} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.screenshots.map((s, i) => (
                  <div key={i} className={`relative rounded-2xl overflow-hidden border ${card} group`}>
                    {/* Colored top border */}
                    <div className={`absolute top-0 left-0 right-0 h-0.5 z-10 bg-gradient-to-r ${project.color}`} />
                    <div className="overflow-hidden">
                      <img
                        src={s.src}
                        alt={s.caption}
                        className="w-full object-cover aspect-video bg-slate-800 transition-transform duration-300 group-hover:scale-105"
                        onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                      />
                      <div className="hidden items-center justify-center aspect-video bg-slate-800/50 text-slate-500 text-xs font-mono">
                        {s.caption}
                      </div>
                    </div>
                    {/* Caption bar with gradient */}
                    <div className={`px-4 py-3 text-xs font-medium ${muted} border-t ${dm ? "border-slate-800 bg-gradient-to-r from-slate-900/80 to-slate-800/60" : "border-slate-100 bg-gradient-to-r from-white to-slate-50"}`}>
                      {s.caption}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <SectionDivider />
          </>
        )}

        {/* Feature Cards */}
        {project.featureCards && (
          <>
            <div className="mb-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">Key Features</h2>
                <div className={`h-0.5 w-12 rounded-full bg-gradient-to-r ${project.color}`} />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.featureCards.map((f, i) => (
                  <div
                    key={i}
                    className={`relative rounded-2xl p-5 border overflow-hidden transition-all duration-200 hover:shadow-lg group ${card}`}
                  >
                    {/* Left accent bar */}
                    <div className={`absolute left-0 top-4 bottom-4 w-0.5 rounded-r-full bg-gradient-to-b ${project.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
                    {/* Hover gradient bg */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-[0.04] transition-opacity pointer-events-none`} />
                    <div className="relative">
                      {/* Icon with glow */}
                      <div className="relative inline-flex mb-4">
                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${project.color} opacity-40 blur-md scale-125`} />
                        <div className={`relative inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br ${project.color} text-white shadow-sm`}>
                          {f.icon}
                        </div>
                      </div>
                      <div className="text-sm font-bold mb-2">{f.title}</div>
                      <div className={`text-xs leading-relaxed ${muted}`}>{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <SectionDivider />
          </>
        )}

        {/* Technical Deep Dive */}
        <div className="mb-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Technical Deep Dive</h2>
            <div className={`h-0.5 w-12 rounded-full bg-gradient-to-r ${project.color}`} />
          </div>
          {/* Vertical accent line container */}
          <div className="relative">
            <div className={`absolute left-0 top-0 bottom-0 w-0.5 rounded-full bg-gradient-to-b ${project.color} opacity-30`} />
            <div className="space-y-2 pl-4">
              {project.techDetails.map((d, i) => (
                <div
                  key={i}
                  className={`flex gap-5 rounded-xl p-4 border transition-colors ${card} ${i % 2 === 0 ? (dm ? "bg-slate-900/90" : "bg-white") : (dm ? "bg-slate-800/40" : "bg-slate-50/80")}`}
                >
                  {/* Gradient label text */}
                  <div className={`text-xs font-bold uppercase tracking-wider font-mono min-w-[110px] pt-0.5 flex-shrink-0 bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>
                    {d.label}
                  </div>
                  <div className={`text-sm leading-relaxed ${dm ? "text-slate-300" : "text-slate-600"}`}>{d.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SectionDivider />

        {/* Outcomes */}
        <div className={`rounded-2xl p-6 border ${card}`}>
          {/* Section header with count badge */}
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold">Key Outcomes</h2>
            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white bg-gradient-to-br ${project.color} shadow-sm`}>
              {project.outcomes.length}
            </span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {project.outcomes.map((o, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 rounded-xl p-3 border transition-all duration-200 hover:shadow-md group ${dm ? "bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/70" : "bg-slate-50 border-slate-100 hover:bg-white"}`}
              >
                {/* Numbered circle */}
                <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold text-white flex-shrink-0 mt-0.5 bg-gradient-to-br ${project.color} shadow-sm`}>
                  {i + 1}
                </span>
                <span className={`text-sm leading-relaxed ${dm ? "text-slate-300" : "text-slate-600"}`}>{o}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT FORM ─────────────────────────────────────────────────────────────

function ContactForm({ dm }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const inputCls = `w-full px-4 py-3 rounded-xl text-sm outline-none transition-all border font-sans ${
    dm
      ? "bg-slate-800/60 border-slate-700 text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:bg-slate-800"
      : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-400 focus:bg-white"
  }`;

  if (sent) return (
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
      <button
        onClick={() => { if (form.name && form.email && form.message) setSent(true); }}
        className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl font-semibold text-white transition-all hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.01] active:scale-[0.99]"
      >
        Send Message
      </button>
    </div>
  );
}

// ─── MAIN PORTFOLIO ───────────────────────────────────────────────────────────

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [currentPage, setCurrentPage] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

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
      <ProjectPage
        project={p}
        onBack={() => { setCurrentPage(null); setTimeout(() => scrollTo("projects"), 100); }}
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
            <div className="font-bold text-lg tracking-tight select-none">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Nathan</span>
              <span className={dm ? " text-slate-200" : " text-slate-800"}> Salman</span>
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
              <button
                onClick={() => setDarkMode(!dm)}
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
              <button
                onClick={() => setDarkMode(!dm)}
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
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
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
              UW Informatics student building tools that make organizations safer — from AI-powered compliance automation to incident response and penetration testing.
            </p>

            <div className="flex flex-wrap gap-3 mb-16">
              <button
                onClick={() => scrollTo("projects")}
                className="px-7 py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl font-semibold text-white text-sm transition-all hover:shadow-xl hover:shadow-blue-500/25 hover:scale-[1.03] active:scale-[0.98]"
              >
                View Projects
              </button>
              <a
                href="https://drive.google.com/file/d/1rIPqzpn845uxsX9n7yVOPaukvnQkvRWx/view?usp=sharing"
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
            </div>

            {/* Stats */}
            <div className={`flex flex-wrap gap-10 pt-8 border-t ${border}`}>
              {[
                { value: "5+", label: "Security Projects" },
                { value: "3.8", label: "GPA" },
                { value: "3+", label: "Roles Held" },
                { value: "Jun '27", label: "Graduation" },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-2xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent leading-none mb-1">
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
                  src="/nathan.jpg"
                  alt="Nathan Salman"
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
                  I'm a junior at the University of Washington studying Informatics with a cybersecurity specialization. My focus is on the intersection of security engineering and automation — building tools that help teams move fast without creating risk.
                </p>
                <p>
                  My work spans compliance automation, incident response, penetration testing, and security tooling. I'm most energized by projects that require translating ambiguous requirements — whether a regulatory framework or an architectural diagram — into working, secure systems.
                </p>
                <p>
                  Outside of security, I enjoy exploring AI agent architectures and finding creative ways to automate complex workflows. I believe the best security engineers are also great communicators.
                </p>
              </div>

              <div className="lg:col-span-2 space-y-4">
                <div className={`p-5 rounded-2xl border transition-all ${card}`}>
                  <div className="text-xs font-bold text-blue-400 uppercase tracking-[0.18em] mb-4 font-mono">Education</div>
                  <div className="font-semibold">B.S. Informatics — Cybersecurity</div>
                  <div className={`text-sm mt-1 ${muted}`}>University of Washington</div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-green-400 font-bold text-sm">GPA: 3.8</span>
                    <span className={`text-xs font-mono ${subtle}`}>Expected Jun 2027</span>
                  </div>
                </div>

                <div className={`p-5 rounded-2xl border transition-all ${card}`}>
                  <div className="text-xs font-bold text-blue-400 uppercase tracking-[0.18em] mb-4 font-mono">Certifications</div>
                  <div className="space-y-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-green-500/12 border border-green-500/25 flex items-center justify-center flex-shrink-0">
                        <CheckCircle size={14} className="text-green-400" />
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${dm ? "text-slate-300" : "text-slate-700"}`}>Cybersecurity Certificate</div>
                        <div className={`text-xs font-mono ${subtle}`}>Purdue / Simplilearn</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-yellow-500/12 border border-yellow-500/25 flex items-center justify-center flex-shrink-0">
                        <Zap size={14} className="text-yellow-400" />
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${dm ? "text-slate-300" : "text-slate-700"}`}>CompTIA Security+</div>
                        <div className={`text-xs font-mono ${subtle}`}>In Progress · Apr 2026</div>
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

          {/* Featured projects */}
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            {PROJECTS.filter(p => p.featured).map((p, i) => (
              <FadeIn key={p.id} delay={i * 100}>
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
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} text-white mb-5 shadow-md`}>
                    {p.icon}
                  </div>

                  <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full font-mono ${
                        p.status === "In Progress"
                          ? "bg-blue-500/12 text-blue-400 border border-blue-500/20"
                          : "bg-amber-500/12 text-amber-400 border border-amber-500/20"
                      }`}>
                        {p.status === "In Progress" ? "● In Progress" : "★ Featured"}
                      </span>
                      {p.microsoft && (
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full font-mono bg-purple-500/12 text-purple-400 border border-purple-500/20">
                          🏢 Microsoft
                        </span>
                      )}
                    </div>
                    <span className={`text-xs font-mono ${subtle}`}>{p.period}</span>
                  </div>

                  <h3 className={`text-lg font-bold mb-1.5 transition-colors ${!p.noPage ? "group-hover:text-blue-400" : ""}`}>
                    {p.title}
                  </h3>
                  <p className={`text-sm font-medium mb-3 ${muted}`}>{p.role}</p>
                  <p className={`text-sm leading-relaxed mb-5 ${muted}`}>{p.summary}</p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tags.slice(0, 4).map(t => (
                      <span key={t} className={`text-xs px-2.5 py-1 rounded-full font-mono ${
                        dm ? "bg-slate-800 text-slate-400 border border-slate-700/50" : "bg-slate-100 text-slate-500"
                      }`}>
                        {t}
                      </span>
                    ))}
                    {p.tags.length > 4 && <span className={`text-xs px-2 py-1 ${subtle}`}>+{p.tags.length - 4}</span>}
                  </div>

                  {!p.noPage
                    ? <div className="flex items-center gap-1.5 text-sm font-semibold text-blue-400 group-hover:gap-2.5 transition-all">
                        View case study <ExternalLink size={13} />
                      </div>
                    : <div className={`text-xs font-mono italic ${subtle}`}>Case study coming soon</div>
                  }
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Other projects */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROJECTS.filter(p => !p.featured).map((p, i) => (
              <FadeIn key={p.id} delay={i * 80}>
                <div
                  onClick={() => setCurrentPage(p.id)}
                  className={`group p-5 rounded-2xl border transition-all cursor-pointer hover:scale-[1.02] hover:shadow-xl h-full ${
                    dm
                      ? "bg-slate-900/40 border-slate-800 hover:border-blue-500/30 hover:shadow-blue-500/5"
                      : "bg-white border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-blue-50"
                  }`}
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} text-white mb-4 shadow`}>
                    {p.icon}
                  </div>
                  <h3 className="font-bold text-sm mb-1.5 group-hover:text-blue-400 transition-colors">{p.title}</h3>
                  <p className={`text-xs leading-relaxed mb-4 ${muted}`}>{p.summary}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {p.tags.slice(0, 2).map(t => (
                      <span key={t} className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                        dm ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-500"
                      }`}>{t}</span>
                    ))}
                  </div>
                  <div className="text-xs font-semibold text-blue-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                    View details <ExternalLink size={11} />
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
                  I'm actively looking for cybersecurity internship and full-time opportunities starting Summer/Fall 2027. Whether you have a role, a project, or just want to connect — my inbox is open.
                </p>
                <div className="space-y-3">
                  {[
                    { icon: <Mail size={18} />, label: "Email", value: "nathansalman10@gmail.com", href: "mailto:nathansalman10@gmail.com" },
                    { icon: <Linkedin size={18} />, label: "LinkedIn", value: "/in/nathan-e-salman", href: "https://www.linkedin.com/in/nathan-e-salman" },
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
          </div>
          <div className="font-mono text-xs">
            Built with React & Tailwind
          </div>
        </div>
      </footer>
    </div>
  );
}
