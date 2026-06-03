export default function ChatMessage({ role, text }) {
    const isAssistant = role === "assistant";

    return (
        <div className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}>
            <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-7 shadow-sm ${isAssistant
                        ? "border border-brand-cyan/20 bg-surface text-ui-secondary"
                        : "border border-brand-red bg-brand-red text-white"
                    }`}
            >
                {text}
            </div>
        </div>
    );
}