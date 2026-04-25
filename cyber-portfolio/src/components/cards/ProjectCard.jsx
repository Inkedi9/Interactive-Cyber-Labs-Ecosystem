export default function ProjectCard({ project }) {
    return (
        <div className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-fuchsia-400/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.18)] light:border-slate-200 light:bg-white light:hover:border-fuchsia-300 light:hover:shadow-[0_0_30px_rgba(168,85,247,0.10)]">
            <div className="mb-4 flex items-center justify-between gap-3">
                <span className="rounded-xl border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-2 text-sm text-fuchsia-200 light:border-fuchsia-300 light:bg-fuchsia-100 light:text-fuchsia-700">
                    {project.badge}
                </span>
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300 light:border-emerald-300 light:bg-emerald-100 light:text-emerald-700">
                    {project.status}
                </span>
            </div>

            <h3 className="text-xl font-semibold text-white light:text-slate-900">{project.name}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300 light:text-slate-600">{project.description}</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-fuchsia-400/40 bg-fuchsia-500/15 px-4 py-3 text-sm font-medium text-fuchsia-100 transition hover:bg-fuchsia-500/25 light:bg-fuchsia-600 light:text-white"
                >
                    Voir le projet
                </a>
                <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-fuchsia-400/40 light:border-slate-300 light:bg-white light:text-slate-700"
                >
                    Code GitHub
                </a>
            </div>
        </div>
    )
}