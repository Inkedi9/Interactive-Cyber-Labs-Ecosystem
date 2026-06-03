import { useEffect, useMemo, useRef, useState } from "react";
import { askPortfolioAssistant } from "../lib/assistant/mockApi";
import {
  clearAssistantMessages,
  loadAssistantMessages,
  saveAssistantMessages,
} from "../lib/assistant/storage";

const welcomeMessage = {
  id: "welcome",
  role: "assistant",
  text: "Hello 👋 Je peux te parler de mes projets, compétences, parcours ou te guider dans le site.",
  suggestions: [
    "Parle-moi de tes compétences",
    "Quels sont tes meilleurs projets ?",
    "Quel est ton parcours ?",
    "Comment te contacter ?",
  ],
};

export function useAssistant() {
  const storedMessages = loadAssistantMessages();
  const [messages, setMessages] = useState(storedMessages || [welcomeMessage]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);

  const lastAssistantMessage = useMemo(
    () =>
      [...messages].reverse().find((message) => message.role === "assistant"),
    [messages],
  );

  useEffect(() => {
    saveAssistantMessages(messages);
  }, [messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  async function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed) return null;

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    const response = await askPortfolioAssistant(trimmed, {
      previousIntentId: lastAssistantMessage?.intentId || null,
    });

    const assistantMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      text: response.text,
      suggestions: response.suggestions,
      action: response.action,
      intentId: response.id,
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);

    return assistantMessage;
  }

  function resetConversation() {
    clearAssistantMessages();
    setMessages([welcomeMessage]);
  }

  return {
    messages,
    input,
    setInput,
    isTyping,
    sendMessage,
    resetConversation,
    endRef,
  };
}
