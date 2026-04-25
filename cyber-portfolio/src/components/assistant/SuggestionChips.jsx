export default function SuggestionChips({ suggestions = [], onSelect }) {
    if (!suggestions.length) return null;

    return (
        <div className="mt-3 flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
                <button
                    key={suggestion}
                    type="button"
                    onClick={() => onSelect(suggestion)}
                    className="rounded-full border border-ui-borderStrong bg-surface-2 px-3 py-2 text-xs font-medium text-ui-secondary transition hover:border-brand-cyan/40 hover:text-brand-cyanSoft"
                >
                    {suggestion}
                </button>
            ))}
        </div>
    );
}