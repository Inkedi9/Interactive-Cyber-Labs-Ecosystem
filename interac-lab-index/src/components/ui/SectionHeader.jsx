export default function SectionHeader({ eyebrow, title, description, right }) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
                {eyebrow && <p className="eyebrow-pro">{eyebrow}</p>}

                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {title}
                </h2>

                {description && (
                    <p className="max-w-2xl text-base leading-7 text-slate-400">
                        {description}
                    </p>
                )}
            </div>

            {right ? <div className="shrink-0">{right}</div> : null}
        </div>
    );
}