# OUT-2026-home

A **super simple, mobile-first, grayscale** landing page for OnlyUsedTesla.com.

## What’s on the homepage

Three clear paths (what your users do right now):

1) **Shop used Teslas** (external link)
2) **Advertise your Tesla** (plus optional **Cash Offer**)
3) **Buy an OUT‑CHECK report** (external link to your current landing)

Also includes:
- Hamburger menu placeholder (slide-over)
- Footer placeholder
- **Yo‑Yo** AI agent bubble (UI placeholder)

## Files

- `index.html` — homepage
- `login.html` — dumb-simple passwordless login page (UI only)
- `styles.css` — grayscale styling
- `script.js` — minimal interactivity

## Quick start

Open `index.html` in a browser.

## Update the main links

In `index.html` and `script.js`, update:

- Shop: `https://onlyusedtesla.com/used-tesla-for-sale`
- Advertise flow: `https://onlyusedtesla.com/sell-my-tesla`
- Cash offer: `https://onlyusedtesla.com/cash-offer`
- OUT‑CHECK landing: `https://adamqureshi.com/out-check-landing/`

## Next steps (when you’re ready)

- Wire the login UI to a passwordless provider (Supabase / Clerk / Firebase / Auth0, etc.)
- Replace Yo‑Yo placeholder with your real agent widget / API
- Add additional pages and turn the hamburger into real navigation
