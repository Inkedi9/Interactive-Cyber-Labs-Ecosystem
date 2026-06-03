export function applyFilters(labs, filters) {
  return labs.filter((lab) => {
    const typeOk =
      filters.types.length === 0 || filters.types.includes(lab.type);
    const levelOk =
      filters.levels.length === 0 || filters.levels.includes(lab.level);
    const statusOk =
      filters.statuses.length === 0 || filters.statuses.includes(lab.status);

    return typeOk && levelOk && statusOk;
  });
}

export function searchLabs(labs, query) {
  if (!query.trim()) return labs;

  const q = query.toLowerCase();

  return labs.filter((lab) => {
    const haystack = [
      lab.name,
      lab.type,
      lab.level,
      lab.status,
      lab.description,
      lab.longDescription,
      lab.problemSolved,
      lab.scenario,
      lab.focus,
      lab.recommendedPath,
      ...(lab.skillsShown || []),
      ...(lab.tags || []),
      ...(lab.workflow || []),
      ...(lab.mitre?.tactics || []),
      ...(lab.mitre?.techniques || []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(q);
  });
}

export function sortLabs(labs, sortBy) {
  const sorted = [...labs];

  if (sortBy === "featured") {
    return sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
  }

  if (sortBy === "status") {
    const order = { Deployed: 0, "In Progress": 1 };
    return sorted.sort(
      (a, b) => (order[a.status] ?? 99) - (order[b.status] ?? 99),
    );
  }

  if (sortBy === "level") {
    const order = { Beginner: 0, Intermediate: 1, Advanced: 2 };
    return sorted.sort(
      (a, b) => (order[a.level] ?? 99) - (order[b.level] ?? 99),
    );
  }

  if (sortBy === "name") {
    return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }

  return sorted;
}

export function getRecommendedLabs(labs) {
  return [...labs]
    .sort((a, b) => {
      const aScore =
        (a.featured ? 3 : 0) +
        (a.status === "Deployed" ? 2 : 0) +
        (a.level === "Advanced" ? 1 : 0);

      const bScore =
        (b.featured ? 3 : 0) +
        (b.status === "Deployed" ? 2 : 0) +
        (b.level === "Advanced" ? 1 : 0);

      return bScore - aScore;
    })
    .slice(0, 3);
}
