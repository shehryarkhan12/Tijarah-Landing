# Tijarah Landing

Static "Coming Soon" page for [tijarah.pk](https://tijarah.pk).

Hosted on GitHub Pages from this repository — always-on, free, independent of the EC2 backend.

## DNS (Route 53 — hosted zone `tijarah.pk`)

| Name | Type | Value |
|---|---|---|
| `tijarah.pk` | A | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
| `www.tijarah.pk` | CNAME | `shehryarkhan12.github.io` |

Backend subdomains (`be`, `dev-be`, `dev`) are unaffected — they still point to the EC2 instance.

## Deploy

Push to `main` — GitHub Pages auto-deploys via the `pages build and deployment` workflow.

## When the real frontend is ready

Replace the apex `A` records with the frontend host (e.g., EC2 IP, CloudFront, Vercel) in Route 53, then archive or delete this repo.
