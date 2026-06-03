import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", onScroll);
        onScroll();

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`group fixed bottom-8 right-8 z-50 inline-flex items-center gap-2 rounded-[1.4rem] border border-white/10 bg-obsidian-900/80 px-4 py-3 text-sm font-semibold text-ui-secondary shadow-[0_10px_35px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-all duration-300 hover:border-brand-cyan/30 hover:text-white hover:shadow-glow-cyan ${visible
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-4 opacity-0"
                }`}
        >
            <span className="inline-block h-2 w-2 rounded-full bg-brand-cyan shadow-[0_0_12px_rgba(34,211,238,0.85)]" />
            Top

            <span className="pointer-events-none absolute inset-0 rounded-[1.4rem] bg-[linear-gradient(135deg,rgba(230,57,70,0.08),rgba(34,211,238,0.05),transparent)] opacity-100" />
        </button>
    );
}