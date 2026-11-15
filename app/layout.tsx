import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-plex",
});

export const metadata: Metadata = {
  // Every page's tab just says "eesa ali".
  title: "eesa ali",
  description:
    "Eesa Ali, an aspiring solutions engineer with an Advanced Diploma in IT Innovation and Design from Conestoga College and CompTIA Network+.",
};

// Runs before the page paints: use the saved choice, else the system setting. Prevents a flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})()`;

const footerLinks = [
  { label: "email", href: "mailto:eesa.ali02@gmail.com" },
  { label: "linkedin", href: "https://www.linkedin.com/in/eesa-ali" },
  { label: "github", href: "https://github.com/eesaali02" },
  { label: "resume", href: "/assets/Eesa_Ali_Resume.pdf" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the script below sets data-theme on <html> before React loads.
    <html lang="en" className={plex.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-bg font-mono leading-[1.7] text-[14px] text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-bg focus:px-3 focus:py-2"
        >
          skip to content
        </a>
        <div className="mx-auto max-w-[640px] px-4 pb-12 pt-8 sm:px-5 sm:pb-16 sm:pt-14">
          <header className="mb-6 border-b border-rule pb-5">
            <Nav />
          </header>
          {/* The last paragraph or list already ends with a bottom margin, so the footer only adds a little. */}
          <main id="main">{children}</main>
          <footer className="mt-6 border-t border-rule pt-5 text-[13px]">
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-link underline underline-offset-[3px] hover:text-ink">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            {/* The year is set when the site is built; rebuilding in a new year updates it. */}
            <p className="mt-2 text-muted">
              © {new Date().getFullYear()} eesa ali · built with next.js, tailwind and mdx
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
