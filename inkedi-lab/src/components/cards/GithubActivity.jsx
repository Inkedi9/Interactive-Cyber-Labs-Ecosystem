import { useEffect, useState } from "react";
import { Code2, Star, GitFork, ExternalLink } from "lucide-react";
import RevealOnScroll from "../ui/RevealOnScroll";

const REPOS = [
    { owner: "Inkedi9",    repo: "JARVINx" },
    { owner: "Inkedi9",    repo: "Dark-Ops-Lab" },
    { owner: "Inkora-dev", repo: "Inkora-AI" },
];

function relativeDate(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor(diff / 60000);
    if (days > 0) return `il y a ${days} jour${days > 1 ? "s" : ""}`;
    if (hours > 0) return `il y a ${hours}h`;
    if (minutes > 0) return `il y a ${minutes} min`;
    return "à l'instant";
}

function langColor(lang) {
    if (lang === "Go") return "bg-brand-cyan";
    if (lang === "TypeScript" || lang === "JavaScript") return "bg-brand-red";
    return "bg-brand-emerald";
}

export default function GithubActivity() {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAll() {
            const results = await Promise.all(
                REPOS.map(async ({ owner, repo }) => {
                    try {
                        const [repoRes, langsRes, commitsRes] = await Promise.all([
                            fetch(`https://api.github.com/repos/${owner}/${repo}`),
                            fetch(`https://api.github.com/repos/${owner}/${repo}/languages`),
                            fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=3`),
                        ]);
                        if (!repoRes.ok) return null;
                        const repoData = await repoRes.json();
                        const langsData = langsRes.ok ? await langsRes.json() : {};
                        const commitsData = commitsRes.ok ? await commitsRes.json() : [];
                        return { repoData, langsData, commitsData };
                    } catch {
                        return null;
                    }
                })
            );
            setRepos(results.filter(Boolean));
            setLoading(false);
        }
        fetchAll();
    }, []);

    return (
        <section className="mt-20">
            <RevealOnScroll>
                <div className="mb-8 flex items-center justify-between gap-4">
                    <div>
                        <span className="inline-flex items-center rounded-full border border-brand-cyan/25 bg-brand-cyan/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-brand-cyanSoft backdrop-blur-xl">
                            GitHub Activity
                        </span>
                        <h2 className="mt-4 text-2xl font-bold text-ui-text">Code en cours</h2>
                    </div>
                    <a
                        href="https://github.com/Inkedi9"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-obsidian-900/60 px-4 py-2 text-sm text-ui-secondary backdrop-blur-xl transition-all duration-300 hover:border-brand-cyan/30 hover:text-white"
                    >
                        <Code2 size={14} />
                        <span>Inkedi9</span>
                        <ExternalLink size={12} />
                    </a>
                </div>
            </RevealOnScroll>

            <div className="grid gap-6 lg:grid-cols-3">
                {loading
                    ? [0, 1, 2].map((i) => (
                        <div key={i} className="animate-pulse rounded-[2rem] border border-white/10 bg-obsidian-900/75 p-6 backdrop-blur-2xl">
                            <div className="mb-4 h-5 w-2/3 rounded-full bg-white/10" />
                            <div className="mb-2 h-4 w-full rounded-full bg-white/10" />
                            <div className="mb-6 h-4 w-3/4 rounded-full bg-white/10" />
                            <div className="mb-3 h-3 w-1/2 rounded-full bg-white/10" />
                            <div className="mb-6 h-2 w-full rounded-full bg-white/10" />
                            <div className="space-y-2">
                                <div className="h-3 w-full rounded-full bg-white/10" />
                                <div className="h-3 w-4/5 rounded-full bg-white/10" />
                                <div className="h-3 w-3/5 rounded-full bg-white/10" />
                            </div>
                        </div>
                    ))
                    : repos.map(({ repoData, langsData, commitsData }, i) => {
                        const totalBytes = Object.values(langsData).reduce((a, b) => a + b, 0);
                        const topLangs = Object.entries(langsData)
                            .sort(([, a], [, b]) => b - a)
                            .slice(0, 3);
                        const primaryLang = topLangs[0]?.[0] ?? repoData.language;

                        return (
                            <RevealOnScroll key={repoData.id} delay={i * 100}>
                                <div className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-obsidian-900/75 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-brand-cyan/25 hover:shadow-[0_18px_60px_rgba(34,211,238,0.10)]">
                                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.04),rgba(230,57,70,0.03),transparent)]" />

                                    <div className="relative z-10 flex flex-1 flex-col">
                                        <div className="flex items-start justify-between gap-3">
                                            <a
                                                href={repoData.html_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-2 text-ui-text transition hover:text-brand-cyanSoft"
                                            >
                                                <Code2 size={16} />
                                                <span className="font-semibold">{repoData.name}</span>
                                            </a>
                                            {primaryLang && (
                                                <span className="shrink-0 rounded-full border border-brand-cyan/25 bg-brand-cyan/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-brand-cyanSoft backdrop-blur-xl">
                                                    {primaryLang}
                                                </span>
                                            )}
                                        </div>

                                        {repoData.description && (
                                            <p className="mt-3 text-sm leading-6 text-ui-secondary">{repoData.description}</p>
                                        )}

                                        <div className="mt-4 flex items-center gap-4 text-xs text-ui-muted">
                                            <span className="flex items-center gap-1.5">
                                                <Star size={13} />
                                                {repoData.stargazers_count}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <GitFork size={13} />
                                                {repoData.forks_count}
                                            </span>
                                        </div>

                                        {topLangs.length > 0 && (
                                            <div className="mt-5">
                                                <div className="flex h-1.5 w-full overflow-hidden rounded-full">
                                                    {topLangs.map(([lang, bytes]) => (
                                                        <div
                                                            key={lang}
                                                            className={`h-full ${langColor(lang)}`}
                                                            style={{ width: `${Math.round((bytes / totalBytes) * 100)}%` }}
                                                        />
                                                    ))}
                                                </div>
                                                <div className="mt-2 flex flex-wrap gap-3">
                                                    {topLangs.map(([lang, bytes]) => (
                                                        <span key={lang} className="flex items-center gap-1.5 text-[11px] text-ui-muted">
                                                            <span className={`h-2 w-2 rounded-full ${langColor(lang)}`} />
                                                            {lang} {Math.round((bytes / totalBytes) * 100)}%
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {commitsData.length > 0 && (
                                            <div className="mt-5 flex-1 space-y-2.5 rounded-[1.2rem] border border-white/[0.06] bg-obsidian-950/60 p-4 font-mono text-xs">
                                                {commitsData.map((c) => {
                                                    const msg = c.commit.message.split("\n")[0];
                                                    return (
                                                        <div key={c.sha} className="flex items-start gap-2">
                                                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-brand-emerald shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                                                            <div className="min-w-0">
                                                                <p className="truncate text-ui-text">
                                                                    {msg.length > 60 ? msg.slice(0, 60) + "…" : msg}
                                                                </p>
                                                                <p className="mt-0.5 text-ui-muted">{relativeDate(c.commit.author.date)}</p>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </RevealOnScroll>
                        );
                    })}
            </div>
        </section>
    );
}
