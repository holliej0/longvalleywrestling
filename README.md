# Long Valley Wrestling — longvalleywrestling.com

Static rebuild of the club website. Hosted free on GitHub Pages, built by
Jekyll (which GitHub runs automatically — nothing to install locally).

## Editing

| What you want to change | File |
|---|---|
| Nav links, email, phone, registration/store URLs, social links | `_config.yml` |
| Header, footer, the blue "Join the team" band | `_layouts/default.html` |
| Homepage sections | `index.html` |
| Any inner page | `<page-name>/index.html` |
| Colors, type, spacing | `assets/css/site.css` |
| Carousel, mobile menu, typewriter | `assets/js/site.js` |

Edit a file on github.com, commit, and the site redeploys in about a minute.
Every external link (TeamSnap registration, the store, socials) is defined once
in `_config.yml` — change it there and it updates everywhere.

## Images

`bash download-assets.sh` pulls the images from the WordPress site into
`assets/img/`. Run once, then commit them.

## Fonts

Headings use **Termina** from Adobe Fonts (kit `zau2ogq`, loaded in
`_layouts/default.html`). The kit is authorized for `longvalleywrestling.com`,
so it renders once DNS points here. On the temporary `*.github.io` preview URL
it falls back to a system font — add the github.io domain to the kit in Adobe
Fonts if you want it to match during preview.

Body text is DM Sans from Google Fonts.

## Going live

1. Push to GitHub, enable Pages (Settings → Pages → deploy from `main`).
2. Check the `*.github.io` URL.
3. Add a `CNAME` file containing `www.longvalleywrestling.com`, set the custom
   domain in Settings → Pages, then point DNS at GitHub.
4. Keep the WordPress site up until DNS has moved.

## What changed from WordPress

- No PHP, no database, no plugins, no caching layer to warm or purge.
- The contact page has no form (the original didn't either) — phone and email links only.
- The empty "Team Photos" page was dropped; it wasn't in the nav.
- `_preview/` is a local scratch render and is gitignored.
