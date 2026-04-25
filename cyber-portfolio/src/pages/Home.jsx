import { useEffect, useState } from "react";
import RevealOnScroll from "../components/ui/RevealOnScroll";
import ScanOverlay from "../components/ui/ScanOverlay";
import Stats from "../components/cards/Stats";
import GithubCard from "../components/cards/GithubCard";

const terminalLines = [
    "[OK] SOC Simulator loaded",
    "[OK] OSINT Investigator loaded",
    "[OK] Phishing Detection Simulator loaded",
    "[DEV] Purple Team Lab evolving",
];

const badgeBase =
    "inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] backdrop-blur-xl";

function PremiumCard({ accent = "purple", badge, title, description, children }) {
    const accentStyles = {
        purple: {
            wrapper:
                "hover:border-brand-purple/25 hover:shadow-[0_18px_60px_rgba(139,92,246,0.12)]",
            badge:
                "border-brand-purple/25 bg-brand-purple/10 text-brand-purpleSoft",
        },
        emerald: {
            wrapper:
                "hover:border-brand-emerald/25 hover:shadow-[0_18px_60px_rgba(16,185,129,0.10)]",
            badge:
                "border-brand-emerald/25 bg-brand-emerald/10 text-brand-emeraldSoft",
        },
    };

    const styles = accentStyles[accent];

    return (
        <div
            className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-obsidian-900/75 p-8 shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 ${styles.wrapper}`}
        >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(139,92,246,0.05),rgba(34,211,238,0.03),transparent)]" />

            <div className="relative z-10">
                <span className={`${badgeBase} ${styles.badge}`}>
                    {badge}
                </span>

                <h2 className="mt-5 text-3xl font-bold text-ui-text">{title}</h2>

                <p className="mt-4 leading-8 text-ui-secondary">{description}</p>

                {children}
            </div>
        </div>
    );
}

export default function Home() {
    const [typedText, setTypedText] = useState("");
    const fullText = "Mission: build a strong cyber profile.";

    useEffect(() => {
        let index = 0;

        const interval = setInterval(() => {
            setTypedText(fullText.slice(0, index + 1));
            index += 1;

            if (index >= fullText.length) {
                clearInterval(interval);
            }
        }, 45);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-8 lg:pb-28 lg:pt-36">

            <section className="grid items-center gap-12 lg:grid-cols-2">
                <RevealOnScroll>
                    <div>
                        <span className="inline-block rounded-full border border-brand-purple/30 bg-brand-purple/10 px-4 py-1 text-xs uppercase tracking-[0.25em] text-brand-purpleSoft">
                            Portfolio cybersécurité
                        </span>

                        <h1 className="mt-6 text-5xl font-black tracking-tight text-ui-text md:text-7xl">
                            Kevin
                            <span className="mt-2 block bg-gradient-to-r from-brand-purple via-brand-purpleSoft to-brand-cyanSoft bg-clip-text text-transparent">
                                Cybersécurité • SOC Analyst • Purple Team
                            </span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-ui-secondary">
                            Étudiant passionné par la cybersécurité, je développe des projets pratiques
                            autour de la détection, de l’investigation, de l’OSINT et de la sécurité web.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                            <a
                                href="/projects"
                                className="inline-flex items-center justify-center rounded-[1.4rem] border border-brand-purple/30 bg-brand-purple/15 px-6 py-4 text-sm font-semibold text-brand-purpleSoft backdrop-blur-2xl transition-all duration-300 hover:border-brand-purple/40 hover:bg-brand-purple/20 hover:text-white hover:shadow-glow-purple"
                            >
                                Voir mes projets
                            </a>

                            <a
                                href="/siem-live"
                                className="inline-flex items-center justify-center rounded-[1.4rem] border border-white/10 bg-obsidian-900/80 px-6 py-4 text-sm font-semibold text-ui-text backdrop-blur-2xl transition-all duration-300 hover:border-brand-cyan/30 hover:text-white hover:shadow-glow-cyan"
                            >
                                Ouvrir SIEM Live
                            </a>

                            <a
                                href="https://github.com/Inkedi9"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center rounded-[1.4rem] border border-white/10 bg-obsidian-900/80 px-6 py-4 text-sm font-semibold text-ui-text backdrop-blur-2xl transition-all duration-300 hover:border-brand-cyan/30 hover:text-white hover:shadow-glow-cyan"
                            >
                                GitHub
                            </a>

                            <a
                                href="mailto:ton-email@example.com"
                                className="inline-flex items-center justify-center rounded-[1.4rem] border border-white/10 bg-obsidian-900/80 px-6 py-4 text-sm font-semibold text-ui-text backdrop-blur-2xl transition-all duration-300 hover:border-brand-purple/30 hover:text-white hover:shadow-glow-purple"
                            >
                                Contact
                            </a>
                        </div>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll delay={150}>
                    <div>
                        <div className="relative rounded-[2rem] border border-brand-purple/20 bg-obsidian-950 text-ui-text shadow-purpleGlow backdrop-blur-xl">
                            <ScanOverlay />

                            <div className="relative z-10 flex items-center gap-2 border-b border-ui-border px-5 py-4">
                                <span className="h-3 w-3 rounded-full bg-rose-400" />
                                <span className="h-3 w-3 rounded-full bg-amber-400" />
                                <span className="h-3 w-3 rounded-full bg-brand-emeraldSoft" />
                                <span className="ml-3 text-xs text-ui-muted">cyber-console</span>
                            </div>

                            <div className="relative z-10 space-y-3 p-5 font-mono text-sm">
                                <p className="text-brand-emeraldSoft">root@inkedi:~$ init portfolio.sh</p>
                                <p className="text-ui-muted">Loading modules...</p>

                                {terminalLines.map((line) => (
                                    <p key={line} className="text-brand-cyanSoft">
                                        {line}
                                    </p>
                                ))}

                                <p className="pt-3 text-brand-purpleSoft">
                                    {typedText}
                                    <span className="ml-1 inline-block h-4 w-[8px] animate-pulse bg-brand-purpleSoft align-middle" />
                                </p>
                            </div>
                        </div>

                        <Stats />
                    </div>
                </RevealOnScroll>
            </section>

            <section className="mt-20 grid gap-6 lg:grid-cols-2">
                <RevealOnScroll>
                    <PremiumCard
                        accent="purple"
                        badge="Projet phare"
                        title="Purple Team Lab"
                        description="Mon projet principal : une web app Purple Team qui combine simulation d’attaque, détection défensive et validation des contrôles dans une interface immersive."
                    >
                        <a
                            href="/projects/purple-team-lab"
                            className="mt-6 inline-flex rounded-[1.4rem] border border-brand-purple/30 bg-brand-purple/15 px-5 py-4 text-sm font-semibold text-brand-purpleSoft backdrop-blur-2xl transition-all duration-300 hover:border-brand-purple/40 hover:bg-brand-purple/20 hover:text-white hover:shadow-glow-purple"
                        >
                            Explorer le projet
                        </a>
                    </PremiumCard>
                </RevealOnScroll>

                <RevealOnScroll delay={120}>
                    <PremiumCard
                        accent="emerald"
                        badge="Objectif"
                        title="Alternance / Stage cyber"
                        description="Je cherche à intégrer un environnement SOC, Blue Team ou Purple Team pour continuer à progresser sur des projets concrets et monter rapidement en niveau."
                    >
                        <a
                            href="/cv"
                            className="mt-6 inline-flex rounded-[1.4rem] border border-white/10 bg-obsidian-900/80 px-5 py-4 text-sm font-semibold text-ui-text backdrop-blur-2xl transition-all duration-300 hover:border-brand-cyan/30 hover:text-white hover:shadow-glow-cyan"
                        >
                            Voir mon CV / Compétences
                        </a>
                    </PremiumCard>
                </RevealOnScroll>
            </section>

            <GithubCard />

            <section className="mt-16">
                <RevealOnScroll>
                    <div className="relative overflow-hidden rounded-[2rem] border border-brand-purple/20 bg-gradient-to-br from-surface-2 to-obsidian-900 p-8 text-center">
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(139,92,246,0.05),rgba(34,211,238,0.03),transparent)]" />

                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold text-ui-text">Contact</h2>

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
                                    href="#"
                                    className="rounded-[1.4rem] border border-white/10 bg-obsidian-900/80 px-6 py-4 text-sm font-semibold text-ui-text backdrop-blur-2xl transition-all duration-300 hover:border-brand-cyan/30 hover:text-white hover:shadow-glow-cyan"
                                >
                                    🔗 LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>
        </div>
    );
}