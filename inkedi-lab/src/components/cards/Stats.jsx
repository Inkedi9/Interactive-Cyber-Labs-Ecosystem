import { useEffect, useState } from "react";

function Counter({ target }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 1200;
        const increment = target / (duration / 16);

        const interval = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(interval);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(interval);
    }, [target]);

    return <>{count}</>;
}

export default function Stats() {
    return (
        <div className="mt-10 grid gap-4 sm:grid-cols-3">

            {/* CARD 1 */}
            <div className="group relative rounded-2xl border border-ui-border bg-surface p-5 shadow-sm transition hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-redGlow">

                <div className="absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(230,57,70,0.12),transparent_60%)]" />

                <div className="relative z-10 text-center">
                    <div className="mb-2 text-xl">🛡️</div>
                    <div className="text-3xl font-bold text-brand-red">
                        <Counter target={6} />+
                    </div>
                    <div className="mt-1 text-sm text-ui-muted">
                        Projets cyber
                    </div>
                </div>
            </div>

            {/* CARD 2 */}
            <div className="group relative rounded-2xl border border-ui-border bg-surface p-5 shadow-sm transition hover:-translate-y-1 hover:border-brand-cyan/40 hover:shadow-cyanGlow">

                <div className="absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.12),transparent_60%)]" />

                <div className="relative z-10 text-center">
                    <div className="mb-2 text-xl">🧠</div>
                    <div className="text-3xl font-bold text-brand-cyanSoft">
                        <Counter target={5} />
                    </div>
                    <div className="mt-1 text-sm text-ui-muted">
                        Axes techniques
                    </div>
                </div>
            </div>

            {/* CARD 3 */}
            <div className="group relative rounded-2xl border border-ui-border bg-surface p-5 shadow-sm transition hover:-translate-y-1 hover:border-brand-emerald/40 hover:shadow-emeraldGlow">

                <div className="absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_60%)]" />

                <div className="relative z-10 text-center">
                    <div className="mb-2 text-xl">🚀</div>
                    <div className="text-3xl font-bold text-brand-emeraldSoft">
                        <Counter target={3} />+
                    </div>
                    <div className="mt-1 text-sm text-ui-muted">
                        Apps déployées
                    </div>
                </div>
            </div>

        </div>
    );
}