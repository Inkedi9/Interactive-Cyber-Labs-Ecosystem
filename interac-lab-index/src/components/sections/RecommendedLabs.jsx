import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Badge from "../ui/Badge";
import WindowDots from "../ui/WindowDots";
import SectionHeader from "../ui/SectionHeader";

export default function RecommendedLabs({ labs, onOpenLab }) {
    if (!labs.length) return null;

    return (
        <section className="space-y-6">
            <SectionHeader
                eyebrow="Smart Recommendations"
                title="Recommended Labs"
                description="Highlighted modules selected to give the strongest first impression of the platform."
            />

            <div className="grid gap-5 lg:grid-cols-3">
                {labs.map((lab, index) => (
                    <motion.button
                        key={lab.id}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.08 }}
                        whileHover={{ y: -6, scale: 1.01 }}
                        onClick={() => onOpenLab(lab)}
                        className="card-pro group relative overflow-hidden p-6 text-left transition"
                    >
                        <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                            <div className="absolute -right-10 top-0 h-44 w-44 rounded-full bg-emerald-400/20 blur-[110px]" />
                            <div className="absolute left-0 top-0 h-24 w-full bg-gradient-to-b from-white/5 to-transparent" />
                        </div>

                        <div className="relative z-10">
                            <div className="mb-4 flex items-center justify-between">
                                <WindowDots />
                                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-300/15 bg-emerald-400/10 text-emerald-200">
                                    <Sparkles className="h-5 w-5" />
                                </div>
                            </div>

                            <div className="mb-3 flex flex-wrap gap-2">
                                <Badge variant="emerald">Recommended</Badge>
                                <Badge>{lab.level}</Badge>
                            </div>

                            <h3 className="text-2xl font-semibold tracking-tight text-white">{lab.name}</h3>
                            <p className="mt-3 text-sm leading-7 text-slate-300">{lab.description}</p>

                            <div className="mt-5 flex items-center justify-between">
                                <span className="text-sm text-emerald-200">{lab.focus}</span>
                                <span className="inline-flex items-center gap-2 text-sm text-slate-300 transition group-hover:text-white">
                                    Open Preview
                                    <ArrowRight className="h-4 w-4" />
                                </span>
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>
        </section>
    );
}