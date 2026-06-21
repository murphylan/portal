---
name: portal-product-patterns
description: Portal product-specific knowledge for Murphy Cloud. Use when working on the main site, product landing pages, 3D/animation UI, PM2 deployment, Nginx routing, or portal-specific deployment docs.
---

# Portal Product Patterns

This skill contains only Portal-specific context. Shared Murphy Cloud implementation details live in the `murphy-*` skills.

## Product Scope

- Portal is the Murphy Cloud main site at `murphylan.cloud` and `www.murphylan.cloud`.
- It is mostly a public-facing marketing and product navigation app.
- Pages currently include the home page, product listing, WorkSync page, activity product page, and login page.
- The UI stack includes React Three Fiber, Drei, Three.js, and Framer Motion, so animation and bundle impact should be reviewed carefully.

## Implementation Notes

- Keep the main landing experience fast; avoid loading heavy 3D assets on unrelated pages.
- Prefer route-level or component-level splitting for heavy interactive/3D sections.
- SEO-visible pages should preserve static text content and metadata.
- Portal currently has no Drizzle/NextAuth-style data layer; use `murphy-nextjs-data-patterns` only if a real data layer is introduced.

## Deployment

- Deployment doc: `/Users/murphy/work/projects/main/docs/product/murphy-cloud/deployment/deploy-portal.md`.
- Public domains: `murphylan.cloud`, `www.murphylan.cloud`.
- Production port: `3000`.
- Server: A machine, `ubuntu@159.75.253.245`.
- Deployment script: `/Users/murphy/work/projects/murphy-cloud/murphy-deploy/products/portal/deploy.sh`.
- Current deployment uses PM2 rather than the shared C-machine Podman pattern.
- Nginx runs on the same A machine and proxies Portal to `localhost:3000`.
- Existing server path may still be `/home/ubuntu/work/requirement`; keep docs and scripts aligned if this is renamed.

## Verification

- Run Biome checks for focused code changes when possible.
- For animation or 3D changes, verify bundle/runtime impact and mobile rendering.
- For deployment changes, update `deploy-portal.md`, `murphy-cloud.md` if Nginx/DNS changes, and `murphy-deploy/products/portal`.
