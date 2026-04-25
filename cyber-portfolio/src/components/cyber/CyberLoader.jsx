import { useEffect, useMemo, useState } from "react";

const bootMessages = [
    "[BOOT] Initializing secure interface...",
    "[OK] UI modules loaded",
    "[OK] Project registry mounted",
    "[OK] Routing engine online",
    "[AUTH] Access granted",
];

export default function CyberLoader({ onFinish }) {
    const [progress, setProgress] = useState(0);

    const columns = useMemo(() => Array.from({ length: 12 }, (_, i) => i), []);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);

                    setTimeout(() => {
                        if (onFinish) onFinish();
                    }, 400);

                    return 100;
                }

                return prev + 8;
            });
        }, 90);

        return () => clearInterval(interval);
    }, [onFinish]);

    const visibleMessages = bootMessages.slice(
        0,
        Math.min(bootMessages.length, Math.floor(progress / 20))
    );

    return (
        <div className="fixed inset-0 z-[9999] overflow-hidden bg-obsidian-950 text-ui-text">
            {/* glow background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.10),transparent_30%)]" />

            {/* grid */}
            <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(168,85,247,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.22)_1px,transparent_1px)] [background-size:36px_36px]" />

            {/* subtle matrix lines */}
            <div className="absolute inset-0 overflow-hidden">
                {columns.map((col) => (
                    <div
                        key={col}
                        className="absolute top-[-20%] h-[140%] w-px bg-gradient-to-b from-transparent via-brand-purple/20 to-transparent animate-[matrixFall_7s_linear_infinite]"
                        style={{
                            left: `${(col + 1) * 7.2}%`,
                            animationDelay: `${col * 0.35}s`,
                        }}
                    />
                ))}
            </div>

            {/* subtle scan line */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(168,85,247,0.03)_48%,rgba(6,182,212,0.06)_50%,rgba(168,85,247,0.03)_52%,transparent_100%)] animate-[scanMove_4.2s_linear_infinite]" />
            </div>

            <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
                <div className="w-full max-w-2xl rounded-[2rem] border border-brand-purple/20 bg-obsidian-950/90 p-8 shadow-[0_0_80px_rgba(168,85,247,0.18)] backdrop-blur-xl">
                    <div className="flex items-center gap-4 border-b border-ui-border pb-5">
                        <img
                            src="/logo-inkedi-cyber.svg"
                            alt="Inkedi Cyber Portfolio"
                            className="h-12 w-auto"
                        />

                        <div>
                            <h1 className="text-lg font-bold tracking-wide text-brand-purpleSoft">
                                Inkedi Portfolio - Cybersécurité
                            </h1>
                            <p className="text-xs uppercase tracking-[0.25em] text-ui-muted">
                                Secure boot sequence
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-ui-border bg-black/25 p-5 font-mono text-sm">
                        <p className="text-brand-emeraldSoft">
                            root@inkedi:~$ boot portfolio --secure
                        </p>

                        <div className="mt-4 space-y-2">
                            {visibleMessages.map((line, index) => (
                                <p
                                    key={`${line}-${index}`}
                                    className={
                                        line.includes("[AUTH]")
                                            ? "text-brand-purpleSoft"
                                            : line.includes("[OK]")
                                                ? "text-brand-cyanSoft"
                                                : "text-ui-muted"
                                    }
                                >
                                    {line}
                                </p>
                            ))}

                            {progress < 100 && (
                                <p className="text-brand-purpleSoft">
                                    <span className="inline-block h-4 w-[8px] animate-pulse bg-brand-purpleSoft align-middle" />
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-ui-muted">
                            <span>Loading</span>
                            <span>{progress}%</span>
                        </div>

                        <div className="h-3 overflow-hidden rounded-full border border-ui-border bg-surface-3">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-brand-purple via-brand-purpleSoft to-brand-cyan transition-all duration-200"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between text-xs text-ui-muted">
                        <span>System state: {progress < 100 ? "Initializing" : "Ready"}</span>
                        <span className={progress < 100 ? "text-amber-300" : "text-brand-emeraldSoft"}>
                            {progress < 100 ? "Booting..." : "Access granted"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}