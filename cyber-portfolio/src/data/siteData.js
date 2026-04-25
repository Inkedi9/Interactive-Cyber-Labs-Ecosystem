export const HERO_CONTENT = {
  name: "Kevin",
  title: "Cybersécurité • SOC Analyst • Blue Team",
  description:
    "Étudiant passionné par la cybersécurité, je développe des projets pratiques autour de la détection, de l’investigation, de l’OSINT et de la sécurité web.",
};

export const PERSONAL_LINKS = {
  github: "https://github.com/Inkedi9",
  email: "mailto:ton-email@example.com",
  linkedin: "https://www.linkedin.com/",
  cvUrl: "#",
};

export const PROJECTS = [
  {
    name: "Purple Team Lab",
    status: "En cours",
    badge: "Projet phare",
    featured: true,
    description:
      "Web app Purple Team mêlant simulation d’attaque, détection défensive et validation dans une interface cyber moderne.",
    liveUrl: "https://purple-team-lab.vercel.app/",
    githubUrl: "https://github.com/Inkedi9",
  },
  {
    name: "SOC Simulator",
    status: "Déployé",
    badge: "Blue Team",
    featured: false,
    description:
      "Dashboard SOC immersif avec alertes, logs et investigations orientées analyste sécurité.",
    liveUrl: "https://soc-simulator-kappa.vercel.app/",
    githubUrl: "https://github.com/Inkedi9",
  },
  {
    name: "OSINT Investigator",
    status: "Déployé",
    badge: "OSINT",
    featured: false,
    description:
      "Outil d’investigation OSINT avec profils, timeline et interface d’analyse.",
    liveUrl: "https://osint-investigator-dashboard.vercel.app/",
    githubUrl: "https://github.com/Inkedi9",
  },
  {
    name: "Phishing Detection Simulator",
    status: "Déployé",
    badge: "Email Security",
    featured: false,
    description:
      "Simulateur pédagogique de détection de phishing avec scoring et analyse visuelle.",
    liveUrl: "https://phishscope.vercel.app/",
    githubUrl: "https://github.com/Inkedi9",
  },
];

export const SKILLS = {
  blueTeam: [
    "Analyse d’alertes",
    "Investigation",
    "Détection",
    "SOC workflows",
  ],
  osint: ["Recherche ouverte", "Profiling", "Corrélation", "Timeline"],
  network: ["TCP/IP", "DNS", "HTTP/HTTPS", "Analyse trafic"],
  web: ["Phishing", "Sécurité Web", "Validation", "Simulation"],
  tools: ["Wireshark", "Nmap", "Sysmon", "GitHub", "Vercel"],
};
