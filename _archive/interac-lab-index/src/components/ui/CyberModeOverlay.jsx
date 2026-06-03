import { motion, AnimatePresence } from "framer-motion";
import { Crown, Binary } from "lucide-react";
import { useCyberMode } from "../../context/CyberModeContext";
import MatrixOverlay from "./MatrixOverlay";

export default function CyberModeOverlay() {
    const { rootMode, matrixMode } = useCyberMode();

    return (
        <>
            <MatrixOverlay active={matrixMode} />

            <AnimatePresence>
                {rootMode ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="pointer-events-none fixed inset-0 z-[40]"
                    >
                        <div className="absolute inset-0 border-[1px] border-emerald-400/20 shadow-[inset_0_0_80px_rgba(52,211,153,0.08)]" />

                        <div className="absolute bottom-6 left-6 hidden rounded-2xl border border-emerald-400/20 bg-black/40 px-4 py-3 text-xs text-emerald-200 backdrop-blur-xl lg:flex lg:items-center lg:gap-3">
                            <Crown className="h-4 w-4" />
                            ROOT UI MODE
                        </div>
                    </motion.div>
                ) : null}

                {matrixMode ? (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="pointer-events-none fixed bottom-6 right-24 z-[96] hidden rounded-2xl border border-emerald-400/20 bg-black/40 px-4 py-3 text-xs text-emerald-200 backdrop-blur-xl lg:flex lg:items-center lg:gap-3"
                    >
                        <Binary className="h-4 w-4" />
                        MATRIX LAYER
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </>
    );
}