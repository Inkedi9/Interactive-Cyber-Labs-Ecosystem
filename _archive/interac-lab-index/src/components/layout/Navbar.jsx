import { motion } from "framer-motion";
import { Shield, Code2, Rocket, Activity } from "lucide-react";
import Button from "../ui/Button";
import WindowDots from "../ui/WindowDots";
import { systemStatus } from "../../data/systemStatus";
import { useCyberMode } from "../../context/CyberModeContext";

export default function Navbar() {

    const { rootMode, matrixMode } = useCyberMode();

    return (
        <motion.header
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8"
        >
            <div className="surface-pro mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 rounded-2xl px-5 py-3">
                <div className="flex min-w-0 items-center gap-4">
                    <WindowDots className="hidden sm:flex" />

                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 shadow-emeraldGlow">
                            <Shield className="h-5 w-5 text-emerald-300" />
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-white">
                                Interac. Lab Index
                            </p>
                            <p className="truncate text-xs text-slate-500">
                                Cyber Simulation Platform
                            </p>
                        </div>
                    </div>
                </div>

                <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
                    <a href="#stats" className="transition hover:text-emerald-300">
                        Metrics
                    </a>
                    <a href="#filters" className="transition hover:text-emerald-300">
                        Filters
                    </a>
                    <a href="#labs" className="transition hover:text-emerald-300">
                        Labs
                    </a>
                </nav>

                {rootMode ? (
                    <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-200 xl:inline-flex">
                        ROOT
                    </div>
                ) : null}

                {matrixMode ? (
                    <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-200 xl:inline-flex">
                        MATRIX
                    </div>
                ) : null}

                <div className="flex flex-wrap items-center justify-end gap-3">
                    <div className="hidden items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-200 xl:inline-flex">
                        <Activity className="h-3.5 w-3.5" />
                        {systemStatus.platform}
                    </div>

                    <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-400 xl:inline-flex">
                        Threat: {systemStatus.threatLevel}
                    </div>

                    <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-400 xl:inline-flex">
                        Ctrl K
                    </div>

                    <Button href="https://github.com/yourname" variant="ghost" icon={Code2}>
                        Code
                    </Button>

                    <Button href="#labs" icon={Rocket}>
                        Launch
                    </Button>
                </div>
            </div>
        </motion.header>
    );
}