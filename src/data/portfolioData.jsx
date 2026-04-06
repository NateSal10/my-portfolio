import { AlertTriangle, Terminal, Eye, Database, Zap, Shield, Code, Server, CheckCircle, PlayCircle, Layers, BarChart2 } from "lucide-react";
// ─── DATA ─────────────────────────────────────────────────────────────────────

export const NAV_ITEMS = ["About", "Projects", "Experience", "Skills", "Contact"];

export const PROJECTS = [
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
    featured: false,
    microsoft: true,
    noPage: false,
    overview: "The 'AI-Powered Compliance Copilot' is a capstone project sponsored by Microsoft. The mission is to help customers operate securely and confidently in regulated environments by providing tools that simplify compliance and reduce risk. Our team (Team B) was tasked with integrating upstream regulatory outputs with Azure DevOps to provide actionable compliance tasks.",
    problem: "Security and compliance teams have a highly manual process for turning broad security requirements into actionable Azure DevOps work items. The challenge is automating this mapping process to create clear gap assessments and remediation plans, so teams can accurately track progress and drive measurable compliance improvements.",
    solution: "We are developing an AI-assisted agent that ingests regulatory outputs, automatically creates corresponding Azure DevOps work items with no missed or duplicated items, and includes clear Microsoft Security Standards (MSS) gap assessments alongside actionable remediation plans. We're also building a centralized dashboard to track compliance work.",
    techDetails: [
      { label: "ADO Integration", value: "Automated creation of Azure DevOps boards and work items using the ADO REST API, linking work items across boards for traceability." },
      { label: "Data Pipeline", value: "Ingesting and parsing regulatory requirements from 'Team A', mapping outputs to appropriate JSON schema for ADO consumption." },
      { label: "Dashboard", value: "Displaying key metrics such as compliance gaps, overdue tasks, and actionable insights per sprint." },
      { label: "AI Prototyping", value: "Using Azure OpenAI to prototype reasoning approaches for the agent to draft documentation, gap assessments, and code patterns." }
    ],
    teamProcess: "Our team operates on a weekly check-in schedule with our Microsoft sponsor. We divided the project into defined milestones: initial onboarding and ADO setup, prototyping the agent interactions, and iterating on the output schemas. As a team we prioritized clear communication around handoffs, mapping our schema jointly to ensure the parsed regulatory content accurately transitioned into the DevOps environment.",
    individualContributions: "As a core developer on the team, my technical focus has been building the integration pipeline. I architected the bridging logic to interpret the upstream regulatory analysis and map it precisely to Microsoft Security Standards. From there, I implemented the code to programmatically interact with the Azure DevOps REST API, auto-generating the populated work items and standardized gap assessments.",
    takeaways: [
      "Translating complex regulatory language into structured software requirements demands clear schemas and constrained AI prompts.",
      "Building for an enterprise environment requires strict adherence to security and integration guidelines, especially with Azure DevOps.",
      "Iterative testing with stakeholders is vital to ensure our dashboard remains simple, intentional, and not bloated."
    ],
    nextSteps: [
      "Once completed, I will add an interactive prototype or video demo of the working dashboard.",
      "Upload high-fidelity architecture and data-flow diagrams to this page.",
      "Detail the final outcome of the handoff to the Microsoft sponsorship team.",
      "Include a direct link to the finalized codebase if allowed by the sponsor's visibility constraints."
    ],
    outcomes: [
      "Prototyping the agent schema and ADO board creation logic.",
      "Established integration workflows for the Azure DevOps ecosystem."
    ],
    architecture: "Team A Outputs (JSON) → Agent Parser → Gap Assessment & Remediation Logic → Azure DevOps API → Work Item Creation → Dashboard Metrics"
  },
  {
    id: "homesphere-erm",
    title: "HomeSphere Risk Management Tool",
    role: "Enterprise Risk Management Course Project",
    period: "January – March 2026",
    status: "Completed",
    tags: ["JavaScript", "Firebase", "Risk Management", "ERM", "RACI", "HIPAA", "Risk Heatmap"],
    summary: "A full-featured Enterprise Risk Management web application built for HomeSphere Robotics — a fictional consumer robotics company. Features an interactive 5×5 risk heatmap, weighted impact scoring, RACI matrix, and Firebase-backed real-time persistence.",
    icon: <CheckCircle size={22} />,
    color: "from-indigo-500 to-violet-600",
    featured: false,
    microsoft: false,
    noPage: false,
    liveUrl: "https://homesphere-92352.web.app/",
    overview: "Built as a semester-long group project for an Enterprise Risk Management course, this tool implements a production-grade ERM framework for HomeSphere Robotics — a consumer robotics company that operates humanoid robots inside people's homes, processes sensitive in-home sensor data, and serves vulnerable elder-care populations. The application translates a full governance framework into a working web product: interactive risk heatmap visualization, weighted multi-category impact scoring, a configurable risk appetite threshold, and a RACI matrix for organizational accountability.",
    problem: "HomeSphere faces simultaneous risk exposure across six domains — physical safety, cybersecurity, HIPAA/CCPA/GDPR compliance, reputational, operational, and third-party dependencies. A robot misread inside someone's home doesn't just cause property damage — it can injure a person. An elder-care monitoring failure during a medical emergency can be life-threatening. The company's compliance maturity was uneven, with safety engineering developed but cybersecurity and privacy governance still lagging behind product growth. The challenge was building a governance system that could surface these interdependent risks in a way that executives, engineers, and auditors could all act on.",
    solution: "Designed and deployed a web application that embeds HomeSphere's ERM framework into an interactive tool. Risks are plotted on a live 5×5 heatmap weighted by a four-category impact calculator (Trust/Reputational, Operational, Legal/Compliance, Enterprise Value). A configurable risk appetite boundary visually separates acceptable from unacceptable risk. A RACI matrix maps 11 organizational roles to five prioritized enterprise risks. All data persists to Firebase Realtime Database with cross-tab sync and localStorage fallback.",
    techDetails: [
      { label: "Risk Heatmap", value: "Interactive 5×5 grid plotting risks by likelihood (1–5) and impact (1–5). Color-coded severity levels: Critical (red), High (orange), Medium (yellow), Low (green). Configurable risk appetite boundary rendered with dashed border and diagonal striping" },
      { label: "Impact Scoring", value: "Weighted calculator across four categories: Trust/Reputational, Operational Scope, Legal/Compliance/Environmental, and Enterprise Value. Weights are user-configurable (must total 100%) with real-time recalculation across the heatmap" },
      { label: "RACI Matrix", value: "Responsibility assignment tool mapping five identified enterprise risks to 11 organizational roles (Board, CEO, Safety/QA, Legal/Compliance, Engineering, etc.). Pre-populated with robot safety failures, HIPAA violations, data breaches, and cloud outages" },
      { label: "Backend", value: "Firebase Realtime Database as primary store with real-time listeners for multi-user sync. Browser localStorage as fallback. Cross-tab synchronization via storage events" },
      { label: "Risk Domains Covered", value: "Physical safety (unintended robot contact), elder-care monitoring failures, HIPAA/PHI exposure, PII/account data breach, and cloud dependency outage affecting fleet-wide safety monitoring" },
      { label: "Governance Framework", value: "Three-layer oversight model: Board (appetite/strategy), CEO + ERM function (enterprise view), Functional Leaders (day-to-day ownership). Fourth independent layer: Internal Audit. Escalation logic tied to risk thresholds — physical harm or confirmed regulatory breach triggers Board-level notification" }
    ],
    outcomes: [
      "Deployed live to Firebase Hosting with real-time multi-user data sync",
      "Modeled 5 enterprise risks with structured cause → event → impact statements",
      "Mapped HIPAA, CCPA, and GDPR exposure across HomeSphere's product and data surface",
      "Designed RACI matrix assigning accountability across 11 organizational roles",
      "Built configurable weighted scoring with live heatmap recalculation",
      "Framework formally adopted as course deliverable — graded as production-grade ERM proposal"
    ],
    architecture: "Risk Register → Weighted Impact Calculator → 5×5 Heatmap → Appetite Threshold → RACI Matrix → Escalation Logic → Firebase Realtime DB"
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
    featured: false,
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
  }
];

export const EXPERIENCE = [
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

export const SKILLS_DATA = [
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

