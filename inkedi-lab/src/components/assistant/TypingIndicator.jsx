export default function TypingIndicator() {
    return (
        <div className="flex items-center gap-2 rounded-2xl border border-brand-cyan/20 bg-surface px-4 py-3 text-sm text-ui-secondary">
            <span className="sr-only">Assistant is typing</span>
            <span className="h-2 w-2 animate-bounce rounded-full bg-brand-cyan [animation-delay:-0.2s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-brand-cyan [animation-delay:-0.1s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-brand-cyan" />
        </div>
    );
}