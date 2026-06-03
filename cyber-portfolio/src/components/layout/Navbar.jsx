import { NavLink } from "react-router-dom";
import { useState } from "react";

const desktopBase =
    "group relative rounded-2xl px-4 py-2.5 text-sm font-medium transition-all duration-300";
const mobileBase =
    "rounded-2xl border px-5 py-4 text-lg font-semibold transition-all duration-300";

function DesktopNavLink({ to, children }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `${desktopBase} ${isActive
                    ? "bg-brand-red/15 text-brand-redSoft shadow-glow-red"
                    : "text-ui-secondary hover:bg-white/[0.04] hover:text-white hover:shadow-glow-cyan"
                }`
            }
        >
            {({ isActive }) => (
                <>
                    <span className="relative z-10">{children}</span>

                    <span
                        className={`pointer-events-none absolute inset-x-4 bottom-1 h-px bg-gradient-to-r from-transparent via-brand-cyan/70 to-transparent transition-all duration-300 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            }`}
                    />
                </>
            )}
        </NavLink>
    );
}

function MobileNavLink({ to, children, onClick }) {
    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) =>
                `${mobileBase} ${isActive
                    ? "border-brand-red/30 bg-brand-red/15 text-brand-redSoft shadow-glow-red"
                    : "border-ui-border bg-surface/90 text-ui-secondary hover:border-brand-cyan/30 hover:bg-surface-2 hover:text-white"
                }`
            }
        >
            {children}
        </NavLink>
    );
}

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-50">
                <div className="mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto] items-center px-4 pt-5 sm:px-6 lg:px-8">
                    <NavLink to="/" className="group flex items-center gap-3">
                        <div className="rounded-2xl border border-white/10 bg-surface/80 p-2.5 shadow-[0_0_30px_rgba(230,57,70,0.08)] backdrop-blur-xl transition-all duration-300 group-hover:border-brand-red/30 group-hover:shadow-glow-red">
                            <img
                                src="/logo-inkedi-cyber.svg"
                                alt="Inkedi Cyber Portfolio"
                                className="h-7 w-auto"
                            />
                        </div>

                        <div className="hidden sm:block">
                            <p className="text-sm font-semibold tracking-wide text-text-primary">
                                Inkedi
                            </p>
                            <p className="text-[11px] uppercase tracking-[0.25em] text-ui-muted">
                                Cyber Portfolio
                            </p>
                        </div>
                    </NavLink>

                    <div className="hidden md:flex justify-center">
                        <nav className="relative flex items-center gap-1 rounded-[1.8rem] border border-white/10 bg-obsidian-900/60 p-2 shadow-[0_15px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
                            <div className="pointer-events-none absolute inset-0 rounded-[1.8rem] bg-[linear-gradient(135deg,rgba(230,57,70,0.10),rgba(34,211,238,0.05),transparent)]" />
                            <DesktopNavLink to="/">Accueil</DesktopNavLink>
                            <DesktopNavLink to="/cv">CV / Compétences</DesktopNavLink>
                            <DesktopNavLink to="/projects">Projets</DesktopNavLink>
                            <DesktopNavLink to="/minilabit">Mini Lab IT</DesktopNavLink>
                            <DesktopNavLink to="/homelab">Homelab</DesktopNavLink>
                            <DesktopNavLink to="/siem-live">SIEM Live</DesktopNavLink>
                            <DesktopNavLink to="/changelog">Build Log</DesktopNavLink>
                        </nav>
                    </div>

                    <div className="flex items-center">
                        <button
                            onClick={() => setMobileOpen(true)}
                            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-surface/80 px-4 py-2.5 text-sm font-medium text-ui-secondary shadow-[0_8px_30px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-all duration-300 hover:border-brand-red/30 hover:text-white hover:shadow-glow-red md:hidden"
                        >
                            <span className="inline-block h-2 w-2 rounded-full bg-brand-cyan shadow-[0_0_12px_rgba(34,211,238,0.85)]" />
                            Menu
                        </button>
                    </div>
                </div>
            </header>

            <div
                className={`fixed inset-0 z-[70] md:hidden transition-all duration-300 ${mobileOpen
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0"
                    }`}
            >
                <div
                    className="absolute inset-0 bg-black/75 backdrop-blur-md"
                    onClick={() => setMobileOpen(false)}
                />

                <div
                    className={`absolute inset-x-4 top-4 rounded-[2rem] border border-white/10 bg-obsidian-950/95 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all duration-300 ${mobileOpen
                        ? "translate-y-0 scale-100"
                        : "-translate-y-4 scale-[0.98]"
                        }`}
                >
                    <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_right,_rgba(230,57,70,0.12),_rgba(34,211,238,0.06),_transparent_45%)]" />

                    <div className="relative flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-redSoft">
                                Navigation
                            </p>
                            <p className="mt-1 text-sm text-ui-muted">
                                Explore le portfolio
                            </p>
                        </div>

                        <button
                            onClick={() => setMobileOpen(false)}
                            className="rounded-2xl border border-white/10 bg-surface/80 px-3 py-2 text-sm text-ui-secondary transition hover:border-brand-cyan/30 hover:text-white"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="relative mt-6 flex flex-col gap-3">
                        <MobileNavLink to="/" onClick={() => setMobileOpen(false)}>
                            Accueil
                        </MobileNavLink>
                        <MobileNavLink to="/cv" onClick={() => setMobileOpen(false)}>
                            CV / Compétences
                        </MobileNavLink>
                        <MobileNavLink to="/projects" onClick={() => setMobileOpen(false)}>
                            Projets
                        </MobileNavLink>
                        <MobileNavLink to="/homelab" onClick={() => setMobileOpen(false)}>
                            Homelab
                        </MobileNavLink>
                        <MobileNavLink to="/siem-live" onClick={() => setMobileOpen(false)}>
                            SIEM Live
                        </MobileNavLink>
                    </div>

                    <a
                        href="/projet-phare"
                        onClick={() => setMobileOpen(false)}
                        className="relative mt-6 block rounded-[1.75rem] border border-brand-red/20 bg-surface-2/80 p-5 shadow-[0_0_30px_rgba(230,57,70,0.08)] transition-all duration-300 hover:border-brand-red/30"
                    >
                        <div className="mb-3 flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-brand-red shadow-[0_0_10px_rgba(230,57,70,0.7)]" />
                            <p className="text-sm font-semibold text-brand-redSoft">
                                JARVINx — Projet Phare
                            </p>
                        </div>

                        <p className="text-sm leading-7 text-ui-secondary">
                            Agent IA autonome local-first en Go — runtime agentique sur homelab.
                        </p>
                    </a>
                </div>
            </div>
        </>
    );
}