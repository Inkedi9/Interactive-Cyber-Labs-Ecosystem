import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setVisible(window.scrollY > 500);
        };

        window.addEventListener("scroll", onScroll);
        onScroll();

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {visible ? (
                <motion.button
                    initial={{ opacity: 0, y: 16, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 16, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    onClick={handleClick}
                    className="fixed bottom-6 right-6 z-[90] inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-400/15 text-white shadow-[0_0_30px_rgba(16,185,129,0.18)] backdrop-blur-2xl transition hover:bg-emerald-400/20"
                    aria-label="Back to top"
                >
                    <ArrowUp className="h-5 w-5" />
                </motion.button>
            ) : null}
        </AnimatePresence>
    );
}