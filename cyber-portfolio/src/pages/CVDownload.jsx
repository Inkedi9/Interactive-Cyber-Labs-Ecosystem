import { useEffect, useState } from "react";

const messages = [
    "Initializing secure download...",
    "Bypassing firewall...",
    "Decrypting CV.pdf...",
    "Access granted.",
];

export default function CVDownload() {
    const [lines, setLines] = useState([]);

    useEffect(() => {
        let i = 0;

        const interval = setInterval(() => {
            setLines((prev) => [...prev, messages[i]]);
            i++;

            if (i >= messages.length) {
                clearInterval(interval);

                setTimeout(() => {
                    window.location.href = "/cv-inkedi.pdf";
                }, 1200);
            }
        }, 600);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-slate-950 text-white overflow-hidden">

            {/* Glow background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.2),transparent_40%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.15),transparent_40%)]" />

            {/* Matrix lines */}
            <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(rgba(139,92,246,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.3)_1px,transparent_1px)] [background-size:40px_40px]" />

            <div className="relative z-10 w-full max-w-xl px-6">
                <div className="rounded-[2rem] border border-fuchsia-500/20 bg-slate-950/90 p-8 shadow-[0_0_60px_rgba(168,85,247,0.25)] backdrop-blur-xl">

                    <p className="font-mono text-sm text-emerald-300 mb-4">
                        root@inkedi:~$ download cv.pdf
                    </p>

                    <div className="space-y-2 font-mono text-sm">
                        {lines.map((line, index) => (
                            <p
                                key={index}
                                className={
                                    line.includes("granted")
                                        ? "text-fuchsia-300"
                                        : "text-slate-400"
                                }
                            >
                                {line}
                            </p>
                        ))}
                    </div>

                    {/* Progress bar */}
                    <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                        <div className="h-full w-full animate-[loading_2.5s_linear] bg-gradient-to-r from-fuchsia-500 via-violet-400 to-sky-400" />
                    </div>
                </div>
            </div>
        </div>
    );
}