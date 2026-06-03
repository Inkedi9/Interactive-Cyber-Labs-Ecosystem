export default function SectionHeading({ eyebrow, title, description, id }) {
    return (
        <div id={id} className="space-y-3">
            {eyebrow && (
                <p className="text-xs uppercase tracking-[0.35em] text-emerald-300/70">
                    {eyebrow}
                </p>
            )}
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {title}
            </h2>
            {description && (
                <p className="max-w-2xl text-base leading-7 text-slate-400">{description}</p>
            )}
        </div>
    );
}