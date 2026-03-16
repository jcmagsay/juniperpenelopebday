# Birthday Invite Site

A Vite + React + MUI app for hosting your kid's birthday invite every year.

## What this project includes

- Home page with live countdown hero
- Dedicated password gate page
- Protected event page
- RSVP CTA at the top of the event page with embedded Google Form
- Past events archive
- Theme system driven by `themeKey`
- GitHub Pages friendly routing using `HashRouter`

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Private Event Details

Keep addresses, email addresses, and phone numbers out of git by putting them in a local `.env` file copied from `.env.example`.

Example:

```bash
cp .env.example .env
```

Vite injects these at build time. The GitHub Pages workflow is already wired to read the same shared keys from GitHub Actions secrets:

- `VITE_EVENT_ADDRESS`
- `VITE_EVENT_CONTACT_EMAIL`
- `VITE_EVENT_CONTACT_PHONE`

## Deploy to GitHub Pages

GitHub Pages is static hosting only, so use SSG/static build (not SSR).

Build and prepare Pages output:

```bash
npm run build:pages
```

Deploy to the `gh-pages` branch:

```bash
npm run deploy:pages
```

What this does:

- runs the Vite production build
- creates `dist/404.html` (copy of `index.html`) for Pages-friendly fallback
- creates `dist/.nojekyll`
- publishes `dist` to `gh-pages`

This project already uses `HashRouter`, so routing works reliably on GitHub Pages.

## How to add your Google Form RSVP

1. Open your Google Form.
2. Click **Send**.
3. Click the **<> embed** option.
4. Copy the form URL.
5. Put it in `src/data/events.json` under:

```json
"rsvp": {
  "enabled": true,
  "mode": "embed",
  "embedUrl": "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
}
```

If the URL does not end with `embedded=true`, the iframe will not work correctly.

## Yearly update workflow

Edit one object in `src/data/events.json`:

- add the new year object
- set `isCurrent: true`
- set last year to `isCurrent: false`
- change the `password`
- change `themeKey`
- update `backgroundImage`
- update `postcardImage`
- update the event details

## Important note

The password gate is privacy gating only. It is not strong security.
