import type { MDXComponents } from "mdx/types";
import Link from "next/link";

// A page title that types itself out, then leaves a pulsing cursor.
// The animation is CSS only (see .typed and .cursor in app/globals.css).
// --chars is set on the h1 so both the text and the cursor timing can read it.
function TypedHeading({ text }: { text: string }) {
  return (
    <h1
      className="mb-6 text-[20px] font-bold leading-tight sm:text-[22px]"
      style={{ "--chars": text.length } as React.CSSProperties}
    >
      <span className="typed">{text}</span>
      <span className="cursor" aria-hidden="true" />
    </h1>
  );
}

// Styles for everything written in the .mdx pages.
// <Meta> is available in any .mdx file without importing it: use it for the grey line under a heading.
const components: MDXComponents = {
  // Every "# title" types itself out. Titles with formatting (links, bold) fall back to a plain heading.
  h1: ({ children, ...props }) =>
    typeof children === "string" ? (
      <TypedHeading text={children} />
    ) : (
      <h1 className="mb-6 text-[20px] font-bold leading-tight sm:text-[22px]" {...props}>
        {children}
      </h1>
    ),
  h2: (props) => <h2 className="mb-1 mt-10 text-[15px] font-bold leading-snug" {...props} />,
  p: (props) => <p className="mb-5" {...props} />,
  ul: (props) => <ul className="mb-5 list-disc space-y-1 pl-5" {...props} />,
  strong: (props) => <strong className="font-bold" {...props} />,
  a: ({ href = "", ...props }) => {
    const className = "text-link underline underline-offset-[3px] hover:text-ink";
    return href.startsWith("/") ? (
      <Link href={href} className={className} {...props} />
    ) : (
      <a href={href} className={className} {...props} />
    );
  },
  // Collapsible section, closed by default: <More label="more (5)"> ... </More>
  // The toggle reads `label` while closed and "less" while open (pass openLabel to change it).
  More: ({ label, openLabel = "less", children }: { label: string; openLabel?: string; children: React.ReactNode }) => (
    <details className="group mb-5">
      <summary className="mb-4 cursor-pointer list-none text-[13px] text-muted hover:text-ink hover:underline hover:underline-offset-[3px] [&::-webkit-details-marker]:hidden">
        <span className="group-open:hidden">{label} ↓</span>
        <span className="hidden group-open:inline">{openLabel} ↑</span>
      </summary>
      {children}
    </details>
  ),
  // Meta and Item render block-level <span>s, not <p>s: MDX puts a tag that sits right under a line of text
  // (no blank line between) inside that line's <p>, and a <p> inside a <p> is invalid HTML.
  Meta: (props) => <span className="mb-1 block text-[12px] text-muted" {...props} />,
  // A book or film: <Item title="..." by="..." note="★★★★☆ · one-line take" /> (`by` is optional)
  Item: ({ title, by, note }: { title: string; by?: string; note?: string }) => (
    <span className="mb-4 block">
      <strong className="font-bold">{title}</strong>
      {by && <> by {by}</>}
      {note && <span className="block text-[12px] text-muted">{note}</span>}
    </span>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
