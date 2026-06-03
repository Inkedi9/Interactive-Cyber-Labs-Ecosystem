import { cn } from "../../utils/cn";

const variants = {
    default: "border-white/10 bg-white/5 text-slate-300",
    emerald:
        "border-emerald-300/20 bg-emerald-400/10 text-emerald-200 shadow-[0_0_22px_rgba(52,211,153,0.10)]",
    blue: "border-sky-300/15 bg-sky-400/10 text-sky-200",
    red: "border-rose-300/15 bg-rose-400/10 text-rose-200",
    purple: "border-violet-300/15 bg-violet-400/10 text-violet-200",
    amber: "border-amber-300/15 bg-amber-400/10 text-amber-200",
};

export default function Badge({ children, variant = "default", className = "" }) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    );
}