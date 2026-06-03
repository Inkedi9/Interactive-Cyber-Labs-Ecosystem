import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import GlassShell from "../ui/GlassShell";
import Badge from "../ui/Badge";

const sortOptions = [
    { value: "featured", label: "Featured First" },
    { value: "status", label: "Status" },
    { value: "level", label: "Level" },
    { value: "name", label: "Name" },
];

export default function SearchPanel({
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    totalLabs,
    visibleLabs,
}) {
    return (
        <GlassShell
            eyebrow="Discovery Engine"
            title="Search & Sort"
            description="Explore the platform like a premium SaaS product catalog."
            right={
                <Badge variant="emerald" className="gap-2">
                    <Sparkles className="h-4 w-4" />
                    {visibleLabs} / {totalLabs} labs visible
                </Badge>
            }
        >
            <div className="grid gap-4 lg:grid-cols-[1fr_240px]">
                <div className="relative">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search labs, tags, focus, workflows..."
                        className="w-full rounded-2xl border border-white/10 bg-black/20 py-3 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/25 focus:bg-black/25"
                    />
                </div>

                <div className="relative">
                    <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full appearance-none rounded-2xl border border-white/10 bg-black/20 py-3 pl-12 pr-4 text-sm text-white outline-none transition focus:border-emerald-400/25 focus:bg-black/25"
                    >
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value} className="bg-[#050816] text-white">
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <motion.div
                key={searchQuery + sortBy}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400"
            >
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    Instant search
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    Intelligent sorting
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    Premium discovery UX
                </span>
            </motion.div>
        </GlassShell>
    );
}