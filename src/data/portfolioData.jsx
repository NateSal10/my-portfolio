// ─── DATA ─────────────────────────────────────────────────────────────────────
// Writing style: first person, plain verbs, no em dashes, no sales language.

export const NAV_ITEMS = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const LINKS = {
  email: "nathansalman10@gmail.com",
  resume: "https://docs.google.com/document/d/1BW5IYufl3V8Y4Fyp1LWWboyN8RkXFlUX6g6bCv54iQw/preview",
  linkedin: "https://www.linkedin.com/in/nathan-e-salman",
  github: "https://github.com/NateSal10",
};

export const PROJECTS = [
  {
    id: "compliance-copilot",
    title: "Compliance Copilot",
    role: "Informatics capstone, sponsored by Microsoft",
    period: "Jan to Jun 2026",
    status: "Completed",
    tags: ["AI agents", "Azure DevOps", "Python", "Prompt engineering", "Compliance automation"],
    summary: "My capstone team built an AI tool for Microsoft that reads regulatory requirements and turns the gaps it finds into Azure DevOps work items. It flagged gaps with 80% accuracy and saved weeks of manual review per regulation.",
    microsoft: true,
    overview: "This was my Informatics capstone, sponsored by Microsoft. Our team built a system that takes regulatory requirements and turns them into Azure DevOps work items, each one traceable back to the requirement it came from and paired with a plan to fix it. I presented our milestones to the Microsoft stakeholders and worked with the UX and PM folks on our team on the data pipeline and the Copilot agent workflows.",
    problem: "Turning a broad security requirement into specific Azure DevOps work items is mostly manual today. Someone has to read the regulation, figure out which controls are missing, and write up the tasks by hand. We wanted to automate that mapping so teams get a clear gap assessment and a remediation plan they can actually track.",
    solution: "We built a pipeline that reads the requirements, checks them against existing controls, and creates linked work items in Azure DevOps. The gap assessment flags controls that aren't met and drafts the remediation steps for the GRC team. In testing it caught compliance gaps with 80% accuracy.",
    techDetails: [
      { label: "ADO integration", value: "Creates Azure DevOps boards and work items through the ADO REST API and links them across boards so every item traces back to its requirement." },
      { label: "Data pipeline", value: "Takes the parsed regulatory requirements from the upstream team and maps them into the JSON schema that ADO expects." },
      { label: "Dashboard", value: "Shows compliance gaps, overdue tasks, and what needs attention in each sprint." },
      { label: "AI prototyping", value: "We used Azure OpenAI to try out different ways for the agent to draft documentation, gap assessments, and code." }
    ],
    teamProcess: "We met with our Microsoft sponsor every week and split the work into milestones: onboarding and ADO setup, prototyping the agent, then iterating on the output schemas. I presented those milestones to the Microsoft stakeholders and worked with our UX and PM teammates on the data pipeline and agent workflows.",
    individualContributions: "I was one of the core developers, and I owned the integration pipeline. I wrote the logic that takes the upstream regulatory analysis and maps it to Microsoft Security Standards, then the code that calls the Azure DevOps REST API to create the work items and standard gap assessments.",
    takeaways: [
      "Turning regulatory language into software requirements only works with a clear schema and tightly scoped prompts.",
      "Building inside an enterprise environment means following its security and integration rules closely, especially in Azure DevOps.",
      "Testing with stakeholders often kept the dashboard small. Every time we showed it to someone, we cut something."
    ],
    outcomes: [
      "Flagged compliance gaps with 80% accuracy.",
      "Saved weeks of manual review per regulation.",
      "Created traceable Azure DevOps work items and remediation plans for GRC teams.",
      "Presented project milestones to Microsoft stakeholders."
    ],
    architecture: "Upstream outputs (JSON) → Agent parser → Gap assessment and remediation logic → Azure DevOps API → Work item creation → Dashboard metrics"
  },
  {
    id: "homesphere-erm",
    title: "HomeSphere Risk Tool",
    role: "Enterprise risk management course",
    period: "Jan to Mar 2026",
    status: "Completed",
    tags: ["JavaScript", "Firebase", "Risk heatmap", "RACI", "HIPAA"],
    summary: "A risk management app for a made-up home robotics company, built for my enterprise risk class. It has a 5×5 risk heatmap, weighted impact scoring, and a RACI chart, and it saves everything to Firebase as you edit.",
    liveUrl: "https://homesphere-92352.web.app/",
    overview: "I built this over a quarter for my Enterprise Risk Management class. The company, HomeSphere Robotics, is fictional: it makes robots that work inside people's homes. The app puts the company's whole risk framework in one place, from the heatmap to impact scoring to who is accountable for what.",
    problem: "HomeSphere has safety, cybersecurity, and compliance risks that all feed into each other. If a robot malfunctions in someone's living room, that's a safety issue, and it can quickly become a privacy and legal issue too. I needed a way to show those connected risks that both engineers and executives could use.",
    solution: "I built a web app around HomeSphere's risk framework. Risks sit on a live 5×5 heatmap, scored with a weighted impact calculator across four categories: trust and reputation, operations, legal and compliance, and enterprise value. A risk appetite line separates what the company accepts from what it doesn't. A RACI chart assigns 11 roles to the five top risks. Everything saves to Firebase, syncs across tabs, and falls back to localStorage.",
    techDetails: [
      { label: "Risk heatmap", value: "A clickable 5×5 grid of likelihood against impact, colored by severity from low to critical. The risk appetite boundary is drawn as a dashed, striped line you can move." },
      { label: "Impact scoring", value: "Weighted scores across four categories. You can change the weights (they have to add up to 100%) and the heatmap updates right away." },
      { label: "RACI chart", value: "Maps the five main risks to 11 roles, from the board and CEO to safety, legal, and engineering. It comes filled in with robot safety failures, HIPAA violations, data breaches, and cloud outages." },
      { label: "Backend", value: "Firebase Realtime Database with live listeners so several people can edit at once. localStorage is the fallback, and storage events keep open tabs in sync." },
      { label: "Risks covered", value: "Robots making unintended contact with people, missed alerts in elder care monitoring, exposure of health data under HIPAA, account data breaches, and a cloud outage that takes down safety monitoring for the whole fleet." },
      { label: "Governance", value: "Three layers of oversight: the board sets appetite and strategy, the CEO and risk team own the company-wide view, and functional leaders handle day-to-day risk. Internal audit sits outside all three. Physical harm or a confirmed regulatory breach goes straight to the board." }
    ],
    outcomes: [
      "Deployed on Firebase Hosting with live multi-user sync.",
      "Identified 15 risks across six areas and modeled the top five in the app.",
      "Mapped HIPAA, CCPA, and GDPR exposure across the product and its data.",
      "Built a RACI chart covering 11 roles.",
      "Built adjustable weighted scoring that recalculates the heatmap live.",
      "Turned in as the final course deliverable."
    ],
    architecture: "Risk register → Weighted impact calculator → 5×5 heatmap → Appetite threshold → RACI chart → Escalation rules → Firebase Realtime DB"
  },
  {
    id: "trading-simulator",
    title: "TradeForge",
    role: "Personal project, trading simulator",
    period: "Mar 2026 to now",
    status: "In Progress",
    tags: ["React", "Vite", "Lightweight Charts", "Firebase Auth", "Backtesting"],
    summary: "A trading simulator I'm building for myself. You can replay old market data bar by bar, place simulated orders, backtest strategies without writing code, and practice under prop firm rules.",
    overview: "I like TradingView, but its replay mode is read-only, so you can't really practice placing trades. I started TradeForge to fix that for myself. It has a replay engine, simulated orders that fill at real historical prices, and a prop firm challenge mode that enforces the same risk rules you'd face with a funded account.",
    problem: "Passing a prop firm challenge takes practice under strict rules like daily loss limits, and most tools don't track your P&L or enforce those limits. The simulators that do are either expensive or awkward to use. I wanted real order simulation plus an account history that sticks around.",
    solution: "TradeForge is a React app built on TradingView's Lightweight Charts library. The replay engine plays historical candles one at a time, and market and limit orders fill at the actual historical prices. The backtest page has a visual rule builder, so you can define a strategy without code and run it over months of data in a few seconds. The dashboard tracks your equity curve, trade calendar, win rate, and streaks, and it's all saved to your Google account.",
    stats: [
      { label: "Pages", value: "5", sub: "Dashboard, practice, backtest, learn, and glossary" },
      { label: "Performance stats", value: "8+", sub: "P&L, win rate, streak, drawdown, Sharpe ratio, profit factor, and more" },
      { label: "Sign-in", value: "Google", sub: "Trade history and account data saved to your profile" },
      { label: "Chart overlays", value: "Custom", sub: "Kill zones, FVG zones, TP/SL lines, and break and retest zones" }
    ],
    screenshots: [
      { src: "screenshots/dashboard.png", title: "Dashboard", caption: "Equity curve, prop and paper accounts, market clock, and live P&L." },
      { src: "screenshots/calendar.png", title: "Trade calendar", caption: "Daily P&L heatmap with economic events like CPI, FOMC, and NFP marked." },
      { src: "screenshots/practice.png", title: "Practice mode", caption: "Live chart with Asia, London, and New York kill zones, SMC overlays, and the order panel." },
      { src: "screenshots/backtest.png", title: "Backtest", caption: "Break and retest zones on the chart, with the visual entry rule builder." }
    ],
    featureCards: [
      { title: "Market replay", desc: "Replay any historical market one candle at a time. Place market, limit, stop, and stop-limit orders that fill at the real historical price, with trailing stops and a P&L panel that updates as you go." },
      { title: "Prop firm challenge mode", desc: "Set your challenge rules, like a daily loss limit and max drawdown. TradeForge tracks your balance and shows how much room you have left each day, so you can build the habits before trying it for real." },
      { title: "Google sign-in", desc: "Your trade history, equity curve, and win rate are saved to your profile and follow you to any device. Prop and paper accounts are tracked separately and each can be reset." },
      { title: "Visual strategy builder", desc: "Build a strategy out of condition blocks, like an entry time window or a breakout zone, without writing code. The engine works out the entry, stop loss, and take profit for each signal." },
      { title: "Backtests and trade calendar", desc: "Run a strategy over months of data in seconds. You get a trade log, an equity curve, and a calendar of daily P&L with CPI and FOMC days marked." },
      { title: "ICT and SMC overlays", desc: "Asia, London, and New York kill zones are drawn right on the chart. Fair value gaps are detected automatically, and every overlay can be toggled from the toolbar." }
    ],
    techDetails: [
      { label: "Auth and storage", value: "Google sign-in through Firebase Auth. Each user's profile, trade history, equity data, and balances are saved, with prop and paper accounts kept separate and resettable." },
      { label: "Charting", value: "Lightweight Charts with custom drawing code: TP/SL lines styled like TradingView's, a box primitive for kill zones and break and retest zones, fair value gap detection, and SMC overlay toggles." },
      { label: "Replay engine", value: "Plays historical OHLCV candles one at a time on an adjustable timer. Market, limit, stop, and stop-limit orders wait in a queue and fill at the historical price, and trailing stops update on every bar." },
      { label: "Rule engine", value: "Checks strategy conditions bar by bar across the whole dataset. Each condition type (time zone, break and retest zone, crossover) can override the entry, stop, and target, so the main loop stays the same no matter how complex the strategy is." },
      { label: "Break and retest logic", value: "A small state machine runs each day: first it marks the zone during a time window, then it waits for a breakout, then it enters when price comes back to the zone. It only takes one trade per zone per day." },
      { label: "Dashboard", value: "Equity curve, a trade calendar with daily P&L and economic events, win and loss streaks, profit factor, Sharpe ratio, and best day, all calculated from your saved trades." }
    ],
    outcomes: [
      "Google sign-in with trade history that carries over between sessions.",
      "Replay with real order simulation instead of read-only playback.",
      "Prop firm mode that enforces funded account rules during practice.",
      "A visual rule builder, so backtesting doesn't require code.",
      "A trade calendar and equity curve that show patterns in how you trade.",
      "ICT and SMC overlays plus break and retest detection in the browser."
    ],
    liveUrl: "https://es-trading-academy.vercel.app/",
    architecture: "Historical data → Replay engine → Order queue → Rule engine → Signal check → P&L tracker → Prop firm risk monitor → Results and trade log"
  },
  {
    id: "zero-day-response",
    title: "Zero-Day Incident Response",
    role: "ThinkCyber UW tabletop challenge",
    period: "Nov 2025",
    status: "Completed",
    tags: ["Incident response", "IOC analysis", "MITRE ATT&CK", "PCI DSS", "Splunk"],
    summary: "A tabletop exercise with ThinkCyber UW. Our five-person team investigated a simulated zero-day, found five indicators of compromise including a webshell and a DLL hijack, and presented our response plan to a panel of judges.",
    overview: "This was a tabletop exercise built around a simulated zero-day attack on SecureShare, a made-up fintech company. We had a limited amount of time to hunt for the threat, go through the evidence, and put together a full incident response plan.",
    problem: "SecureShare's SOC noticed strange outbound traffic and unexpected file writes on a web server, and the first look didn't explain either one. We had to figure out how the attacker got in, how far they got, and what to do about it before time ran out.",
    solution: "We worked through it with MITRE ATT&CK: match each behavior we saw to a technique, build a timeline of the attack, then write detection rules and cleanup steps. We lined the plan up with PCI DSS and the SEC's disclosure rules.",
    techDetails: [
      { label: "Indicators found", value: "An .aspx webshell (T1505.003), chained SQL injection payloads (T1190), DLL search order hijacking (T1574.001), and command and control beaconing over HTTPS." },
      { label: "Attack timeline", value: "Rebuilt the full kill chain, from initial access through lateral movement and privilege escalation to data exfiltration." },
      { label: "Detection rules", value: "Splunk SPL correlation searches for webshell execution, unusual SQL patterns, and unexpected DLL loads." },
      { label: "Compliance", value: "Mapped the breach to the PCI DSS 4.0 incident response requirement (12.10) and the SEC's cybersecurity disclosure rule (Reg S-K Item 106)." },
      { label: "Remediation", value: "A step-by-step plan: isolate the affected systems, preserve evidence, remove the attacker, then recover, with a way to roll back at each step." }
    ],
    outcomes: [
      "Found five indicators of compromise as part of a five-person team.",
      "Presented our detection rules, containment plan, and PCI DSS and SEC alignment to the judges.",
      "Traced three separate attack vectors across the kill chain.",
      "Wrote a 25-page incident response report.",
      "Wrote 8 Splunk detection rules for the techniques we found.",
      "Drafted an SEC 8-K disclosure based on materiality standards."
    ],
    architecture: "Initial alert → Threat hunt → Extract IOCs → Map to MITRE → Detection rules → IR plan → Compliance reporting"
  },
  {
    id: "pentest",
    title: "Web App Penetration Test",
    role: "Security assessment project",
    period: "Jul 2025",
    status: "Completed",
    tags: ["Penetration testing", "Burp Suite", "Nmap", "OWASP Top 10"],
    summary: "A black-box test of a deliberately vulnerable web app. I found SQL injection, stored XSS, and broken authentication, and wrote up how to fix each one.",
    overview: "A black-box penetration test of a web app that was built to be vulnerable. I worked through the OWASP Top 10 and wrote a report that both a manager and a developer could use.",
    problem: "The app handled test user credentials and form data but had never been through a security review. There was no record of what was exposed or how well it held up.",
    solution: "I went through recon, scanning, exploitation, and reporting. Every finding got a CVSS score, proof that it worked, and a recommended fix in priority order.",
    techDetails: [
      { label: "Recon", value: "Passive lookups with WHOIS and DNS enumeration, then Nmap for services and versions and Dirb to find hidden directories." },
      { label: "Scanning", value: "Burp Suite for the automated pass, then manual testing for logic flaws a scanner wouldn't catch." },
      { label: "Exploitation", value: "Confirmed SQL injection with hand-written payloads, XSS through DOM manipulation, and session tokens predictable enough to guess." },
      { label: "Findings", value: "Critical: SQL injection (CVSS 9.8). High: stored XSS (8.8). Medium: broken authentication (7.5). Low: security misconfigurations (4.3)." },
      { label: "Report", value: "An executive summary plus technical findings with CVSS scores, proof-of-concept screenshots, and a remediation plan." }
    ],
    outcomes: [
      "Found 4 kinds of vulnerabilities in the app.",
      "Got simulated remote code execution by chaining SQL injection with a file upload bypass.",
      "Wrote the report in a standard pentest format.",
      "Checked that every critical finding was fixed in a follow-up test."
    ],
    architecture: "Scope → Recon → Scanning → Exploitation → Post-exploitation → Report → Verify fixes"
  },
  {
    id: "windows-monitoring",
    title: "Windows Security Monitor",
    role: "Incident response and SIEM project",
    period: "Jun 2025",
    status: "Completed",
    tags: ["PowerShell", "Windows events", "NIST CSF", "Splunk"],
    summary: "A PowerShell tool that watches Windows event logs for things like brute-force logins and new admin accounts, then raises alerts and builds a simple HTML dashboard.",
    overview: "A small monitoring tool written in PowerShell. It reads Windows event logs, checks them against detection rules, and puts what it finds into an HTML dashboard, a lot like a stripped-down Splunk.",
    problem: "Small teams that can't pay for a SIEM still need to see failed logins, privilege escalation, and lateral movement on their Windows machines. Clicking through Event Viewer doesn't scale.",
    solution: "I wrote a PowerShell engine that keeps reading the Security, System, and Application logs, runs detection rules based on the Detect function of the NIST CSF, and writes timestamped alerts to an HTML dashboard that refreshes on its own.",
    techDetails: [
      { label: "Detection rules", value: "Watches event IDs 4624 and 4625 (logon success and failure), 4648 (explicit credentials), 4720 (account created), 4698 (scheduled task created), and 7045 (service installed)." },
      { label: "Alerts", value: "Five or more failed logons in 60 seconds raises a brute-force alert. A new admin account raises a critical alert right away." },
      { label: "Dashboard", value: "An HTML report with color-coded severity and a timeline, scheduled with Windows Task Scheduler." },
      { label: "NIST mapping", value: "Mapped to the NIST CSF 2.0 Detect (DE.CM, DE.AE) and Respond (RS.AN) functions." },
      { label: "Tools", value: "PowerShell, Windows Event Viewer, and Splunk." }
    ],
    outcomes: [
      "Caught a simulated brute-force attack 12 seconds after it crossed the threshold.",
      "Cut time to detect by about 70% compared with reading logs by hand.",
      "Used as the SOC workflow exercise in the course lab.",
      "Followed NIST incident response practices throughout."
    ],
    architecture: "Event logs → PowerShell collector → Detection engine → Alert queue → HTML dashboard → SOC review"
  },
  {
    id: "student-data-system",
    title: "Student Records App",
    role: "Full-stack web app",
    period: "Sep to Dec 2024",
    status: "Completed",
    tags: ["Flask", "Python", "MySQL", "Authentication"],
    summary: "A Flask and MySQL app for managing student records for 200+ users, with role-based access and secure logins. Better indexing made lookups about 40% faster.",
    overview: "A student records app built with Flask and MySQL so academic staff could manage enrollment, grades, and student profiles. I treated security and speed as requirements from the start, not things to add later.",
    problem: "Records lived in spreadsheets with no access control, so any staff member could see every student's data. There was no validation, so typos were common, and queries on the larger datasets kept timing out.",
    solution: "I built a web app with role-based access, server-side validation, parameterized SQL queries so injection isn't possible, and database indexes that made queries much faster.",
    techDetails: [
      { label: "Backend", value: "Flask with SQLAlchemy, Flask-Login for sessions, and bcrypt for password hashing." },
      { label: "Database", value: "MySQL with a normalized schema and composite indexes on the columns queried most." },
      { label: "Security", value: "Parameterized queries everywhere, CSRF tokens on every form, rate limits on login, and role checks on every route." },
      { label: "Frontend", value: "Jinja2 templates, DataTables.js for sorting and filtering, and Chart.js for the dashboards." },
      { label: "Performance", value: "Query tuning and composite indexes made data retrieval about 40% faster." }
    ],
    outcomes: [
      "Served 200+ users across academic departments.",
      "Made data retrieval about 40% faster with better indexing.",
      "Blocked SQL injection with parameterized queries throughout.",
      "Cut down data entry errors with server-side validation."
    ],
    architecture: "Browser → Flask routes → Auth middleware → App logic → SQLAlchemy → MySQL"
  }
];

export const EXPERIENCE = [
  {
    title: "Information Security Intern",
    company: "Velera",
    location: "Remote",
    period: "Summer 2026",
    type: "Internship",
    bullets: [
      "Wrote 15+ new detection rules in Rapid7 InsightIDR for the security operations team.",
      "Triaged alerts every day from Fidelis EDR, Rapid7 InsightIDR, and Proofpoint, and investigated the ones that needed a closer look.",
      "Researched attacker techniques and mapped our detections to MITRE ATT&CK to find gaps in coverage."
    ]
  },
  {
    title: "VP of Technology",
    company: "ThinkCyber UW",
    location: "Seattle",
    period: "Feb 2026 to now",
    type: "Club officer",
    bullets: [
      "Run weekly Security+ study sessions for 20 UW students: exam domains, practice questions, and how to study for it.",
      "Build and maintain the club website and look after the rest of our tech as the club grows."
    ]
  },
  {
    title: "Public Relations Officer",
    company: "Husky Table Tennis Club",
    location: "Seattle",
    period: "Jan 2024 to now",
    type: "Club officer",
    bullets: [
      "Run the club's social media and announcements for 100+ members: events, tournaments, and fundraisers.",
      "Help organize and run league tournaments for players at every level."
    ]
  },
  {
    title: "Tennis Shop Associate",
    company: "Avanti Sports",
    location: "Seattle",
    period: "Dec 2023 to Jun 2026",
    type: "Part-time",
    bullets: [
      "Helped 1,000+ customers pick the right racket, strings, and shoes. Repeat business went up 15%.",
      "Strung 1,500+ rackets and cut average turnaround time by 30% by reworking the stringing workflow."
    ]
  },
  {
    title: "IT Support and Front Desk",
    company: "Mill Creek Tennis Club",
    location: "Mill Creek, WA",
    period: "2019 to 2026",
    type: "Part-time",
    bullets: [
      "Handled the club's IT: hardware, Wi-Fi, and network problems.",
      "Redesigned the club website and built an online court reservation system. Member engagement went up 35% and scheduling mistakes dropped by half."
    ]
  }
];

export const SKILLS_DATA = [
  {
    category: "Security work",
    items: ["Incident response", "Vulnerability assessment", "Risk assessment", "Governance and compliance", "Gap assessment", "Compliance reporting", "MITRE ATT&CK", "NIST CSF", "PCI DSS", "Cloud security", "Log analysis", "Networking", "Firewalls", "TCP Wrappers"]
  },
  {
    category: "Security tools",
    items: ["Rapid7 InsightIDR", "Fidelis EDR", "Proofpoint", "Splunk", "Windows Event Viewer", "Burp Suite", "Wireshark", "Nmap", "Metasploit", "Fail2Ban", "Dirb"]
  },
  {
    category: "Code",
    items: ["Python", "PowerShell", "SQL", "JavaScript", "Java", "R", "Git", "Prompt engineering", "AI agents"]
  },
  {
    category: "Systems",
    items: ["Linux", "Windows", "Network security", "Vulnerability scanning", "Firewall management"]
  },
  {
    category: "Web and data",
    items: ["Flask", "React", "HTML", "CSS", "MySQL", "Firebase", "Azure DevOps", "Matplotlib", "Seaborn"]
  }
];
