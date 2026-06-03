import { motion } from "framer-motion";
import WindowDots from "./WindowDots";
import Badge from "./Badge";

export default function LabVisualPreview({ lab }) {
    const bars = buildBars(lab);
    const nodes = buildNodes(lab);

    return (
        <div className="card-pro overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="flex items-center gap-3">
                    <WindowDots />
                    <div>
                        <p className="eyebrow-pro">Live Module Preview</p>
                        <p className="text-xs text-slate-500">{lab.name}</p>
                    </div>
                </div>

                <Badge variant="emerald">Active</Badge>
            </div>

            <div className="space-y-4 p-4">
                <div className="grid gap-3 sm:grid-cols-[1.25fr_0.75fr]">
                    <div className="inner-pro p-4">
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                                    Signal Flow
                                </p>
                                <p className="mt-1 text-sm font-medium text-white">
                                    {lab.focus} pipeline
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <PulseDot />
                                <PulseDot delay={0.4} />
                                <PulseDot delay={0.8} />
                            </div>
                        </div>

                        <div className="relative h-40 overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]">
                            <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(148,163,184,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.2)_1px,transparent_1px)] [background-size:28px_28px]" />

                            <svg
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                className="absolute inset-0 h-full w-full"
                            >
                                {nodes.map((node, index) => (
                                    <g key={node.id}>
                                        {index < nodes.length - 1 && (
                                            <motion.line
                                                x1={node.x}
                                                y1={node.y}
                                                x2={nodes[index + 1].x}
                                                y2={nodes[index + 1].y}
                                                stroke="rgba(52,211,153,0.45)"
                                                strokeWidth="1.5"
                                                strokeDasharray="4 3"
                                                initial={{ pathLength: 0, opacity: 0.2 }}
                                                animate={{ pathLength: 1, opacity: 1 }}
                                                transition={{ duration: 1.2, delay: index * 0.15 }}
                                            />
                                        )}

                                        <motion.circle
                                            cx={node.x}
                                            cy={node.y}
                                            r="3.2"
                                            fill="rgba(52,211,153,0.95)"
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.35, delay: 0.1 + index * 0.1 }}
                                        />

                                        <motion.circle
                                            cx={node.x}
                                            cy={node.y}
                                            r="7"
                                            fill="rgba(52,211,153,0.10)"
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: [0.8, 1.2, 0.9], opacity: [0.25, 0.5, 0.25] }}
                                            transition={{
                                                duration: 2.4,
                                                repeat: Infinity,
                                                delay: index * 0.18,
                                            }}
                                        />
                                    </g>
                                ))}
                            </svg>

                            <div className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] text-slate-300">
                                workflow visualization
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="inner-pro p-4">
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                                Runtime Status
                            </p>

                            <div className="mt-4 space-y-3">
                                {bars.map((bar) => (
                                    <SignalBar
                                        key={bar.label}
                                        label={bar.label}
                                        value={bar.value}
                                        delay={bar.delay}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="inner-pro p-4">
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                                Live Events
                            </p>

                            <div className="mt-4 space-y-2">
                                <LiveLine text={`${lab.type} mode engaged`} delay={0.1} />
                                <LiveLine text={`${lab.level} workflow available`} delay={0.3} />
                                <LiveLine text={`${lab.status} environment synced`} delay={0.5} />
                                <LiveLine text={`${lab.focus} focus active`} delay={0.7} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="inner-pro p-4">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                                Activity Timeline
                            </p>
                            <p className="mt-1 text-sm font-medium text-white">
                                Simulated module execution
                            </p>
                        </div>

                        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-300">
                            preview mode
                        </div>
                    </div>

                    <div className="flex h-28 items-end gap-2">
                        {buildColumns(lab).map((height, index) => (
                            <motion.div
                                key={index}
                                initial={{ height: 10, opacity: 0.35 }}
                                animate={{ height }}
                                transition={{ duration: 0.7, delay: index * 0.05 }}
                                className="flex-1 rounded-t-xl border border-emerald-400/10 bg-gradient-to-t from-emerald-400/20 to-emerald-300/50"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function SignalBar({ label, value, delay = 0 }) {
    return (
        <div>
            <div className="mb-2 flex items-center justify-between text-xs">
                <span className="text-slate-400">{label}</span>
                <span className="text-emerald-200">{value}%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.8, delay }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500/60 to-emerald-300/90 shadow-[0_0_20px_rgba(52,211,153,0.25)]"
                />
            </div>
        </div>
    );
}

function LiveLine({ text, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay }}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2"
        >
            <motion.span
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 1.6, repeat: Infinity, delay }}
                className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.55)]"
            />
            <span className="text-xs text-slate-300">{text}</span>
        </motion.div>
    );
}

function PulseDot({ delay = 0 }) {
    return (
        <motion.span
            animate={{ opacity: [0.35, 1, 0.35], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 1.8, repeat: Infinity, delay }}
            className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.55)]"
        />
    );
}

function buildBars(lab) {
    if (lab.focus === "Threat Intelligence") {
        return [
            { label: "Intel Context", value: 86, delay: 0.1 },
            { label: "Enrichment Flow", value: 79, delay: 0.2 },
            { label: "Analysis Depth", value: 83, delay: 0.3 },
        ];
    }

    if (lab.focus === "Simulation") {
        return [
            { label: "Scenario Runtime", value: 91, delay: 0.1 },
            { label: "Workflow Sync", value: 78, delay: 0.2 },
            { label: "Execution Depth", value: 85, delay: 0.3 },
        ];
    }

    return [
        { label: "Signal Integrity", value: 82, delay: 0.1 },
        { label: "Telemetry Flow", value: 76, delay: 0.2 },
        { label: "Detection Coverage", value: 88, delay: 0.3 },
    ];
}

function buildNodes(lab) {
    if (lab.focus === "Threat Intelligence") {
        return [
            { id: 1, x: 14, y: 62 },
            { id: 2, x: 32, y: 40 },
            { id: 3, x: 50, y: 50 },
            { id: 4, x: 70, y: 28 },
            { id: 5, x: 86, y: 42 },
        ];
    }

    if (lab.focus === "Simulation") {
        return [
            { id: 1, x: 12, y: 30 },
            { id: 2, x: 28, y: 55 },
            { id: 3, x: 46, y: 36 },
            { id: 4, x: 67, y: 60 },
            { id: 5, x: 86, y: 40 },
        ];
    }

    return [
        { id: 1, x: 10, y: 55 },
        { id: 2, x: 27, y: 35 },
        { id: 3, x: 44, y: 48 },
        { id: 4, x: 64, y: 26 },
        { id: 5, x: 86, y: 44 },
    ];
}

function buildColumns(lab) {
    if (lab.level === "Beginner") return [28, 42, 38, 54, 46, 58, 50, 62, 56, 64];
    if (lab.level === "Intermediate") return [36, 52, 46, 66, 60, 74, 68, 78, 70, 82];
    return [44, 62, 58, 80, 72, 90, 84, 96, 86, 100];
}