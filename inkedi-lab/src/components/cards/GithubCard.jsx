export default function GithubCard() {
    return (
        <div className="mt-16 rounded-[2rem] border border-ui-border bg-surface p-8 text-center shadow-sm transition hover:border-brand-cyan/30 hover:shadow-cyanGlow">

            <h2 className="text-2xl font-bold text-ui-text">
                Activité GitHub
            </h2>

            <p className="mt-3 text-ui-secondary">
                Suivi de mes projets et contributions
            </p>

            <a
                href="https://github.com/Inkedi9"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-block rounded-xl border border-brand-cyan/40 bg-surface-2 px-5 py-3 text-brand-cyanSoft transition hover:border-brand-cyan hover:bg-brand-cyan/10"
            >
                Voir mon GitHub →
            </a>
        </div>
    );
}