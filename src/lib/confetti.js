import confetti from "canvas-confetti";

// Track session-level interaction to only fire once per session
let hasInteractedThisSession = false;

export function triggerConfetti(force = false) {
  if (hasInteractedThisSession && !force) return;
  if (!force) hasInteractedThisSession = true;

  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const accentAccepted = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-accent-accepted")
    .trim();
  const accentPending = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-accent-pending")
    .trim();

  // Parse HSL from the CSS variable. If using Tailwind/custom variables, this might need parsing.
  // Wait, the colors in globals.css are "142 71% 45%" format. canvas-confetti expects hex.
  // Instead of parsing, we can just hardcode the rough brand hex colors for the confetti burst.
  const colors = ["#22c55e", "#f59e0b"]; // roughly green and amber/yellow

  confetti({
    particleCount: 50,
    spread: 60,
    colors: colors,
    disableForReducedMotion: true,
  });
}
