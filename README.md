# OUT-2026-home

Mobile-first Only Used Tesla landing site with a shared footer plus company, legal, and contact pages.

## Included pages

- `index.html` — homepage
- `out-match.html` — OUT-MATCH buyer + expert beta landing page
- `dealer.html` — dealer sign-up page with AI / GPT visibility section and dealer FAQ
- `login.html` — passwordless login UI (placeholder)
- `about.html` — About Us
- `contact.html` — Contact Us page with browser-validated form that opens a prefilled email draft
- `visitor-agreement.html` — Visitor Agreement
- `terms-of-service.html` — Terms of Service
- `privacy-policy.html` — Privacy Policy
- `styles.css` — shared styles
- `script.js` — menu, Yo-Yo UI, form helpers, and basic demo interactions
- `assets/` — icon, logo, and wordmark

## What changed

- Added `contact.html`, a Contact Us page with Name, Email, Phone, and Message fields
- Added client-side validation plus a static-site email-draft flow to `contact@onlyusedtesla.com`
- Updated shared navigation and footer areas across the site to link to the new Contact Us page
- Standardized sitewide contact links to `contact@onlyusedtesla.com`
- Kept the build static and lightweight for simple GitHub Pages upload
