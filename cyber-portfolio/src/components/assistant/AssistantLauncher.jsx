export default function AssistantLauncher({ isOpen, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`group fixed bottom-24 right-8 z-[80] inline-flex items-center gap-3 rounded-[1.5rem] border bg-obsidian-900/80 px-4 py-3 text-sm font-semibold backdrop-blur-2xl transition-all duration-300 ${isOpen
                ? "border-brand-purple/30 text-brand-purpleSoft shadow-glow-purple"
                : "border-white/10 text-ui-secondary shadow-[0_12px_40px_rgba(0,0,0,0.30)] hover:border-brand-cyan/30 hover:text-white hover:shadow-glow-cyan"
                }`}
        >
            <span className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(139,92,246,0.08),rgba(34,211,238,0.05),transparent)]" />

            <span
                className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.14),rgba(139,92,246,0.14))] font-mono text-white transition-all duration-300 ${isOpen ? "shadow-glow-purple" : "shadow-glow-cyan"
                    }`}
            >
                &gt;_
            </span>

            <span className="relative z-10">
                {isOpen ? "Fermer" : "Assistant AI"}
            </span>
        </button>
    );
}