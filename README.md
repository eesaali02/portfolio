# Eesa Ali Portfolio

Personal portfolio site built with Next.js, Tailwind CSS and MDX, exported as a static site.

## Run locally

```
npm install
npm run dev      # http://localhost:3000, reloads on save
```

## Build

```
npm run build    # writes the static site to out/
npm start        # serves out/ locally to check the build
```

Hosted on Cloudflare Workers: build command `npm run build`, deploy command `npx wrangler deploy` (config in `wrangler.jsonc`, which serves `out/`).

## Editing content

Each page is a Markdown (MDX) file in `app/`:

```
app/page.mdx              home
app/experience/page.mdx   experience and toolbox
app/projects/page.mdx     projects
app/education/page.mdx    education and certifications
app/bookshelf/page.mdx    books
app/watchlist/page.mdx    shows and films
app/now/page.mdx          what I'm up to now
```

Two extra tags work in any page:

- `<Meta>...</Meta>`: the small grey line under a heading (company, dates, tech).
- `<Item title="..." by="..." note="..." />`: a book or film entry; `by` is optional.

Other files:

```
app/layout.tsx        shared header, footer, font and page titles
components/Nav.tsx    the nav links
mdx-components.tsx    how headings, lists, links etc. are styled
app/globals.css       colour tokens
public/assets/        resume PDF
```
