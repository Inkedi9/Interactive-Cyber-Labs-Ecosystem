import RevealOnScroll from "../components/ui/RevealOnScroll";
import { useEffect, useState } from "react";
import {
    Server,
    Shield,
    Globe,
    Activity,
    House,
    Bell,
    Zap,
    FolderOpen,
    Lock,
} from "lucide-react";

const services = [
    {
        name: "Portainer",
        role: "Gestion Docker UI",
        accent: "red",
        icon: Server,
        status: "ACTIVE",
        description:
            "Interface web pour gérer conteneurs, images et volumes Docker depuis le navigateur.",
    },
    {
        name: "Pi-hole",
        role: "DNS + blocage pub réseau",
        accent: "cyan",
        icon: Shield,
        status: "ACTIVE",
        description:
            "DNS local avec blocage de publicités et trackers à l'échelle du réseau entier.",
    },
    {
        name: "Nginx Proxy Manager",
        role: "Reverse proxy avec SSL",
        accent: "cyan",
        icon: Globe,
        status: "ACTIVE",
        description:
            "Reverse proxy avec gestion SSL automatique pour exposer les services en local.",
    },
    {
        name: "Uptime Kuma",
        role: "Monitoring services",
        accent: "emerald",
        icon: Activity,
        status: "ACTIVE",
        description:
            "Dashboard de monitoring pour surveiller la disponibilité de chaque service en temps réel.",
    },
    {
        name: "Homer",
        role: "Dashboard de démarrage",
        accent: "cyan",
        icon: House,
        status: "ACTIVE",
        description:
            "Page d'accueil centralisée pour accéder à tous les services du homelab en un clic.",
    },
    {
        name: "DIUN",
        role: "Alertes images Docker",
        accent: "red",
        icon: Bell,
        status: "ACTIVE",
        description:
            "Surveillance des images Docker et notifications automatiques lors de nouvelles versions.",
    },
    {
        name: "Ollama",
        role: "Runtime LLM local (GTX 1060)",
        accent: "emerald",
        icon: Zap,
        status: "ACTIVE",
        description:
            "Moteur d'inférence LLM local sur GPU. Socle d'exécution pour JARVINx et Inkora.",
    },
    {
        name: "Filebrowser",
        role: "Gestionnaire de fichiers web",
        accent: "cyan",
        icon: FolderOpen,
        status: "ACTIVE",
        description:
            "Interface web pour parcourir, uploader et gérer les fichiers du homelab depuis le navigateur.",
    },
    {
        name: "Vaultwarden",
        role: "Gestionnaire de mots de passe",
        accent: "red",
        icon: Lock,
        status: "ACTIVE",
        description:
            "Implémentation self-hosted de Bitwarden. Stockage chiffré des credentials, accessible via extension navigateur.",
    },
];

const stack = ["Docker", "Linux Mint", "Nginx", "DNS", "Self-hosted"];

const consoleLogs = [
    "[OK] Portainer running (port 9000)",
    "[OK] Pi-hole active — DNS filtering on",
    "[OK] Nginx Proxy Manager up",
    "[OK] Uptime Kuma monitoring 7 services",
    "[OK] Homer dashboard ready",
    "[OK] DIUN watching image updates",
    "[OK] Ollama loaded — GPU: GTX 1060",
    "[OK] Filebrowser running (files.home)",
    "[OK] Vaultwarden vault online",
];

const badgeBase =
    "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.15em] backdrop-blur-xl";

function AccentBadge({ accent = "red", children }) {
    const styles = {
        red: "border-brand-red/25 bg-brand-red/10 text-brand-redSoft",
        cyan: "border-brand-cyan/25 bg-brand-cyan/10 text-brand-cyanSoft",
        emerald: "border-brand-emerald/25 bg-brand-emerald/10 text-brand-emeraldSoft",
    };
    return (
        <span className={`${badgeBase} ${styles[accent]}`}>{children}</span>
    );
}

function ServiceCard({ service }) {
    const hoverStyles = {
        red: "hover:border-brand-red/25 hover:shadow-[0_18px_60px_rgba(230,57,70,0.12)]",
        cyan: "hover:border-brand-cyan/25 hover:shadow-[0_18px_60px_rgba(34,211,238,0.10)]",
        emerald: "hover:border-brand-emerald/25 hover:shadow-[0_18px_60px_rgba(16,185,129,0.10)]",
    };

    const Icon = service.icon;

    return (
        <div
            className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-obsidian-900/75 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 ${hoverStyles[service.accent]}`}
        >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(230,57,70,0.04),rgba(34,211,238,0.03),transparent)]" />

            <div className="relative z-10 flex flex-1 flex-col">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <AccentBadge accent={service.accent}>{service.role}</AccentBadge>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-emerald/25 bg-brand-emerald/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-brand-emeraldSoft backdrop-blur-xl">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-emerald animate-pulse" />
                        {service.status}
                    </span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                    {Icon && (
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.10),rgba(230,57,70,0.10))] text-brand-cyanSoft shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300 group-hover:scale-110">
                            <Icon size={18} />
                        </div>
                    )}
                    <h3 className="text-lg font-semibold text-ui-text">{service.name}</h3>
                </div>

                <p className="mt-3 flex-1 text-sm leading-7 text-ui-secondary">{service.description}</p>
            </div>
        </div>
    );
}

export default function Homelab() {
    const [liveLogs, setLiveLogs] = useState(consoleLogs.slice(0, 5));
    const [pulse, setPulse] = useState(false);

    useEffect(() => {
        let index = 5;

        const interval = setInterval(() => {
            setLiveLogs((prev) => [...prev.slice(-6), consoleLogs[index % consoleLogs.length]]);
            setPulse(true);
            setTimeout(() => setPulse(false), 300);
            index += 1;
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-8 lg:pt-36">

            {/* HERO */}
            <RevealOnScroll>
                <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                    <div>
                        <span className="inline-block rounded-full border border-brand-red/30 bg-brand-red/10 px-4 py-1 text-xs uppercase tracking-[0.25em] text-brand-redSoft">
                            Infrastructure Lab
                        </span>

                        <h1 className="mt-5 text-4xl font-black text-ui-text md:text-6xl">
                            Homelab
                        </h1>

                        <p className="mt-3 text-xl font-medium text-ui-secondary">
                            Infrastructure self-hosted locale — Docker sur Linux Mint
                        </p>

                        <p className="mt-4 max-w-3xl text-lg leading-8 text-ui-secondary">
                            Mon homelab tourne sur un laptop Linux Mint avec Docker géré via Portainer.
                            Objectif : auto-héberger mes services, expérimenter, et servir de socle à JARVINx.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                            <a
                                href="/projects"
                                className="inline-flex items-center justify-center rounded-[1.4rem] border border-brand-red/30 bg-brand-red/15 px-6 py-4 text-sm font-semibold text-brand-redSoft backdrop-blur-2xl transition-all duration-300 hover:border-brand-red/40 hover:bg-brand-red/20 hover:text-white hover:shadow-glow-red"
                            >
                                Explorer mes projets
                            </a>

                            <a
                                href="/changelog"
                                className="inline-flex items-center justify-center rounded-[1.4rem] border border-white/10 bg-obsidian-900/80 px-6 py-4 text-sm font-semibold text-ui-text backdrop-blur-2xl transition-all duration-300 hover:border-brand-cyan/30 hover:text-white hover:shadow-glow-cyan"
                            >
                                Voir le Build Log
                            </a>
                        </div>
                    </div>

                    {/* CONSOLE */}
                    <div className="relative overflow-hidden rounded-[2rem] border border-brand-red/20 bg-obsidian-950 text-ui-text shadow-redGlow backdrop-blur-xl">
                        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
                            <span className="h-3 w-3 rounded-full bg-rose-400" />
                            <span className="h-3 w-3 rounded-full bg-amber-400" />
                            <span className="h-3 w-3 rounded-full bg-brand-emeraldSoft" />
                            <span className="ml-3 font-mono text-xs text-ui-muted">homelab.status</span>
                            <span
                                className={`ml-auto h-2.5 w-2.5 rounded-full bg-brand-emerald transition ${pulse ? "shadow-[0_0_14px_rgba(16,185,129,0.9)]" : ""}`}
                            />
                        </div>

                        <div className="space-y-3 p-5 font-mono text-sm">
                            <p className="text-brand-emeraldSoft">
                                root@inkedi:~$ docker ps --format "status"
                            </p>
                            {liveLogs.map((log, index) => (
                                <p key={`${log}-${index}`} className="text-brand-cyanSoft">
                                    {log}
                                </p>
                            ))}
                            <p className="pt-2 text-brand-redSoft">
                                Status: 9/9 services running.
                            </p>
                        </div>
                    </div>
                </div>
            </RevealOnScroll>

            {/* SERVICES */}
            <section className="mt-16">
                <RevealOnScroll>
                    <div className="mb-8">
                        <span className={`${badgeBase} border-brand-red/20 bg-brand-red/10 text-brand-redSoft`}>
                            Services actifs
                        </span>
                        <h2 className="mt-4 text-2xl font-bold text-ui-text">
                            9 services déployés
                        </h2>
                        <p className="mt-3 max-w-3xl text-ui-secondary">
                            Chaque service a un rôle précis dans l'infrastructure. L'ensemble est orchestré
                            via Docker Compose et exposé derrière Nginx Proxy Manager.
                        </p>
                    </div>
                </RevealOnScroll>

                <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                    {services.map((service, index) => (
                        <RevealOnScroll key={service.name} delay={index * 70}>
                            <ServiceCard service={service} />
                        </RevealOnScroll>
                    ))}
                </div>
            </section>

            {/* ARCHITECTURE & STACK */}
            <section className="mt-16">

                {/* BLOC 1 — Infrastructure Overview */}
                <RevealOnScroll>
                    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-obsidian-900/75 p-8 shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.04),rgba(230,57,70,0.03),transparent)]" />

                        <div className="relative z-10">
                            <div className="mb-6 flex flex-wrap items-center gap-3">
                                <AccentBadge accent="cyan">Live Stack</AccentBadge>
                                <h2 className="text-2xl font-bold text-ui-text">Infrastructure Overview</h2>
                            </div>

                            <div className="font-mono text-sm">

                                {/* Accès distant */}
                                <div className="flex justify-center">
                                    <div className="rounded-[1.2rem] border border-brand-cyan/25 bg-obsidian-950 px-6 py-3 text-center">
                                        <p className="text-[10px] uppercase tracking-[0.18em] text-ui-muted mb-1">Accès distant</p>
                                        <p className="text-brand-cyanSoft font-semibold">Tailscale VPN</p>
                                    </div>
                                </div>

                                <div className="flex justify-center my-2 text-ui-muted/40 select-none">↓</div>

                                {/* Réseau local — Nginx PM */}
                                <div className="flex justify-center">
                                    <div className="rounded-[1.2rem] border border-brand-red/25 bg-obsidian-950 px-6 py-3 text-center w-full max-w-sm">
                                        <p className="text-[10px] uppercase tracking-[0.18em] text-ui-muted mb-1">Réseau local — Linux Mint</p>
                                        <p className="text-brand-redSoft font-semibold">Nginx Proxy Manager</p>
                                        <p className="text-ui-muted text-xs mt-1">*.home routing</p>
                                    </div>
                                </div>

                                <div className="flex justify-center my-2 text-ui-muted/40 select-none">↓</div>

                                {/* Services grid */}
                                <div className="rounded-[1.2rem] border border-white/10 bg-obsidian-950 p-4">
                                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                        {[
                                            { name: "Homer", url: "home.home" },
                                            { name: "Pi-hole", url: "DNS" },
                                            { name: "Portainer", url: "portainer.home" },
                                            { name: "Uptime Kuma", url: "status.home" },
                                            { name: "Filebrowser", url: "files.home" },
                                            { name: "DIUN", url: "updates" },
                                        ].map((svc) => (
                                            <div key={svc.name} className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-obsidian-900/60 px-3 py-2">
                                                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-emerald shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                                                <span className="text-ui-text text-xs">{svc.name}</span>
                                                <span className="ml-auto text-ui-muted text-[10px]">{svc.url}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-center my-2 text-ui-muted/40 select-none">↓</div>

                                {/* Ollama */}
                                <div className="flex justify-center">
                                    <div className="rounded-[1.2rem] border border-brand-emerald/25 bg-obsidian-950 px-6 py-3 text-center">
                                        <p className="text-brand-emeraldSoft font-semibold">Ollama</p>
                                        <p className="text-ui-muted text-xs mt-1">localhost:11434</p>
                                        <div className="mt-2 flex flex-wrap justify-center gap-2">
                                            {["llama3.1:8b", "qwen2.5:7b", "dolphin-mistral:7b"].map((model) => (
                                                <span key={model} className="rounded-full border border-brand-emerald/20 bg-brand-emerald/5 px-2.5 py-0.5 text-[10px] text-brand-emeraldSoft">
                                                    {model}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </RevealOnScroll>

                {/* BLOCS 2 + 3 */}
                <div className="mt-8 grid gap-8 lg:grid-cols-2">

                    {/* BLOC 2 — JARVINx Agents */}
                    <RevealOnScroll delay={70}>
                        <div className="relative overflow-hidden rounded-[2rem] border border-brand-emerald/20 bg-obsidian-950 shadow-[0_0_40px_rgba(16,185,129,0.08)] backdrop-blur-xl h-full">
                            <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
                                <span className="h-3 w-3 rounded-full bg-rose-400" />
                                <span className="h-3 w-3 rounded-full bg-amber-400" />
                                <span className="h-3 w-3 rounded-full bg-brand-emeraldSoft" />
                                <span className="ml-3 font-mono text-xs text-ui-muted">jarvinx.agents</span>
                                <span className="ml-auto">
                                    <AccentBadge accent="emerald">Runtime vdev</AccentBadge>
                                </span>
                            </div>

                            <div className="p-6">
                                <h2 className="text-xl font-bold text-ui-text">JARVINx Agents</h2>

                                <div className="mt-5 space-y-2 font-mono text-sm">
                                    {[
                                        { name: "system", schedule: "15s", cls: "SystemAgent" },
                                        { name: "alert",  schedule: "15s", cls: "AlertAgent" },
                                        { name: "docker", schedule: "30s", cls: "DockerAgent" },
                                        { name: "file",   schedule: "5m",  cls: "FileAgent" },
                                        { name: "qdrant", schedule: "15s", cls: "QdrantAgent" },
                                    ].map((agent) => (
                                        <div key={agent.name} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-obsidian-900/60 px-4 py-2.5">
                                            <span className="h-2 w-2 flex-shrink-0 rounded-full bg-brand-emerald animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                                            <span className="text-brand-cyanSoft w-14">{agent.name}</span>
                                            <span className="text-ui-muted text-xs w-8">{agent.schedule}</span>
                                            <span className="ml-auto text-brand-redSoft text-xs">[ {agent.cls} ]</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 rounded-xl border border-white/[0.06] bg-obsidian-900/60 px-4 py-3 font-mono text-xs">
                                    <p className="text-[10px] uppercase tracking-[0.15em] text-ui-muted mb-2">Seuils monitoring</p>
                                    <div className="flex flex-wrap gap-2">
                                        {["CPU 75%", "RAM 90%", "Disk 85%"].map((t) => (
                                            <span key={t} className="rounded-full border border-amber-400/20 bg-amber-400/5 px-2.5 py-1 text-amber-300">{t}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-3 rounded-xl border border-white/[0.06] bg-obsidian-900/60 px-4 py-3 font-mono text-xs">
                                    <p className="text-[10px] uppercase tracking-[0.15em] text-ui-muted mb-2">Notifiers</p>
                                    <div className="flex flex-wrap gap-2">
                                        {["discord", "ntfy"].map((n) => (
                                            <span key={n} className="rounded-full border border-brand-cyan/20 bg-brand-cyan/5 px-2.5 py-1 text-brand-cyanSoft">{n}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* BLOC 3 — Hardware */}
                    <RevealOnScroll delay={140}>
                        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-obsidian-900/75 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl h-full">
                            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(230,57,70,0.04),rgba(34,211,238,0.03),transparent)]" />

                            <div className="relative z-10">
                                <div className="mb-5 flex flex-wrap items-center gap-2">
                                    <AccentBadge accent="cyan">Current</AccentBadge>
                                    <AccentBadge accent="red">Migration → ThinkCentre m920q</AccentBadge>
                                </div>

                                <h2 className="text-xl font-bold text-ui-text">Hardware</h2>

                                <div className="mt-5 space-y-3">
                                    {[
                                        { label: "Machine actuelle", value: "Laptop Linux Mint", color: "text-brand-cyanSoft" },
                                        { label: "GPU", value: "NVIDIA GTX 1060 — Ollama inference", color: "text-brand-emeraldSoft" },
                                        { label: "Seuils JARVINx", value: "CPU 75% · RAM 90% · Disk 85%", color: "text-amber-300" },
                                        { label: "Réseau local", value: "domaine *.home via Nginx PM", color: "text-brand-cyanSoft" },
                                        { label: "Accès distant", value: "Tailscale VPN", color: "text-brand-cyanSoft" },
                                    ].map((item) => (
                                        <div key={item.label} className="flex flex-col gap-1 rounded-[1.2rem] border border-white/[0.06] bg-obsidian-950/60 px-4 py-3 backdrop-blur-xl">
                                            <span className="text-[10px] uppercase tracking-[0.18em] text-ui-muted">{item.label}</span>
                                            <span className={`font-mono text-sm ${item.color}`}>{item.value}</span>
                                        </div>
                                    ))}

                                    <div className="flex flex-col gap-1 rounded-[1.2rem] border border-brand-red/20 bg-brand-red/5 px-4 py-3 backdrop-blur-xl">
                                        <span className="text-[10px] uppercase tracking-[0.18em] text-ui-muted">Next</span>
                                        <span className="font-mono text-sm text-brand-redSoft">Migration ThinkCentre m920q → Proxmox LXC/VM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>

                </div>
            </section>

            {/* STACK + WHY */}
            <section className="mt-16 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
                <RevealOnScroll>
                    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-obsidian-900/75 p-8 shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(230,57,70,0.04),rgba(34,211,238,0.03),transparent)]" />

                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold text-ui-text">Stack technique</h2>

                            <p className="mt-4 leading-8 text-ui-secondary">
                                Un environnement entièrement self-hosted, sans cloud, pensé pour
                                l'expérimentation et la fiabilité locale.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3">
                                {stack.map((item) => (
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
                </RevealOnScroll>

                <RevealOnScroll delay={120}>
                    <div className="relative overflow-hidden rounded-[2rem] border border-brand-red/20 bg-gradient-to-br from-surface-2 to-obsidian-900 p-8">
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(230,57,70,0.05),rgba(34,211,238,0.03),transparent)]" />

                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold text-ui-text">
                                Pourquoi ce homelab
                            </h2>

                            <p className="mt-4 leading-8 text-ui-secondary">
                                Le homelab est le socle de tout le reste : il fait tourner Ollama pour
                                JARVINx et Inkora, héberge mes outils de monitoring, et me permet
                                d'expérimenter sans dépendre d'un cloud externe. C'est un environnement
                                vivant, en évolution constante.
                            </p>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>
        </div>
    );
}
