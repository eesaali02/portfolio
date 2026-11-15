"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

// Text button next to the name: shows the theme you'd switch TO ("dark" / "light").
// The theme itself is applied before the page paints by the script in app/layout.tsx.
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    setTheme(root.dataset.theme === "dark" ? "dark" : "light");

    // Follow system changes until the visitor picks a theme themselves.
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = (event: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem("theme")) return;
      } catch {}
      const next: Theme = event.matches ? "dark" : "light";
      root.dataset.theme = next;
      setTheme(next);
    };
    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
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
