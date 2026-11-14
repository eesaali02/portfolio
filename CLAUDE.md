# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Eesa Ali's personal portfolio: a single-page static site in plain HTML, CSS and JavaScript. The owner plans to redo the visual design later with Claude Design, so the current styling is intentionally simple.

Planned hosting is Cloudflare with a custom domain. The site is served as-is, with no build output directory.

## Commands

There is no build step, package manifest, linter or test suite. To preview, open `index.html` directly or serve the folder:

```
npx serve .
```

## How the pieces connect

All content lives in `index.html`. `js/main.js` and `css/styles.css` depend on its markup, so keep these in sync when restructuring:

- `js/main.js` expects `#year`, `.nav-toggle` and `#nav-links` to exist; it throws at load if any is missing, which stops the rest of the script.
- Active-link highlighting observes every `main section[id]` and matches each nav link's hash to a section `id`. A new section needs both an `id` and a matching link in `#nav-links`.
- `--header-height` in `:root` sets both the sticky header's minimum height and `scroll-padding-top`, so anchor jumps clear the header.
- Colors are tokens on `:root`, redefined under `prefers-color-scheme: dark`. A new color needs a value in both places.
- `.nav-toggle` and the collapsed menu switch on at the 760px breakpoint in `css/styles.css`.

## Content rules

- `assets/Eesa_Ali_Resume_Portfolio.pdf` is the source of truth for experience, skills, projects and education. Don't invent or embellish details. The About section is in the owner's own words; don't rewrite it without asking.
- Experience is ordered Siemens Healthineers, Sherbourne Health, then Ali Clips Studio, by the owner's choice rather than by date.
- The credential is "Advanced Diploma, IT Innovation and Design" (Conestoga College), per the resume.
- Keep the owner's phone number and street/postal details off the page. Public contact details are email, LinkedIn and GitHub.
- TeamSync (`jcaoj/TeamSync`) is the award-winning Conestoga capstone, built by a team of three; don't present it as solo work or name a specific part as the owner's.
- The Active Directory home lab was removed on purpose; it will become part of the Enterprise Network Lab.
- The resume path is linked from two places in `index.html` (hero and Contact); update both if the file is renamed or converted.
