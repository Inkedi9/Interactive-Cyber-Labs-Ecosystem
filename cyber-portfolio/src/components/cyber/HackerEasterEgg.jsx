import { useEffect, useState } from "react";

export default function HackerEasterEgg() {
    const [sequence, setSequence] = useState("");
    const [open, setOpen] = useState(false);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const onKeyDown = (e) => {
            const next = (sequence + e.key.toLowerCase()).slice(-4);
            setSequence(next);

            if (next === "root") {
                triggerOpen();
            }

            if (e.key === "Escape") {
                setOpen(false);
            }
        };

        const onExternalOpen = () => triggerOpen();

        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("open-root-console", onExternalOpen);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("open-root-console", onExternalOpen);
        };
    }, [sequence]);

    function triggerOpen() {
        setOpen(true);
        setLogs([]);

        const lines = [
            "connecting to hidden interface...",
            "bypassing security layers...",
            "injecting access token...",
            "[OK] root access granted",
            "welcome back, operator.",
        ];

        let i = 0;
        const interval = setInterval(() => {
            setLogs((prev) => [...prev, lines[i]]);
            i++;
            if (i >= lines.length) clearInterval(interval);
        }, 350);
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/80 backdrop-blur-md px-6">
            <div className="relative w-full max-w-2xl rounded-[2rem] border border-brand-purple/20 bg-black p-6 shadow-[0_0_80px_rgba(168,85,247,0.25)]">

                {/* glow overlay */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.18),transparent_60%)]" />

                {/* header terminal */}
                <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-rose-400" />
                        <span className="h-3 w-3 rounded-full bg-amber-400" />
                        <span className="h-3 w-3 rounded-full bg-brand-emeraldSoft" />
                        <span className="ml-3 text-xs text-ui-muted font-mono">
                            root.console
                        </span>
                    </div>

                    <button
                        onClick={() => setOpen(false)}
                        className="text-xs font-mono text-ui-muted hover:text-white"
                    >
                        ESC
                    </button>
                </div>

                {/* terminal */}
                <div className="relative z-10 mt-5 space-y-2 font-mono text-sm">
                    <p className="text-brand-emeraldSoft">
                        root@inkedi:~$ ./access_hidden_layer
                    </p>

                    {logs.map((line, i) => (
                        <p
                            key={i}
                            className={
                                line.includes("[OK]")
                                    ? "text-brand-emeraldSoft"
                                    : "text-brand-cyanSoft"
                            }
                        >
                            {line}
                        </p>
                    ))}

                    <p className="pt-3 text-brand-purpleSoft animate-pulse">
                        root shell ready_
                    </p>
                </div>
            </div>
        </div>
    );
}