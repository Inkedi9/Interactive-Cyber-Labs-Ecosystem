import { useEffect, useMemo, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Terminal, ShieldCheck, User, Crown, Binary, KeyRound } from "lucide-react";
import WindowDots from "./WindowDots";
import { useCyberMode } from "../../context/CyberModeContext";

const commandConfig = {
    "/exploit": {
        title: "Exploit Simulation",
        subtitle: "Fake terminal animation — no offensive action executed.",
        icon: Terminal,
        success: "ACCESS GRANTED TO INTERAC. LAB INDEX",
        lines: [
            "[init] Loading simulated exploit chain...",
            "[scan] Enumerating lab modules...",
            "[trace] Mapping cyber simulation surface...",
            "[payload] Injecting harmless UI animation...",
            "[bypass] Skipping real exploitation layer...",
            "[verify] No systems touched. Portfolio-safe mode enabled.",
            "[success] ACCESS GRANTED TO INTERAC. LAB INDEX",
        ],
    },

    "/root": {
        title: "Root Mode",
        subtitle: "Privilege escalation denied safely. UI-only root shell unlocked.",
        icon: Crown,
        success: "ROOT UI MODE ENABLED",
        lines: [
            "[auth] Requesting elevated interface privileges...",
            "[policy] Real system escalation blocked.",
            "[sandbox] Switching to simulated root context...",
            "[audit] No filesystem, network or host access requested.",
            "[grant] UI-only root shell enabled.",
            "[success] ROOT UI MODE ENABLED",
        ],
    },

    "/matrix": {
        title: "Matrix Layer",
        subtitle: "Toggle persistent visual cyber layer.",
        icon: Binary,
        success: "MATRIX VISUAL LAYER TOGGLED",
        lines: [
            "[render] Initializing matrix visual layer...",
            "[stream] Generating synthetic glyph rain...",
            "[sync] Binding overlay to global UI context...",
            "[safe] Cosmetic mode only. No runtime mutation.",
            "[toggle] Matrix layer state updated.",
            "[success] MATRIX VISUAL LAYER TOGGLED",
        ],
    },

    "/sudo access": {
        title: "Sudo Access",
        subtitle: "Authorization sequence for portfolio command center.",
        icon: KeyRound,
        success: "SUDO ACCESS APPROVED",
        lines: [
            "[sudo] Verifying operator intent...",
            "[challenge] Passwordless mode detected.",
            "[policy] Access limited to UI simulation.",
            "[scope] Labs, previews and platform lore available.",
            "[grant] Temporary command center privileges issued.",
            "[success] SUDO ACCESS APPROVED",
        ],
    },

    "/whoami": {
        title: "Operator Identity",
        subtitle: "Profile fingerprint generated from platform context.",
        icon: User,
        success: "OPERATOR PROFILE RESOLVED",
        lines: [
            "[id] whoami",
            "operator: Kevin / cyber-builder",
            "role: Cyber Lab Platform Creator",
            "environment: Interac. Lab Index",
            "stack: React • TailwindCSS • Framer Motion • Vite",
            "domains: SOC • OSINT • Active Directory • Purple Team • Threat Intel",
            "infra: Mini Lab IT with Windows Server, endpoint, Kali and Linux nodes",
            "mission: build recruiter-grade interactive cyber platforms",
            "[success] OPERATOR PROFILE RESOLVED",
        ],
    },
};

export default function HiddenCommandModal({ command, open, onClose }) {
    const [visibleLines, setVisibleLines] = useState([]);
    const { enableRootMode, toggleMatrixMode, setCommand } = useCyberMode();
    const commandExecutedRef = useRef(false);

    const config = useMemo(() => {
        return commandConfig[command] ?? commandConfig["/exploit"];
    }, [command]);

    const Icon = config.icon;

    useEffect(() => {
        if (!open) {
            setVisibleLines([]);
            commandExecutedRef.current = false;
            return;
        }

        if (commandExecutedRef.current) return;
        commandExecutedRef.current = true;

        setCommand(command);
        setVisibleLines([]);

        config.lines.forEach((line, index) => {
            setTimeout(() => {
                setVisibleLines((current) => [...current, line]);
            }, index * 420);
        });


        if (command === "/root") {
            setTimeout(() => {
                enableRootMode();
            }, 1200);
        }

        if (command === "/matrix") {
            setTimeout(() => {
                toggleMatrixMode();
            }, 900);
        }
    }, [open, command, config.lines, enableRootMode, toggleMatrixMode, setCommand]);

    useEffect(() => {
        if (!open) return;

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [open, onClose]);

    return (
        <AnimatePresence>
            {open ? (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[120] bg-black/75 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.28, 0] }}
                        transition={{ duration: 0.22 }}
                        className="pointer-events-none fixed inset-0 z-[125] bg-white"
                    />

                    <div className="fixed inset-0 z-[130] flex items-center justify-center px-3">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="w-full max-w-3xl overflow-hidden rounded-[32px] border border-emerald-400/20 bg-[#030712]/95 shadow-[0_30px_140px_rgba(16,185,129,0.18)] backdrop-blur-3xl"
                        >
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                    <motion.div
                                        initial={{ scale: 0.6, opacity: 0 }}
                                        animate={{ scale: [0.8, 1.4, 1], opacity: [0.2, 0.6, 0] }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        className="h-96 w-96 rounded-full bg-emerald-400/20 blur-[120px]"
                                    />
                                </div>

                                <div className="pointer-events-none absolute inset-0">
                                    <div className="absolute right-[-120px] top-[-80px] h-80 w-80 rounded-full bg-emerald-400/20 blur-[140px]" />
                                    <div className="absolute left-0 top-0 h-28 w-full bg-gradient-to-b from-white/5 to-transparent" />
                                </div>

                                <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-6 py-5">
                                    <div className="flex items-center gap-4">
                                        <WindowDots />
                                        <div>
                                            <p className="eyebrow-pro">Hidden Command</p>
                                            <p className="text-sm text-slate-400">{command}</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={onClose}
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:text-white"
                                        aria-label="Close hidden command"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="relative z-10 p-6">
                                    <div className="mb-5 flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 shadow-emeraldGlow">
                                            <Icon className="h-5 w-5 text-emerald-300" />
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-semibold text-white">
                                                {config.title}
                                            </h3>
                                            <p className="text-sm text-slate-400">{config.subtitle}</p>
                                        </div>
                                    </div>

                                    <div className="min-h-[260px] rounded-3xl border border-white/10 bg-black/40 p-5 font-mono text-sm">
                                        <div className="space-y-3">
                                            {visibleLines.map((line, index) => {
                                                const success = line.includes("[success]");

                                                return (
                                                    <motion.div
                                                        key={`${line}-${index}`}
                                                        initial={{ opacity: 0, x: -8 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        className={success ? "text-emerald-300" : "text-slate-300"}
                                                    >
                                                        <span className="text-emerald-400/80">$</span>{" "}
                                                        {line}
                                                    </motion.div>
                                                );
                                            })}

                                            {visibleLines.length < config.lines.length ? (
                                                <motion.div
                                                    animate={{ opacity: [0.2, 1, 0.2] }}
                                                    transition={{ duration: 1, repeat: Infinity }}
                                                    className="text-emerald-300"
                                                >
                                                    $ _
                                                </motion.div>
                                            ) : null}
                                        </div>
                                    </div>

                                    {visibleLines.length === config.lines.length ? (
                                        <motion.div
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-4"
                                        >
                                            <div className="flex items-center gap-3">
                                                <ShieldCheck className="h-5 w-5 text-emerald-300" />
                                                <p className="text-sm text-emerald-100">
                                                    {config.success}
                                                </p>
                                            </div>

                                            <button
                                                onClick={onClose}
                                                className="rounded-full border border-emerald-300/20 bg-emerald-400/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-400/20"
                                            >
                                                Close
                                            </button>
                                        </motion.div>
                                    ) : null}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            ) : null}
        </AnimatePresence>
    );
}