import { useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Server,
    Monitor,
    Bug,
    Shield,
    Terminal,
    Activity,
    Network,
    CheckCircle2,
    Clock3,
    Layers3,
    Code2,
} from "lucide-react";
import Layout from "../components/layout/Layout";
import Footer from "../components/sections/Footer";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import WindowDots from "../components/ui/WindowDots";
import CommandPalette from "../components/ui/CommandPalette";
import ScrollToTopButton from "../components/ui/ScrollToTopButton";
import LabPreviewDrawer from "../components/ui/LabPreviewDrawer";
import { labs } from "../data/labs";

const machines = [
    {
        id: "srv-dc",
        name: "SRV_DC",
        role: "AD / Domain",
        label: "Domain Controller",
        icon: Server,
        accent: "violet",
        status: "Operational",
        description:
            "Contrôleur de domaine principal — Active Directory, utilisateurs, scripts PowerShell, GPO et partages.",
    },
    {
        id: "win-user01",
        name: "WIN-USER01",
        role: "Endpoint",
        label: "Joined Endpoint",
        icon: Monitor,
        accent: "cyan",
        status: "Joined",
        description:
            "Poste utilisateur intégré au domaine pour tester l’authentification, les usages et la cohérence côté client.",
    },
    {
        id: "kali-ops",
        name: "KALI-OPS",
        role: "Attack Node",
        label: "Controlled Test Node",
        icon: Bug,
        accent: "emerald",
        status: "Ready",
        description:
            "Machine dédiée aux simulations contrôlées, à la reconnaissance et aux futurs scénarios d’intrusion pédagogiques.",
    },
    {
        id: "linux-01",
        name: "LINUX-01",
        role: "Analysis",
        label: "Network Analysis Node",
        icon: Shield,
        accent: "cyan",
        status: "Building",
        description:
            "Nœud Linux en construction pour l’analyse réseau, l’observation technique et la visibilité progressive du lab.",
    },
];

const currentWork = [
    "Mise en place de la base Active Directory sur SRV_DC",
    "Création d’utilisateurs en masse via scripts PowerShell",
    "Intégration du poste WIN-USER01 au domaine",
    "Création de premières GPO",
    "Mise en place d’un dossier partagé",
    "Préparation de KALI-OPS pour de futurs scénarios contrôlés",
    "Préparation de LINUX-01 pour l’analyse réseau",
];

const roadmap = [
    "Approfondir la structure Active Directory et la gestion des comptes",
    "Étendre les GPO et les scénarios de droits / authentification",
    "Faire évoluer KALI-OPS vers de premiers scénarios de test contrôlés",
    "Renforcer LINUX-01 pour lui donner un rôle concret d’analyse réseau",
    "Documenter les étapes importantes du lab au fil des itérations",
    "Relier progressivement certaines activités à une logique de visibilité et de détection",
];

export default function MiniLabITPage() {
    const [selectedLab, setSelectedLab] = useState(null);

    const miniLab = labs.find((lab) => lab.id === "mini-lab-it");

    return (
        <Layout>
            <section className="pt-8">
                <Link
                    to="/"
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-emerald-400/20 hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to platform
                </Link>

                <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="space-y-7">
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="purple">Infrastructure Lab</Badge>
                            <Badge>Virtual Machines</Badge>
                            <Badge variant="emerald">Lab Evolving</Badge>
                        </div>

                        <div className="space-y-5">
                            <h1 className="text-gradient-pro text-5xl font-semibold tracking-tight sm:text-6xl">
                                Mini Lab IT
                            </h1>

                            <p className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                                Environnement virtualisé personnel conçu pour pratiquer Active Directory,
                                l’administration Windows, les scripts PowerShell, l’intégration d’un poste au
                                domaine, les tests contrôlés via Kali et l’analyse réseau progressive via Linux.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Button href="#topology" icon={Network}>
                                Voir la topologie
                            </Button>
                            <Button href="#status" variant="secondary" icon={Activity}>
                                Lab status
                            </Button>
                        </div>
                    </div>

                    <TerminalPanel
                        title="lab.overview"
                        status="Online"
                        lines={[
                            "root@inkedi:~$ init mini-lab.sh",
                            "[OK] Active Directory initialized (SRV_DC)",
                            "[OK] Endpoint joined (WIN-USER01)",
                            "[OK] Kali node ready (KALI-OPS)",
                            "[DEV] Linux analysis node building (LINUX-01)",
                            "Status: infrastructure evolving.",
                        ]}
                    />
                </div>
            </section>

            <section id="topology" className="space-y-6">
                <div>
                    <p className="eyebrow-pro">Infrastructure Layout</p>
                    <h2 className="mt-3 text-3xl font-semibold text-white">
                        Topologie du lab
                    </h2>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                        Le lab est structuré autour d’un contrôleur de domaine central, d’un endpoint
                        utilisateur intégré à l’environnement, d’un nœud Linux pour l’analyse réseau,
                        et d’une machine Kali volontairement positionnée à part pour représenter une
                        logique de test contrôlé.
                    </p>
                </div>

                <TopologyMap />
            </section>

            <section id="status" className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="space-y-5">
                    <p className="eyebrow-pro">Lab Runtime</p>
                    <h2 className="text-3xl font-semibold text-white">Lab status</h2>
                    <p className="text-sm leading-7 text-slate-400">
                        Aperçu temps réel stylisé de l’état du lab : connectivité, machines actives
                        et progression des configurations en cours.
                    </p>

                    <div className="space-y-3">
                        <StatusItem color="emerald" text="Active Directory opérationnel" />
                        <StatusItem color="cyan" text="Endpoint connecté au domaine" />
                        <StatusItem color="violet" text="Environnement en évolution continue" />
                    </div>
                </div>

                <TerminalPanel
                    title="lab.status"
                    status="Live"
                    lines={[
                        "root@inkedi:~$ check lab status",
                        "[INFO] GPO baseline applied",
                        "[INFO] Shared folder mounted",
                        "[INFO] PowerShell scripts executed",
                        "[OK] Domain controller reachable (SRV_DC)",
                        "[OK] Endpoint authenticated (WIN-USER01)",
                        "[OK] Attack node ready (KALI-OPS)",
                        "Status: lab operational.",
                    ]}
                />
            </section>

            <section className="grid gap-8 lg:grid-cols-2">
                <InfoPanel title="Architecture / logique du lab">
                    <p className="text-sm leading-8 text-slate-300">
                        Le serveur Active Directory structure la partie identité, le poste utilisateur
                        représente un endpoint classique, Kali sert aux simulations contrôlées, et la VM
                        Linux complète progressivement la partie observation et analyse réseau.
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <MiniBox title="AD Server" text="Domaine / identité / administration" />
                        <MiniBox title="User VM" text="Usage / authentification / poste client" />
                        <MiniBox title="Kali VM" text="Reconnaissance / simulation / tests" />
                        <MiniBox title="Linux VM" text="Réseau / analyse / évolution future" />
                    </div>
                </InfoPanel>

                <InfoPanel title="Ce que je travaille actuellement">
                    <div className="space-y-3">
                        {currentWork.map((item) => (
                            <div
                                key={item}
                                className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-4"
                            >
                                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.55)]" />
                                <p className="text-sm leading-6 text-slate-300">{item}</p>
                            </div>
                        ))}
                    </div>
                </InfoPanel>
            </section>

            <section className="space-y-6">
                <div>
                    <p className="eyebrow-pro">Machine Focus</p>
                    <h2 className="mt-3 text-3xl font-semibold text-white">
                        Focus machine par machine
                    </h2>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                        Chaque VM a un rôle précis dans le lab, avec un objectif pédagogique clair
                        et une place dans la progression globale de l’environnement.
                    </p>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                    {machines.map((machine) => (
                        <MachineDetailCard key={machine.id} machine={machine} />
                    ))}
                </div>
            </section>

            <section className="panel-pro p-6">
                <h2 className="text-3xl font-semibold text-white">Évolution prévue</h2>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {roadmap.map((item) => (
                        <div
                            key={item}
                            className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-4"
                        >
                            <Clock3 className="mt-0.5 h-4 w-4 text-violet-300" />
                            <p className="text-sm leading-6 text-slate-300">{item}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="panel-pro p-6">
                <p className="eyebrow-pro">Recruiter Context</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                    Pourquoi ce mini lab compte
                </h2>
                <p className="mt-5 max-w-5xl text-sm leading-8 text-slate-300">
                    Ce mini lab IT n’est pas une vitrine figée. C’est un environnement personnel
                    en construction, pensé pour apprendre, tester, observer et structurer une
                    progression concrète autour de l’administration, du réseau et de la cybersécurité.
                    Il montre une pratique réelle de l’infrastructure en complément des projets web cyber.
                </p>
            </section>

            <Footer />

            <LabPreviewDrawer
                lab={selectedLab}
                labs={labs}
                isOpen={Boolean(selectedLab)}
                onClose={() => setSelectedLab(null)}
                onOpenRelated={setSelectedLab}
            />

            <CommandPalette labs={labs} onOpenLab={setSelectedLab} />
            <ScrollToTopButton />
        </Layout>
    );
}

function TerminalPanel({ title, status, lines }) {
    return (
        <div className="card-pro overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-4">
                    <WindowDots />
                    <p className="font-mono text-xs text-slate-500">{title}</p>
                </div>

                <Badge variant="emerald">{status}</Badge>
            </div>

            <div className="space-y-4 p-5 font-mono text-sm">
                {lines.map((line, index) => (
                    <p
                        key={`${line}-${index}`}
                        className={
                            line.includes("[OK]") || line.includes("root@")
                                ? "text-cyan-300"
                                : line.includes("[DEV]") || line.includes("Status")
                                    ? "text-violet-300"
                                    : "text-slate-400"
                        }
                    >
                        {line}
                    </p>
                ))}
            </div>
        </div>
    );
}

function TopologyMap() {
    return (
        <div className="panel-pro overflow-hidden p-8">
            <div className="relative min-h-[520px]">
                <div className="absolute inset-0 rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_42%)]" />

                <div className="absolute left-1/2 top-8 w-[360px] -translate-x-1/2">
                    <MachineNode machine={machines[0]} />
                </div>

                <div className="absolute bottom-10 left-8 w-[360px]">
                    <MachineNode machine={machines[2]} />
                </div>

                <div className="absolute bottom-10 left-1/2 w-[300px] -translate-x-1/2">
                    <MachineNode machine={machines[1]} />
                </div>

                <div className="absolute bottom-10 right-8 w-[300px]">
                    <MachineNode machine={machines[3]} />
                </div>

                <div className="absolute left-1/2 top-[230px] h-[180px] w-px -translate-x-1/2 bg-cyan-400/30" />
                <div className="absolute bottom-[180px] left-[24%] h-px w-[52%] bg-cyan-400/25" />
                <div className="absolute bottom-[180px] left-[24%] h-[80px] w-px bg-emerald-400/20" />
                <div className="absolute bottom-[180px] right-[24%] h-[80px] w-px bg-cyan-400/20" />
            </div>
        </div>
    );
}

function MachineNode({ machine }) {
    const Icon = machine.icon;

    return (
        <div className="relative rounded-[28px] border border-white/10 bg-black/30 p-6 backdrop-blur-xl">
            <Badge variant={machine.accent === "emerald" ? "emerald" : machine.accent === "violet" ? "purple" : "blue"}>
                {machine.role}
            </Badge>

            <div className="mt-5 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <Icon className="h-5 w-5 text-cyan-300" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-white">{machine.name}</h3>
                    <p className="text-xs text-slate-500">{machine.status}</p>
                </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-400">{machine.description}</p>
        </div>
    );
}

function MachineDetailCard({ machine }) {
    const Icon = machine.icon;

    return (
        <div className="card-pro p-6">
            <Badge variant={machine.accent === "emerald" ? "emerald" : machine.accent === "violet" ? "purple" : "blue"}>
                {machine.label}
            </Badge>

            <div className="mt-5 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <Icon className="h-5 w-5 text-cyan-300" />
                </div>
                <h3 className="text-2xl font-semibold text-white">{machine.name}</h3>
            </div>

            <p className="mt-5 text-sm leading-8 text-slate-300">{machine.description}</p>
        </div>
    );
}

function InfoPanel({ title, children }) {
    return (
        <div className="card-pro p-6">
            <h2 className="text-3xl font-semibold text-white">{title}</h2>
            <div className="mt-5">{children}</div>
        </div>
    );
}

function MiniBox({ title, text }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="font-medium text-white">{title}</p>
            <p className="mt-2 text-sm text-slate-400">{text}</p>
        </div>
    );
}

function StatusItem({ color, text }) {
    const colorClass =
        color === "emerald"
            ? "bg-emerald-400"
            : color === "cyan"
                ? "bg-cyan-400"
                : "bg-violet-400";

    return (
        <div className="flex items-center gap-3 text-sm text-slate-300">
            <span className={`h-2.5 w-2.5 rounded-full ${colorClass}`} />
            {text}
        </div>
    );
}