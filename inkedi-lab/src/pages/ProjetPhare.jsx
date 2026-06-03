import RevealOnScroll from "../components/ui/RevealOnScroll";

const features = [
    "Agent IA autonome — boucle observe-think-act",
    "Runtime local-first, zéro dépendance cloud",
    "Multi-agents Go avec goroutines parallèles",
    "Dashboard Next.js avec webhooks et rapports quotidiens",
    "Déploiement Docker sur homelab Linux",
];

const modules = [
    {
        title: "Agent Runtime",
        desc: "Boucle observe-think-act en Go. JARVINx observe son environnement, raisonne et agit sans intervention humaine.",
    },
    {
        title: "DockerAgent",
        desc: "Agent Go capable d'interagir avec le daemon Docker : inspecter, démarrer, stopper des containers.",
    },
    {
        title: "FileAgent",
        desc: "Agent de gestion de fichiers — lecture, écriture, organisation automatisée sur le homelab.",
    },
    {
        title: "Dashboard Next.js",
        desc: "Interface de monitoring temps réel : logs, statuts agents, webhooks entrants, rapports quotidiens.",
    },
];

const badgeBase =
    "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] backdrop-blur-xl";

function PremiumModuleCard({ module, index }) {
    return (
        <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-obsidian-900/75 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/25 hover:shadow-[0_18px_60px_rgba(230,57,70,0.12)]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(230,57,70,0.05),rgba(34,211,238,0.03),transparent)]" />

            <div className="relative z-10">
                <span className={`${badgeBase} border-brand-red/25 bg-brand-red/10 text-brand-redSoft`}>
                    Module {index + 1}
                </span>

                <h3 className="mt-4 text-xl font-semibold text-ui-text">
                    {module.title}
                </h3>

                <p className="mt-3 leading-7 text-ui-secondary">
                    {module.desc}
                </p>
            </div>
        </div>
    );
}

export default function ProjetPhare() {
    return (
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-8 lg:pt-36">
            <RevealOnScroll>
                <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                    <div>
                        <span className="inline-block rounded-full border border-brand-red/30 bg-brand-red/10 px-4 py-1 text-xs uppercase tracking-[0.25em] text-brand-redSoft">
                            Projet Phare
                        </span>

                        <h1 className="mt-5 text-4xl font-black text-ui-text md:text-6xl">
                            JARVINx
                        </h1>

                        <p className="mt-6 max-w-3xl text-lg leading-8 text-ui-secondary">
                            JARVINx est mon projet principal — un runtime IA autonome local-first écrit en Go.
                            Pas un chatbot : un système agentique qui observe, raisonne et agit sur mon homelab
                            via des agents spécialisés.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                            <a
                                href="https://github.com/Inkedi9/JARVINx"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center rounded-[1.4rem] border border-brand-red/30 bg-brand-red/15 px-6 py-4 text-sm font-semibold text-brand-redSoft backdrop-blur-2xl transition-all duration-300 hover:border-brand-red/40 hover:bg-brand-red/20 hover:text-white hover:shadow-glow-red"
                            >
                                Voir le GitHub
                            </a>
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-brand-red/20 bg-obsidian-950 text-ui-text shadow-redGlow">
                        <div className="flex items-center gap-2 border-b border-ui-border px-5 py-4">
                            <span className="h-3 w-3 rounded-full bg-rose-400" />
                            <span className="h-3 w-3 rounded-full bg-amber-400" />
                            <span className="h-3 w-3 rounded-full bg-brand-emeraldSoft" />
                            <span className="ml-3 text-xs text-ui-muted">jarvinx.runtime</span>
                        </div>

                        <div className="space-y-3 p-5 font-mono text-sm">
                            <p className="text-brand-emeraldSoft">root@jarvinx:~$ boot --agents all</p>
                            <p className="text-ui-muted">Loading agent registry...</p>
                            <p className="text-brand-cyanSoft">[OK] DockerAgent initialized</p>
                            <p className="text-brand-cyanSoft">[OK] FileAgent initialized</p>
                            <p className="text-brand-cyanSoft">[OK] WebhookListener active</p>
                            <p className="pt-3 text-brand-redSoft">Status: runtime online. Awaiting tasks.</p>
                        </div>
                    </div>
                </div>
            </RevealOnScroll>

            <section className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <RevealOnScroll>
                    <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-obsidian-900/75 p-8 shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-all duration-300 hover:border-brand-red/25 hover:shadow-[0_18px_60px_rgba(230,57,70,0.12)]">
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(230,57,70,0.05),rgba(34,211,238,0.03),transparent)]" />

                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold text-ui-text">
                                Objectif du projet
                            </h2>

                            <p className="mt-4 leading-8 text-ui-secondary">
                                Construire un vrai système agentique local : pas un wrapper d'API, pas un chatbot.
                                JARVINx est conçu pour tourner en autonomie sur mon homelab, orchestrer des tâches,
                                et évoluer vers une mémoire sémantique via Qdrant.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-2">
                                {features.map((feature) => (
                                    <span
                                        key={feature}
                                        className="rounded-full border border-white/10 bg-obsidian-900/70 px-4 py-2 text-sm text-ui-text backdrop-blur-xl transition-all duration-300 hover:border-brand-cyan/20 hover:text-white"
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll delay={120}>
                    <div className="grid gap-6 sm:grid-cols-2">
                        {modules.map((module, index) => (
                            <PremiumModuleCard key={module.title} module={module} index={index} />
                        ))}
                    </div>
                </RevealOnScroll>
            </section>

            <section className="mt-16">
                <RevealOnScroll>
                    <div className="relative overflow-hidden rounded-[2rem] border border-brand-red/20 bg-gradient-to-br from-surface-2 to-obsidian-900 p-8">
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(230,57,70,0.05),rgba(34,211,238,0.03),transparent)]" />

                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold text-ui-text">
                                Pourquoi ce projet est important dans mon portfolio
                            </h2>

                            <p className="mt-4 max-w-4xl leading-8 text-ui-secondary">
                                JARVINx représente ma montée en compétence Go appliquée à un vrai problème :
                                l'orchestration IA locale. Il combine goroutines, agents spécialisés, CI/CD
                                GitHub Actions et infrastructure Docker — sur du hardware réel.
                            </p>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>
        </div>
    );
}
