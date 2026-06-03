import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import RevealOnScroll from "../components/ui/RevealOnScroll";
import { PROJECTS } from "../data/siteData";

const filters = ["Tous", ...new Set(PROJECTS.map((p) => p.category))];

const badgeBase =
    "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-xl";

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState("Tous");

    const filteredProjects = useMemo(() => {
        if (activeFilter === "Tous") return PROJECTS;
        return PROJECTS.filter((project) => project.category === activeFilter);
    }, [activeFilter]);

    return (
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-8 lg:pt-36">
            <RevealOnScroll>
                <div className="mb-10">
                    <span className="inline-block rounded-full border border-brand-red/30 bg-brand-red/10 px-4 py-1 text-xs uppercase tracking-[0.25em] text-brand-redSoft">
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
                                    ? "border-brand-red/30 bg-brand-red/15 text-brand-redSoft shadow-glow-red"
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
                            <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-obsidian-900/75 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/25 hover:shadow-[0_18px_60px_rgba(230,57,70,0.12)]">
                                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(230,57,70,0.05),rgba(34,211,238,0.03),transparent)] opacity-100" />

                                <div className="relative z-10 mb-4 flex flex-wrap items-center justify-between gap-3">
                                    <span className={`${badgeBase} border-brand-red/25 bg-brand-red/10 text-brand-redSoft`}>
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
                                    {project.internalRoute ? (
                                        <Link
                                            to={project.internalRoute}
                                            className="inline-flex items-center justify-center rounded-[1.2rem] border border-brand-red/30 bg-brand-red/15 px-4 py-3 text-sm font-medium text-brand-redSoft backdrop-blur-2xl transition-all duration-300 hover:border-brand-red/40 hover:bg-brand-red/20 hover:text-white hover:shadow-glow-red"
                                        >
                                            Voir la fiche projet
                                        </Link>
                                    ) : hasLiveUrl ? (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center justify-center rounded-[1.2rem] border border-brand-red/30 bg-brand-red/15 px-4 py-3 text-sm font-medium text-brand-redSoft backdrop-blur-2xl transition-all duration-300 hover:border-brand-red/40 hover:bg-brand-red/20 hover:text-white hover:shadow-glow-red"
                                        >
                                            Voir le projet
                                        </a>
                                    ) : (
                                        <span className="inline-flex items-center justify-center rounded-[1.2rem] border border-brand-red/15 bg-brand-red/8 px-4 py-3 text-sm font-medium text-brand-redSoft/80 backdrop-blur-2xl opacity-80">
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