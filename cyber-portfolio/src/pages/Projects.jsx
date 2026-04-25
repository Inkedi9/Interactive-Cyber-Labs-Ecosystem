import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import RevealOnScroll from "../components/ui/RevealOnScroll";

const projects = [
    {
        name: "Purple Team Lab",
        status: "Déployé",
        badge: "Projet phare",
        category: "Purple Team",
        slug: "purple-team-lab",
        description:
            "Web app Purple Team mêlant simulation d’attaque, détection défensive et validation dans une interface cyber moderne.",
        liveUrl: "https://purple-team-lab.vercel.app/",
        githubUrl: "https://github.com/Inkedi9/purple-team-lab",
    },
    {
        name: "SOC Simulator - Command Center",
        status: "Déployé",
        badge: "Blue Team",
        category: "Blue Team",
        slug: "soc-simulator",
        description:
            "Dashboard SOC immersif avec alertes, logs et investigations orientées analyste sécurité.",
        liveUrl: "https://soc-simulator-kappa.vercel.app/",
        githubUrl: "https://github.com/Inkedi9/soc-simulator",
    },
    {
        name: "OSINT Investigator",
        status: "Déployé",
        badge: "OSINT",
        category: "OSINT",
        slug: "osint-investigator",
        description:
            "Outil d’investigation OSINT avec profils, timeline et interface d’analyse.",
        liveUrl: "https://osint-investigator-dashboard.vercel.app/",
        githubUrl: "https://github.com/Inkedi9/osint-investigator-dashboard",
    },
    {
        name: "Phishing Detection Simulator",
        status: "Déployé",
        badge: "Email Security",
        category: "Awareness",
        slug: "phishing-detection-simulator",
        description:
            "Simulateur pédagogique de détection de phishing avec scoring et analyse visuelle.",
        liveUrl: "https://phishscope.vercel.app/",
        githubUrl: "https://github.com/Inkedi9/phishscope",
    },
    {
        name: "Identity & Access - Attack Simulator",
        status: "En cours",
        badge: "Red Team",
        category: "Red Team",
        slug: "identity-access-attack-simulator",
        description:
            "Visual simulation of identity compromise, privilege escalation and enterprise access abuse.",
        liveUrl: "",
        githubUrl: "https://github.com/Inkedi9",
    },
    {
        name: "Threat Intelligence Platform",
        status: "En cours",
        badge: "Threat Intel",
        category: "Threat Intel",
        slug: "threat-intelligence-platform",
        description:
            "Plateforme de veille et de corrélation orientée threat intelligence, indicateurs et analyse contextuelle.",
        liveUrl: "",
        githubUrl: "https://github.com/Inkedi9",
    },
];

const filters = [
    "Tous",
    "Purple Team",
    "Blue Team",
    "OSINT",
    "Awareness",
    "Red Team",
    "Threat Intel",
];

const badgeBase =
    "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-xl";

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState("Tous");

    const filteredProjects = useMemo(() => {
        if (activeFilter === "Tous") return projects;
        return projects.filter((project) => project.category === activeFilter);
    }, [activeFilter]);

    return (
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-8 lg:pt-36">
            <RevealOnScroll>
                <div className="mb-10">
                    <span className="inline-block rounded-full border border-brand-purple/30 bg-brand-purple/10 px-4 py-1 text-xs uppercase tracking-[0.25em] text-brand-purpleSoft">
                        Projets
                    </span>

                    <h1 className="mt-4 text-4xl font-bold text-ui-text md:text-5xl">
                        Tous mes projets cybersécurité
                    </h1>

                    <p className="mt-4 max-w-3xl text-ui-secondary">
                        Une page dédiée pour présenter clairement l’ensemble de mes démonstrations,
                        avec filtres, liens live et code GitHub.
                    </p>
                </div>
            </RevealOnScroll>

            <RevealOnScroll delay={100}>
                <div className="mb-10 flex flex-wrap gap-3">
                    {filters.map((filter) => {
                        const isActive = activeFilter === filter;

                        return (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`rounded-[1.4rem] border px-4 py-3 text-sm font-semibold backdrop-blur-2xl transition-all duration-300 ${isActive
                                    ? "border-brand-purple/30 bg-brand-purple/15 text-brand-purpleSoft shadow-glow-purple"
                                    : "border-brand-cyan/20 bg-obsidian-900/35 text-ui-text hover:border-brand-cyan/30 hover:bg-brand-cyan/10 hover:text-white hover:shadow-glow-cyan"
                                    }`}
                            >
                                {filter}
                            </button>
                        );
                    })}
                </div>
            </RevealOnScroll>

            <div className="grid gap-6 lg:grid-cols-2">
                {filteredProjects.map((project, index) => {
                    const hasLiveUrl = Boolean(project.liveUrl);

                    return (
                        <RevealOnScroll key={`${project.name}-${activeFilter}`} delay={index * 80}>
                            <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-obsidian-900/75 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-brand-purple/25 hover:shadow-[0_18px_60px_rgba(139,92,246,0.12)]">
                                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(139,92,246,0.05),rgba(34,211,238,0.03),transparent)] opacity-100" />

                                <div className="relative z-10 mb-4 flex flex-wrap items-center justify-between gap-3">
                                    <span className={`${badgeBase} border-brand-purple/25 bg-brand-purple/10 text-brand-purpleSoft`}>
                                        {project.badge || "Projet"}
                                    </span>

                                    <span className={`${badgeBase} border-brand-emerald/25 bg-brand-emerald/10 text-brand-emeraldSoft`}>
                                        {project.status}
                                    </span>
                                </div>

                                <div className="relative z-10 mb-4">
                                    <span className={`${badgeBase} border-brand-cyan/25 bg-brand-cyan/10 text-brand-cyanSoft`}>
                                        {project.category || "À venir"}
                                    </span>
                                </div>

                                <h2 className="relative z-10 text-xl font-semibold text-ui-text">
                                    {project.name}
                                </h2>

                                <p className="relative z-10 mt-3 text-sm leading-7 text-ui-secondary">
                                    {project.description || "Projet en cours de conception et d’itération."}
                                </p>

                                <div className="relative z-10 mt-6 flex flex-col gap-3 sm:flex-row">
                                    {project.slug === "purple-team-lab" ? (
                                        <Link
                                            to="/projects/purple-team-lab"
                                            className="inline-flex items-center justify-center rounded-[1.2rem] border border-brand-purple/30 bg-brand-purple/15 px-4 py-3 text-sm font-medium text-brand-purpleSoft backdrop-blur-2xl transition-all duration-300 hover:border-brand-purple/40 hover:bg-brand-purple/20 hover:text-white hover:shadow-glow-purple"
                                        >
                                            Voir la fiche projet
                                        </Link>
                                    ) : hasLiveUrl ? (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center justify-center rounded-[1.2rem] border border-brand-purple/30 bg-brand-purple/15 px-4 py-3 text-sm font-medium text-brand-purpleSoft backdrop-blur-2xl transition-all duration-300 hover:border-brand-purple/40 hover:bg-brand-purple/20 hover:text-white hover:shadow-glow-purple"
                                        >
                                            Voir le projet
                                        </a>
                                    ) : (
                                        <span className="inline-flex items-center justify-center rounded-[1.2rem] border border-brand-purple/15 bg-brand-purple/8 px-4 py-3 text-sm font-medium text-brand-purpleSoft/80 backdrop-blur-2xl opacity-80">
                                            Bientôt disponible
                                        </span>
                                    )}

                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center justify-center rounded-[1.2rem] border border-white/10 bg-obsidian-900/80 px-4 py-3 text-sm font-medium text-ui-text backdrop-blur-2xl transition-all duration-300 hover:border-brand-cyan/30 hover:text-white hover:shadow-glow-cyan"
                                    >
                                        Code GitHub
                                    </a>
                                </div>
                            </div>
                        </RevealOnScroll>
                    );
                })}
            </div>
        </div>
    );
}