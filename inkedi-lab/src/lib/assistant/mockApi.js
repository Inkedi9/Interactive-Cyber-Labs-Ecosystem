import { findBestIntent } from "./matcher";

function randomDelay(min = 500, max = 1200) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function askPortfolioAssistant(message, context = {}) {
  const result = findBestIntent(message, context.previousIntentId || null);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: result.id,
        text: result.response,
        suggestions: result.suggestions || [],
        action: result.action || null,
      });
    }, randomDelay());
  });
}
