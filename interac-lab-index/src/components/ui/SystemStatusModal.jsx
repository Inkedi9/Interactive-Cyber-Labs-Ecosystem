import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Activity, ShieldCheck } from "lucide-react";
import WindowDots from "./WindowDots";
import Badge from "./Badge";
import { systemStatus } from "../../data/systemStatus";
import { useCyberMode } from "../../context/CyberModeContext";

export default function SystemStatusModal({ open, onClose }) {
    const [visibleLines, setVisibleLines] = useState([]);
    const { rootMode, matrixMode, lastCommand } = useCyberMode();

    useEffect(() => {
        if (!open) {
            setVisibleLines([]);
            return;
        }

        const lines = [
            `${systemStatus.operator}:~$ system status`,
            ...systemStatus.signals,
            `[INFO] Active labs: ${systemStatus.activeLabs}`,
            `[INFO] Active nodes: ${systemStatus.activeNodes}`,
            `[INFO] Root mode: ${rootMode ? "ENABLED" : "DISABLED"}`,
            `[INFO] Matrix layer: ${matrixMode ? "ACTIVE" : "INACTIVE"}`,
            `[INFO] Last command: ${lastCommand}`,
            `[INFO] Build state: ${systemStatus.buildState}`,
            `[INFO] Uptime: ${systemStatus.uptime}`,
            `[INFO] Last update: ${systemStatus.lastUpdate}`,
            "Status: platform healthy.",
        ];

        setVisibleLines([]);

        lines.forEach((line, index) => {
            setTimeout(() => {
                setVisibleLines((current) => [...current, line]);
            }, index * 260);
        });
    }, [open]);

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

                    <div className="fixed inset-0 z-[130] flex items-center justify-center px-3">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.88, filter: "blur(8px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
                            transition={{ duration: 0.32, ease: "easeOut" }}
                            className="w-full max-w-3xl overflow-hidden rounded-[32px] border border-emerald-400/20 bg-[#030712]/95 shadow-[0_30px_140px_rgba(16,185,129,0.18)] backdrop-blur-3xl"
                        >
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-0">
                                    <div className="absolute right-[-120px] top-[-80px] h-80 w-80 rounded-full bg-emerald-400/20 blur-[140px]" />
                                    <div className="absolute left-0 top-0 h-28 w-full bg-gradient-to-b from-white/5 to-transparent" />
                                </div>

                                <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-6 py-5">
                                    <div className="flex items-center gap-4">
                                        <WindowDots />
                                        <div>
                                            <p className="eyebrow-pro">System Status</p>
                                            <p className="text-sm text-slate-400">
                                                Platform runtime and simulated environment health
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={onClose}
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:text-white"
                                        aria-label="Close status modal"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="relative z-10 p-6">
                                    <div className="mb-5 grid gap-4 sm:grid-cols-4">
                                        <StatusMetric label="Platform" value={systemStatus.platform} />
                                        <StatusMetric label="Threat" value={systemStatus.threatLevel} />
                                        <StatusMetric label="Labs" value={systemStatus.activeLabs} />
                                        <StatusMetric label="Nodes" value={systemStatus.activeNodes} />
                                    </div>

                                    <div className="mb-5 flex flex-wrap gap-2">
                                        <Badge variant="emerald">
                                            <Activity className="mr-2 h-3.5 w-3.5" />
                                            Operational
                                        </Badge>
                                        <Badge>
                                            <ShieldCheck className="mr-2 h-3.5 w-3.5" />
                                            Portfolio Safe
                                        </Badge>
                                    </div>

                                    <div className="min-h-[300px] rounded-3xl border border-white/10 bg-black/40 p-5 font-mono text-sm">
                                        <div className="space-y-3">
                                            {visibleLines.map((line, index) => {
                                                const ok = line.includes("[OK]");
                                                const info = line.includes("[INFO]");
                                                const root = line.includes(":~$");

                                                return (
                                                    <motion.div
                                                        key={`${line}-${index}`}
                                                        initial={{ opacity: 0, x: -8 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        className={
                                                            ok || root
                                                                ? "text-emerald-300"
                                                                : info
                                                                    ? "text-cyan-300"
                                                                    : "text-violet-300"
                                                        }
                                                    >
                                                        <span className="text-emerald-400/80">$</span>{" "}
                                                        {line}
                                                    </motion.div>
                                                );
                                            })}

                                            {visibleLines.length < systemStatus.signals.length + 8 ? (
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

                                    <div className="mt-5 rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                                        <p className="text-sm text-emerald-100">
                                            System health is simulated for portfolio experience. No backend monitoring is active.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            ) : null}
        </AnimatePresence>
    );
}

function StatusMetric({ label, value }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
            <p className="mt-2 text-lg font-semibold text-white">{value}</p>
        </div>
    );
}