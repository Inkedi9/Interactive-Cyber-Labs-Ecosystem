import RevealOnScroll from "../components/ui/RevealOnScroll";

const skillGroups = [
    {
        title: "Blue Team",
        items: ["Analyse d’alertes", "Investigation", "Détection", "SOC workflows"],
    },
    {
        title: "OSINT",
        items: ["Recherche ouverte", "Profiling", "Corrélation", "Timeline"],
    },
    {
        title: "Réseau",
        items: ["TCP/IP", "DNS", "HTTP/HTTPS", "Analyse trafic"],
    },
    {
        title: "Sécurité Web",
        items: ["Phishing", "Validation", "Simulation", "Approche défensive"],
    },
    {
        title: "Outils",
        items: ["Wireshark", "Nmap", "Sysmon", "GitHub", "Vercel"],
    },
];

const timeline = [
    {
        period: "Aujourd’hui",
        title: "Portfolio cyber orienté démonstration",
        description:
            "Construction d’un portfolio moderne pour présenter mes compétences de manière visuelle, concrète et professionnelle.",
    },
    {
        period: "Projet phare",
        title: "Purple Team Lab",
        description:
            "Développement d’une web app Purple Team combinant simulation d’attaque, détection défensive et validation.",
    },
    {
        period: "Projets pratiques",
        title: "SOC Simulator / OSINT / Phishing",
        description:
            "Création de projets complémentaires pour couvrir plusieurs facettes de la cybersécurité : analyse, investigation et sensibilisation.",
    },
    {
        period: "Objectif",
        title: "Alternance / Stage cybersécurité",
        description:
            "Recherche d’une opportunité dans un environnement SOC, Blue Team ou Purple Team pour progresser sur des cas concrets.",
    },
];

const featuredProjects = [
    {
        name: "Purple Team Lab",
        role: "Projet vitrine principal",
        desc: "Approche Purple Team moderne avec logique offensive, détection et validation dans une interface cyber immersive.",
    },
    {
        name: "SOC Simulator - Command Center",
        role: "Simulation analyste SOC",
        desc: "Dashboard immersif avec alertes, logs et logique d’investigation orientée Blue Team.",
    },
    {
        name: "OSINT Investigator",
        role: "Investigation & corrélation",
        desc: "Interface d’analyse dédiée à la recherche ouverte et à la structuration d’informations.",
    },
    {
        name: "Phishing Detection Simulator",
        role: "Sensibilisation & détection",
        desc: "Projet pédagogique autour de l’identification de signaux suspects dans des emails et interfaces simulées.",
    },
];

const badgeBase =
    "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-xl";

function SkillBlock({ title, items }) {
    return (
        <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-obsidian-900/75 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-brand-cyan/25 hover:shadow-[0_18px_60px_rgba(34,211,238,0.10)]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.04),rgba(139,92,246,0.03),transparent)]" />

            <div className="relative z-10">
                <h3 className="text-lg font-semibold text-ui-text">{title}</h3>

                <div className="mt-4 flex flex-wrap gap-2">
                    {items.map((item) => (
                        <span
                            key={item}
                            className="rounded-full border border-white/10 bg-obsidian-900/70 px-4 py-2 text-sm text-ui-text backdrop-blur-xl transition-all duration-300 hover:border-brand-cyan/20 hover:text-white"
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

function TimelineItem({ item, isLast }) {
    return (
        <div className="relative pl-10">
            {!isLast && (
                <div className="absolute left-[11px] top-8 h-[calc(100%+1.5rem)] w-px bg-gradient-to-b from-brand-purple/70 via-brand-cyan/30 to-transparent" />
            )}

            <div className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-brand-purple/30 bg-brand-purple/15 shadow-[0_0_20px_rgba(139,92,246,0.20)] backdrop-blur-xl">
                <div className="h-2.5 w-2.5 rounded-full bg-brand-purpleSoft" />
            </div>

            <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-obsidian-900/75 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-brand-purple/25 hover:shadow-[0_18px_60px_rgba(139,92,246,0.12)]">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(139,92,246,0.05),rgba(34,211,238,0.03),transparent)]" />

                <div className="relative z-10">
                    <span className={`${badgeBase} border-brand-purple/25 bg-brand-purple/10 uppercase tracking-[0.18em] text-brand-purpleSoft`}>
                        {item.period}
                    </span>

                    <h3 className="mt-4 text-xl font-semibold text-ui-text">
                        {item.title}
                    </h3>

                    <p className="mt-3 leading-7 text-ui-secondary">
                        {item.description}
                    </p>
                </div>
            </div>
        </div>
    );
}

function ProjectMiniCard({ project }) {
    return (
        <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-obsidian-900/75 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-brand-purple/25 hover:shadow-[0_18px_60px_rgba(139,92,246,0.12)]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(139,92,246,0.05),rgba(34,211,238,0.03),transparent)]" />

            <div className="relative z-10">
                <span className={`${badgeBase} border-brand-purple/25 bg-brand-purple/10 uppercase tracking-[0.18em] text-brand-purpleSoft`}>
                    {project.role}
                </span>

                <h3 className="mt-4 text-xl font-semibold text-ui-text">
                    {project.name}
                </h3>

                <p className="mt-3 leading-7 text-ui-secondary">
                    {project.desc}
                </p>
            </div>
        </div>
    );
}

function LabCard({
    code,
    name,
    subtitle,
    desc,
    progress,
    accent = "purple",
}) {
    const accentMap = {
        purple: {
            wrapper:
                "hover:border-brand-purple/25 hover:shadow-[0_18px_60px_rgba(139,92,246,0.12)]",
            chip: "bg-brand-purple/15 text-brand-purpleSoft",
            bar: "bg-brand-purple",
        },
        cyan: {
            wrapper:
                "hover:border-brand-cyan/25 hover:shadow-[0_18px_60px_rgba(34,211,238,0.10)]",
            chip: "bg-brand-cyan/15 text-brand-cyanSoft",
            bar: "bg-brand-cyan",
        },
        emerald: {
            wrapper:
                "hover:border-brand-emerald/25 hover:shadow-[0_18px_60px_rgba(16,185,129,0.10)]",
            chip: "bg-brand-emerald/15 text-brand-emeraldSoft",
            bar: "bg-brand-emerald",
        },
    };

    const styles = accentMap[accent];

    return (
        <div
            className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-obsidian-900/75 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 ${styles.wrapper}`}
        >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(139,92,246,0.04),rgba(34,211,238,0.03),transparent)]" />

            <div className="relative z-10">
                <div className="flex items-center gap-3">
                    <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 ${styles.chip} font-bold backdrop-blur-xl`}
                    >
                        {code}
                    </div>
                    <div>
                        <h3 className="font-semibold text-ui-text">{name}</h3>
                        <p className="text-xs text-ui-muted">{subtitle}</p>
                    </div>
                </div>

                <p className="mt-4 text-sm text-ui-secondary">{desc}</p>

                <div className="mt-4 h-2 w-full rounded-full bg-surface-3">
                    <div
                        className={`h-full rounded-full transition-all duration-500 ${styles.bar}`}
                        style={{ width: progress }}
                    />
                </div>

                <p className="mt-2 text-xs text-ui-muted">Progression : {progress}</p>
            </div>
        </div>
    );
}

export default function CV() {
    return (
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-8 lg:pt-36">
            <RevealOnScroll>
                <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                    <div>
                        <span className="inline-block rounded-full border border-brand-purple/30 bg-brand-purple/10 px-4 py-1 text-xs uppercase tracking-[0.25em] text-brand-purpleSoft">
                            CV / Compétences
                        </span>

                        <h1 className="mt-5 text-4xl font-black text-ui-text md:text-6xl">
                            Profil & Compétences
                        </h1>

                        <p className="mt-6 max-w-3xl text-lg leading-8 text-ui-secondary">
                            Étudiant passionné par la cybersécurité, je développe des projets pratiques
                            pour démontrer des compétences concrètes en analyse, détection, investigation
                            et approche Purple Team. Mon objectif est d’intégrer une alternance ou un stage
                            dans un environnement SOC, Blue Team ou Purple Team.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <a
                                href="/cv-inkedi.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center rounded-[1.4rem] border border-brand-purple/30 bg-brand-purple/15 px-5 py-4 text-sm font-semibold text-brand-purpleSoft backdrop-blur-2xl transition-all duration-300 hover:border-brand-purple/40 hover:bg-brand-purple/20 hover:text-white hover:shadow-glow-purple"
                            >
                                Télécharger mon CV
                            </a>

                            <a
                                href="/projects"
                                className="inline-flex items-center justify-center rounded-[1.4rem] border border-white/10 bg-obsidian-900/80 px-6 py-4 text-sm font-semibold text-ui-text backdrop-blur-2xl transition-all duration-300 hover:border-brand-cyan/30 hover:text-white hover:shadow-glow-cyan"
                            >
                                Voir mes projets
                            </a>
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-brand-purple/20 bg-obsidian-950 text-ui-text shadow-purpleGlow">
                        <div className="flex items-center gap-2 border-b border-ui-border px-5 py-4">
                            <span className="h-3 w-3 rounded-full bg-rose-400" />
                            <span className="h-3 w-3 rounded-full bg-amber-400" />
                            <span className="h-3 w-3 rounded-full bg-brand-emeraldSoft" />
                            <span className="ml-3 font-mono text-xs text-ui-muted">candidate.profile</span>
                        </div>

                        <div className="space-y-4 p-6 font-mono text-sm">
                            <div>
                                <p className="uppercase tracking-[0.18em] text-ui-muted">Positionnement</p>
                                <p className="mt-2 text-brand-purpleSoft">SOC / Blue Team / Purple Team</p>
                            </div>

                            <div>
                                <p className="uppercase tracking-[0.18em] text-ui-muted">Approche</p>
                                <p className="mt-2 text-brand-cyanSoft">
                                    Projets pratiques, design démonstratif, montée en compétence orientée terrain.
                                </p>
                            </div>

                            <div>
                                <p className="uppercase tracking-[0.18em] text-ui-muted">Atout principal</p>
                                <p className="mt-2 text-ui-secondary">
                                    Capacité à transformer l’apprentissage en démonstrations visibles et structurées.
                                </p>
                            </div>

                            <div>
                                <p className="uppercase tracking-[0.18em] text-ui-muted">Projet phare</p>
                                <p className="mt-2 text-brand-emeraldSoft">Purple Team Lab</p>
                            </div>
                        </div>
                    </div>
                </div>
            </RevealOnScroll>

            <section className="mt-16 grid gap-8 xl:grid-cols-[1fr_1.1fr]">
                <RevealOnScroll>
                    <div>
                        <h2 className="mb-6 text-2xl font-bold text-ui-text">
                            Compétences clés
                        </h2>

                        <div className="grid gap-6">
                            {skillGroups.map((group, index) => (
                                <RevealOnScroll key={group.title} delay={index * 70}>
                                    <SkillBlock title={group.title} items={group.items} />
                                </RevealOnScroll>
                            ))}
                        </div>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll delay={120}>
                    <div>
                        <h2 className="mb-6 text-2xl font-bold text-ui-text">
                            Parcours / Timeline
                        </h2>

                        <div className="space-y-6">
                            {timeline.map((item, index) => (
                                <RevealOnScroll key={item.title} delay={index * 80}>
                                    <TimelineItem item={item} isLast={index === timeline.length - 1} />
                                </RevealOnScroll>
                            ))}
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            <section className="mt-16">
                <RevealOnScroll>
                    <h2 className="mb-6 text-2xl font-bold text-ui-text">
                        Labs & Plateformes
                    </h2>
                </RevealOnScroll>

                <div className="grid gap-6 md:grid-cols-3">
                    <RevealOnScroll>
                        <LabCard
                            code="THM"
                            name="TryHackMe"
                            subtitle="Top 30%"
                            desc="Labs orientés SOC, Blue Team et analyse réseau."
                            progress="70%"
                            accent="purple"
                        />
                    </RevealOnScroll>

                    <RevealOnScroll delay={100}>
                        <LabCard
                            code="HTB"
                            name="Hack The Box"
                            subtitle="En progression"
                            desc="Machines offensives pour dév la logique Red Team."
                            progress="40%"
                            accent="cyan"
                        />
                    </RevealOnScroll>

                    <RevealOnScroll delay={200}>
                        <LabCard
                            code="RM"
                            name="Root-Me"
                            subtitle="Pratique régulière"
                            desc="Challenges techniques variés pour renforcer les bases."
                            progress="55%"
                            accent="emerald"
                        />
                    </RevealOnScroll>
                </div>
            </section>

            <section className="mt-16">
                <RevealOnScroll>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-ui-text">
                            Projets à forte valeur démonstrative
                        </h2>
                        <p className="mt-3 max-w-3xl text-ui-secondary">
                            Une sélection de projets qui montrent ma capacité à structurer une logique cyber,
                            la rendre lisible et la transformer en démonstration concrète.
                        </p>
                    </div>
                </RevealOnScroll>

                <div className="grid gap-6 lg:grid-cols-2">
                    {featuredProjects.map((project, index) => (
                        <RevealOnScroll key={project.name} delay={index * 80}>
                            <ProjectMiniCard project={project} />
                        </RevealOnScroll>
                    ))}
                </div>
            </section>

            <section className="mt-16">
                <RevealOnScroll>
                    <div className="rounded-[2rem] border border-brand-purple/20 bg-gradient-to-br from-surface-2 to-obsidian-900 p-8">
                        <h2 className="text-2xl font-bold text-ui-text">
                            Ce que je recherche
                        </h2>

                        <p className="mt-4 max-w-4xl leading-8 text-ui-secondary">
                            Je recherche une alternance ou un stage en cybersécurité pour évoluer dans un cadre concret,
                            apprendre auprès d’équipes expérimentées, et continuer à développer mes compétences en SOC,
                            détection, investigation et validation Purple Team.
                        </p>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <div className="flex gap-3">
                                <a
                                    href="/cv-inkedi.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-[1.4rem] border border-brand-purple/30 bg-brand-purple/15 px-5 py-4 text-sm font-semibold text-brand-purpleSoft backdrop-blur-2xl transition-all duration-300 hover:border-brand-purple/40 hover:bg-brand-purple/20 hover:text-white hover:shadow-glow-purple"
                                >
                                    Voir mon CV
                                </a>

                                <a
                                    href="/download-cv"
                                    className="rounded-[1.4rem] border border-white/10 bg-obsidian-900/80 px-5 py-4 text-sm font-semibold text-ui-secondary backdrop-blur-2xl transition-all duration-300 hover:border-brand-cyan/30 hover:text-white hover:shadow-glow-cyan"
                                >
                                    Télécharger Mode Hacker
                                </a>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            <section className="mt-16">
                <RevealOnScroll>
                    <div className="rounded-[2rem] border border-brand-purple/20 bg-gradient-to-br from-surface-2 to-obsidian-900 p-8 text-center">
                        <h2 className="text-2xl font-bold text-ui-text">
                            Contact
                        </h2>

                        <p className="mt-4 text-ui-secondary">
                            Intéressé par mon profil ? Discutons ensemble 🚀
                        </p>

                        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                            <a
                                href="mailto:ton-email@example.com"
                                className="rounded-[1.4rem] border border-brand-purple/30 bg-brand-purple/15 px-6 py-4 text-sm font-semibold text-brand-purpleSoft backdrop-blur-2xl transition-all duration-300 hover:border-brand-purple/40 hover:bg-brand-purple/20 hover:text-white hover:shadow-glow-purple"
                            >
                                📧 Me contacter
                            </a>

                            <a
                                href="https://github.com/Inkedi9"
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-[1.4rem] border border-white/10 bg-obsidian-900/80 px-6 py-4 text-sm font-semibold text-ui-secondary backdrop-blur-2xl transition-all duration-300 hover:border-brand-cyan/30 hover:text-white hover:shadow-glow-cyan"
                            >
                                💻 GitHub
                            </a>

                            <a
                                href="#"
                                className="rounded-[1.4rem] border border-white/10 bg-obsidian-900/80 px-6 py-4 text-sm font-semibold text-ui-secondary backdrop-blur-2xl transition-all duration-300 hover:border-brand-cyan/30 hover:text-white hover:shadow-glow-cyan"
                            >
                                🔗 LinkedIn
                            </a>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>
        </div>
    );
}