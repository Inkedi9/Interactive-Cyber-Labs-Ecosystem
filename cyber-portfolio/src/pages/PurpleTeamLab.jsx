import RevealOnScroll from "../components/ui/RevealOnScroll";

const features = [
    "Simulation d’attaque orientée Red Team",
    "Détection défensive côté Blue Team",
    "Validation des contrôles et règles de détection",
    "Interface cyber futuriste orientée démonstration",
    "Projet vitrine principal du portfolio",
];

const modules = [
    {
        title: "Attack Simulation",
        desc: "Mise en scène d’actions offensives contrôlées pour représenter le point de vue Red Team.",
    },
    {
        title: "Detection Layer",
        desc: "Visualisation des alertes, signaux, indicateurs et logique de détection côté Blue Team.",
    },
    {
        title: "Validation Workflow",
        desc: "Approche Purple Team pour vérifier que les actions simulées déclenchent bien les contrôles attendus.",
    },
    {
        title: "Cyber UI",
        desc: "Design dark / purple / néon pensé pour marquer visuellement les recruteurs et démontrer un vrai soin produit.",
    },
];

const badgeBase =
    "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] backdrop-blur-xl";

function PremiumModuleCard({ module, index }) {
    return (
        <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-obsidian-900/75 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-brand-purple/25 hover:shadow-[0_18px_60px_rgba(139,92,246,0.12)]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(139,92,246,0.05),rgba(34,211,238,0.03),transparent)]" />

            <div className="relative z-10">
                <span className={`${badgeBase} border-brand-purple/25 bg-brand-purple/10 text-brand-purpleSoft`}>
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

export default function PurpleTeamLab() {
    return (
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-8 lg:pt-36">
            <RevealOnScroll>
                <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                    <div>
                        <span className="inline-block rounded-full border border-brand-purple/30 bg-brand-purple/10 px-4 py-1 text-xs uppercase tracking-[0.25em] text-brand-purpleSoft">
                            Projet phare
                        </span>

                        <h1 className="mt-5 text-4xl font-black text-ui-text md:text-6xl">
                            Purple Team Lab
                        </h1>

                        <p className="mt-6 max-w-3xl text-lg leading-8 text-ui-secondary">
                            Purple Team Lab est mon projet vitrine principal. Il met en scène une approche
                            Purple Team moderne en combinant la logique offensive Red Team, la détection Blue Team
                            et la validation des contrôles dans une interface cyber immersive.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                            <a
                                href="https://purple-team-lab.vercel.app/"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center rounded-[1.4rem] border border-brand-purple/30 bg-brand-purple/15 px-6 py-4 text-sm font-semibold text-brand-purpleSoft backdrop-blur-2xl transition-all duration-300 hover:border-brand-purple/40 hover:bg-brand-purple/20 hover:text-white hover:shadow-glow-purple"
                            >
                                Voir la démo live
                            </a>

                            <a
                                href="https://github.com/Inkedi9/purple-team-lab"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center rounded-[1.4rem] border border-white/10 bg-obsidian-900/80 px-6 py-4 text-sm font-semibold text-ui-text backdrop-blur-2xl transition-all duration-300 hover:border-brand-cyan/30 hover:text-white hover:shadow-glow-cyan"
                            >
                                Voir le GitHub
                            </a>
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-brand-purple/20 bg-obsidian-950 text-ui-text shadow-purpleGlow">
                        <div className="flex items-center gap-2 border-b border-ui-border px-5 py-4">
                            <span className="h-3 w-3 rounded-full bg-rose-400" />
                            <span className="h-3 w-3 rounded-full bg-amber-400" />
                            <span className="h-3 w-3 rounded-full bg-brand-emeraldSoft" />
                            <span className="ml-3 text-xs text-ui-muted">purple-lab.console</span>
                        </div>

                        <div className="space-y-3 p-5 font-mono text-sm">
                            <p className="text-brand-emeraldSoft">root@purple-lab:~$ initialize scenario</p>
                            <p className="text-ui-muted">Loading detection framework...</p>
                            <p className="text-brand-cyanSoft">[OK] Attack sequence ready</p>
                            <p className="text-brand-cyanSoft">[OK] Detection rules active</p>
                            <p className="text-brand-cyanSoft">[OK] Validation pipeline ready</p>
                            <p className="pt-3 text-brand-purpleSoft">Status: flagship project online.</p>
                        </div>
                    </div>
                </div>
            </RevealOnScroll>

            <section className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <RevealOnScroll>
                    <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-obsidian-900/75 p-8 shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-all duration-300 hover:border-brand-purple/25 hover:shadow-[0_18px_60px_rgba(139,92,246,0.12)]">
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(139,92,246,0.05),rgba(34,211,238,0.03),transparent)]" />

                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold text-ui-text">
                                Objectif du projet
                            </h2>

                            <p className="mt-4 leading-8 text-ui-secondary">
                                Créer une démonstration visuelle forte, crédible et moderne d’une logique Purple Team
                                accessible à un recruteur, tout en valorisant mes compétences en UI cyber, architecture
                                de scénario, détection et storytelling technique.
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
                    <div className="relative overflow-hidden rounded-[2rem] border border-brand-purple/20 bg-gradient-to-br from-surface-2 to-obsidian-900 p-8">
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(139,92,246,0.05),rgba(34,211,238,0.03),transparent)]" />

                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold text-ui-text">
                                Pourquoi ce projet est important dans mon portfolio
                            </h2>

                            <p className="mt-4 max-w-4xl leading-8 text-ui-secondary">
                                Purple Team Lab est la pièce centrale de mon portfolio car il montre une montée en niveau :
                                je ne présente plus seulement une interface ou une simulation isolée, mais une logique de
                                confrontation, de détection et de validation inspirée des environnements réels de cybersécurité.
                            </p>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>
        </div>
    );
}