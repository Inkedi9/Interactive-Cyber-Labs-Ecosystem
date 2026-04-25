import { motion } from "framer-motion";
import { Radar, ShieldCheck, Layers3 } from "lucide-react";
import AnimatedCounter from "../ui/AnimatedCounter";
import SectionHeader from "../ui/SectionHeader";

export default function StatsPanel({ labs }) {
    const onlineCount = labs.filter((lab) => lab.status === "Deployed").length;
    const domains = new Set(labs.map((lab) => lab.focus)).size + 1;

    return (
        <section id="stats" className="space-y-6">
            <SectionHeader
                eyebrow="Meta Intelligence"
                title="Platform Metrics"
                description="A visual snapshot of the platform footprint, specialization domains and operational focus."
            />

            <div className="grid gap-4 md:grid-cols-3">
                <StatCard icon={ShieldCheck} label="Labs Online" value={onlineCount} suffix="+" />
                <StatCard icon={Layers3} label="Domains Covered" value={domains} suffix="+" />

                <motion.div whileHover={{ y: -6, scale: 1.02 }} className="card-pro p-6">
                    <div className="relative z-10">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10">
                            <Radar className="h-5 w-5 text-emerald-300" />
                        </div>

                        <p className="text-sm text-slate-400">Focus</p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {["Detection", "Simulation", "Threat Intelligence"].map((item) => (
                                <span
                                    key={item}
                                    className="rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-200"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function StatCard({ icon: Icon, label, value, suffix = "" }) {
    return (
        <motion.div whileHover={{ y: -6, scale: 1.02 }} className="card-pro p-6">
            <div className="relative z-10">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10">
                    <Icon className="h-5 w-5 text-emerald-300" />
                </div>

                <p className="text-sm text-slate-400">{label}</p>

                <div className="mt-3 text-3xl font-semibold text-white">
                    <AnimatedCounter value={value} suffix={suffix} />
                </div>
            </div>
        </motion.div>
    );
}