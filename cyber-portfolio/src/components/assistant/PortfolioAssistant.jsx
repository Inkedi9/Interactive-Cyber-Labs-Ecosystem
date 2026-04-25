import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAssistant } from "../../hooks/useAssistant";
import { runAssistantAction } from "../../lib/assistant/actions";
import AssistantLauncher from "./AssistantLauncher";
import ChatMessage from "./ChatMessage";
import SuggestionChips from "./SuggestionChips";
import TypingIndicator from "./TypingIndicator";

export default function PortfolioAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const {
        messages,
        input,
        setInput,
        isTyping,
        sendMessage,
        resetConversation,
        endRef,
    } = useAssistant();

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await sendMessage(input);
        if (response?.action) {
            setTimeout(() => runAssistantAction(response.action, navigate), 250);
        }
    }

    async function handleSuggestion(suggestion) {
        const response = await sendMessage(suggestion);
        if (response?.action) {
            setTimeout(() => runAssistantAction(response.action, navigate), 250);
        }
    }

    return (
        <>
            <AssistantLauncher isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />

            {isOpen && (
                <div className="fixed bottom-40 right-6 z-[85] w-[calc(100vw-3rem)] max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-obsidian-950/92 shadow-[0_20px_80px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.08),_rgba(139,92,246,0.08),_transparent_45%)]" />
                    <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-4">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-cyanSoft">
                                Assistant portfolio
                            </p>
                            <p className="mt-1 text-xs text-ui-muted">
                                Demo assistant — expérience conversationnelle mockée
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={resetConversation}
                            className="rounded-xl border border-ui-borderStrong bg-surface-2 px-3 py-2 text-xs font-medium text-ui-secondary transition hover:border-brand-purple/40 hover:text-brand-purpleSoft"
                        >
                            Vider
                        </button>
                    </div>

                    <div className="relative max-h-[26rem] space-y-4 overflow-y-auto px-4 py-4">
                        {messages.map((message) => (
                            <div key={message.id}>
                                <ChatMessage role={message.role} text={message.text} />
                                {message.role === "assistant" && (
                                    <SuggestionChips
                                        suggestions={message.suggestions}
                                        onSelect={handleSuggestion}
                                    />
                                )}
                            </div>
                        ))}

                        {isTyping && <TypingIndicator />}
                        <div ref={endRef} />
                    </div>

                    <form onSubmit={handleSubmit} className="relative border-t border-white/10 p-4">
                        <div className="flex items-end gap-3">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                rows={1}
                                placeholder="Pose une question sur le portfolio..."
                                className="min-h-[48px] max-h-32 flex-1 resize-none rounded-2xl border border-white/10 bg-surface/80 px-4 py-3 text-sm text-ui-text outline-none backdrop-blur-xl transition placeholder:text-ui-muted focus:border-brand-cyan/30 focus:shadow-glow-cyan" />
                            <button
                                type="submit"
                                className="rounded-2xl border border-brand-cyan/30 bg-brand-cyan/15 px-4 py-3 text-sm font-semibold text-brand-cyanSoft backdrop-blur-xl transition hover:border-brand-cyan/40 hover:bg-brand-cyan/20 hover:text-white hover:shadow-glow-cyan disabled:cursor-not-allowed disabled:opacity-50"
                                disabled={!input.trim() || isTyping}
                            >
                                Envoyer
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}