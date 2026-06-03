import RevealOnScroll from "../components/ui/RevealOnScroll";

const changelogEntries = [
    {
        version: "v2.1",
        period: "En cours",
        title: "Homelab & AI Orchestration",
        type: "Platform",
        accent: "red",
        changes: [
            "Nouvelle page Homelab : infrastructure Docker self-hosted (Pi-hole, Nginx PM, Uptime Kuma, Homer, DIUN, Ollama, Filebrowser, Vaultwarden).",
            "Page Projet Phare recentrée sur JARVINx — agent IA autonome Go.",
            "Refonte complète de l’identité : AI Systems Builder · Homelab Engineer · Cybersecurity Enthusiast.",
            "Swap DA purple → red : palette obsidian / red / cyan.",
        ],
    },
    {
        version: "v2.0",
        period: "Pivot 2025",
        title: "Recentrage AI & Go",
        type: "Refocus",
        accent: "cyan",
        changes: [
            "Lancement de JARVINx : runtime IA agentique local-first en Go (DockerAgent, FileAgent, webhooks, rapports quotidiens).",
            "Développement d’Inkora : interface IA custom locale sur Ollama avec GTX 1060.",
            "Lancement d’Inkyra : bot Discord en Go.",
            "Mise en place du homelab Docker sur Linux Mint.",
            "Apprentissage Go via projets réels — de débutant à projets production.",
        ],
    },
    {
        version: "v1.5",
        period: "Cybersécurité active",
        title: "Dark Ops Lab & SIEM Live",
        type: "Cyber",
        accent: "cyan",
        changes: [
            "Lancement de Dark Ops Lab : plateforme CTF/cybersécurité en Go + Next.js.",
            "SIEM Live : dashboard SOC interactif avec header d’état global et Analyst Notes.",
            "Pratique régulière TryHackMe / HackTheBox.",
        ],
    },
    {
        version: "v1.2",
        period: "Premiers projets",
        title: "Threat Operations Lab",
        type: "Cyber Demo",
        accent: "emerald",
        changes: [
            "Création du monorepo Threat-Operations-Lab regroupant les premiers projets cyber.",
            "Purple Team Lab : simulation Red/Blue Team avec interface cyber immersive.",
            "Premiers projets React/TypeScript/Next.js.",
        ],
    },
    {
        version: "v1.0",
        period: "Début",
        title: "Portfolio & premiers labs cyber",
        type: "Launch",
        accent: "red",
        changes: [
            "Première version publique du portfolio cybersécurité.",
            "Découverte de la cybersécurité — labs TryHackMe / HackTheBox.",
            "Premiers pas en JavaScript, React et Tailwind.",
            "Construction d’une identité visuelle dark cyber.",
        ],
    },
];

function EntryBadge({ accent, children }) {
    const styles = {
        red: "border-brand-red/25 bg-brand-red/10 text-brand-redSoft",
        purple: "border-brand-red/25 bg-brand-red/10 text-brand-redSoft",
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
                <div className="absolute left-[11px] top-8 h-[calc(100%+1.5rem)] w-px bg-gradient-to-b from-brand-red/70 via-brand-cyan/30 to-transparent" />
            )}

            <div className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-brand-red/30 bg-brand-red/15 shadow-[0_0_20px_rgba(230,57,70,0.20)] backdrop-blur-xl">
                <div className="h-2.5 w-2.5 rounded-full bg-brand-redSoft" />
            </div>

            <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-obsidian-900/75 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/25 hover:shadow-[0_18px_60px_rgba(230,57,70,0.12)]">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(230,57,70,0.05),rgba(34,211,238,0.03),transparent)]" />

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
                        <span className="inline-block rounded-full border border-brand-red/30 bg-brand-red/10 px-4 py-1 text-xs uppercase tracking-[0.25em] text-brand-redSoft">
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
                                className="inline-flex items-center justify-center rounded-[1.4rem] border border-brand-red/30 bg-brand-red/15 px-6 py-4 text-sm font-semibold text-brand-redSoft backdrop-blur-2xl transition-all duration-300 hover:border-brand-red/40 hover:bg-brand-red/20 hover:text-white hover:shadow-glow-red"
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

                    <div className="relative overflow-hidden rounded-[2rem] border border-brand-red/20 bg-gradient-to-br from-obsidian-900 via-obsidian-900 to-obsidian-950 p-6 shadow-[0_0_40px_rgba(230,57,70,0.15)]">
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(230,57,70,0.08),rgba(34,211,238,0.04),transparent)]" />
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
                                    JARVINx V1.5+ · Homelab · Dark Ops Lab
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-[0.18em] text-ui-muted/80 tracking-[0.2em]">
                                    Last major update
                                </p>
                                <p className="mt-2 text-brand-cyanSoft">
                                    Refonte portfolio v2.1 — AI & Homelab
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-[0.18em] text-ui-muted/80 tracking-[0.2em]">
                                    Next iteration
                                </p>
                                <p className="mt-2 text-brand-redSoft">
                                    Mémoire sémantique Qdrant · VPS deployment
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
                    <div className="relative overflow-hidden rounded-[2rem] border border-brand-red/20 bg-gradient-to-br from-surface-2 to-obsidian-900 p-8">
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(230,57,70,0.05),rgba(34,211,238,0.03),transparent)]" />

                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold text-ui-text">
                                Pourquoi garder un build log
                            </h2>

                            <p className="mt-4 max-w-4xl leading-8 text-ui-secondary">
                                Ce build log trace mon parcours réel : des premiers labs cyber aux systèmes agentiques Go.
                                Le portfolio évolue comme mes projets — par itérations, avec une logique de progression continue.
                            </p>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>
        </div>
    );
}