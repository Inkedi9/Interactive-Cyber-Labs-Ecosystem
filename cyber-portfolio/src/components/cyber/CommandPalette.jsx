import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    House,
    FolderKanban,
    FileUser,
    ShieldAlert,
    FlaskConical,
    ScrollText,
    Code2,
    Mail,
    TerminalSquare,
    CircleHelp,
    Activity,
    Eraser,
} from "lucide-react";

const commands = [
    {
        id: "home",
        group: "Navigation",
        label: "Accueil",
        command: "accueil",
        description: "Retour à la page d’accueil du portfolio.",
        icon: House,
        keywords: ["home", "accueil", "open home", "go home"],
        action: ({ navigate, close }) => {
            navigate("/");
            close();
        },
    },
    {
        id: "projects",
        group: "Navigation",
        label: "Projets",
        command: "projects",
        description: "Voir l’index complet des projets cyber.",
        icon: FolderKanban,
        keywords: ["projects", "projets", "open projects", "go projects"],
        action: ({ navigate, close }) => {
            navigate("/projects");
            close();
        },
    },
    {
        id: "cv",
        group: "Navigation",
        label: "CV / Compétences",
        command: "cv",
        description: "Consulter le profil, les compétences et les labs.",
        icon: FileUser,
        keywords: ["cv", "resume", "competences", "open cv", "go cv"],
        action: ({ navigate, close }) => {
            navigate("/cv");
            close();
        },
    },
    {
        id: "purple",
        group: "Cyber demos",
        label: "Purple Team Lab",
        command: "purple",
        description: "Ouvrir le projet vitrine Purple Team Lab.",
        icon: FlaskConical,
        keywords: ["purple", "purple team", "purple lab", "open purple", "launch purple"],
        action: ({ navigate, close }) => {
            navigate("/projects/purple-team-lab");
            close();
        },
    },
    {
        id: "siem",
        group: "Cyber demos",
        label: "SIEM Live",
        command: "siem",
        description: "Lancer la démo dashboard SOC / SIEM.",
        icon: ShieldAlert,
        keywords: ["siem", "siem live", "open siem", "launch siem"],
        action: ({ navigate, close }) => {
            navigate("/siem-live");
            close();
        },
    },
    {
        id: "changelog",
        group: "Navigation",
        label: "Build Log",
        command: "changelog",
        description: "Voir l’évolution continue du portfolio.",
        icon: ScrollText,
        keywords: ["changelog", "build log", "log", "open changelog"],
        action: ({ navigate, close }) => {
            navigate("/changelog");
            close();
        },
    },
    {
        id: "github",
        group: "External",
        label: "GitHub",
        command: "github",
        description: "Explorer le dépôt GitHub et les repos liés.",
        icon: Code2,
        keywords: ["github", "open github"],
        action: ({ close }) => {
            window.open("https://github.com/Inkedi9", "_blank", "noopener,noreferrer");
            close();
        },
    },
    {
        id: "contact",
        group: "External",
        label: "Contact",
        command: "contact",
        description: "Me contacter par email.",
        icon: Mail,
        keywords: ["contact", "mail", "email", "open contact"],
        action: ({ close }) => {
            window.location.href = "mailto:kevin.belot@gmail.com";
            close();
        },
    },
    {
        id: "whoami",
        group: "Terminal",
        label: "whoami",
        command: "whoami",
        description: "Afficher le profil terminal.",
        icon: TerminalSquare,
        keywords: ["whoami"],
        terminalResponse: [
            "cyber portfolio builder",
            "SOC / Blue Team / Purple Team oriented",
            "focused on practical demos and premium cyber UI",
        ],
    },
    {
        id: "help",
        group: "Terminal",
        label: "help",
        command: "help",
        description: "Afficher les commandes disponibles.",
        icon: CircleHelp,
        keywords: ["help", "commands", "aide"],
        terminalResponse: [
            "available commands:",
            "accueil, projects, cv, purple, siem, changelog, github, contact",
            "whoami, help, status, clear",
        ],
    },
    {
        id: "status",
        group: "Terminal",
        label: "status",
        command: "status",
        description: "Afficher l’état du portfolio.",
        icon: Activity,
        keywords: ["status", "system status"],
        terminalResponse: [
            "portfolio status: online",
            "build log: active",
            "current focus: command palette v2",
            "theme: obsidian / purple / cyan",
        ],
    },
    {
        id: "sudo",
        group: "Terminal",
        label: "sudo",
        command: "sudo",
        description: "Attempt privileged access.",
        icon: ShieldAlert,
        keywords: ["sudo"],
        terminalResponse: [
            "permission denied.",
            "this action has been logged.",
            "nice try 😏",
        ],
    },
    {
        id: "scan",
        group: "Terminal",
        label: "scan",
        command: "scan",
        description: "Simulate network scan.",
        icon: Activity,
        keywords: ["scan", "network scan"],
        terminalResponse: [
            "scanning network...",
            "hosts discovered: 4",
            "open ports: 22, 80, 443",
            "status: simulation mode",
        ],
    },
    {
        id: "secret",
        group: "Terminal",
        label: "secret",
        command: "secret",
        description: "Access hidden layer.",
        icon: TerminalSquare,
        keywords: ["secret", "hidden"],
        action: ({ close }) => {
            window.dispatchEvent(new Event("open-root-console"));
            close();
        },
    },
    {
        id: "exploit",
        group: "Terminal",
        label: "exploit",
        command: "exploit",
        description: "Launch controlled exploit simulation.",
        icon: TerminalSquare,
        keywords: ["exploit", "simulate", "breach"],
        action: ({ close }) => {
            window.dispatchEvent(new Event("open-fake-exploit"));
            close();
        },
    },
    {
        id: "clear",
        group: "Terminal",
        label: "clear",
        command: "clear",
        description: "Effacer la sortie terminal.",
        icon: Eraser,
        keywords: ["clear", "reset"],
        terminalResponse: [],
        clearOutput: true,
    },
];

function normalize(value) {
    return value.toLowerCase().trim();
}

function highlightMatch(text, query) {
    const q = normalize(query);
    if (!q) return text;

    const lowerText = text.toLowerCase();
    const index = lowerText.indexOf(q);

    if (index === -1) return text;

    const before = text.slice(0, index);
    const match = text.slice(index, index + q.length);
    const after = text.slice(index + q.length);

    return (
        <>
            {before}
            <span className="text-brand-cyanSoft">{match}</span>
            {after}
        </>
    );
}

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [terminalOutput, setTerminalOutput] = useState([]);

    const navigate = useNavigate();
    const inputRef = useRef(null);
    const panelRef = useRef(null);

    const filteredCommands = useMemo(() => {
        const q = normalize(query);

        if (!q) return commands;

        return commands.filter((item) => {
            return (
                item.keywords.some((keyword) => keyword.includes(q)) ||
                item.label.toLowerCase().includes(q) ||
                item.command.toLowerCase().includes(q)
            );
        });
    }, [query]);

    const groupedCommands = useMemo(() => {
        const groups = {};
        for (const command of filteredCommands) {
            if (!groups[command.group]) groups[command.group] = [];
            groups[command.group].push(command);
        }
        return groups;
    }, [filteredCommands]);

    function closePalette() {
        setIsOpen(false);
        setQuery("");
        setSelectedIndex(0);
    }

    function openPalette() {
        setIsOpen(true);
    }

    function runCommand(commandItem) {
        if (!commandItem) return;

        if (commandItem.clearOutput) {
            setTerminalOutput([]);
            setQuery("");
            return;
        }

        if (commandItem.terminalResponse) {
            setTerminalOutput(commandItem.terminalResponse);
            setQuery("");
            return;
        }

        commandItem.action?.({ navigate, close: closePalette });
    }

    const flatCommands = Object.values(groupedCommands).flat();

    useEffect(() => {
        function onKeyDown(e) {
            const isShortcut = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";

            if (isShortcut) {
                e.preventDefault();
                setIsOpen((prev) => !prev);
                return;
            }

            if (!isOpen) return;

            if (e.key === "Escape") {
                e.preventDefault();
                closePalette();
                return;
            }

            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1 >= flatCommands.length ? 0 : prev + 1));
            }

            if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 < 0 ? Math.max(flatCommands.length - 1, 0) : prev - 1));
            }

            if (e.key === "Enter") {
                e.preventDefault();
                if (flatCommands[selectedIndex]) {
                    runCommand(flatCommands[selectedIndex]);
                }
            }
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isOpen, flatCommands, selectedIndex]);

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 10);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    useEffect(() => {
        function onMouseDown(e) {
            if (!isOpen) return;
            if (panelRef.current && !panelRef.current.contains(e.target)) {
                closePalette();
            }
        }

        document.addEventListener("mousedown", onMouseDown);
        return () => document.removeEventListener("mousedown", onMouseDown);
    }, [isOpen]);

    let runningIndex = -1;

    return (
        <>
            <button
                type="button"
                onClick={openPalette}
                className="group fixed right-8 top-24 z-[90] inline-flex items-center gap-4 rounded-[1.8rem] border border-white/10 bg-obsidian-900/85 px-5 py-4 text-sm font-semibold text-ui-secondary shadow-[0_16px_50px_rgba(0,0,0,0.34)] backdrop-blur-2xl transition-all duration-300 hover:border-brand-cyan/30 hover:text-white hover:shadow-glow-cyan"
            >
                <span className="pointer-events-none absolute inset-0 rounded-[1.8rem] bg-[linear-gradient(135deg,rgba(139,92,246,0.08),rgba(34,211,238,0.05),transparent)]" />

                <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.14),rgba(139,92,246,0.14))] font-mono text-white shadow-glow-cyan transition-all duration-300 group-hover:shadow-glow-purple">
                    CMD
                </span>

                <div className="relative z-10 flex flex-col items-start leading-none">
                    <span className="text-base font-semibold text-ui-text">Command</span>
                    <span className="mt-1 font-mono text-[11px] text-ui-muted">
                        root@inkedi:~$
                    </span>
                </div>

                <span className="relative z-10 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-ui-muted">
                    Ctrl K
                </span>
            </button>

            <div
                className={`fixed inset-0 z-[120] transition-all duration-300 ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                    }`}
            >
                <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

                <div className="absolute inset-0 flex items-start justify-center px-4 pt-28 sm:pt-32">
                    <div
                        ref={panelRef}
                        className={`relative w-full max-w-4xl overflow-hidden rounded-[2.2rem] border border-white/10 bg-obsidian-950/92 shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition-all duration-300 ${isOpen ? "translate-y-0 scale-100" : "-translate-y-3 scale-[0.98]"
                            }`}
                    >
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(139,92,246,0.14),_rgba(34,211,238,0.08),_transparent_45%)]" />

                        <div className="relative border-b border-white/10 px-5 py-4">
                            <div className="mb-3 flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-rose-400" />
                                <span className="h-3 w-3 rounded-full bg-amber-400" />
                                <span className="h-3 w-3 rounded-full bg-brand-emeraldSoft" />
                                <span className="ml-3 text-xs text-ui-muted">command.palette</span>
                            </div>

                            <div className="flex items-center gap-3 rounded-[1.6rem] border border-white/10 bg-obsidian-900/75 px-5 py-4 backdrop-blur-xl">
                                <span className="font-mono text-brand-emeraldSoft whitespace-nowrap">
                                    root@inkedi:~$
                                </span>

                                <input
                                    ref={inputRef}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="accueil, projects, siem, cv, changelog"
                                    className="w-full bg-transparent font-mono text-base text-ui-text outline-none placeholder:text-ui-muted"
                                />
                            </div>
                        </div>

                        {(terminalOutput.length > 0 || query) && (
                            <div className="border-b border-white/10 px-5 py-4">
                                <div className="rounded-[1.4rem] border border-white/10 bg-obsidian-900/70 px-4 py-4 font-mono text-sm backdrop-blur-xl">
                                    {query && (
                                        <p className="text-brand-emeraldSoft">
                                            root@inkedi:~$ <span className="text-ui-text">{query}</span>
                                        </p>
                                    )}

                                    {terminalOutput.map((line) => (
                                        <p key={line} className="mt-2 text-brand-cyanSoft">
                                            &gt; {line}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="relative max-h-[520px] overflow-y-auto no-scrollbar p-5">
                            <div className="space-y-6">
                                {Object.entries(groupedCommands).map(([groupName, items]) => (
                                    <div key={groupName}>
                                        <div className="mb-3 flex flex-wrap gap-2 px-1">
                                            <span className="rounded-full border border-brand-purple/20 bg-brand-purple/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-brand-purpleSoft">
                                                {groupName}
                                            </span>
                                        </div>

                                        <div className="space-y-2">
                                            {items.map((item) => {
                                                runningIndex += 1;
                                                const isSelected = runningIndex === selectedIndex;
                                                const Icon = item.icon;

                                                return (
                                                    <button
                                                        key={item.id}
                                                        type="button"
                                                        onClick={() => runCommand(item)}
                                                        className={`flex w-full items-center justify-between rounded-[1.6rem] border px-5 py-4 text-left backdrop-blur-xl transition-all duration-200 ${isSelected
                                                            ? "translate-x-1 border-brand-purple/25 bg-brand-purple/10 text-white shadow-glow-purple"
                                                            : "border-white/10 bg-obsidian-900/70 text-ui-secondary hover:border-brand-cyan/20 hover:text-white hover:shadow-glow-cyan"
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div
                                                                className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 ${isSelected
                                                                    ? "bg-brand-purple/20 text-brand-purpleSoft shadow-glow-purple"
                                                                    : "bg-obsidian-900 text-brand-cyanSoft shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                                                                    }`}
                                                            >
                                                                {Icon && <Icon size={22} strokeWidth={1.8} />}
                                                            </div>

                                                            <div>
                                                                <p className="text-lg font-semibold">
                                                                    {highlightMatch(item.label, query)}
                                                                </p>
                                                                <p className="mt-1 font-mono text-sm text-ui-muted">
                                                                    /{highlightMatch(item.command, query)}
                                                                </p>
                                                                <p className="mt-1 text-sm text-ui-secondary">
                                                                    {item.description}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <span
                                                            className={`rounded-xl border px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] ${isSelected
                                                                ? "border-brand-cyan/20 bg-brand-cyan/10 text-brand-cyanSoft"
                                                                : "border-white/10 bg-white/[0.02] text-ui-muted"
                                                                }`}
                                                        >
                                                            Run
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}

                                {flatCommands.length === 0 && (
                                    <div className="rounded-[1.6rem] border border-white/10 bg-obsidian-900/70 px-5 py-5 text-sm text-ui-secondary backdrop-blur-xl">
                                        No command found. Try:
                                        <span className="ml-2 font-mono text-brand-cyanSoft">projects</span>,
                                        <span className="ml-2 font-mono text-brand-cyanSoft">siem</span>,
                                        <span className="ml-2 font-mono text-brand-cyanSoft">changelog</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-4 text-xs text-ui-muted">
                            <div className="flex flex-wrap items-center gap-3">
                                <span>↑ ↓ navigate</span>
                                <span>Enter run</span>
                                <span>Esc close</span>
                            </div>

                            <div className="font-mono text-brand-purpleSoft">
                                Inkedi Command Interface
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}