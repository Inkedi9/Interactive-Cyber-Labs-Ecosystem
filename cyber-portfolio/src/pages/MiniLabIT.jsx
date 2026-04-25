import RevealOnScroll from "../components/ui/RevealOnScroll";
import { useEffect, useState, useRef } from "react";
import {
    Server,
    Monitor,
    Shield,
    Bug,
} from "lucide-react";

const machines = [
    {
        name: "SRV_DC",
        role: "Domain Controller / Active Directory",
        status: "ACTIVE",
        accent: "purple",
        icon: Server,
        description:
            "Contrôleur de domaine principal du lab, utilisé pour Active Directory, la gestion des comptes, les scripts PowerShell, les premières GPO et les dossiers partagés.",
    },
    {
        name: "WIN-USER01",
        role: "Poste utilisateur domaine",
        status: "ACTIVE",
        accent: "cyan",
        icon: Monitor,
        description:
            "Poste utilisateur joint au domaine pour valider l’intégration, l’authentification et le comportement côté endpoint dans l’environnement AD.",
    },
    {
        name: "KALI-OPS",
        role: "Intrusion / tests contrôlés",
        status: "READY",
        accent: "emerald",
        icon: Bug,
        description:
            "Machine dédiée aux futures simulations contrôlées, à la reconnaissance et aux scénarios pédagogiques d’attaque dans le lab.",
    },
    {
        name: "LINUX-01",
        role: "Analyse réseau / évolution",
        status: "BUILDING",
        accent: "cyan",
        icon: Shield,
        description:
            "Nœud orienté analyse réseau et visibilité technique, encore en préparation pour compléter progressivement l’observation du lab.",
    },
];

const currentFocus = [
    "Mise en place de la base Active Directory sur SRV_DC",
    "Création d’utilisateurs en masse via scripts PowerShell",
    "Intégration du poste WIN-USER01 au domaine",
    "Création de premières GPO",
    "Mise en place d’un dossier partagé",
    "Préparation de KALI-OPS pour de futurs scénarios contrôlés",
    "Préparation de LINUX-01 pour l’analyse réseau",
];

const machineDetails = [
    {
        title: "SRV_DC",
        subtitle: "Domain Controller",
        accent: "purple",
        icon: Server,
        content:
            "Contrôleur de domaine principal du lab. Je l’utilise pour travailler la base Active Directory, la gestion des utilisateurs, les scripts d’administration, les premières GPO et la structuration globale de l’environnement.",
    },
    {
        title: "WIN-USER01",
        subtitle: "Joined Endpoint",
        accent: "cyan",
        icon: Monitor,
        content:
            "Poste utilisateur joint au domaine, utile pour valider l’intégration, les usages côté endpoint, les effets des stratégies et la cohérence de l’environnement Windows côté client.",
    },
    {
        title: "KALI-OPS",
        subtitle: "Attack Node",
        accent: "emerald",
        icon: Bug,
        content:
            "Machine de simulation contrôlée dédiée à la reconnaissance et aux futures tentatives d’intrusion pédagogiques. Elle servira à confronter progressivement le lab à des comportements offensifs réalistes mais maîtrisés.",
    },
    {
        title: "LINUX-01",
        subtitle: "Analysis Node",
        accent: "cyan",
        icon: Shield,
        content:
            "Machine en cours de construction, orientée vers l’analyse réseau et l’observation technique. Elle a vocation à devenir un point de visibilité complémentaire dans l’environnement.",
    },
];

const nextSteps = [
    "Approfondir la structure Active Directory et la gestion des comptes",
    "Étendre les GPO et les scénarios de droits / authentification",
    "Faire évoluer KALI-OPS vers de premiers scénarios de test contrôlés",
    "Renforcer LINUX-01 pour lui donner un rôle concret d’analyse réseau",
    "Documenter les étapes importantes du lab au fil des itérations",
    "Relier progressivement certaines activités à une logique de visibilité et de détection",
];

function AccentBadge({ accent = "purple", children }) {
    const styles = {
        purple: "border-brand-purple/25 bg-brand-purple/10 text-brand-purpleSoft",
        cyan: "border-brand-cyan/25 bg-brand-cyan/10 text-brand-cyanSoft",
        emerald:
            "border-brand-emerald/25 bg-brand-emerald/10 text-brand-emeraldSoft",
    };

    return (
        <span
            className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] backdrop-blur-xl ${styles[accent]}`}
        >
            {children}
        </span>
    );
}

function PremiumCard({
    accent = "purple",
    title,
    subtitle,
    description,
    icon: Icon,
    status,
    isAttacking,
}) {

    const hoverStyles = {
        purple:
            "hover:border-brand-purple/25 hover:shadow-[0_18px_60px_rgba(139,92,246,0.12)]",
        cyan:
            "hover:border-brand-cyan/25 hover:shadow-[0_18px_60px_rgba(34,211,238,0.10)]",
        emerald:
            "hover:border-brand-emerald/25 hover:shadow-[0_18px_60px_rgba(16,185,129,0.10)]",
    };

    const statusStyles = {
        ACTIVE:
            "border-brand-emerald/25 bg-brand-emerald/10 text-brand-emeraldSoft",
        READY:
            "border-brand-purple/25 bg-brand-purple/10 text-brand-purpleSoft",
        BUILDING:
            "border-brand-cyan/25 bg-brand-cyan/10 text-brand-cyanSoft",
    };

    const isKali = title === "KALI-OPS" && isAttacking;

    return (
        <div
            className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-obsidian-900/75 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 ${hoverStyles[accent]} ${isKali ? "ring-1 ring-rose-400/30 shadow-[0_0_40px_rgba(244,63,94,0.12)]" : ""
                }`}
        >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(139,92,246,0.05),rgba(34,211,238,0.03),transparent)]" />

            <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    {subtitle ? (
                        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-ui-muted backdrop-blur-xl">
                            {subtitle}
                        </span>
                    ) : (
                        <span />
                    )}

                    {status ? (
                        <span
                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] backdrop-blur-xl ${statusStyles[status] || statusStyles.ACTIVE}`}
                        >
                            <span
                                className={`h-2 w-2 rounded-full ${status === "ACTIVE"
                                    ? "bg-brand-emerald"
                                    : status === "READY"
                                        ? "bg-brand-purple"
                                        : "bg-brand-cyan"
                                    } ${status !== "BUILDING" ? "animate-pulse" : ""}`}
                            />
                            {status}
                        </span>
                    ) : null}
                </div>

                <div className="mt-4 flex items-center gap-3">
                    {Icon && (
                        <div
                            className={`flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.10),rgba(139,92,246,0.10))] text-brand-cyanSoft shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.25)] ${isKali ? "group-hover:scale-110 group-hover:animate-pulse" : "group-hover:scale-110"
                                }`}
                        >
                            <Icon size={20} />
                        </div>
                    )}

                    <h3 className="text-xl font-semibold text-ui-text">{title}</h3>
                </div>

                <p className="mt-4 leading-7 text-ui-secondary">{description}</p>
            </div>
        </div>
    );
}

function LabStatusConsole() {
    const baseLogs = [
        "[OK] Domain controller reachable (SRV_DC)",
        "[OK] Endpoint authenticated (WIN-USER01)",
        "[OK] Attack node ready (KALI-OPS)",
        "[DEV] Linux node initializing (LINUX-01)",
        "[INFO] GPO baseline applied",
        "[INFO] Shared folder mounted",
        "[INFO] PowerShell scripts executed",
    ];

    const [logs, setLogs] = useState(baseLogs.slice(0, 4));
    const [pulse, setPulse] = useState(false);

    useEffect(() => {
        let index = 4;

        const interval = setInterval(() => {
            setLogs((prev) => [...prev.slice(-5), baseLogs[index % baseLogs.length]]);
            setPulse(true);
            setTimeout(() => setPulse(false), 250);
            index++;
        }, 1800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative overflow-hidden rounded-[2rem] border border-brand-purple/20 bg-obsidian-950 text-ui-text shadow-purpleGlow backdrop-blur-xl">
            {/* HEADER */}
            <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-brand-emeraldSoft" />

                <span className="ml-3 text-xs font-mono text-ui-muted">
                    lab.status
                </span>

                {/* LIVE DOT */}
                <span
                    className={`ml-auto h-2.5 w-2.5 rounded-full bg-brand-emerald transition ${pulse ? "shadow-[0_0_14px_rgba(16,185,129,0.9)]" : ""
                        }`}
                />
            </div>

            {/* CONTENT */}
            <div className="space-y-3 p-5 font-mono text-sm">
                <p className="text-brand-emeraldSoft">
                    root@inkedi:~$ check lab status
                </p>

                {logs.map((log, index) => (
                    <p
                        key={`${log}-${index}`}
                        className={
                            log.includes("[OK]")
                                ? "text-brand-cyanSoft"
                                : log.includes("[DEV]")
                                    ? "text-brand-purpleSoft"
                                    : "text-ui-muted"
                        }
                    >
                        {log}
                    </p>
                ))}

                <p className="pt-2 text-brand-purpleSoft">
                    Status: lab operational.
                </p>
            </div>
        </div>
    );
}

function AttackSimulationConsole({ running, setRunning }) {
    const [lines, setLines] = useState([]);
    const intervalRef = useRef(null);

    const attackLines = [
        { text: "[ATTACK] Payload execution (KALI-OPS)", type: "attack" },
        { text: "[OK] Connection established (WIN-USER01)", type: "ok" },
        { text: "[INFO] Recon tools launched", type: "info" },
        { text: "[INFO] AD enumeration in progress", type: "info" },
        { text: "[WARN] Credential test (Pass-the-Hash)", type: "warn" },
        { text: "[INFO] Lateral movement attempt", type: "info" },
        { text: "[INFO] Detection signal triggered", type: "info" },
    ];

    function startAttack() {
        if (running) return;

        setRunning(true);
        setLines([]);

        let i = 0;

        intervalRef.current = setInterval(() => {
            setLines((prev) => {
                if (i >= attackLines.length) {
                    clearInterval(intervalRef.current);

                    setTimeout(() => {
                        setRunning(false);
                        setLines([]);
                    }, 1200);

                    return prev;
                }

                const next = [...prev, attackLines[i]];
                i++;
                return next;
            });
        }, 500);
    }

    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    function getColor(type) {
        switch (type) {
            case "attack":
                return "text-rose-400";
            case "warn":
                return "text-amber-300";
            case "ok":
                return "text-brand-cyanSoft";
            default:
                return "text-ui-muted";
        }
    }

    return (
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr] items-center">
            {/* LEFT */}
            <div>
                <h2 className="text-2xl font-bold text-ui-text">
                    Simulation d’attaque
                </h2>

                <p className="mt-3 text-ui-secondary max-w-md">
                    Démonstration visuelle d’un scénario contrôlé depuis KALI-OPS vers un endpoint du domaine.
                </p>

                <button
                    onClick={startAttack}
                    disabled={running}
                    className="mt-6 rounded-[1.4rem] border border-rose-400/30 bg-rose-500/10 px-6 py-4 text-sm font-semibold text-rose-300 backdrop-blur-xl transition-all duration-300 hover:border-rose-400/40 hover:bg-rose-500/20 hover:text-white hover:shadow-[0_0_30px_rgba(244,63,94,0.18)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                    {running ? "Simulation en cours..." : "Lancer attaque"}
                </button>
            </div>

            {/* RIGHT TERMINAL */}
            <div className="relative overflow-hidden rounded-[2rem] border border-rose-400/20 bg-obsidian-950 shadow-[0_0_60px_rgba(244,63,94,0.15)]">
                {running && (
                    <>
                        <div className="pointer-events-none absolute inset-0 attack-flicker-layer bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.10),transparent_60%)]" />

                        <div className="pointer-events-none absolute inset-0 attack-glitch-layer bg-[linear-gradient(90deg,transparent_0%,rgba(244,63,94,0.10)_20%,transparent_40%,rgba(244,63,94,0.14)_60%,transparent_100%)]" />

                        <div className="pointer-events-none absolute inset-0 attack-scan-layer bg-[repeating-linear-gradient(180deg,transparent_0px,transparent_18px,rgba(244,63,94,0.08)_19px,transparent_20px)]" />

                        <div className="pointer-events-none absolute inset-y-0 right-0 w-[45%] bg-[linear-gradient(90deg,transparent_0%,rgba(244,63,94,0.06)_40%,rgba(244,63,94,0.12)_100%)] blur-[2px]" />

                        <div className="pointer-events-none absolute left-0 top-[22%] h-px w-full bg-gradient-to-r from-transparent via-rose-400/30 to-transparent" />
                        <div className="pointer-events-none absolute left-0 top-[58%] h-px w-full bg-gradient-to-r from-transparent via-rose-400/20 to-transparent" />
                        <div className="pointer-events-none absolute left-[18%] top-[72%] h-[2px] w-[32%] bg-rose-400/20 blur-[1px]" />
                        <div className="pointer-events-none absolute right-[10%] top-[30%] h-[2px] w-[18%] bg-rose-300/25 blur-[1px]" />
                    </>
                )}

                <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
                    <span className="h-3 w-3 rounded-full bg-rose-400" />
                    <span className="h-3 w-3 rounded-full bg-amber-400" />
                    <span className="h-3 w-3 rounded-full bg-brand-emeraldSoft" />

                    <span className="ml-3 text-xs text-ui-muted font-mono">
                        attack.simulation
                    </span>

                    {running && (
                        <span className="ml-auto h-2.5 w-2.5 rounded-full bg-rose-400 animate-pulse" />
                    )}
                </div>

                <div className="relative z-10 space-y-2 p-5 font-mono text-sm">
                    <p className="text-brand-emeraldSoft">
                        root@kali:~$ attack --simulate
                    </p>

                    {lines.map((line, index) => (
                        <p key={index} className={getColor(line.type)}>
                            {line.text}
                        </p>
                    ))}

                    {running && (
                        <span className="ml-1 inline-block h-4 w-[8px] animate-pulse bg-rose-400" />
                    )}
                </div>
            </div>
        </div>
    );
}

export default function MiniLabIT() {
    const [attackRunning, setAttackRunning] = useState(false);
    return (
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-8 lg:pt-36">
            <RevealOnScroll>
                <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                    <div>
                        <span className="inline-block rounded-full border border-brand-purple/30 bg-brand-purple/10 px-4 py-1 text-xs uppercase tracking-[0.25em] text-brand-purpleSoft">
                            Infrastructure Lab
                        </span>

                        <h1 className="mt-5 text-4xl font-black text-ui-text md:text-6xl">
                            Mini Lab IT
                        </h1>

                        <p className="mt-6 max-w-3xl text-lg leading-8 text-ui-secondary">
                            Environnement virtualisé personnel conçu pour pratiquer Active Directory,
                            l’administration Windows, les scripts PowerShell, l’intégration d’un poste
                            au domaine, les tests contrôlés via Kali et l’analyse réseau progressive via Linux.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                            <a
                                href="/changelog"
                                className="inline-flex items-center justify-center rounded-[1.4rem] border border-brand-purple/30 bg-brand-purple/15 px-6 py-4 text-sm font-semibold text-brand-purpleSoft backdrop-blur-2xl transition-all duration-300 hover:border-brand-purple/40 hover:bg-brand-purple/20 hover:text-white hover:shadow-glow-purple"
                            >
                                Voir le Build Log
                            </a>

                            <a
                                href="/projects"
                                className="inline-flex items-center justify-center rounded-[1.4rem] border border-white/10 bg-obsidian-900/80 px-6 py-4 text-sm font-semibold text-ui-text backdrop-blur-2xl transition-all duration-300 hover:border-brand-cyan/30 hover:text-white hover:shadow-glow-cyan"
                            >
                                Explorer mes projets
                            </a>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-[2rem] border border-brand-purple/20 bg-obsidian-950 text-ui-text shadow-purpleGlow backdrop-blur-xl">

                        {/* HEADER */}
                        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
                            <span className="h-3 w-3 rounded-full bg-rose-400" />
                            <span className="h-3 w-3 rounded-full bg-amber-400" />
                            <span className="h-3 w-3 rounded-full bg-brand-emeraldSoft" />

                            <span className="ml-3 text-xs text-ui-muted font-mono">
                                lab.overview
                            </span>

                            {/* ONLINE STATUS */}
                            <span className="ml-auto flex items-center gap-2 text-xs font-mono text-brand-emeraldSoft">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-emerald opacity-75" />
                                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-emerald" />
                                </span>
                                ONLINE
                            </span>
                        </div>

                        {/* CONTENT */}
                        <div className="space-y-3 p-5 font-mono text-sm">
                            <p className="text-brand-emeraldSoft">
                                root@inkedi:~$ init mini-lab.sh
                            </p>

                            <p className="text-brand-cyanSoft">
                                [OK] Active Directory initialized (SRV_DC)
                            </p>

                            <p className="text-brand-cyanSoft">
                                [OK] Endpoint joined (WIN-USER01)
                            </p>

                            <p className="text-brand-cyanSoft">
                                [OK] Kali node ready (KALI-OPS)
                            </p>

                            <p className="text-brand-cyanSoft">
                                [DEV] Linux analysis node building (LINUX-01)
                            </p>

                            <p className="pt-2 text-brand-purpleSoft">
                                Status: infrastructure evolving.
                            </p>
                        </div>
                    </div>
                </div>
            </RevealOnScroll>

            <section className="mt-16">
                <RevealOnScroll>
                    <span className="inline-block rounded-full border border-brand-purple/20 bg-brand-purple/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-brand-purpleSoft">
                        Infrastructure layout
                    </span>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-ui-text">
                            Topologie du lab
                        </h2>
                        <p className="mt-3 max-w-3xl text-ui-secondary">
                            Le lab est structuré autour d’un contrôleur de domaine central, d’un poste utilisateur
                            intégré à l’environnement, d’un nœud Linux en préparation pour l’analyse réseau,
                            et d’une machine Kali volontairement positionnée à part pour représenter la logique
                            d’attaque contrôlée.
                        </p>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll delay={100}>
                    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-obsidian-900/75 p-8 shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(139,92,246,0.05),rgba(34,211,238,0.03),transparent)]" />

                        <div className="relative z-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                            {/* LIGNES TOPO DESKTOP */}
                            <div className="pointer-events-none absolute left-[31%] top-1/2 hidden h-px w-[8%] -translate-y-1/2 bg-gradient-to-r from-brand-emerald/40 via-brand-purple/30 to-brand-purple/20 lg:block" />
                            <div className="pointer-events-none absolute right-[26%] top-[34%] hidden h-[20%] w-px bg-gradient-to-b from-brand-purple/40 via-brand-cyan/30 to-brand-cyan/20 lg:block" />

                            {/* DOTS DE JONCTION */}
                            <div className="pointer-events-none absolute left-[39%] top-1/2 hidden h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-brand-purple shadow-[0_0_12px_rgba(139,92,246,0.7)] lg:block" />
                            <div className="pointer-events-none absolute right-[26%] top-[54%] hidden h-2.5 w-2.5 rounded-full bg-brand-cyan shadow-[0_0_12px_rgba(34,211,238,0.7)] lg:block" />

                            {/* KALI */}
                            <div className="flex items-center">
                                <div className="group w-full rounded-[1.6rem] border border-brand-emerald/20 bg-obsidian-900/70 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-brand-emerald/30 hover:shadow-[0_18px_60px_rgba(16,185,129,0.10)]">
                                    <AccentBadge accent="emerald">Attack node</AccentBadge>

                                    <div className="mt-4 flex items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(16,185,129,0.12),rgba(139,92,246,0.10))] text-brand-emeraldSoft shadow-[0_0_16px_rgba(16,185,129,0.18)] transition-all duration-300 group-hover:scale-110 group-hover:animate-pulse">
                                            <Bug size={20} />
                                        </div>

                                        <h3 className="text-xl font-semibold text-ui-text">
                                            KALI-OPS
                                        </h3>
                                    </div>

                                    <p className="mt-3 leading-7 text-ui-secondary">
                                        Machine dédiée aux simulations contrôlées, à la reconnaissance et
                                        aux futurs scénarios d’intrusion pédagogique dans le lab.
                                    </p>
                                </div>
                            </div>

                            {/* BLOC PRINCIPAL */}
                            <div className="grid gap-6">
                                {/* SRV_DC */}
                                <div className="group mx-auto w-full max-w-md rounded-[1.6rem] border border-brand-purple/20 bg-obsidian-900/70 p-5 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-brand-purple/30 hover:shadow-[0_18px_60px_rgba(139,92,246,0.12)]">
                                    <AccentBadge accent="purple">AD / Domain</AccentBadge>

                                    <div className="mt-4 flex items-center justify-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(139,92,246,0.12),rgba(34,211,238,0.08))] text-brand-purpleSoft shadow-[0_0_16px_rgba(139,92,246,0.18)] transition-all duration-300 group-hover:scale-110">
                                            <Server size={20} />
                                        </div>

                                        <h3 className="text-xl font-semibold text-ui-text">
                                            SRV_DC
                                        </h3>
                                    </div>

                                    <p className="mt-3 text-sm leading-7 text-ui-secondary">
                                        Contrôleur de domaine principal — Active Directory, utilisateurs,
                                        scripts PowerShell, GPO, partages.
                                    </p>
                                </div>

                                {/* WIN + LINUX */}
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="group rounded-[1.6rem] border border-brand-cyan/20 bg-obsidian-900/70 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-brand-cyan/30 hover:shadow-[0_18px_60px_rgba(34,211,238,0.10)]">
                                        <AccentBadge accent="cyan">Endpoint</AccentBadge>

                                        <div className="mt-4 flex items-center gap-3">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.10),rgba(139,92,246,0.08))] text-brand-cyanSoft shadow-[0_0_16px_rgba(34,211,238,0.18)] transition-all duration-300 group-hover:scale-110">
                                                <Monitor size={20} />
                                            </div>

                                            <h3 className="text-xl font-semibold text-ui-text">
                                                WIN-USER01
                                            </h3>
                                        </div>

                                        <p className="mt-3 text-sm leading-7 text-ui-secondary">
                                            Poste utilisateur joint au domaine pour tester l’authentification,
                                            l’usage et la cohérence côté client.
                                        </p>
                                    </div>

                                    <div className="group rounded-[1.6rem] border border-brand-cyan/20 bg-obsidian-900/70 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-brand-cyan/30 hover:shadow-[0_18px_60px_rgba(34,211,238,0.10)]">
                                        <AccentBadge accent="cyan">Analysis</AccentBadge>

                                        <div className="mt-4 flex items-center gap-3">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.10),rgba(139,92,246,0.08))] text-brand-cyanSoft shadow-[0_0_16px_rgba(34,211,238,0.18)] transition-all duration-300 group-hover:scale-110">
                                                <Shield size={20} />
                                            </div>

                                            <h3 className="text-xl font-semibold text-ui-text">
                                                LINUX-01
                                            </h3>
                                        </div>

                                        <p className="mt-3 text-sm leading-7 text-ui-secondary">
                                            Nœud en construction pour l’analyse réseau, la visibilité
                                            technique et l’évolution future du lab.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            <section className="mt-16">
                <RevealOnScroll>
                    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                        <div>
                            <h2 className="text-2xl font-bold text-ui-text">
                                Lab status
                            </h2>

                            <p className="mt-4 max-w-2xl text-ui-secondary">
                                Aperçu en temps réel de l’état du lab : connectivité, machines actives
                                et progression des configurations en cours.
                            </p>

                            <div className="mt-6 space-y-3">
                                <div className="flex items-center gap-3 text-sm text-ui-secondary">
                                    <span className="h-2 w-2 rounded-full bg-brand-emerald animate-pulse" />
                                    Active Directory opérationnel
                                </div>

                                <div className="flex items-center gap-3 text-sm text-ui-secondary">
                                    <span className="h-2 w-2 rounded-full bg-brand-cyan animate-pulse" />
                                    Endpoint connecté au domaine
                                </div>

                                <div className="flex items-center gap-3 text-sm text-ui-secondary">
                                    <span className="h-2 w-2 rounded-full bg-brand-purple animate-pulse" />
                                    Environnement en évolution continue
                                </div>
                            </div>
                        </div>
                        <LabStatusConsole />
                        <AttackSimulationConsole
                            running={attackRunning}
                            setRunning={setAttackRunning}
                        />
                    </div>
                </RevealOnScroll>
            </section>

            <section className="mt-16 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
                <RevealOnScroll>
                    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-obsidian-900/75 p-8 shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(139,92,246,0.05),rgba(34,211,238,0.03),transparent)]" />

                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold text-ui-text">
                                Architecture / logique du lab
                            </h2>

                            <p className="mt-4 leading-8 text-ui-secondary">
                                Le serveur Active Directory structure la partie identité, le
                                poste utilisateur représente un endpoint classique, Kali sert
                                aux simulations contrôlées, et la VM Linux complète
                                progressivement la partie observation et analyse réseau.
                            </p>

                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <div className="rounded-[1.4rem] border border-white/10 bg-obsidian-900/70 px-4 py-4 backdrop-blur-xl">
                                    <p className="text-sm font-semibold text-ui-text">
                                        AD Server
                                    </p>
                                    <p className="mt-2 text-sm text-ui-secondary">
                                        Domaine / identité / administration
                                    </p>
                                </div>

                                <div className="rounded-[1.4rem] border border-white/10 bg-obsidian-900/70 px-4 py-4 backdrop-blur-xl">
                                    <p className="text-sm font-semibold text-ui-text">User VM</p>
                                    <p className="mt-2 text-sm text-ui-secondary">
                                        Usage / authentification / poste client
                                    </p>
                                </div>

                                <div className="rounded-[1.4rem] border border-white/10 bg-obsidian-900/70 px-4 py-4 backdrop-blur-xl">
                                    <p className="text-sm font-semibold text-ui-text">Kali VM</p>
                                    <p className="mt-2 text-sm text-ui-secondary">
                                        Reconnaissance / simulation / tests
                                    </p>
                                </div>

                                <div className="rounded-[1.4rem] border border-white/10 bg-obsidian-900/70 px-4 py-4 backdrop-blur-xl">
                                    <p className="text-sm font-semibold text-ui-text">
                                        Linux VM
                                    </p>
                                    <p className="mt-2 text-sm text-ui-secondary">
                                        Réseau / analyse / évolution future
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll delay={120}>
                    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-obsidian-900/75 p-8 shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.04),rgba(139,92,246,0.03),transparent)]" />

                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold text-ui-text">
                                Ce que je travaille actuellement
                            </h2>

                            <div className="mt-6 space-y-3">
                                {currentFocus.map((item) => (
                                    <div
                                        key={item}
                                        className="flex gap-3 rounded-[1.4rem] border border-white/10 bg-obsidian-900/70 px-4 py-4 backdrop-blur-xl"
                                    >
                                        <span className="mt-2 h-2 w-2 rounded-full bg-brand-cyan shadow-[0_0_10px_rgba(34,211,238,0.7)]" />
                                        <p className="text-ui-secondary leading-7">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            <section className="mt-16">
                <RevealOnScroll>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-ui-text">
                            Focus machine par machine
                        </h2>
                        <p className="mt-3 max-w-3xl text-ui-secondary">
                            Chaque VM a un rôle précis dans le lab, avec un objectif
                            pédagogique clair et une place dans la progression globale de
                            l’environnement.
                        </p>
                    </div>
                </RevealOnScroll>

                <div className="grid gap-6 lg:grid-cols-2">
                    {machineDetails.map((item, index) => (
                        <RevealOnScroll key={item.title} delay={index * 80}>
                            <PremiumCard
                                accent={item.accent}
                                title={item.title}
                                subtitle={item.subtitle}
                                description={item.content}
                                icon={item.icon}
                                isAttacking={attackRunning}
                            />
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
                                Évolution prévue
                            </h2>

                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                                {nextSteps.map((step) => (
                                    <div
                                        key={step}
                                        className="flex gap-3 rounded-[1.4rem] border border-white/10 bg-obsidian-900/70 px-4 py-4 backdrop-blur-xl"
                                    >
                                        <span className="mt-2 h-2 w-2 rounded-full bg-brand-purple shadow-[0_0_10px_rgba(139,92,246,0.7)]" />
                                        <p className="text-ui-secondary leading-7">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            <section className="mt-16">
                <RevealOnScroll>
                    <div className="relative overflow-hidden rounded-[2rem] border border-brand-purple/20 bg-gradient-to-br from-surface-2 to-obsidian-900 p-8">
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(139,92,246,0.05),rgba(34,211,238,0.03),transparent)]" />

                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold text-ui-text">
                                Pourquoi ce mini lab compte
                            </h2>

                            <p className="mt-4 max-w-4xl leading-8 text-ui-secondary">
                                Ce mini lab IT n’est pas une vitrine figée. C’est un
                                environnement personnel en construction, pensé pour apprendre,
                                tester, observer et structurer une progression plus concrète
                                autour de l’administration, du réseau et de la cybersécurité.
                            </p>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>
        </div>
    );
}