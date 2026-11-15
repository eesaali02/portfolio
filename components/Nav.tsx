"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const pages = ["experience", "projects", "education", "bookshelf", "watchlist", "now"];

export default function Nav() {
  // Static export can serve a page with or without a trailing slash, so normalise it.
  const path = usePathname().replace(/\/$/, "") || "/";

  return (
    <>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <Link
          href="/"
          aria-current={path === "/" ? "page" : undefined}
          className="text-xl font-bold text-ink no-underline"
        >
          eesa ali
        </Link>
        <ThemeToggle />
      </div>
      <nav aria-label="Pages">
        <ul className="flex flex-wrap items-baseline gap-x-5 gap-y-1 text-[14px]">
          {pages.map((page) => {
            const current = path === `/${page}`;
            return (
              <li key={page}>
                <Link
                  href={`/${page}`}
                  aria-current={current ? "page" : undefined}
                  className={
                    current
                      ? "text-ink underline underline-offset-[3px]"
                      : "text-muted no-underline hover:text-ink hover:underline hover:underline-offset-[3px]"
                  }
                >
                  {page}
                </Link>
              </li>
            );
          })}
          <li>
            <a
              href="/assets/Eesa_Ali_Resume_Portfolio.pdf"
              download
              className="text-muted no-underline hover:text-ink hover:underline hover:underline-offset-[3px]"
            >
              resume ↓
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
