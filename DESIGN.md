# Design System: Murphy Cloud Portal

> Source of truth for the portal's visual language. Generated with the
> `stitch-design-taste` methodology and calibrated specifically for Murphy Cloud:
> a product ecosystem portal blending enterprise infrastructure, indie software
> craft, and retail-brand confidence. The system is intentionally anti-generic:
> restrained color, asymmetric structure, tactile motion, and product visuals
> embedded directly into typography-driven layouts.

## 1. Visual Theme & Atmosphere

Enterprise-confident and product-first — closer to a Japanese retail flagship lab
than a startup landing page. The atmosphere should feel operational, composed,
and quietly premium: wide whitespace, disciplined typography, offset visual
rhythm, and tactile interfaces with physical weight. The portal should resemble a
real software operating environment rather than a template-marketing funnel.

- **Density:** 5 — balanced operational clarity with room for showcase visuals
- **Variance:** 8 — asymmetric sections, offset media blocks, broken grid rhythm
- **Motion:** 6 — fluid spring choreography, restrained but always alive

Hero sections must feel editorial and cinematic without becoming decorative.
Inline screenshots, cropped product imagery, or floating hardware-style previews
should be embedded directly between headline fragments as visual punctuation.

## 2. Color Palette & Roles

The palette derives from the 7-Eleven identity system but is translated into a
more restrained software-grade interface language. Green is the primary
interactive accent. Orange and red are structural rhythm colors used sparingly
for section markers, visual cadence, and branded separators.

- **Paper Canvas** `#F6F7F6` — global page canvas; slightly warm off-white with soft retail-lighting character
- **Pure Surface** `#FFFFFF` — floating content planes, modal surfaces, elevated sections
- **Charcoal Ink** `#16181C` — primary typography, iconography, structural depth
- **Muted Steel** `#5B6167` — metadata, descriptions, secondary hierarchy
- **Whisper Border** `rgba(20,24,28,0.08)` — low-contrast structural dividers and grid separators
- **Store Green** `#00794C` — the single interactive accent; buttons, focus rings, active tabs, CTA emphasis
- **Store Green Hover** `#00925C` — hover elevation state only
- **Signal Orange** `#F58220` — restrained editorial accent for badges, section counters, visual pacing
- **Signal Red** `#E11B22` — micro-emphasis only; alerts, stripe rhythm, tiny detail moments
- **Night Surface** `#0E1012` — dark-mode style showcase sections; replaces pure black entirely
- **Brand Stripe** — a 3-band horizontal marker using green/orange/red; appears beneath navigation, between showcase sections, and inside footer signatures

All gradients must remain subtle and low-contrast. Purple neon, electric blue,
cyber glow, and oversaturated AI aesthetics are permanently banned.

The full 7-Eleven tri-color is present throughout (green/orange/red rhythm in
chrome + accents); green leads for interactive surfaces so contrast stays clean.
No purple, no neon, no outer-glow fills.

## 3. Typography

- **Display:** `Geist` — tight tracking (`-0.02em`), controlled scaling via `clamp()`, hierarchy driven through weight and spacing instead of oversized typography
- **Body:** `Geist` + `Noto Sans SC` — relaxed line height (`1.6`–`1.75`), maximum 65ch reading width
- **Mono:** `Geist Mono` — operational labels, metrics, timestamps, dashboard numerics
- **Headline Behavior:** headlines are left-aligned by default; never centered in high-variance layouts
- **Inline Media Typography:** small rounded screenshots or product crops may sit inline with display text at type-height
- **Banned:** `Inter`, Times New Roman, Georgia, Garamond, Palatino, oversized gradient text, fake startup-meme typography

## 4. Component Stylings

- **Buttons:** dense and tactile; filled Store-Green primary with subtle inset shadow and `translateY(-1px)` active feedback. Secondary actions use ghost or thin-border variants only.
- **Cards:** large-radius (`1.5rem`–`2rem`) floating planes with diffused shadows tinted toward the page canvas. Cards should never form equal-width triplets.
- **Feature Layouts:** replace generic marketing cards with staggered grids, editorial media blocks, or horizontal product rails
- **Navigation:** thin, disciplined, almost architectural; persistent 3-band stripe beneath the top bar
- **Eyebrows:** `Geist Mono`, uppercase, tracked `+0.14em`, muted steel color
- **Inputs:** labels always above fields; helper/error text below; focus ring exclusively Store-Green
- **Loaders:** skeleton placeholders matching final dimensions; circular spinners are banned
- **Empty States:** composed product scenes with instructional context instead of plain “No data” copy

## 5. Layout Principles

- No centered hero layouts — every major hero must use asymmetric composition
- Headline blocks should align left with media offset to the right or partially staggered beneath
- Never use “3 equal cards in a row” feature sections; use zig-zag editorial rhythm or uneven grids
- CSS Grid preferred over flex percentage math; avoid `calc()` layout hacks
- Maximum content width `1400px`; internal spacing should feel gallery-like rather than compressed SaaS
- Full-height sections use `min-h-[100dvh]`, never `h-screen`
- Mobile collapse below `768px` into strict single-column stacks
- No horizontal scrolling on mobile under any circumstance
- Interactive targets minimum `44px`
- Inline typography images stack beneath headlines on mobile rather than shrinking aggressively

## 6. Motion & Interaction

- Spring defaults: `stiffness: 100`, `damping: 20` for all interactive motion
- Lists and content groups reveal through staggered waterfall orchestration
- Hero visuals maintain one perpetual micro-loop: float, shimmer, or slow parallax drift
- Motion must feel physical and weighted, never elastic or playful
- Animate only `transform` and `opacity`; never animate layout properties
- Heavy visual effects stay isolated inside client-side islands to protect rendering performance

## 7. Anti-Patterns (Banned)

- Pure black (`#000000`)
- Inter font or generic serif fonts
- Purple neon, electric blue glow, cyberpunk gradients
- Outer-glow shadows or saturated glassmorphism
- Scroll-hint arrows, “Scroll to explore”, bouncing chevrons
- Emojis in production UI copy
- Centered heroes in asymmetric layouts
- Equal-width 3-column feature card rows
- Generic startup copywriting (“Elevate”, “Next-Gen”, “Seamless”, “一站式”, “赋能”)
- Fake trust metrics (`99.99%`, `10x productivity`)
- Generic placeholder brands or people (“John Doe”, “Acme”)
- Massive gradient text headlines
- Overlapping text and media layers
- Custom mouse cursors
