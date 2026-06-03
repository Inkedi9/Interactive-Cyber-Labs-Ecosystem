import { cn } from "../../utils/cn";

export default function GlowOrb({ className = '' }) {
    return (
        <div
            className={`pointer-events-none absolute rounded-full bg-emerald-400/20 blur-[120px] opacity-60 ${className}`}
        />
    );
}