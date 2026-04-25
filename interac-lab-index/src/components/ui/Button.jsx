import { cn } from "../../utils/cn";

const variants = {
    primary:
        "border-emerald-300/20 bg-emerald-400/15 text-white shadow-emeraldGlow hover:bg-emerald-400/20",
    secondary:
        "border-white/10 bg-white/[0.055] text-slate-100 hover:border-emerald-400/20 hover:bg-white/[0.08]",
    ghost:
        "border-transparent bg-transparent text-slate-300 hover:border-white/10 hover:bg-white/[0.05] hover:text-white",
};

const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-3 text-sm",
};

export default function Button({
    children,
    href = "#",
    variant = "primary",
    size = "md",
    icon: Icon,
    className = "",
}) {
    const external = href.startsWith("http");

    return (
        <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            className={cn(
                "inline-flex items-center gap-2 rounded-full border font-medium backdrop-blur-xl transition duration-300",
                "focus:outline-none focus:ring-2 focus:ring-emerald-400/30",
                variants[variant],
                sizes[size],
                className
            )}
        >
            {Icon ? <Icon className="h-4 w-4" /> : null}
            {children}
        </a>
    );
}