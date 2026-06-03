export const labs = [
  {
    id: "portfolio-platform",
    name: "Portfolio Platform",
    type: "Blue Team",
    level: "Beginner",
    status: "Deployed",
    description:
      "Multi-page cyber portfolio designed as a branded platform with immersive sections and premium UI polish.",
    longDescription:
      "A multi-page cybersecurity showcase built as a product-oriented interface. It presents projects as a coherent platform ecosystem instead of isolated portfolio pages.",
    problemSolved:
      "Transforms a classic portfolio into a credible product experience, making technical projects easier to explore and understand.",
    skillsShown: [
      "React Architecture",
      "UI/UX Design",
      "TailwindCSS",
      "Product Thinking",
    ],
    scenario:
      "A recruiter or technical reviewer enters the platform and can quickly understand the project ecosystem, technologies used and cyber domains covered.",
    mitre: {
      tactics: ["Discovery", "Resource Development"],
      techniques: ["T1589 - Gather Victim Identity Information"],
    },
    tags: ["Platform", "UI", "Simulation", "Showcase"],
    focus: "Detection",
    featured: false,
    metrics: {
      modules: 6,
      scenarios: 4,
      maturity: "Stable",
    },
    workflow: [
      "Landing Experience",
      "Project Navigation",
      "Lab Discovery",
      "Premium Showcase",
    ],
    recommendedPath:
      "Best starting point to understand the global design language and platform vision.",
    relatedLabs: ["soc-simulator", "purple-team-lab"],
    links: {
      live: "https://your-portfolio.vercel.app",
      code: "https://github.com/yourname/portfolio-platform",
    },
  },
  {
    id: "identity-access-attack-sim",
    name: "Identity & Access Attack Simulator",
    type: "MITRE ATT&CK",
    level: "Advanced",
    status: "Deployed",
    description:
      "Interactive attack-path simulation focused on identity compromise, privilege escalation and access chain visualization.",
    longDescription:
      "A simulation lab focused on identity abuse, access relationships and privilege escalation paths. It helps visualize how a compromised account can become a broader security incident.",
    problemSolved:
      "Makes identity-based attack paths easier to understand by turning privilege relationships and escalation chains into interactive visual workflows.",
    skillsShown: [
      "Attack Path Modeling",
      "Identity Security",
      "MITRE ATT&CK Mapping",
      "Graph-based UI",
      "Risk Scoring",
    ],
    scenario:
      "An attacker compromises a low-privilege identity, discovers excessive permissions, abuses access paths and attempts to reach privileged resources.",
    mitre: {
      tactics: [
        "Initial Access",
        "Privilege Escalation",
        "Lateral Movement",
        "Discovery",
      ],
      techniques: [
        "T1078 - Valid Accounts",
        "T1087 - Account Discovery",
        "T1069 - Permission Groups Discovery",
        "T1021 - Remote Services",
      ],
    },
    tags: ["IAM", "Attack Graph", "Detection", "Simulation"],
    focus: "Simulation",
    featured: true,
    metrics: {
      modules: 8,
      scenarios: 12,
      maturity: "Advanced",
    },
    workflow: [
      "Identity Mapping",
      "Attack Route Analysis",
      "Privilege Escalation",
      "Defensive Insight",
    ],
    recommendedPath:
      "Recommended for advanced viewers who want a strong technical lab with visual analysis depth.",
    relatedLabs: ["purple-team-lab", "soc-simulator"],
    links: {
      live: "https://identity-access-attack-sim.vercel.app",
      code: "https://github.com/yourname/identity-access-attack-sim",
    },
  },
  {
    id: "osint-investigator",
    name: "OSINT Investigator",
    type: "OSINT",
    level: "Intermediate",
    status: "Deployed",
    description:
      "Investigation-oriented OSINT dashboard with entity analysis, infrastructure visibility and intelligence enrichment flows.",
    longDescription:
      "An analyst-style OSINT platform dedicated to collecting, structuring and presenting external intelligence in an investigation workflow.",
    problemSolved:
      "Centralizes scattered public intelligence signals into a structured interface that helps analysts reason about domains, IPs, entities and infrastructure exposure.",
    skillsShown: [
      "OSINT Workflow Design",
      "Threat Enrichment",
      "Dashboard UX",
      "Entity Analysis",
      "API Integration",
    ],
    scenario:
      "An analyst investigates a suspicious domain, enriches it with infrastructure data, reviews exposed services and prepares a structured intelligence summary.",
    mitre: {
      tactics: ["Reconnaissance", "Resource Development"],
      techniques: [
        "T1590 - Gather Victim Network Information",
        "T1596 - Search Open Technical Databases",
        "T1583 - Acquire Infrastructure",
      ],
    },
    tags: ["OSINT", "Threat Intel", "Recon", "Investigation"],
    focus: "Threat Intelligence",
    featured: false,
    metrics: {
      modules: 7,
      scenarios: 9,
      maturity: "Stable",
    },
    workflow: [
      "Target Input",
      "Intel Enrichment",
      "Infrastructure Review",
      "Investigation Output",
    ],
    recommendedPath:
      "Ideal if you want to showcase intelligence gathering and analyst-oriented workflows.",
    relatedLabs: ["threat-intelligence-platform", "soc-simulator"],
    links: {
      live: "https://osint-investigator-dashboard.vercel.app",
      code: "https://github.com/yourname/osint-investigator",
    },
  },
  {
    id: "phishing-simulation",
    name: "Phishing Simulation",
    type: "Red Team",
    level: "Intermediate",
    status: "In Progress",
    description:
      "Simulation lab centered on phishing scenarios, email lure workflows and user-awareness attack storytelling.",
    longDescription:
      "A red-team oriented simulation project focused on phishing campaigns, social engineering flows and awareness-driven scenario design.",
    problemSolved:
      "Demonstrates how phishing risk can be modeled safely through simulation, education and controlled scenario storytelling.",
    skillsShown: [
      "Social Engineering Simulation",
      "Scenario Writing",
      "Red Team Thinking",
      "Awareness UX",
    ],
    scenario:
      "A simulated phishing campaign is prepared, delivered as a controlled exercise and analyzed through user interaction and risk indicators.",
    mitre: {
      tactics: ["Initial Access", "Reconnaissance"],
      techniques: ["T1566 - Phishing", "T1598 - Phishing for Information"],
    },
    tags: ["Phishing", "Red Team", "Awareness", "Simulation"],
    focus: "Simulation",
    featured: false,
    metrics: {
      modules: 5,
      scenarios: 6,
      maturity: "Building",
    },
    workflow: [
      "Scenario Design",
      "Lure Strategy",
      "Delivery Simulation",
      "User Awareness Review",
    ],
    recommendedPath:
      "A strong storytelling project for demonstrating offensive simulation and awareness themes.",
    relatedLabs: ["purple-team-lab", "portfolio-platform"],
    links: {
      live: "https://phishing-sim.vercel.app",
      code: "https://github.com/yourname/phishing-simulation",
    },
  },
  {
    id: "purple-team-lab",
    name: "Purple Team Lab",
    type: "Purple Team",
    level: "Advanced",
    status: "Deployed",
    description:
      "Red/Blue validation lab combining offensive scenarios, defensive telemetry and collaborative purple-team workflows.",
    longDescription:
      "A collaborative validation platform designed to bridge offensive simulations with defensive monitoring, telemetry review and detection feedback loops.",
    problemSolved:
      "Connects attacker behavior with defensive validation so security teams can understand whether detections are effective.",
    skillsShown: [
      "Purple Team Methodology",
      "Detection Engineering",
      "Telemetry Mapping",
      "Incident Workflow Design",
      "ATT&CK Alignment",
    ],
    scenario:
      "A controlled attack scenario is launched, telemetry is reviewed, detections are validated and remediation actions are documented.",
    mitre: {
      tactics: [
        "Execution",
        "Persistence",
        "Defense Evasion",
        "Command and Control",
      ],
      techniques: [
        "T1059 - Command and Scripting Interpreter",
        "T1053 - Scheduled Task/Job",
        "T1027 - Obfuscated Files or Information",
        "T1071 - Application Layer Protocol",
      ],
    },
    tags: ["Purple Team", "Detection", "Validation", "ATT&CK"],
    focus: "Detection",
    featured: false,
    metrics: {
      modules: 9,
      scenarios: 11,
      maturity: "Advanced",
    },
    workflow: [
      "Scenario Launch",
      "Telemetry Review",
      "Detection Validation",
      "Purple Feedback Loop",
    ],
    recommendedPath:
      "One of the strongest cross-discipline projects for showing both attack and defense thinking.",
    relatedLabs: ["identity-access-attack-sim", "soc-simulator"],
    links: {
      live: "https://purple-team-lab.vercel.app",
      code: "https://github.com/yourname/purple-team-lab",
    },
  },
  {
    id: "soc-simulator",
    name: "SOC Simulator",
    type: "Blue Team",
    level: "Advanced",
    status: "Deployed",
    description:
      "Security operations simulation platform with alerts, triage, incident workflows and immersive analyst experience.",
    longDescription:
      "A blue-team centered simulation environment built to emulate security operations workflows, investigation handling and analyst UX patterns.",
    problemSolved:
      "Helps demonstrate SOC triage logic, alert prioritization, incident handling and analyst decision-making in a visual way.",
    skillsShown: [
      "SOC Workflow Design",
      "Alert Triage",
      "Incident Response",
      "Dashboard UX",
      "Detection Logic",
    ],
    scenario:
      "A SOC analyst receives multiple alerts, triages severity, investigates indicators and moves the incident through a response workflow.",
    mitre: {
      tactics: [
        "Discovery",
        "Credential Access",
        "Lateral Movement",
        "Exfiltration",
      ],
      techniques: [
        "T1087 - Account Discovery",
        "T1110 - Brute Force",
        "T1021 - Remote Services",
        "T1041 - Exfiltration Over C2 Channel",
      ],
    },
    tags: ["SOC", "Detection", "IR", "Dashboard"],
    focus: "Detection",
    featured: false,
    metrics: {
      modules: 10,
      scenarios: 14,
      maturity: "Stable",
    },
    workflow: ["Alert Intake", "Triage", "Investigation", "Response Workflow"],
    recommendedPath:
      "A very strong recruiter-facing project because it immediately feels like a real analyst product.",
    relatedLabs: ["purple-team-lab", "osint-investigator"],
    links: {
      live: "https://soc-simulator.vercel.app",
      code: "https://github.com/yourname/soc-simulator",
    },
  },
  {
    id: "threat-intelligence-platform",
    name: "Threat Intelligence Platform",
    type: "Threat Intel",
    level: "Advanced",
    status: "In Progress",
    description:
      "Intel-driven platform aggregating indicators, threat context and operational insights into a premium analyst interface.",
    longDescription:
      "A premium threat-intelligence oriented concept focused on contextualizing indicators, surfacing adversary insights and structuring intelligence workflows.",
    problemSolved:
      "Turns raw indicators into understandable intelligence context, helping analysts connect IOCs, threat behavior and operational relevance.",
    skillsShown: [
      "Threat Intelligence",
      "IOC Correlation",
      "Analyst UX",
      "Data Modeling",
      "Cyber Contextualization",
    ],
    scenario:
      "An analyst imports indicators, correlates them with threat context, reviews confidence and prepares an intelligence summary.",
    mitre: {
      tactics: ["Reconnaissance", "Command and Control", "Exfiltration"],
      techniques: [
        "T1595 - Active Scanning",
        "T1071 - Application Layer Protocol",
        "T1041 - Exfiltration Over C2 Channel",
      ],
    },
    tags: ["Threat Intel", "IOC", "Analysis", "Intelligence"],
    focus: "Threat Intelligence",
    featured: false,
    metrics: {
      modules: 6,
      scenarios: 8,
      maturity: "Building",
    },
    workflow: [
      "IOC Intake",
      "Context Enrichment",
      "Threat Framing",
      "Intel Review",
    ],
    recommendedPath:
      "Strong for positioning yourself toward CTI and intelligence-centric product thinking.",
    relatedLabs: ["osint-investigator", "purple-team-lab"],
    links: {
      live: "https://threat-intel-platform.vercel.app",
      code: "https://github.com/yourname/threat-intelligence-platform",
    },
  },
  {
    id: "mini-lab-it",
    name: "Mini Lab IT",
    type: "Infrastructure Lab",
    level: "Intermediate",
    status: "In Progress",
    description:
      "Personal virtualized infrastructure lab focused on Active Directory, Windows administration, PowerShell, domain integration and controlled security testing.",
    longDescription:
      "A personal virtualized IT infrastructure lab designed to practice Active Directory, Windows administration, PowerShell scripting, domain integration, Linux analysis and controlled Kali-based security testing.",
    problemSolved:
      "Demonstrates practical infrastructure work beyond UI projects: domain setup, endpoint integration, administration scripts, network visibility and progressive security lab building.",
    skillsShown: [
      "Active Directory",
      "Windows Server",
      "PowerShell",
      "Domain Integration",
      "Linux Analysis",
      "Kali Testing",
      "Infrastructure Design",
    ],
    scenario:
      "A small enterprise-like lab is built around a domain controller, a joined Windows endpoint, an analysis Linux node and a Kali machine used for controlled learning scenarios.",
    mitre: {
      tactics: ["Discovery", "Credential Access", "Lateral Movement"],
      techniques: [
        "T1087 - Account Discovery",
        "T1069 - Permission Groups Discovery",
        "T1021 - Remote Services",
      ],
    },
    tags: [
      "Active Directory",
      "Windows",
      "PowerShell",
      "Linux",
      "Kali",
      "Infrastructure",
    ],
    focus: "Infrastructure",
    featured: true,
    metrics: {
      modules: 4,
      scenarios: 6,
      maturity: "Evolving",
    },
    workflow: [
      "Domain Controller Setup",
      "Endpoint Domain Join",
      "PowerShell Automation",
      "Network Observation",
    ],
    recommendedPath:
      "A strong infrastructure-focused lab showing hands-on practice with virtual machines, administration and realistic cyber foundations.",
    relatedLabs: [
      "soc-simulator",
      "purple-team-lab",
      "identity-access-attack-sim",
    ],
    links: {
      live: "/labs/mini-lab-it",
      code: "https://github.com/yourname",
    },
  },
];
