import { useEffect, useMemo, useState } from "react";
import RevealOnScroll from "../components/ui/RevealOnScroll";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

const initialAlerts = [
    {
        id: "ALT-1042",
        title: "Suspicious PowerShell Execution",
        severity: "High",
        source: "WIN-CLIENT-07",
        time: "08:41:12",
        status: "Open",
    },
    {
        id: "ALT-1038",
        title: "Multiple Failed Logins",
        severity: "Medium",
        source: "DC-01",
        time: "08:39:47",
        status: "Investigating",
    },
    {
        id: "ALT-1031",
        title: "Outbound Connection to Rare IP",
        severity: "Critical",
        source: "WEB-APP-02",
        time: "08:33:09",
        status: "Open",
    },
    {
        id: "ALT-1024",
        title: "New Local Admin Group Membership",
        severity: "High",
        source: "WIN-ADMIN-02",
        time: "08:28:55",
        status: "Contained",
    },
];

const sensorStatus = [
    { name: "Windows Logs", value: "Healthy", color: "emerald" },
    { name: "Sysmon Feed", value: "Healthy", color: "emerald" },
    { name: "Web Gateway", value: "Degraded", color: "amber" },
    { name: "EDR Connector", value: "Healthy", color: "emerald" },
    { name: "DNS Monitor", value: "Healthy", color: "emerald" },
    { name: "Threat Intel", value: "Syncing", color: "sky" },
];

const baseLogs = [
    "[INFO] Sysmon event 1 collected from WIN-CLIENT-07",
    "[INFO] DNS query observed for suspicious-domain.tld",
    "[ALERT] Rule matched: encoded PowerShell",
    "[INFO] EDR heartbeat received from WEB-APP-02",
    "[WARN] Multiple failed logins detected on DC-01",
    "[INFO] Threat intel enrichment in progress",
    "[CRIT] Rare outbound connection detected",
    "[INFO] Analyst note added to ALT-1038",
];

const severityTrend = [
    { time: "08:20", alerts: 2 },
    { time: "08:25", alerts: 4 },
    { time: "08:30", alerts: 3 },
    { time: "08:35", alerts: 6 },
    { time: "08:40", alerts: 5 },
    { time: "08:45", alerts: 7 },
    { time: "08:50", alerts: 4 },
];

const analystNotes = [
    {
        title: "Initial triage",
        text: "Encoded PowerShell and rare outbound activity may indicate post-compromise execution path.",
    },
    {
        title: "Pivot suggestion",
        text: "Review parent process chain on WIN-CLIENT-07 and correlate with DNS telemetry.",
    },
    {
        title: "Containment hint",
        text: "Prioritize WEB-APP-02 egress validation and isolate if second suspicious beacon appears.",
    },
];

const badgeBase =
    "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-xl";

function Counter({ target, suffix = "" }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let current = 0;
        const duration = 900;
        const step = Math.max(1, Math.ceil(target / (duration / 16)));

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(current);
            }
        }, 16);

        return () => clearInterval(timer);
    }, [target]);

    return (
        <>
            {count}
            {suffix}
        </>
    );
}

function SeverityBadge({ severity }) {
    const styles = {
        Critical: "border-rose-400/25 bg-rose-400/10 text-rose-300",
        High: "border-orange-400/25 bg-orange-400/10 text-orange-300",
        Medium: "border-amber-400/25 bg-amber-400/10 text-amber-300",
        Low: "border-brand-cyan/25 bg-brand-cyan/10 text-brand-cyanSoft",
    };

    return (
        <span className={`${badgeBase} ${styles[severity] || styles.Low}`}>
            {severity}
        </span>
    );
}

function SensorBadge({ color, value }) {
    const styles = {
        emerald: "border-brand-emerald/25 bg-brand-emerald/10 text-brand-emeraldSoft",
        amber: "border-amber-400/25 bg-amber-400/10 text-amber-300",
        sky: "border-brand-cyan/25 bg-brand-cyan/10 text-brand-cyanSoft",
    };

    return (
        <span className={`${badgeBase} ${styles[color]}`}>
            {value}
        </span>
    );
}

function StatCard({ value, label, colorClass, glowClass }) {
    return (
        <div
            className={`group relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-obsidian-900/75 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 ${glowClass}`}
        >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(139,92,246,0.04),rgba(34,211,238,0.03),transparent)]" />
            <div className="relative z-10">
                <div className={`text-3xl font-bold ${colorClass}`}>{value}</div>
                <div className="mt-1 text-sm text-ui-muted">{label}</div>
            </div>
        </div>
    );
}

function SectionCard({ title, description, children, className = "" }) {
    return (
        <div
            className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-obsidian-900/75 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl ${className}`}
        >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(139,92,246,0.04),rgba(34,211,238,0.03),transparent)]" />
            <div className="relative z-10">
                {(title || description) && (
                    <div className="mb-4">
                        {title ? <h2 className="text-2xl font-bold text-ui-text">{title}</h2> : null}
                        {description ? <p className="mt-2 text-ui-secondary">{description}</p> : null}
                    </div>
                )}
                {children}
            </div>
        </div>
    );
}

function AlertCard({ alert }) {
    return (
        <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-obsidian-900/75 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-brand-purple/20 hover:shadow-[0_18px_60px_rgba(139,92,246,0.10)]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(139,92,246,0.04),rgba(34,211,238,0.03),transparent)]" />

            <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-ui-muted">
                            {alert.id} • {alert.source}
                        </p>
                        <h3 className="mt-2 text-xl font-semibold text-ui-text">
                            {alert.title}
                        </h3>
                    </div>

                    <SeverityBadge severity={alert.severity} />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/10 bg-obsidian-900/70 px-3 py-1.5 text-xs text-ui-text backdrop-blur-xl">
                        Time: {alert.time}
                    </span>
                    <span className="rounded-full border border-brand-purple/25 bg-brand-purple/10 px-3 py-1.5 text-xs text-brand-purpleSoft backdrop-blur-xl">
                        Status: {alert.status}
                    </span>
                </div>
            </div>
        </div>
    );
}

function GlobalStatusPill({ label, value, tone = "cyan" }) {
    const tones = {
        cyan: "border-brand-cyan/20 bg-brand-cyan/10 text-brand-cyanSoft",
        purple: "border-brand-purple/20 bg-brand-purple/10 text-brand-purpleSoft",
        emerald: "border-brand-emerald/20 bg-brand-emerald/10 text-brand-emeraldSoft",
        amber: "border-amber-400/20 bg-amber-400/10 text-amber-300",
    };

    return (
        <div className="rounded-[1.4rem] border border-white/10 bg-obsidian-900/65 px-4 py-4 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.18em] text-ui-muted">{label}</p>
            <span className={`mt-3 inline-flex ${badgeBase} ${tones[tone]}`}>{value}</span>
        </div>
    );
}

export default function SIEMLive() {
    const [liveLogs, setLiveLogs] = useState(baseLogs.slice(0, 5));
    const [pulse, setPulse] = useState(false);
    const [fullDashboard, setFullDashboard] = useState(false);

    useEffect(() => {
        let index = 5;

        const interval = setInterval(() => {
            setLiveLogs((prev) => [...prev.slice(-7), baseLogs[index % baseLogs.length]]);
            setPulse(true);
            setTimeout(() => setPulse(false), 300);
            index += 1;
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    const counts = useMemo(() => {
        return {
            critical: initialAlerts.filter((a) => a.severity === "Critical").length,
            high: initialAlerts.filter((a) => a.severity === "High").length,
            medium: initialAlerts.filter((a) => a.severity === "Medium").length,
            total: initialAlerts.length,
        };
    }, []);

    return (
        <div
            className={`relative ${fullDashboard
                ? "min-h-screen px-4 pb-8 pt-24 lg:px-6 lg:pt-28"
                : "mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-8 lg:pt-36"
                }`}
        >
            {fullDashboard && (
                <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.06),_rgba(139,92,246,0.05),_transparent_40%)]" />
            )}

            <RevealOnScroll>
                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <span className="inline-block rounded-full border border-brand-purple/30 bg-brand-purple/10 px-4 py-1 text-xs uppercase tracking-[0.25em] text-brand-purpleSoft">
                            SIEM Live
                        </span>

                        <h1 className="mt-5 text-4xl font-black text-ui-text md:text-6xl">
                            Mini dashboard SOC / SIEM
                        </h1>

                        <p className="mt-6 max-w-3xl text-lg leading-8 text-ui-secondary">
                            Une page démonstrative inspirée d’un environnement SOC, avec alertes, télémétrie,
                            sévérité, capteurs et logs live simulés pour renforcer l’aspect cyber opérationnel du portfolio.
                        </p>

                        <div className="mt-8 grid gap-4 sm:grid-cols-4">
                            <StatCard
                                value={<Counter target={counts.critical} />}
                                label="Critical"
                                colorClass="text-rose-400"
                                glowClass="hover:border-rose-400/20 hover:shadow-[0_18px_60px_rgba(244,63,94,0.10)]"
                            />
                            <StatCard
                                value={<Counter target={counts.high} />}
                                label="High"
                                colorClass="text-orange-400"
                                glowClass="hover:border-orange-400/20 hover:shadow-[0_18px_60px_rgba(251,146,60,0.10)]"
                            />
                            <StatCard
                                value={<Counter target={counts.medium} />}
                                label="Medium"
                                colorClass="text-amber-400"
                                glowClass="hover:border-amber-400/20 hover:shadow-[0_18px_60px_rgba(251,191,36,0.10)]"
                            />
                            <StatCard
                                value={<Counter target={counts.total} />}
                                label="Total alerts"
                                colorClass="text-brand-purpleSoft"
                                glowClass="hover:border-brand-purple/20 hover:shadow-[0_18px_60px_rgba(139,92,246,0.10)]"
                            />
                        </div>
                    </div>

                    <div className="relative rounded-[2rem] border border-brand-purple/20 bg-obsidian-950 text-ui-text shadow-purpleGlow">
                        <div className="flex items-center gap-2 border-b border-ui-border px-5 py-4">
                            <span className="h-3 w-3 rounded-full bg-rose-400" />
                            <span className="h-3 w-3 rounded-full bg-amber-400" />
                            <span className="h-3 w-3 rounded-full bg-brand-emeraldSoft" />
                            <span className="ml-3 text-xs text-ui-muted">siem.console</span>
                            <span
                                className={`ml-auto h-2.5 w-2.5 rounded-full bg-brand-emerald transition ${pulse ? "shadow-[0_0_16px_rgba(16,185,129,0.9)]" : ""
                                    }`}
                            />
                        </div>

                        <div className="space-y-3 p-5 font-mono text-sm">
                            <p className="text-brand-emeraldSoft">analyst@siem:~$ tail -f live-events.log</p>
                            {liveLogs.map((log, index) => (
                                <p
                                    key={`${log}-${index}`}
                                    className={
                                        log.includes("[CRIT]")
                                            ? "text-rose-300"
                                            : log.includes("[ALERT]")
                                                ? "text-amber-300"
                                                : log.includes("[WARN]")
                                                    ? "text-orange-300"
                                                    : "text-brand-cyanSoft"
                                    }
                                >
                                    {log}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </RevealOnScroll>

            <div className="mt-6 flex flex-wrap gap-3">
                <button
                    onClick={() => setFullDashboard((prev) => !prev)}
                    className="rounded-[1.4rem] border border-brand-purple/30 bg-brand-purple/15 px-5 py-3 text-sm font-semibold text-brand-purpleSoft backdrop-blur-2xl transition-all duration-300 hover:border-brand-purple/40 hover:bg-brand-purple/20 hover:text-white hover:shadow-glow-purple"
                >
                    {fullDashboard ? "Quitter full dashboard" : "Mode full dashboard"}
                </button>
            </div>

            <section className="mt-8">
                <RevealOnScroll>
                    <SectionCard
                        title="État global"
                        description="Vue synthétique de l’activité SOC simulée et de la posture de monitoring."
                    >
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            <GlobalStatusPill label="Pipeline" value="Nominal" tone="emerald" />
                            <GlobalStatusPill label="Threat intel" value="Syncing" tone="cyan" />
                            <GlobalStatusPill label="Analyst queue" value="4 active alerts" tone="purple" />
                            <GlobalStatusPill label="Noise level" value="Moderate" tone="amber" />
                        </div>
                    </SectionCard>
                </RevealOnScroll>
            </section>

            <section className="mt-10 grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
                <RevealOnScroll>
                    <SectionCard
                        title="Alert trend"
                        description="Évolution simulée des alertes sur les dernières minutes."
                    >
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={severityTrend}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(124,131,148,0.16)" />
                                    <XAxis dataKey="time" stroke="#7C8394" />
                                    <YAxis stroke="#7C8394" />
                                    <Tooltip
                                        contentStyle={{
                                            background: "#111218",
                                            border: "1px solid rgba(38,42,54,1)",
                                            borderRadius: "16px",
                                            color: "#F3F4F8",
                                        }}
                                        labelStyle={{ color: "#A7ADBA" }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="alerts"
                                        stroke="#06B6D4"
                                        fill="#06B6D4"
                                        fillOpacity={0.16}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </SectionCard>
                </RevealOnScroll>

                <RevealOnScroll delay={120}>
                    <SectionCard
                        title="Analyst notes"
                        description="Triage rapide et hypothèses de travail sur les alertes en cours."
                    >
                        <div className="space-y-4">
                            {analystNotes.map((note, index) => (
                                <div
                                    key={note.title}
                                    className="rounded-[1.4rem] border border-white/10 bg-obsidian-900/70 px-4 py-4 backdrop-blur-xl transition-all duration-300 hover:border-brand-cyan/20"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-cyan shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                                        <p className="text-sm font-semibold text-ui-text">
                                            Note {index + 1} — {note.title}
                                        </p>
                                    </div>
                                    <p className="mt-3 text-sm leading-7 text-ui-secondary">
                                        {note.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </SectionCard>
                </RevealOnScroll>
            </section>

            <section className="mt-16 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
                <RevealOnScroll>
                    <div>
                        <h2 className="mb-6 text-2xl font-bold text-ui-text">
                            Alertes récentes
                        </h2>

                        <div className="space-y-4">
                            {initialAlerts.map((alert, index) => (
                                <RevealOnScroll key={alert.id} delay={index * 70}>
                                    <AlertCard alert={alert} />
                                </RevealOnScroll>
                            ))}
                        </div>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll delay={120}>
                    <div className="space-y-8">
                        <div>
                            <h2 className="mb-6 text-2xl font-bold text-ui-text">
                                État des capteurs
                            </h2>

                            <SectionCard>
                                <div className="space-y-4">
                                    {sensorStatus.map((sensor) => (
                                        <div
                                            key={sensor.name}
                                            className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/10 bg-obsidian-900/70 px-4 py-3 backdrop-blur-xl transition-all duration-300 hover:border-brand-cyan/20"
                                        >
                                            <span className="font-medium text-ui-text">{sensor.name}</span>
                                            <SensorBadge color={sensor.color} value={sensor.value} />
                                        </div>
                                    ))}
                                </div>
                            </SectionCard>
                        </div>

                        <div>
                            <h2 className="mb-6 text-2xl font-bold text-ui-text">
                                Répartition de sévérité
                            </h2>

                            <SectionCard>
                                <div className="space-y-5">
                                    <div>
                                        <div className="mb-2 flex items-center justify-between text-sm text-ui-secondary">
                                            <span>Critical</span>
                                            <span>{counts.critical}</span>
                                        </div>
                                        <div className="h-3 rounded-full bg-surface-3">
                                            <div className="h-full w-[25%] rounded-full bg-rose-500" />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mb-2 flex items-center justify-between text-sm text-ui-secondary">
                                            <span>High</span>
                                            <span>{counts.high}</span>
                                        </div>
                                        <div className="h-3 rounded-full bg-surface-3">
                                            <div className="h-full w-[50%] rounded-full bg-orange-500" />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mb-2 flex items-center justify-between text-sm text-ui-secondary">
                                            <span>Medium</span>
                                            <span>{counts.medium}</span>
                                        </div>
                                        <div className="h-3 rounded-full bg-surface-3">
                                            <div className="h-full w-[25%] rounded-full bg-amber-500" />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mb-2 flex items-center justify-between text-sm text-ui-secondary">
                                            <span>Pipeline state</span>
                                            <span className="text-brand-emeraldSoft">Nominal</span>
                                        </div>
                                        <div className="h-3 rounded-full bg-surface-3">
                                            <div className="h-full w-[86%] rounded-full bg-brand-emerald" />
                                        </div>
                                    </div>
                                </div>
                            </SectionCard>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>
        </div>
    );
}