import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    Search,
    X,
    ArrowUpRight,
    LayoutDashboard,
    Filter,
    BarChart3,
    Code2,
    Terminal,
    Crown,
    Binary,
    KeyRound,
    User,
    Activity,
    RotateCcw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Badge from "./Badge";
import WindowDots from "./WindowDots";
import HiddenCommandModal from "./HiddenCommandModal";
import SystemStatusModal from "./SystemStatusModal";
import { useCyberMode } from "../../context/CyberModeContext";

export default function CommandPalette({ labs, onOpenLab }) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [hiddenCommandOpen, setHiddenCommandOpen] = useState(false);
    const [activeHiddenCommand, setActiveHiddenCommand] = useState("/exploit");
    const [statusOpen, setStatusOpen] = useState(false);

    const { resetModes } = useCyberMode();
    const inputRef = useRef(null);
    const navigate = useNavigate();


    const runHiddenCommand = (command) => {
        setActiveHiddenCommand(command);
        setTimeout(() => setHiddenCommandOpen(true), 120);
    };

    const actions = useMemo(
        () => [
            {
                id: "home",
                title: "Go to Platform Home",
                subtitle: "Return to main command center",
                icon: LayoutDashboard,
                type: "Action",
                group: "Actions",
                run: () => navigate("/"),
            },
            {
                id: "labs",
                title: "Jump to Labs",
                subtitle: "Open interactive labs section",
                icon: Code2,
                type: "Action",
                group: "Actions",
                run: () => {
                    navigate("/");
                    setTimeout(
                        () => document.querySelector("#labs")?.scrollIntoView({ behavior: "smooth" }),
                        80
                    );
                },
            },
            {
                id: "filters",
                title: "Jump to Filters",
                subtitle: "Open advanced filter matrix",
                icon: Filter,
                type: "Action",
                group: "Actions",
                run: () => {
                    navigate("/");
                    setTimeout(
                        () => document.querySelector("#filters")?.scrollIntoView({ behavior: "smooth" }),
                        80
                    );
                },
            },
            {
                id: "stats",
                title: "Jump to Metrics",
                subtitle: "Open platform metrics",
                icon: BarChart3,
                type: "Action",
                group: "Actions",
                run: () => {
                    navigate("/");
                    setTimeout(
                        () => document.querySelector("#stats")?.scrollIntoView({ behavior: "smooth" }),
                        80
                    );
                },
            },
            {
                id: "status",
                title: "Open system status",
                subtitle: "Show platform runtime and simulated health",
                command: "/status",
                icon: Activity,
                type: "Hidden",
                group: "Hidden",
                run: () => setTimeout(() => setStatusOpen(true), 120),
            },
            {
                id: "exploit",
                title: "Run exploit simulation",
                subtitle: "Launch harmless portfolio easter egg",
                command: "/exploit",
                icon: Terminal,
                type: "Hidden",
                group: "Hidden",
                run: () => runHiddenCommand("/exploit"),
            },
            {
                id: "root",
                title: "Enter root mode",
                subtitle: "Unlock simulated UI-only root shell",
                command: "/root",
                icon: Crown,
                type: "Hidden",
                group: "Hidden",
                run: () => runHiddenCommand("/root"),
            },
            {
                id: "matrix",
                title: "Activate matrix layer",
                subtitle: "Inject temporary visual matrix overlay",
                command: "/matrix",
                icon: Binary,
                type: "Hidden",
                group: "Hidden",
                run: () => runHiddenCommand("/matrix"),
            },
            {
                id: "sudo-access",
                title: "Request sudo access",
                subtitle: "Approve harmless command center privileges",
                command: "/sudo access",
                icon: KeyRound,
                type: "Hidden",
                group: "Hidden",
                run: () => runHiddenCommand("/sudo access"),
            },
            {
                id: "whoami",
                title: "Resolve operator identity",
                subtitle: "Display hidden platform profile",
                command: "/whoami",
                icon: User,
                type: "Hidden",
                group: "Hidden",
                run: () => runHiddenCommand("/whoami"),
            },
            {
                id: "reset",
                title: "Reset cyber modes",
                subtitle: "Disable root and matrix visual layers",
                command: "/reset",
                icon: RotateCcw,
                type: "Hidden",
                group: "Hidden",
                run: () => {
                    resetModes();
                },
            },
        ],
        [navigate]
    );

    const flatResults = useMemo(() => {
        const q = query.toLowerCase().trim();

        const labResults = labs.map((lab) => ({
            id: `lab-${lab.id}`,
            title: lab.name,
            subtitle: `${lab.type} • ${lab.level} • ${lab.status}`,
            type: "Lab",
            group: "Labs",
            lab,
            icon: Code2,
            run: () => onOpenLab?.(lab),
            page: () => navigate(`/labs/${lab.id}`),
            searchable: [
                lab.name,
                lab.type,
                lab.level,
                lab.status,
                lab.description,
                lab.longDescription,
                lab.problemSolved,
                lab.scenario,
                lab.focus,
                lab.recommendedPath,
                ...(lab.tags || []),
                ...(lab.skillsShown || []),
                ...(lab.workflow || []),
                ...(lab.mitre?.tactics || []),
                ...(lab.mitre?.techniques || []),
            ],
        }));

        const hiddenActions = actions.filter((action) => action.type === "Hidden");
        const normalActions = actions.filter((action) => action.type !== "Hidden");

        const exactHiddenMatch = hiddenActions.find((action) => action.command === q);
        if (exactHiddenMatch) return [exactHiddenMatch];

        const all = [...labResults, ...normalActions];

        if (!q) return all.slice(0, 10);

        return all
            .filter((item) => {
                const text = [
                    item.title,
                    item.subtitle,
                    item.type,
                    item.group,
                    item.command,
                    ...(item.searchable || []),
                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();

                return text.includes(q);
            })
            .slice(0, 12);
    }, [query, labs, actions, navigate, onOpenLab]);

    const groupedResults = useMemo(() => {
        const groups = ["Labs", "Actions", "Hidden"];

        return groups
            .map((group) => ({
                group,
                items: flatResults.filter((item) => item.group === group),
            }))
            .filter((section) => section.items.length > 0);
    }, [flatResults]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [query, open]);

    useEffect(() => {
        const onKeyDown = (event) => {
            const isMac = navigator.platform.toLowerCase().includes("mac");
            const shortcut = isMac
                ? event.metaKey && event.key.toLowerCase() === "k"
                : event.ctrlKey && event.key.toLowerCase() === "k";

            if (shortcut) {
                event.preventDefault();
                setOpen((current) => !current);
            }

            if (!open) return;

            if (event.key === "Escape") {
                event.preventDefault();
                setOpen(false);
            }

            if (event.key === "ArrowDown") {
                event.preventDefault();
                setSelectedIndex((current) =>
                    flatResults.length ? (current + 1) % flatResults.length : 0
                );
            }

            if (event.key === "ArrowUp") {
                event.preventDefault();
                setSelectedIndex((current) =>
                    flatResults.length ? (current - 1 + flatResults.length) % flatResults.length : 0
                );
            }

            if (event.key === "Enter") {
                event.preventDefault();

                const item = flatResults[selectedIndex];
                if (!item) return;

                execute(item, event.shiftKey ? "page" : "preview");
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, flatResults, selectedIndex]);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        if (open) setTimeout(() => inputRef.current?.focus(), 40);

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    const execute = (item, mode = "preview") => {
        setOpen(false);
        setQuery("");

        if (item.lab && mode === "page") {
            item.page();
            return;
        }

        item.run();
    };

    const isSelected = (item) => flatResults[selectedIndex]?.id === item.id;

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-6 left-1/2 z-[90] hidden -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-slate-300 shadow-proSoft backdrop-blur-2xl transition hover:border-emerald-400/20 hover:text-white lg:inline-flex"
            >
                <Search className="h-4 w-4 text-emerald-300" />
                Command
                <span className="rounded-md border border-white/10 bg-black/20 px-2 py-0.5 text-xs text-slate-500">
                    Ctrl K
                </span>
            </button>

            <AnimatePresence>
                {open ? (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                            className="fixed inset-0 z-[100] bg-black/65 backdrop-blur-md"
                        />

                        <div className="fixed inset-0 z-[110] flex items-start justify-center px-3 pt-[12vh]">
                            <motion.div
                                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 18, scale: 0.98 }}
                                transition={{ duration: 0.22 }}
                                className="w-full max-w-2xl overflow-hidden rounded-[32px] border border-white/10 bg-[#050816]/95 shadow-[0_30px_120px_rgba(0,0,0,0.65)] backdrop-blur-3xl"
                            >
                                <div className="border-b border-white/10 p-5">
                                    <div className="mb-4 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <WindowDots />
                                            <div>
                                                <p className="eyebrow-pro">Command Palette</p>
                                                <p className="text-sm text-slate-400">
                                                    Search labs, jump sections, execute hidden commands
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setOpen(false)}
                                            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:text-white"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>

                                    <div className="relative">
                                        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                                        <input
                                            ref={inputRef}
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            placeholder="Search labs, MITRE, skills, sections..."
                                            className="w-full rounded-2xl border border-white/10 bg-black/20 py-4 pl-12 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-400/25"
                                        />
                                    </div>
                                </div>

                                <div className="max-h-[54vh] overflow-y-auto p-3">
                                    {flatResults.length === 0 ? (
                                        <div className="p-8 text-center">
                                            <p className="text-sm font-medium text-white">No command found</p>
                                            <p className="mt-2 text-sm text-slate-400">
                                                Try searching for SOC, OSINT, MITRE, Detection or Simulation.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {groupedResults.map((section) => (
                                                <div key={section.group}>
                                                    <p className="mb-2 px-2 text-[11px] uppercase tracking-[0.24em] text-emerald-300/60">
                                                        {section.group}
                                                    </p>

                                                    <div className="space-y-2">
                                                        {section.items.map((item) => {
                                                            const Icon = item.icon;
                                                            const active = isSelected(item);

                                                            return (
                                                                <div
                                                                    key={item.id}
                                                                    onMouseEnter={() =>
                                                                        setSelectedIndex(flatResults.findIndex((x) => x.id === item.id))
                                                                    }
                                                                    className={`group rounded-2xl border p-3 transition ${active
                                                                        ? "border-emerald-400/30 bg-emerald-400/10 shadow-emeraldGlow"
                                                                        : "border-white/10 bg-white/[0.03] hover:border-emerald-400/20 hover:bg-white/[0.06]"
                                                                        }`}
                                                                >
                                                                    <button
                                                                        onClick={() => execute(item, "preview")}
                                                                        className="flex w-full items-center gap-3 text-left"
                                                                    >
                                                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/15 bg-emerald-400/10">
                                                                            <Icon className="h-5 w-5 text-emerald-300" />
                                                                        </div>

                                                                        <div className="min-w-0 flex-1">
                                                                            <p className="truncate text-sm font-medium text-white">
                                                                                {item.title}
                                                                            </p>
                                                                            <p className="truncate text-xs text-slate-400">
                                                                                {item.command || item.subtitle}
                                                                            </p>
                                                                        </div>

                                                                        <Badge variant={item.type === "Lab" ? "emerald" : "default"}>
                                                                            {item.type}
                                                                        </Badge>
                                                                    </button>

                                                                    {item.lab ? (
                                                                        <div className="mt-3 flex justify-end">
                                                                            <button
                                                                                onClick={() => execute(item, "page")}
                                                                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-slate-300 transition hover:border-emerald-400/20 hover:text-white"
                                                                            >
                                                                                <ArrowUpRight className="h-3.5 w-3.5" />
                                                                                Full page
                                                                            </button>
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-4 text-xs text-slate-500">
                                    <span>↑ ↓ navigate</span>
                                    <span>Enter preview</span>
                                    <span>Shift + Enter full page</span>
                                    <span>Esc close</span>
                                </div>
                            </motion.div>
                        </div>
                    </>
                ) : null}
            </AnimatePresence>

            <HiddenCommandModal
                command={activeHiddenCommand}
                open={hiddenCommandOpen}
                onClose={() => setHiddenCommandOpen(false)}
            />

            <SystemStatusModal open={statusOpen} onClose={() => setStatusOpen(false)} />
        </>
    );
}