export function runAssistantAction(action, navigate) {
  if (!action) return;

  if (action.type === "route" && action.target) {
    navigate(action.target);
    return;
  }

  if (action.type === "scroll" && action.target) {
    const element = document.querySelector(action.target);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return;
  }

  if (action.type === "scroll-or-route") {
    const element = action.target
      ? document.querySelector(action.target)
      : null;

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (action.route) {
      navigate(action.route);
    }
    return;
  }

  if (action.type === "open-cv") {
    window.open("/cv-inkedi.pdf", "_blank", "noopener,noreferrer");
    return;
  }
}
