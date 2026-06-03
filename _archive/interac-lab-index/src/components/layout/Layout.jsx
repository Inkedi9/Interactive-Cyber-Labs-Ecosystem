import Navbar from "./Navbar";
import GridBackground from "../ui/GridBackground";
import GlowOrb from "../ui/GlowOrb";
import CyberModeOverlay from "../ui/CyberModeOverlay";
import { useCyberMode } from "../../context/CyberModeContext";

export default function Layout({ children }) {
    const { rootMode } = useCyberMode();

    return (
        <div
            className={`relative min-h-screen overflow-hidden bg-[#030712] text-slate-100 ${rootMode ? "shadow-[inset_0_0_120px_rgba(52,211,153,0.08)]" : ""
                }`}
        >
            <GridBackground />
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.08),transparent_40%)]" />
            <GlowOrb className="left-[-120px] top-16 h-72 w-72" />
            <GlowOrb className="right-[-100px] top-96 h-80 w-80" />
            <CyberModeOverlay />

            <div className="relative z-10">
                <Navbar />
                <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 pb-20 pt-4 sm:px-6 lg:gap-14 lg:px-8">
                    {children}
                </main>
            </div>
        </div>
    );
}