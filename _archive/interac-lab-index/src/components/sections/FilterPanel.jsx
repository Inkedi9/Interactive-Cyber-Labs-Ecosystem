import { SlidersHorizontal, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import GlassShell from "../ui/GlassShell";
import Badge from "../ui/Badge";

const filterGroups = {
    types: ["Blue Team", "Red Team", "Purple Team", "OSINT", "Threat Intel", "MITRE ATT&CK"],
    levels: ["Beginner", "Intermediate", "Advanced"],
    statuses: ["Deployed", "In Progress"],
};

export default function FilterPanel({ filters, setFilters }) {
    const toggleValue = (group, value) => {
        setFilters((current) => {
            const exists = current[group].includes(value);
            return {
                ...current,
                [group]: exists
                    ? current[group].filter((item) => item !== value)
                    : [...current[group], value],
            };
        });
    };

    const resetFilters = () => {
        setFilters({ types: [], levels: [], statuses: [] });
    };

    const activeCount =
        filters.types.length + filters.levels.length + filters.statuses.length;

    return (
        <section id="filters" className="space-y-6">
            <GlassShell
                eyebrow="Interactive Controls"
                title="Advanced Lab Filters"
                description="Refine the platform view with premium classification controls."
                right={
                    <div className="flex flex-wrap items-center gap-3">
                        <Badge variant={activeCount > 0 ? "emerald" : "default"}>
                            {activeCount} active
                        </Badge>
                        <button
                            onClick={resetFilters}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-emerald-400/20 hover:text-emerald-200"
                        >
                            <RotateCcw className="h-4 w-4" />
                            Reset
                        </button>
                    </div>
                }
            >
                <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10">
                        <SlidersHorizontal className="h-5 w-5 text-emerald-300" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-white">Filter Matrix</p>
                        <p className="text-sm text-slate-400">
                            Classification by type, level and deployment status.
                        </p>
                    </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-3">
                    {Object.entries(filterGroups).map(([group, items]) => (
                        <div key={group} className="inner-pro p-5">
                            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-emerald-300/70">
                                {group}
                            </p>

                            <div className="flex flex-wrap gap-3">
                                {items.map((item) => {
                                    const active = filters[group].includes(item);

                                    return (
                                        <motion.button
                                            key={item}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.96 }}
                                            onClick={() => toggleValue(group, item)}
                                            className={`rounded-full border px-4 py-2 text-sm transition ${active
                                                    ? "border-emerald-300/40 bg-emerald-400/20 text-white shadow-[0_0_40px_rgba(16,185,129,0.25)]"
                                                    : "border-white/10 bg-white/5 text-slate-300 hover:border-emerald-400/20 hover:text-emerald-200"
                                                }`}
                                        >
                                            {item}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </GlassShell>
        </section>
    );
}