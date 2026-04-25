import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Sparkles } from "lucide-react";
import Badge from "./Badge";
import Tag from "./Tag";
import WindowDots from "./WindowDots";

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

export default function LabCard({ lab, index, onOpen }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            whileHover={{ y: -8, scale: 1.01 }}
            onClick={() => onOpen(lab)}
            className="card-pro group cursor-pointer overflow-hidden p-6 transition-all duration-500"
        >
            <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                <div className="absolute -right-10 top-0 h-52 w-52 rounded-full bg-emerald-400/20 blur-[120px]" />
                <div className="absolute left-0 top-0 h-24 w-full bg-gradient-to-b from-white/5 to-transparent" />
            </div>

            <div className="relative z-10 flex h-full flex-col gap-5">
                <div className="flex items-center justify-between">
                    <WindowDots />

                    {lab.featured && (
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-300/15 bg-emerald-400/10 text-emerald-200">
                            <Sparkles className="h-5 w-5" />
                        </div>
                    )}
                </div>

                <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={getTypeVariant(lab.type)}>{lab.type}</Badge>
                        <Badge>{lab.level}</Badge>
                        <Badge variant={getStatusVariant(lab.status)}>{lab.status}</Badge>
                    </div>

                    <h3 className="text-2xl font-semibold tracking-tight text-white">
                        {lab.name}
                    </h3>
                </div>

                <div className="space-y-3">
                    <p className="text-sm leading-7 text-slate-300">{lab.description}</p>
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                            Shows
                        </p>
                        <p className="mt-2 line-clamp-2 text-sm text-slate-300">
                            {lab.skillsShown?.slice(0, 3).join(" • ")}
                        </p>
                    </div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-300/60">
                        Open interactive preview
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {lab.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                    ))}
                </div>

                <div className="mt-auto flex flex-wrap gap-3 pt-3">
                    <a
                        href={lab.links.live}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/12 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-400/18"
                    >
                        <ArrowUpRight className="h-4 w-4" />
                        Launch Lab
                    </a>

                    <a
                        href={lab.links.code}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-emerald-400/20 hover:text-white"
                    >
                        <Code2 className="h-4 w-4" />
                        View Code
                    </a>
                </div>
            </div>
        </motion.article>
    );
}