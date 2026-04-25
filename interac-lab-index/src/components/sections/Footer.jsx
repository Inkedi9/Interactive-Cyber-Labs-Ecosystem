import { Shield, Code2, ArrowUpRight, Activity } from "lucide-react";
import WindowDots from "../ui/WindowDots";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

export default function Footer() {
    return (
        <footer className="mt-8 pb-8 pt-4">
            <div className="panel-pro overflow-hidden p-6">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),transparent_32%)]" />

                <div className="relative z-10">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                        <div className="max-w-2xl space-y-5">
                            <div className="flex items-center gap-4">
                                <WindowDots />

                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 shadow-emeraldGlow">
                                        <Shield className="h-5 w-5 text-emerald-300" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-white">
                                            Interac. Lab Index
                                        </p>
                                        <p className="text-sm text-slate-400">
                                            Cyber Simulation & Security Labs Platform
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-sm leading-7 text-slate-400">
                                A premium cyber platform designed to centralize simulations,
                                intelligence workflows and security labs inside a modern
                                interactive product interface.
                            </p>

                            <div className="flex flex-wrap gap-2">
                                <Badge variant="emerald">Apple Cyber Pro</Badge>
                                <Badge>Portfolio-ready</Badge>
                                <Badge>Interactive Labs</Badge>
                            </div>
                        </div>

                        <div className="grid w-full gap-4 sm:grid-cols-2 lg:max-w-md">
                            <div className="inner-pro p-4">
                                <p className="eyebrow-pro">Platform</p>

                                <div className="mt-4 space-y-2 text-sm text-slate-300">
                                    <a href="#labs" className="block transition hover:text-emerald-300">
                                        Interactive Labs
                                    </a>
                                    <a href="#stats" className="block transition hover:text-emerald-300">
                                        Metrics
                                    </a>
                                    <a href="#filters" className="block transition hover:text-emerald-300">
                                        Filters
                                    </a>
                                </div>
                            </div>

                            <div className="inner-pro p-4">
                                <p className="eyebrow-pro">External</p>

                                <div className="mt-4 space-y-3 text-sm text-slate-300">
                                    <a
                                        href="https://github.com/yourname"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 transition hover:text-emerald-300"
                                    >
                                        <Code2 className="h-4 w-4" />
                                        GitHub
                                    </a>

                                    <a
                                        href="#labs"
                                        className="flex items-center gap-2 transition hover:text-emerald-300"
                                    >
                                        <ArrowUpRight className="h-4 w-4" />
                                        Launch Platform
                                    </a>

                                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-200">
                                        <Activity className="h-3.5 w-3.5" />
                                        Platform Online
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                        <p>© 2026 Interac. Lab Index — Cyber Platform Showcase</p>
                        <p>Designed as a premium cybersecurity SaaS-style experience.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}