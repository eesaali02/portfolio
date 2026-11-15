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
  Meta: (props) => <p className="mb-1 text-[12px] text-muted" {...props} />,
  // A book or film: <Item title="..." by="..." note="★★★★☆ · one-line take" /> (`by` is optional)
  Item: ({ title, by, note }: { title: string; by?: string; note?: string }) => (
    <p className="mb-4">
      <strong className="font-bold">{title}</strong>
      {by && <> by {by}</>}
      {note && <span className="block text-[12px] text-muted">{note}</span>}
    </p>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
