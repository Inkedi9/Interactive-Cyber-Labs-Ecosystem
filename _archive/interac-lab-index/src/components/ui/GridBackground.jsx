export default function GridBackground() {
    return (
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[#030712]" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(52,211,153,0.13),transparent_34%)]" />

            <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(148,163,184,0.20)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.20)_1px,transparent_1px)] [background-size:54px_54px]" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,7,18,0.32)_52%,rgba(3,7,18,0.96)_100%)]" />

            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent" />
        </div>
    );
}