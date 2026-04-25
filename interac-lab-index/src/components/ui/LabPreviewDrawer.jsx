import { AnimatePresence, motion } from "framer-motion";
import {
    X,
    ArrowUpRight,
    Code2,
    Sparkles,
    Shield,
    Layers3,
    Activity,
    ChevronRight,
    Radar,
    Blocks,
    Target,
} from "lucide-react";
import Badge from "./Badge";
import Tag from "./Tag";
import WindowDots from "./WindowDots";
import LabVisualPreview from "./LabVisualPreview";
import { Link } from "react-router-dom";

function getTypeVariant(type) {
    if (type === "Blue Team") return "blue";
    if (type === "Red Team") return "red";
    if (type === "Purple Team") return "purple";
    if (type === "OSINT") return "emerald";
    if (type === "Threat Intel") return "amber";
    return "default";
}

function getStatusVariant(status) {
    return status === "Deployed" ? "emerald" : "default";
}

export default function LabPreviewDrawer({
    lab,
    labs = [],
    isOpen,
    onClose,
    onOpenRelated,
}) {
    if (!lab) return null;

    const relatedLabs = labs.filter((item) => lab.relatedLabs?.includes(item.id));

    return (
        <AnimatePresence>
            {isOpen ? (
                <>
                    <motion.div
                        key="drawer-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-md"
                    />

                    <motion.aside
                        key="drawer-panel"
                        initial={{ x: "100%", opacity: 0.8 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "100%", opacity: 0.8 }}
                        transition={{ type: "spring", damping: 28, stiffness: 240 }}
                        className="fixed right-0 top-0 z-[80] flex h-screen w-full max-w-2xl flex-col border-l border-white/10 bg-[linear-gradient(180deg,rgba(5,8,22,0.96),rgba(5,8,22,0.92))] shadow-[-20px_0_100px_rgba(0,0,0,0.55)] backdrop-blur-3xl"
                    >
                        <div className="relative flex h-full flex-col overflow-hidden">
                            <div className="pointer-events-none absolute inset-0">
                                <div className="absolute right-[-80px] top-10 h-72 w-72 rounded-full bg-emerald-400/15 blur-[120px]" />
                                <div className="absolute left-0 top-0 h-28 w-full bg-gradient-to-b from-white/5 to-transparent" />
                            </div>

                            <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-6 py-5">
                                <div className="flex items-center gap-4">
                                    <WindowDots />
                                    <div>
                                        <p className="eyebrow-pro">Lab Preview</p>
                                        <p className="text-sm text-slate-400">
                                            Interactive module overview
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-emerald-400/20 hover:text-white"
                                    aria-label="Close preview"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="relative z-10 flex-1 overflow-y-auto px-6 py-6 [scrollbar-gutter:stable]">
                                <div className="space-y-6">
                                    <div className="card-pro overflow-hidden">
                                        <div className="relative border-b border-white/10 p-5">
                                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_45%)]" />

                                            <div className="relative z-10 mb-4 flex items-start justify-between gap-4">
                                                <div>
                                                    <div className="mb-3 flex flex-wrap gap-2">
                                                        <Badge variant={getTypeVariant(lab.type)}>{lab.type}</Badge>
                                                        <Badge>{lab.level}</Badge>
                                                        <Badge variant={getStatusVariant(lab.status)}>{lab.status}</Badge>
                                                    </div>

                                                    <h2 className="text-3xl font-semibold tracking-tight text-white">
                                                        {lab.name}
                                                    </h2>
                                                </div>

                                                {lab.featured ? (
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-300/15 bg-emerald-400/10 text-emerald-200">
                                                        <Sparkles className="h-5 w-5" />
                                                    </div>
                                                ) : null}
                                            </div>

                                            <p className="relative z-10 text-sm leading-7 text-slate-300">
                                                {lab.longDescription || lab.description}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-3 gap-3 p-5">
                                            <PreviewMetric icon={Blocks} label="Modules" value={lab.metrics?.modules ?? "-"} />
                                            <PreviewMetric icon={Radar} label="Scenarios" value={lab.metrics?.scenarios ?? "-"} />
                                            <PreviewMetric icon={Target} label="Maturity" value={lab.metrics?.maturity ?? "-"} />
                                        </div>
                                    </div>

                                    <LabVisualPreview lab={lab} />

                                    <DrawerSection title="Scenario Preview">
                                        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                                            <p className="text-sm leading-7 text-slate-300">{lab.scenario}</p>
                                        </div>
                                    </DrawerSection>

                                    <DrawerSection title="Problem Solved">
                                        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                                            <p className="text-sm leading-7 text-slate-300">{lab.problemSolved}</p>
                                        </div>
                                    </DrawerSection>

                                    <DrawerSection title="Skills Demonstrated">
                                        <div className="flex flex-wrap gap-2">
                                            {lab.skillsShown?.map((skill) => (
                                                <Tag key={skill}>{skill}</Tag>
                                            ))}
                                        </div>
                                    </DrawerSection>

                                    <DrawerSection title="MITRE ATT&CK Mapping">
                                        <div className="space-y-4">
                                            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                                                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-emerald-300/70">
                                                    Tactics
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {lab.mitre?.tactics?.map((tactic) => (
                                                        <Badge key={tactic} variant="emerald">
                                                            {tactic}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                                                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-emerald-300/70">
                                                    Techniques
                                                </p>
                                                <div className="space-y-2">
                                                    {lab.mitre?.techniques?.map((technique) => (
                                                        <div
                                                            key={technique}
                                                            className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-300"
                                                        >
                                                            {technique}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </DrawerSection>

                                    <div className="grid gap-4 sm:grid-cols-3">
                                        <MiniInfoCard icon={Shield} label="Type" value={lab.type} />
                                        <MiniInfoCard icon={Layers3} label="Level" value={lab.level} />
                                        <MiniInfoCard icon={Activity} label="Status" value={lab.status} />
                                    </div>

                                    <DrawerSection title="Tags & Focus">
                                        <div className="mb-5 flex flex-wrap gap-2">
                                            {lab.tags.map((tag) => (
                                                <Tag key={tag}>{tag}</Tag>
                                            ))}
                                        </div>

                                        <div className="rounded-2xl border border-emerald-400/12 bg-emerald-400/10 p-4">
                                            <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">
                                                Primary Focus
                                            </p>
                                            <p className="mt-2 text-sm font-medium text-emerald-100">
                                                {lab.focus}
                                            </p>
                                        </div>
                                    </DrawerSection>

                                    <DrawerSection title="Workflow Preview">
                                        <div className="space-y-3">
                                            {lab.workflow?.map((step, index) => (
                                                <div
                                                    key={step}
                                                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                                                >
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/10 text-sm font-medium text-emerald-200">
                                                        {index + 1}
                                                    </div>
                                                    <div className="flex-1 text-sm text-white">{step}</div>
                                                    <ChevronRight className="h-4 w-4 text-slate-500" />
                                                </div>
                                            ))}
                                        </div>
                                    </DrawerSection>

                                    <DrawerSection title="Recommended Path">
                                        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                                            <p className="text-sm leading-7 text-slate-300">
                                                {lab.recommendedPath}
                                            </p>
                                        </div>
                                    </DrawerSection>

                                    <DrawerSection title="Related Labs">
                                        <div className="space-y-3">
                                            {relatedLabs.length > 0 ? (
                                                relatedLabs.map((item) => (
                                                    <button
                                                        key={item.id}
                                                        onClick={() => onOpenRelated(item)}
                                                        className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-left transition hover:border-emerald-400/20 hover:bg-white/[0.03]"
                                                    >
                                                        <div>
                                                            <p className="text-sm font-medium text-white">{item.name}</p>
                                                            <p className="mt-1 text-xs text-slate-400">
                                                                {item.type} • {item.status}
                                                            </p>
                                                        </div>
                                                        <ChevronRight className="h-4 w-4 text-slate-500" />
                                                    </button>
                                                ))
                                            ) : (
                                                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-slate-400">
                                                    No related labs configured yet.
                                                </div>
                                            )}
                                        </div>
                                    </DrawerSection>
                                </div>
                            </div>

                            <div className="relative z-10 border-t border-white/10 bg-[#050816]/80 px-6 py-5 backdrop-blur-xl">
                                <div className="flex flex-wrap gap-3">
                                    <a
                                        href={lab.links.live}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/15 px-5 py-3 text-sm font-medium text-white shadow-emeraldGlow transition hover:bg-emerald-400/20"
                                    >
                                        <ArrowUpRight className="h-4 w-4" />
                                        Launch Lab
                                    </a>

                                    <a
                                        href={lab.links.code}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-medium text-slate-100 transition hover:border-emerald-400/20 hover:bg-white/[0.08]"
                                    >
                                        <Code2 className="h-4 w-4" />
                                        View Code
                                    </a>
                                    <Link
                                        to={`/labs/${lab.id}`}
                                        onClick={onClose}
                                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-medium text-slate-100 transition hover:border-emerald-400/20 hover:bg-white/[0.08]"
                                    >
                                        <ArrowUpRight className="h-4 w-4" />
                                        Full Lab Page
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.aside>
                </>
            ) : null}
        </AnimatePresence>
    );
}

function DrawerSection({ title, children }) {
    return (
        <div className="card-pro p-5">
            <p className="mb-4 text-xs uppercase tracking-[0.28em] text-emerald-300/70">
                {title}
            </p>
            {children}
        </div>
    );
}

function PreviewMetric({ icon: Icon, label, value }) {
    return (
        <div className="inner-pro p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/10">
                <Icon className="h-4 w-4 text-emerald-300" />
            </div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
            <p className="mt-2 text-lg font-semibold text-white">{value}</p>
        </div>
    );
}

function MiniInfoCard({ icon: Icon, label, value }) {
    return (
        <div className="inner-pro p-4">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/15 bg-emerald-400/10">
                <Icon className="h-5 w-5 text-emerald-300" />
            </div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
            <p className="mt-2 text-sm font-medium text-white">{value}</p>
        </div>
    );
}