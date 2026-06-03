import { motion } from "framer-motion";
import { Activity, ShieldCheck, Cpu, Radar, Globe, Sparkles } from "lucide-react";
import GlassShell from "../ui/GlassShell";
import Badge from "../ui/Badge";

export default function CommandCenterHeader({ labs }) {
    const deployedCount = labs.filter((lab) => lab.status === "Deployed").length;
    const inProgressCount = labs.filter((lab) => lab.status === "In Progress").length;
    const advancedCount = labs.filter((lab) => lab.level === "Advanced").length;

    return (
        <GlassShell
            eyebrow="Command Center"
            title="Platform Runtime"
            description="Live-style overview of deployment posture, platform health and lab readiness."
            right={
                <div className="flex flex-wrap gap-2">
                    <Badge variant="emerald">Operational</Badge>
                    <Badge>Secure UI</Badge>
                    <Badge>Premium Mode</Badge>
                </div>
            }
        >
            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="grid gap-4 md:grid-cols-3">
                    <MetricCard icon={Radar} label="Labs Deployed" value={deployedCount} />
                    <MetricCard icon={Cpu} label="Advanced Modules" value={advancedCount} />
                    <MetricCard icon={Globe} label="Build Queue" value={inProgressCount} />
                </div>

                <div className="inner-pro p-4">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <p className="eyebrow-pro">Environment Signals</p>
                            <p className="mt-1 text-sm font-medium text-white">
                                Platform runtime overview
                            </p>
                        </div>

                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-emerald-200">
                            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                            Live
                        </div>
                    </div>

                    <div className="space-y-3">
                        <SignalRow label="Interface Health" value="99.9%" width="92%" />
                        <SignalRow label="Discovery Engine" value="Synced" width="84%" />
                        <SignalRow label="Preview Modules" value="Ready" width="88%" />
                    </div>
                </div>
            </div>
        </GlassShell>
    );
}

function MetricCard({ icon: Icon, label, value }) {
    return (
        <motion.div whileHover={{ y: -4, scale: 1.01 }} className="inner-pro p-4">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/15 bg-emerald-400/10 text-emerald-200">
                <Icon className="h-5 w-5" />
            </div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
        </motion.div>
    );
}

function SignalRow({ label, value, width }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
            <div className="mb-2 flex items-center justify-between text-xs">
                <span className="text-slate-400">{label}</span>
                <span className="text-emerald-200">{value}</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width }}
                    transition={{ duration: 0.8 }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500/60 to-emerald-300/90 shadow-[0_0_20px_rgba(52,211,153,0.2)]"
                />
            </div>
        </div>
    );
}