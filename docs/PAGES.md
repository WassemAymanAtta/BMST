# BMST on GitHub Pages

## Live site

**https://bmst-team.github.io/**

Repository: `bmst-team/bmst-team.github.io` (Organization `bmst-team`, owner `WassemAymanAtta`).

The old URL `https://wassemaymanatta.github.io/BMST/` redirects here automatically.

## How it works
- No PHP and no backend. The site is pure HTML/CSS/JS.
- Forms (join + contact) validate locally, then open WhatsApp with a pre-filled message to `+20 112 599 3315`. The visitor taps **Send** once. A green fallback link appears under the form in case the popup is blocked.
- `.nojekyll` tells GitHub Pages not to run Jekyll, so files like `script.js` are served untouched.

## Update the live site
1. Edit `index.html`, `style.css`, or `script.js` in the `bmst-team/bmst-team.github.io` repository.
2. Commit and push to `main`.
3. GitHub Pages rebuilds automatically (usually < 1 minute). Check the **Actions** tab for status.

> The PHP/JSON form endpoint version stays in this repository at the repo root, documented in `deploy/DEPLOY.md`. The `docs/` folder here only holds the redirect to the live site.

## Verification (2026-11-23)
- Live build from commit `0a2eaa3`, Pages status `built`.
- EN and AR both render; `dir` flips to `rtl` for Arabic; theme toggle works.
- Join + contact forms: validation passes, no backend fetch, WhatsApp opens with the correct pre-filled Arabic/English message to `201125993315`, green fallback link shown.
- No console errors; Lighthouse 100 / 100 / 100 (accessibility / best practices / SEO).
- All images return HTTP 200.
