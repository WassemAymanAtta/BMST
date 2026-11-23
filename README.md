# BMST website

A bilingual (English / Arabic), responsive single-page site for **Bani Mazar Sports Team**, with a small PHP endpoint that stores membership applications and contact messages locally.

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
| `api/whatsapp.php` | WhatsApp Cloud API notifier |
| `api/test-whatsapp.php` | CLI test: sends a sample alert to admins |
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

## WhatsApp notifications

Every accepted submission is still stored locally, and can also be pushed instantly to the team's WhatsApp.

### Setup

1. In **Meta Business Suite → WhatsApp → API Setup**, get:
   - the temporary or permanent **access token**;
   - the **Phone number ID** of the WhatsApp business number.
2. Open `api/config.local.php` and fill in:
   - `access_token`
   - `phone_number_id`
   - `admin_recipients` — admin numbers in international format, e.g. `+201280313993`. In test mode each recipient must be added as a **test recipient** in Meta.
   - set `enabled` to `true`.
3. Test it:

   ```bash
   php api/test-whatsapp.php
   ```

You should see `"sent": 1` (or the number of admins) and the message will arrive on WhatsApp. Failed delivery is logged to `data/error.log` but never breaks the visitor's form submission.

### Important: text vs template

- With **test recipients**, plain text messages work immediately (the default).
- For **production recipients**, WhatsApp only allows business-initiated messages using an **approved template**. In `config.local.php`, set `template.name` to your approved template name and `template.language` to its language code. The template must have exactly four body variables:

  ```
  {{1}} - alert title
  {{2}} - sender name
  {{3}} - phone / email / wa.me link
  {{4}} - details and time
  ```

  Example template body:

  ```
  {{1}}
  {{2}}

  {{3}}

  {{4}}
  ```

The `access_token` and `phone_number_id` stay in `api/config.local.php`, which is git-ignored. Meta tokens expire — if notifications silently stop, generate a new token and update that file.

## Customisation

- **Content / translations:** edit the `I18N` object at the top of `script.js` and the matching `data-i18n` keys in `index.html`.
- **Colours:** edit the CSS variables in `:root` and `[data-theme="dark"]` in `style.css`.
- **Rate limit / messages:** edit the constants and `msg()` calls in `api/application.php`.
- **Payment details:** update the `data-copy` values and visible codes in the Support section of `index.html`.

## Notes

- The gallery intentionally uses the two available BMST photos plus a “coming soon” slide, so there are no broken image links.
- The theme and language choices are saved in `localStorage`; the site also respects the operating system's dark-mode preference on a first visit.
- Animations are disabled automatically when the visitor has `prefers-reduced-motion` enabled.
