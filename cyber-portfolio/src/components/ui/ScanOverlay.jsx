export default function ScanOverlay() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]">
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(230,57,70,0.05)_48%,rgba(230,57,70,0.10)_50%,rgba(230,57,70,0.05)_52%,transparent_100%)] animate-[scanMove_5s_linear_infinite]" />
            <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:100%_4px]" />
        </div>
    );
}