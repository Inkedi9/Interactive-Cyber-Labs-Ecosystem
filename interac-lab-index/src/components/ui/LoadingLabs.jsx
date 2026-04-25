import WindowDots from "./WindowDots";

export default function LoadingLabs() {
    return (
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="card-pro overflow-hidden p-6">
                    <div className="mb-5 flex items-center justify-between">
                        <WindowDots />
                        <div className="h-8 w-8 animate-pulse rounded-2xl border border-emerald-400/15 bg-emerald-400/10" />
                    </div>

                    <div className="mb-4 flex gap-2">
                        <div className="h-7 w-20 animate-pulse rounded-full bg-white/10" />
                        <div className="h-7 w-24 animate-pulse rounded-full bg-white/10" />
                        <div className="h-7 w-20 animate-pulse rounded-full bg-white/10" />
                    </div>

                    <div className="mb-5 h-8 w-3/4 animate-pulse rounded-xl bg-white/10" />

                    <div className="space-y-2">
                        <div className="h-4 w-full animate-pulse rounded bg-white/10" />
                        <div className="h-4 w-5/6 animate-pulse rounded bg-white/10" />
                        <div className="h-4 w-4/6 animate-pulse rounded bg-white/10" />
                    </div>

                    <div className="mt-6 flex gap-2">
                        <div className="h-9 w-28 animate-pulse rounded-full bg-emerald-400/10" />
                        <div className="h-9 w-24 animate-pulse rounded-full bg-white/10" />
                    </div>
                </div>
            ))}
        </div>
    );
}