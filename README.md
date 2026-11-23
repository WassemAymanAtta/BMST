# BMST website

A bilingual (English / Arabic), responsive single-page site for **Bani Mazar Sports Team**, with a small PHP endpoint that stores membership applications and contact messages locally.

## Deployment

- **Free (no PHP, no domain needed):** [`deploy/netlify/NETLIFY.md`](deploy/netlify/NETLIFY.md) with ready-to-drag `deploy/bmst-netlify.zip`. Uses Netlify Forms (100 submissions/month) plus the client-side WhatsApp link.
- **Paid PHP hosting (unlimited local storage):** [`deploy/DEPLOY.md`](deploy/DEPLOY.md) with `deploy/bmst-site.zip`.

## Run locally

PHP 8.0+ is required (the endpoint uses `str_starts_with()`).

```bash
cd D:\BMST
php -S 127.0.0.1:8000
```

Then open <http://127.0.0.1:8000>.

Opening `index.html` directly with `file://` works for layout and interactions, but form submissions need the PHP server.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Semantic, accessible page structure with translation hooks |
| `style.css` | Design system, responsive layout, light/dark themes, RTL support |
| `script.js` | Language switcher, theme, navigation, slider, counters, form validation/submission |
| `api/application.php` | Validated POST endpoint for both forms |
| `api/config.php` | Default settings; loads your private overrides |
| `api/config.local.php` | **Private** WhatsApp credentials (git-ignored) |
| `api/whatsapp.php` / `api/test-whatsapp.php` | Optional server-side API notifier (disabled by default) |
| `data/` | Generated at runtime: `applications.php`, `rate-limit.php`, `error.log` |
| `images/` | Existing BMST images used by the site |

## Forms

Both forms POST JSON to `api/application.php`:

```json
{
  "type": "join",
  "lang": "en",
  "name": "Mohamed Ahmed",
  "age": 17,
  "phone": "01XXXXXXXXX",
  "email": "",
  "address": "",
  "reason": "",
  "website": ""
}
```

For contact messages, use `"type": "contact"` with `subject`, `message` and an optional `phone` instead of age/address/reason. The phone enables a `wa.me` link in the admin alert.

The endpoint:

- validates required fields, age range, Egyptian phone numbers and email format;
- ignores honeypot bot submissions;
- limits each client to 6 submissions per 10 minutes per form type;
- stores records in `data/applications.php` (newline-delimited JSON);
- returns localised success/error messages;
- never exposes database errors to the browser.

The data files start with `<?php exit; ?>` so direct HTTP access returns nothing. `data/` is also excluded from Git in `.gitignore` to avoid committing personal information.

## WhatsApp delivery (no API / no token)

When a visitor submits either form, the site:

1. validates the fields;
2. opens WhatsApp with the message already typed, addressed to the team admin;
3. saves the submission locally via `api/application.php`;
4. keeps a green **Open WhatsApp** button under the form in case the popup was blocked.

The visitor confirms with one tap on WhatsApp's **Send** button. This is the only way to send without an API — WhatsApp does not allow a website to send a message silently on a visitor's behalf. Because the message comes from the visitor's own WhatsApp account, the admin can reply to them directly.

**Change the WhatsApp number:** edit `data-whatsapp` on the `<body>` tag in `index.html` (digits only, country code included — currently `201125993315`). The contact and footer phone links should be updated to match.

The optional server-side API notifier remains in `api/whatsapp.php` but is **disabled by default** (`enabled => false` in `api/config.local.php`) to avoid duplicate messages. Only enable it if you later obtain Meta WhatsApp Cloud API credentials.

## Customisation

- **Content / translations:** edit the `I18N` object at the top of `script.js` and the matching `data-i18n` keys in `index.html`.
- **Colours:** edit the CSS variables in `:root` and `[data-theme="dark"]` in `style.css`.
- **Rate limit / messages:** edit the constants and `msg()` calls in `api/application.php`.
- **Payment details:** update the `data-copy` values and visible codes in the Support section of `index.html`.

## Notes

- The gallery intentionally uses the two available BMST photos plus a “coming soon” slide, so there are no broken image links.
- The theme and language choices are saved in `localStorage`; the site also respects the operating system's dark-mode preference on a first visit.
- Animations are disabled automatically when the visitor has `prefers-reduced-motion` enabled.
