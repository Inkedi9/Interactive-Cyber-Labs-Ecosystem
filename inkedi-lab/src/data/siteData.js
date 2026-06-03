export const HERO_CONTENT = {
  name: "Inkedi",
  title: "AI Systems Builder · Homelab Engineer · Cybersecurity Enthusiast",
  description:
    "Je construis des systèmes autonomes locaux, j'orchestre des services sur mon homelab, et je m'entraîne en cybersécurité sur TryHackMe / HackTheBox.",
};

export const PERSONAL_LINKS = {
  github: "https://github.com/Inkedi9",
  email: "mailto:ton-email@example.com",
  linkedin: "https://www.linkedin.com/",
  cvUrl: "#",
};

export const PROJECTS = [
  {
    name: "JARVINx",
    status: "Active",
    badge: "AI Systems",
    featured: true,
    category: "AI Systems",
    slug: "jarvInx",
    description:
      "Agent IA autonome local-first écrit en Go avec dashboard Next.js. Runtime IA privé pour infrastructure homelab.",
    tags: ["Go", "Next.js", "AI", "Local-first"],
    liveUrl: "",
    internalRoute: "/projet-phare",
    githubUrl: "https://github.com/Inkedi9/JARVINx",
  },
  {
    name: "Dark Ops Lab",
    status: "On Pause",
    badge: "CTF",
    featured: false,
    category: "CTF",
    slug: "dark-ops-lab",
    description:
      "Plateforme d'entraînement CTF/cybersécurité avec frontend Next.js et backend Go.",
    tags: ["Go", "Next.js", "CTF", "Cybersecurity"],
    liveUrl: "",
    internalRoute: "",
    githubUrl: "https://github.com/Inkedi9",
  },
  {
    name: "Inkora",
    status: "Standby",
    badge: "Local AI",
    featured: false,
    category: "Local AI",
    slug: "inkora",
    description:
      "Interface IA custom locale — frontend TypeScript/React + backend agent, tournant sur Ollama avec GTX 1060.",
    tags: ["TypeScript", "React", "Ollama", "Local AI"],
    liveUrl: "",
    internalRoute: "",
    githubUrl: "https://github.com/Inkedi9",
  },
  {
    name: "Inkyra",
    status: "Standby",
    badge: "Bot",
    featured: false,
    category: "Bot",
    slug: "inkyra",
    description: "Bot Discord écrit en Go.",
    tags: ["Go", "Discord"],
    liveUrl: "",
    internalRoute: "",
    githubUrl: "https://github.com/Inkedi9",
  },
  {
    name: "Homelab",
    status: "Active",
    badge: "Infrastructure",
    featured: false,
    category: "Infrastructure",
    slug: "homelab",
    description:
      "Infrastructure self-hosted sur Linux Mint avec Docker. Services : Portainer, Pi-hole, Nginx Proxy Manager, Uptime Kuma, Homer, DIUN, Ollama, Filebrowser, Vaultwarden.",
    tags: ["Docker", "Linux", "Self-hosted", "Networking"],
    liveUrl: "",
    internalRoute: "",
    githubUrl: "https://github.com/Inkedi9",
  },
  {
    name: "SIEM Live",
    status: "Legacy",
    badge: "Cyber Demo",
    featured: false,
    category: "Cyber Demo",
    slug: "siem-live",
    description:
      "Démo interactive d'un SIEM en temps réel — conservé comme vitrine cyber.",
    tags: ["Cyber", "React", "Demo"],
    liveUrl: "",
    internalRoute: "/siem-live",
    githubUrl: "https://github.com/Inkedi9",
  },
];

export const SKILLS = {
  languages: ["Go", "TypeScript", "Python", "React", "Next.js"],
  infrastructure: ["Docker", "Linux", "Self-hosted", "Networking"],
  ai: ["Ollama", "AI Tooling", "Local AI", "Agent Systems"],
  cybersecurity: ["TryHackMe", "HackTheBox", "CTF", "SIEM"],
  tools: ["Git", "Portainer", "Nginx Proxy Manager", "Pi-hole", "Uptime Kuma", "Filebrowser", "Vaultwarden"],
};
