import { useMemo } from "react";

export default function MatrixBackground() {
    const columns = useMemo(() => Array.from({ length: 18 }, (_, i) => i), []);

    return (
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(168,85,247,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.18)_1px,transparent_1px)] [background-size:40px_40px]" />

            {columns.map((col) => (
                <div
                    key={col}
                    className="absolute top-[-20%] h-[140%] w-px bg-gradient-to-b from-transparent via-brand-purple/20 to-transparent animate-[matrixFall_8s_linear_infinite]"
                    style={{
                        left: `${(col + 1) * 5.2}%`,
                        animationDelay: `${col * 0.45}s`,
                    }}
                />
            ))}
        </div>
    );
}