import { useEffect, useState } from "react";

const logs = [
    "[INFO] Initializing security modules...",
    "[OK] Firewall active",
    "[ALERT] Suspicious activity detected",
    "[INFO] Running threat analysis...",
    "[OK] System secure",
    "[SCAN] Checking endpoints...",
];

export default function CyberLogs() {
    const [visibleLogs, setVisibleLogs] = useState([]);

    useEffect(() => {
        let i = 0;

        const interval = setInterval(() => {
            setVisibleLogs((prev) => [...prev.slice(-5), logs[i % logs.length]]);
            i++;
        }, 1200);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="pointer-events-none fixed bottom-4 left-4 z-0 hidden text-xs font-mono text-emerald-400 opacity-20 md:block">
            {visibleLogs.map((log, index) => (
                <p key={index}>{log}</p>
            ))}
        </div>
    );
}