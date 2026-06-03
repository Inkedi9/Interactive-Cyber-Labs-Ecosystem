export default function SectionBadge({ children }) {
    return (
        <span className="inline-block rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-4 py-1 text-xs uppercase tracking-[0.25em] text-fuchsia-200 dark:text-fuchsia-200 light:border-fuchsia-300 light:bg-fuchsia-100 light:text-fuchsia-700">
            {children}
        </span>
    )
}