# Tijarah Landing

Static "Coming Soon" page for [tijarah.pk](https://tijarah.pk).

Hosted on Cloudflare Pages (free, always-on, global CDN).

## Structure

- `index.html` — the landing page
- `CNAME` — custom domain config for Cloudflare Pages

## Deploy

1. Push to `main` — Cloudflare Pages auto-deploys
2. DNS: `tijarah.pk` CNAME → `tijarah-landing.pages.dev`

## When the real frontend is ready

Either deploy the frontend to Cloudflare Pages too, or switch the apex DNS A record back to the EC2 instance. This repo can then be archived.
