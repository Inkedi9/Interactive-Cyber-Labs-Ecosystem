import {
  assistantIntents,
  assistantFallback,
} from "../../data/assistantIntents";

function normalize(input) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[^\w\s-]/g, " ")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function pickRandom(value) {
  if (Array.isArray(value)) {
    return value[Math.floor(Math.random() * value.length)];
  }
  return value;
}

export function findBestIntent(message, previousIntentId = null) {
  const normalized = normalize(message);

  let bestIntent = null;
  let bestScore = 0;

  for (const intent of assistantIntents) {
    let score = 0;

    for (const keyword of intent.keywords) {
      const normalizedKeyword = normalize(keyword);
      if (normalized.includes(normalizedKeyword)) {
        score += normalizedKeyword.split(" ").length > 1 ? 3 : 1;
      }
    }

    if (previousIntentId && previousIntentId === intent.id) {
      score += 0.25;
    }

    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
    }
  }

  if (!bestIntent || bestScore <= 0) {
    return {
      ...assistantFallback,
      response: pickRandom(assistantFallback.response),
    };
  }

  return {
    ...bestIntent,
    response: pickRandom(bestIntent.response),
  };
}
