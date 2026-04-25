export default function WindowDots({ className = "" }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <span className="h-3 w-3 rounded-full bg-red-400/90 shadow-[0_0_10px_rgba(248,113,113,0.35)]" />
            <span className="h-3 w-3 rounded-full bg-amber-300/90 shadow-[0_0_10px_rgba(252,211,77,0.35)]" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/90 shadow-[0_0_10px_rgba(52,211,153,0.35)]" />
        </div>
    );
}