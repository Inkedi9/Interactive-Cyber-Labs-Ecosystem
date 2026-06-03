import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const chars = "01アイウエオカキクケコサシスセソINTERACLAB";

export default function MatrixOverlay({ active }) {
    const columns = useMemo(() => {
        return Array.from({ length: 34 }, (_, i) => ({
            id: i,
            left: `${(i / 34) * 100}%`,
            delay: Math.random() * 2,
            duration: 3 + Math.random() * 3,
            text: Array.from({ length: 26 }, () =>
                chars[Math.floor(Math.random() * chars.length)]
            ).join("\n"),
        }));
    }, []);

    return (
        <AnimatePresence>
            {active ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.28 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="pointer-events-none fixed inset-0 z-[95] overflow-hidden bg-black"
                >
                    {columns.map((column) => (
                        <motion.div
                            key={column.id}
                            initial={{ y: "-120%" }}
                            animate={{ y: "120%" }}
                            transition={{
                                duration: column.duration,
                                delay: column.delay,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="absolute top-0 whitespace-pre text-xs leading-5 text-emerald-300 blur-[0.2px]"
                            style={{ left: column.left }}
                        >
                            {column.text}
                        </motion.div>
                    ))}
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}