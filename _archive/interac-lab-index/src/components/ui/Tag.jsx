export default function Tag({ children }) {
    return (
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 transition hover:border-emerald-400/20 hover:text-emerald-200">
            {children}
        </span>
    );
}