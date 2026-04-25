import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import {
    ArrowLeft,
    ArrowUpRight,
    Code2,
    Shield,
    Layers3,
    Activity,
    Target,
    Radar,
    Blocks,
    Sparkles,
} from "lucide-react";
import Layout from "../components/layout/Layout";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Tag from "../components/ui/Tag";
import WindowDots from "../components/ui/WindowDots";
import LabVisualPreview from "../components/ui/LabVisualPreview";
import Footer from "../components/sections/Footer";
import { labs } from "../data/labs";
import LabPreviewDrawer from "../components/ui/LabPreviewDrawer";
import CommandPalette from "../components/ui/CommandPalette";
import ScrollToTopButton from "../components/ui/ScrollToTopButton";

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

export default function LabDetailPage() {
    const { labId } = useParams();
    const lab = labs.find((item) => item.id === labId);

    const [selectedLab, setSelectedLab] = useState(null);

    if (!lab) {
        return (
            <Layout>
                <section className="min-h-[60vh] pt-16">
                    <div className="panel-pro p-8 text-center">
                        <p className="eyebrow-pro">404 Lab</p>
                        <h1 className="mt-3 text-3xl font-semibold text-white">
                            Lab not found
                        </h1>
                        <p className="mt-3 text-slate-400">
                            This lab does not exist or has not been configured yet.
                        </p>
                        <Link
                            to="/"
                            className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/15 px-5 py-3 text-sm font-medium text-white"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to platform
                        </Link>
                    </div>
                </section>
            </Layout>
        );
    }

    const relatedLabs = labs.filter((item) => lab.relatedLabs?.includes(item.id));

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

                <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="panel-pro overflow-hidden p-6">
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_34%)]" />

                        <div className="relative z-10">
                            <div className="mb-6 flex items-center justify-between">
                                <WindowDots />
                                {lab.featured ? (
                                    <Badge variant="emerald" className="gap-2">
                                        <Sparkles className="h-4 w-4" />
                                        Featured
                                    </Badge>
                                ) : (
                                    <Badge>Lab Detail</Badge>
                                )}
                            </div>

                            <div className="mb-5 flex flex-wrap gap-2">
                                <Badge variant={getTypeVariant(lab.type)}>{lab.type}</Badge>
                                <Badge>{lab.level}</Badge>
                                <Badge variant={getStatusVariant(lab.status)}>{lab.status}</Badge>
                            </div>

                            <p className="eyebrow-pro">Interactive Lab Page</p>

                            <h1 className="text-gradient-pro mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                                {lab.name}
                            </h1>

                            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
                                {lab.longDescription || lab.description}
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <Button href={lab.links.live} icon={ArrowUpRight}>
                                    Launch Lab
                                </Button>
                                <Button href={lab.links.code} variant="secondary" icon={Code2}>
                                    View Code
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                        <DetailMetric icon={Blocks} label="Modules" value={lab.metrics?.modules ?? "-"} />
                        <DetailMetric icon={Radar} label="Scenarios" value={lab.metrics?.scenarios ?? "-"} />
                        <DetailMetric icon={Target} label="Maturity" value={lab.metrics?.maturity ?? "-"} />
                    </div>
                </div>
            </section>

            <LabVisualPreview lab={lab} />

            <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="space-y-6">
                    <InfoPanel title="Problem Solved">
                        <p className="text-sm leading-7 text-slate-300">{lab.problemSolved}</p>
                    </InfoPanel>

                    <InfoPanel title="Scenario Preview">
                        <p className="text-sm leading-7 text-slate-300">{lab.scenario}</p>
                    </InfoPanel>

                    <InfoPanel title="Skills Demonstrated">
                        <div className="flex flex-wrap gap-2">
                            {lab.skillsShown?.map((skill) => (
                                <Tag key={skill}>{skill}</Tag>
                            ))}
                        </div>
                    </InfoPanel>
                </div>

                <div className="space-y-6">
                    <InfoPanel title="Workflow">
                        <div className="space-y-3">
                            {lab.workflow?.map((step, index) => (
                                <div
                                    key={step}
                                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                                >
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/10 text-sm font-medium text-emerald-200">
                                        {index + 1}
                                    </div>
                                    <span className="text-sm text-white">{step}</span>
                                </div>
                            ))}
                        </div>
                    </InfoPanel>

                    <InfoPanel title="MITRE ATT&CK Mapping">
                        <div className="space-y-4">
                            <div className="inner-pro p-4">
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

                            <div className="inner-pro p-4">
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
                    </InfoPanel>
                </div>
            </section>

            <section className="space-y-6">
                <div>
                    <p className="eyebrow-pro">Connected Modules</p>
                    <h2 className="mt-3 text-3xl font-semibold text-white">
                        Related Labs
                    </h2>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    {relatedLabs.map((item) => (
                        <Link
                            key={item.id}
                            to={`/labs/${item.id}`}
                            className="card-pro group p-5 transition hover:border-emerald-400/20"
                        >
                            <WindowDots />
                            <div className="mt-5 flex flex-wrap gap-2">
                                <Badge variant={getTypeVariant(item.type)}>{item.type}</Badge>
                                <Badge variant={getStatusVariant(item.status)}>{item.status}</Badge>
                            </div>
                            <h3 className="mt-4 text-xl font-semibold text-white">
                                {item.name}
                            </h3>
                            <p className="mt-3 text-sm leading-7 text-slate-400">
                                {item.description}
                            </p>
                        </Link>
                    ))}
                </div>
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

function DetailMetric({ icon: Icon, label, value }) {
    return (
        <div className="card-pro p-5">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/15 bg-emerald-400/10">
                <Icon className="h-5 w-5 text-emerald-300" />
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
        </div>
    );
}

function InfoPanel({ title, children }) {
    return (
        <div className="card-pro p-5">
            <p className="mb-4 text-xs uppercase tracking-[0.28em] text-emerald-300/70">
                {title}
            </p>
            {children}
        </div>
    );
}