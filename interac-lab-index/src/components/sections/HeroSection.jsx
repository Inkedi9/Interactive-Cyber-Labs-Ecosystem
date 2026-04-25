import { motion } from "framer-motion";
import { ArrowRight, Code2, Sparkles, Radar, ShieldCheck, Layers3 } from "lucide-react";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import WindowDots from "../ui/WindowDots";

export default function HeroSection({ featuredLab }) {
    return (
        <section className="grid min-h-[78vh] items-center gap-10 pt-8 lg:grid-cols-[1.08fr_0.92fr] lg:pt-14">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65 }}
                className="space-y-7"
            >
                <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="emerald">Immersive Cyber Platform</Badge>
                    <Badge>Apple Cyber Pro UI</Badge>
                </div>

                <div className="space-y-5">
                    <h1 className="text-gradient-pro max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                        Interac. Lab Index
                    </h1>

                    <p className="text-lg text-emerald-300/80 drop-shadow-[0_0_12px_rgba(16,185,129,0.3)] sm:text-xl">
                        Cyber Simulation & Security Labs Platform
                    </p>

                    <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                        Explore advanced cybersecurity simulations, detection systems and intelligence tools through a premium interactive hub designed like a real cyber product.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Button href="#labs" icon={ArrowRight}>
                        Explore Labs
                    </Button>

                    <Button href="https://github.com/yourname" variant="secondary" icon={Code2}>
                        View Code
                    </Button>

                    <Button href="#filters" variant="ghost" icon={Sparkles}>
                        Discovery Engine
                    </Button>
                </div>

                <div className="grid max-w-2xl gap-3 sm:grid-cols-3">
                    <HeroMiniStat icon={Radar} label="Labs" value="7+" />
                    <HeroMiniStat icon={ShieldCheck} label="Status" value="Online" />
                    <HeroMiniStat icon={Layers3} label="Focus" value="Cyber" />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.12 }}
                className="relative"
            >
                <div className="absolute -inset-4 rounded-[36px] bg-emerald-400/10 blur-3xl" />

                <div className="panel-pro overflow-hidden p-6">
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_30%)]" />

                    <div className="relative z-10">
                        <div className="mb-6 flex items-center justify-between">
                            <WindowDots />
                            <Badge variant="emerald">Featured Lab</Badge>
                        </div>

                        <div className="mb-6">
                            <p className="eyebrow-pro">Recommended Module</p>
                            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                                {featuredLab.name}
                            </h3>
                            <p className="mt-3 text-sm leading-7 text-slate-400">
                                {featuredLab.description}
                            </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3">
                            <InfoMini label="Type" value={featuredLab.type} />
                            <InfoMini label="Level" value={featuredLab.level} />
                            <InfoMini label="Status" value={featuredLab.status} />
                        </div>

                        <div className="mt-5 rounded-3xl border border-white/10 bg-black/20 p-5">
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                        Module Signal
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-white">
                                        Preview readiness
                                    </p>
                                </div>
                                <span className="rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
                                    Active
                                </span>
                            </div>

                            <div className="space-y-3">
                                <Signal label="Interface" width="92%" />
                                <Signal label="Workflow" width="84%" />
                                <Signal label="Cyber Context" width="88%" />
                            </div>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">
                            {featuredLab.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

function HeroMiniStat({ icon: Icon, label, value }) {
    return (
        <div className="inner-pro p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/10">
                <Icon className="h-4 w-4 text-emerald-300" />
            </div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
            <p className="mt-1 text-sm font-medium text-white">{value}</p>
        </div>
    );
}

function InfoMini({ label, value }) {
    return (
        <div className="inner-pro p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
            <p className="mt-2 text-sm font-medium text-slate-100">{value}</p>
        </div>
    );
}

function Signal({ label, width }) {
    return (
        <div>
            <div className="mb-2 flex items-center justify-between text-xs">
                <span className="text-slate-400">{label}</span>
                <span className="text-emerald-200">{width}</span>
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