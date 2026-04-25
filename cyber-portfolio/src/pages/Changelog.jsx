import RevealOnScroll from "../components/ui/RevealOnScroll";

const changelogEntries = [
    {
        version: "v1.5",
        period: "Dernière mise à jour",
        title: "SIEM Live premium upgrade",
        type: "Feature",
        accent: "cyan",
        changes: [
            "Ajout d’un header d’état global pour renforcer l’effet dashboard SOC.",
            "Création d’un panneau Analyst Notes pour donner plus de crédibilité au triage.",
            "Amélioration du mode full dashboard avec une ambiance plus immersive.",
            "Refonte des cards en glass obsidian premium cohérentes avec le reste du site.",
        ],
    },
    {
        version: "v1.4",
        period: "Itération design",
        title: "Uniformisation complète de la DA",
        type: "UI System",
        accent: "purple",
        changes: [
            "Refonte des pages Home, CV, Projects et Purple Team Lab dans un style premium cohérent.",
            "Harmonisation des boutons, badges, cards et overlays glass obsidian.",
            "Amélioration des interactions hover et de la hiérarchie visuelle.",
        ],
    },
    {
        version: "v1.3",
        period: "Page projets",
        title: "Projects system redesign",
        type: "System",
        accent: "cyan",
        changes: [
            "Ajout de filtres plus lisibles et plus cohérents avec l’identité visuelle.",
            "Refonte des cartes projets avec un rendu plus premium.",
            "Meilleure gestion des projets en cours avec états plus propres.",
        ],
    },
    {
        version: "v1.2",
        period: "Projet phare",
        title: "Purple Team Lab integration",
        type: "Cyber Demo",
        accent: "purple",
        changes: [
            "Mise en avant du projet Purple Team Lab comme pièce centrale du portfolio.",
            "Ajout d’une page dédiée orientée démonstration cyber premium.",
            "Conservation d’une console plus dense pour contraster avec les cards glass.",
        ],
    },
    {
        version: "v1.1",
        period: "Portfolio core",
        title: "CV & profile improvements",
        type: "Profile",
        accent: "emerald",
        changes: [
            "Structuration plus claire des compétences, labs et timeline.",
            "Amélioration des sections de contact et de recherche d’alternance/stage.",
            "Renforcement du positionnement Blue Team / SOC / Purple Team.",
        ],
    },
    {
        version: "v1.0",
        period: "Initial release",
        title: "Portfolio launch",
        type: "Launch",
        accent: "purple",
        changes: [
            "Première version publique du portfolio cybersécurité.",
            "Base dark cyber mise en place avec mise en avant des projets pratiques.",
            "Construction d’une identité visuelle orientée démonstration et immersion.",
        ],
    },
];

function EntryBadge({ accent, children }) {
    const styles = {
        purple: "border-brand-purple/25 bg-brand-purple/10 text-brand-purpleSoft",
        cyan: "border-brand-cyan/25 bg-brand-cyan/10 text-brand-cyanSoft",
        emerald: "border-brand-emerald/25 bg-brand-emerald/10 text-brand-emeraldSoft",
    };

    return (
        <span
            className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] backdrop-blur-xl ${styles[accent] || styles.purple}`}
        >
            {children}
        </span>
    );
}

function ChangelogCard({ entry, isLast }) {
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
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                            <EntryBadge accent={entry.accent}>{entry.version}</EntryBadge>
                            <EntryBadge accent={entry.accent}>{entry.type}</EntryBadge>
                        </div>

                        <span className="text-xs uppercase tracking-[0.18em] text-ui-muted">
                            {entry.period}
                        </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-semibold text-ui-text">
                        {entry.title}
                    </h3>

                    <ul className="mt-4 space-y-3">
                        {entry.changes.map((change) => (
                            <li key={change} className="flex gap-3 text-ui-secondary">
                                <span className="mt-[10px] h-2 w-2 rounded-full bg-brand-cyan shadow-[0_0_10px_rgba(34,211,238,0.7)]" />
                                <span className="leading-7">{change}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default function Changelog() {
    return (
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-8 lg:pt-36">
            <RevealOnScroll>
                <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                    <div>
                        <span className="inline-block rounded-full border border-brand-purple/30 bg-brand-purple/10 px-4 py-1 text-xs uppercase tracking-[0.25em] text-brand-purpleSoft">
                            Build Log
                        </span>

                        <h1 className="mt-5 text-4xl font-black text-ui-text md:text-6xl">
                            Changelog / Build Log
                        </h1>

                        <p className="mt-6 max-w-3xl text-lg leading-8 text-ui-secondary">
                            Ce portfolio évolue comme un vrai produit : nouvelles démos cyber, amélioration continue
                            de l’UI, montée en cohérence visuelle et itérations progressives sur l’expérience globale.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                            <a
                                href="/projects"
                                className="inline-flex items-center justify-center rounded-[1.4rem] border border-brand-purple/30 bg-brand-purple/15 px-6 py-4 text-sm font-semibold text-brand-purpleSoft backdrop-blur-2xl transition-all duration-300 hover:border-brand-purple/40 hover:bg-brand-purple/20 hover:text-white hover:shadow-glow-purple"
                            >
                                Voir les projets
                            </a>

                            <a
                                href="https://github.com/Inkedi9"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center rounded-[1.4rem] border border-white/10 bg-obsidian-900/80 px-6 py-4 text-sm font-semibold text-ui-text backdrop-blur-2xl transition-all duration-300 hover:border-brand-cyan/30 hover:text-white hover:shadow-glow-cyan"
                            >
                                Ouvrir GitHub
                            </a>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-[2rem] border border-brand-purple/20 bg-gradient-to-br from-obsidian-900 via-obsidian-900 to-obsidian-950 p-6 shadow-[0_0_40px_rgba(139,92,246,0.15)]">
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(139,92,246,0.08),rgba(34,211,238,0.04),transparent)]" />
                        <div className="absolute right-5 top-5 flex items-center gap-2 ">
                            <span className="h-2.5 w-2.5 rounded-full bg-brand-emerald shadow-[0_0_12px_rgba(16,185,129,0.9)] animate-pulse" />
                            <span className="text-[10px] uppercase tracking-[0.2em] text-ui-muted">
                                System online
                            </span>
                        </div>

                        <div className="relative z-10 space-y-5">
                            <div>
                                <p className="text-xs uppercase tracking-[0.18em] text-ui-muted/80 tracking-[0.2em]">
                                    Status
                                </p>
                                <p className="mt-2 text-lg font-semibold text-brand-emeraldSoft">
                                    Actively evolving
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-[0.18em] text-ui-muted/80 tracking-[0.2em]">
                                    Current focus
                                </p>
                                <p className="mt-2 text-ui-text">
                                    SIEM realism, premium UI consistency, interactive cyber UX
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-[0.18em] text-ui-muted/80 tracking-[0.2em]">
                                    Last major update
                                </p>
                                <p className="mt-2 text-brand-cyanSoft">
                                    SIEM Live dashboard enhancement
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-[0.18em] text-ui-muted/80 tracking-[0.2em]">
                                    Next iteration
                                </p>
                                <p className="mt-2 text-brand-purpleSoft">
                                    Command palette / terminal navigation
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </RevealOnScroll>

            <section className="mt-16">
                <RevealOnScroll>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-ui-text">
                            Historique des itérations
                        </h2>
                        <p className="mt-3 max-w-3xl text-ui-secondary">
                            Une vue chronologique des évolutions importantes du portfolio, des améliorations visuelles
                            et des démos cyber intégrées au fil du temps.
                        </p>
                    </div>
                </RevealOnScroll>

                <div className="space-y-6">
                    {changelogEntries.map((entry, index) => (
                        <RevealOnScroll key={entry.version} delay={index * 70}>
                            <ChangelogCard entry={entry} isLast={index === changelogEntries.length - 1} />
                        </RevealOnScroll>
                    ))}
                </div>
            </section>

            <section className="mt-16">
                <RevealOnScroll>
                    <div className="relative overflow-hidden rounded-[2rem] border border-brand-purple/20 bg-gradient-to-br from-surface-2 to-obsidian-900 p-8">
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(139,92,246,0.05),rgba(34,211,238,0.03),transparent)]" />

                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold text-ui-text">
                                Pourquoi garder un build log
                            </h2>

                            <p className="mt-4 max-w-4xl leading-8 text-ui-secondary">
                                Cette page montre que le portfolio n’est pas figé : il évolue comme un projet vivant,
                                avec des améliorations régulières, une logique d’itération continue et une volonté
                                de renforcer à la fois la crédibilité cyber et la qualité produit.
                            </p>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>
        </div>
    );
}