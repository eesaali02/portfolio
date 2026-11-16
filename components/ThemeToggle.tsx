"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

// Text button next to the name: shows the theme you'd switch TO ("dark" / "light").
// The theme itself is applied before the page paints by the script in app/layout.tsx.
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  // Dark unless the visitor has picked light.
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  }

  const target = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`switch to ${target} mode`}
      // Hidden (but keeps its space) until we know the current theme, so the label never flickers.
      className={`cursor-pointer border-0 bg-transparent p-0 font-mono text-[13px] text-muted hover:text-ink hover:underline hover:underline-offset-[3px] ${theme ? "" : "invisible"}`}
    >
      [{target}]
    </button>
  );
}
