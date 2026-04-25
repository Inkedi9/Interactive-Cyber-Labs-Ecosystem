import WindowDots from "./WindowDots";
import { cn } from "../../utils/cn";

export default function GlassShell({
    eyebrow,
    title,
    description,
    children,
    right,
    className = "",
}) {
    return (
        <section className={cn("panel-pro overflow-hidden p-6", className)}>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),transparent_32%)]" />

            <div className="relative z-10">
                <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <WindowDots className="mt-1" />
                        <div>
                            {eyebrow && <p className="eyebrow-pro">{eyebrow}</p>}
                            {title && (
                                <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">
                                    {title}
                                </h3>
                            )}
                            {description && (
                                <p className="mt-1 text-sm leading-6 text-slate-400">
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>

                    {right}
                </div>

                {children}
            </div>
        </section>
    );
}