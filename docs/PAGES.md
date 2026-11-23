# BMST on GitHub Pages

This folder is the **live static site**. GitHub Pages serves it from `main` → `/docs`:

**https://wassemaymanatta.github.io/BMST/**

## How it works
- No PHP and no backend. The site is pure HTML/CSS/JS.
- Forms (join + contact) validate locally, then open WhatsApp with a pre-filled message to `+20 112 599 3315`. The visitor taps **Send** once. A green fallback link appears under the form in case the popup is blocked.
- `.nojekyll` tells GitHub Pages not to run Jekyll, so files like `script.js` are served untouched.

## Update the live site
1. Edit `docs/index.html`, `docs/style.css`, or `docs/script.js`.
2. Commit and push to `main`.
3. GitHub Pages rebuilds automatically (usually < 1 minute). Check the **Actions** tab for status.

> If you also change the PHP version at the repo root (`index.html`, `script.js`, `style.css`), copy those changes into `docs/` too — or ask the agent to keep both in sync.

## Source of truth
- Bilingual EN/AR + RTL, light/dark theme, slider, counters, mobile menu — all in `docs/`.
- The PHP/JSON form endpoint version stays at the repo root and is documented in `deploy/DEPLOY.md`.
